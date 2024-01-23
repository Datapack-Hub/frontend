import { API, categories } from "$lib/globals/consts";
import { serverGetAuthed } from "$lib/globals/functions";
import { projectSchema, versionSchema, type User } from "$lib/globals/schema";
import { error, fail, redirect } from "@sveltejs/kit";
import { setError, superValidate } from "sveltekit-superforms/server";
import { z } from "zod";
import type { PageServerLoad } from "./$types";

const editProjectSchema = z.object({
  icon: z.ostring().refine(
    value => {
      if (!value) return true;

      const stringLength = value.length - "data:image/png;base64,".length;

      const sizeInBytes =
        4 * Math.ceil(stringLength / 3) * 0.562_489_633_438_381_2;
      const sizeInKb = sizeInBytes / 1000;
      if (sizeInKb > 256) {
        return false;
      }
    },
    { message: "Image is too large!" }
  ),
  title: z.string().max(35, { message: "Title too long!" }),
  description: z.string().min(3).max(200, { message: "Summary too long!" }),
  body: z
    .string()
    .min(100, { message: "Body must contain at least 100 characters" })
    .max(10_000, { message: "Body too long!" }),
  category: z.string().refine(
    value => {
      const elements = value.split(",").map(element => element.trim());
      return (
        elements.every(element => categories.includes(element)) &&
        elements.length < 4
      );
    },
    {
      message:
        "Invalid Categories, you must have at least 1 category and at most 3 categories"
    }
  )
});

export const load = (async event => {
  const projectRequest = await serverGetAuthed(
    `/projects/get/${event.params.project}`,
    event.cookies,
    event.fetch
  );

  if (projectRequest.status === 404) {
    error(404, {
      message: projectRequest.statusText,
      description:
        "How you tried creating a project before editing it? I heard that's a much better way of doin' things."
    });
  }

  const projectJson = await projectSchema.parseAsync(
    await projectRequest.json()
  );
  // @ts-expect-error I don't feel like picking out the relevant stuff
  const form = await superValidate(projectJson, editProjectSchema);
  const meRequest = await serverGetAuthed("/user/me", event.cookies, fetch);

  if (meRequest.status === 401) {
    error(401, {
      message: meRequest.statusText,
      description: undefined
    });
  }

  const me = (await meRequest.json()) as User;
  if (
    me.id === projectJson.author.id ||
    ["admin", "moderator"].includes(me.role)
  ) {
    const project = await serverGetAuthed(
      `/versions/project/${projectJson.ID}`,
      event.cookies,
      event.fetch
    );

    const projectResultJson = await project.json();
    const versionsRequest = await versionSchema
      .array()
      .parseAsync(projectResultJson.result);
    return {
      project: projectJson,
      versions: versionsRequest,
      form
    };
  }

  error(403, {
    message: "Forbidden",
    description:
      "Hello there, little prankster. Only the owner can edit this project."
  });
}) satisfies PageServerLoad;

function bufferToBase64(buffer: ArrayBuffer) {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const length_ = bytes.byteLength;
  for (let index = 0; index < length_; index++) {
    binary += String.fromCodePoint(bytes[index]);
  }
  return btoa(binary);
}

async function blobToB64(buffer: Blob) {
  return (
    "data:" +
    buffer.type +
    ";base64," +
    bufferToBase64(await buffer.arrayBuffer())
  );
}

export const actions = {
  default: async ({ request, cookies, fetch, url }) => {
    const formData = await request.formData();
    const form = await superValidate(formData, editProjectSchema);
    const projectRequest = await serverGetAuthed(
      `/projects/get/${url.pathname.split("/")[2]}`,
      cookies,
      fetch
    );
    const project = projectSchema.parse(await projectRequest.json());

    if (!form.valid) {
      console.log("Error:", form);
      return fail(400, { form });
    }

    // icon handling
    const data = form.data;
    const formDataIcon = formData.get("icon");
    let icon: string | undefined;

    if (formDataIcon instanceof File) {
      if (formDataIcon.size > 256_000) {
        return setError(form, "Icon must be less than 256kb");
      }

      if (!formDataIcon.type.startsWith("image/")) {
        return setError(
          form,
          "Unsupported image type, recommendations are PNG and JPG!"
        );
      }

      icon = await blobToB64(formDataIcon);
    }

    // TODO: fix this URGENTLY
    // const mdBody = await processMarkdown(data.body);
    // const imgs = parse(mdBody).querySelectorAll("img");

    // // i am very sleep deprived
    // for (const imgElement of imgs) {
    //   const imgReqs = await fetch(
    //     imgElement.getAttribute("src")!.toString()
    //   );
    //   const imgBlob = Buffer.from(await imgReqs.arrayBuffer());
    //   const imgMeta = imageMeta(imgBlob)
    //   console.log(imgMeta)

    //   data.body = data.body.replaceAll(
    //     imgElement.getAttribute("src")!.toString(),
    //     "data:image/" + imgMeta.type + ";base64," + imgBlob.toString("base64")
    //   );
    // }

    const projData = {
      icon,
      title: data.title,
      description: data.description,
      body: data.body,
      category: data.category.split(",")
    };

    const result = await fetch(`${API}/projects/edit/${project.ID}`, {
      method: "POST",
      body: JSON.stringify(projData),
      headers: {
        Authorization: "Basic " + cookies.get("dph_token")
      }
    });

    if (result.ok) {
      redirect(307, "/project/" + project.url);
    } else {
      const error = await result.text();
      console.error(error);
      return setError(form, error);
    }
  }
};
