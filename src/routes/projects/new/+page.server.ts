import { API, categories } from "$lib/globals/consts";
import { fail, redirect } from "@sveltejs/kit";
import { setError, superValidate } from "sveltekit-superforms/server";
import { z } from "zod";
import type { PageServerLoad } from "./$types";

const newProjectSchema = z.object({
  icon: z.ostring(),
  url: z
    .string()
    .regex(/^-*[1-9a-z]+(-[1-9a-z]+)*$/, {
      message: "Slug can only contain lower case alphanumeric characters and hyphens!"
    })
    .regex(/^-/, {
      message: "Slug may not start with a hyphen!"
    })
    .min(1, { message: "Slug is empty!" })
    .max(35, { message: "Slug too long!" }),
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
  const form = await superValidate(event, newProjectSchema);

  return { form };
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
  default: async ({ request, cookies, fetch }) => {
    const formData = await request.formData();
    const form = await superValidate(formData, newProjectSchema);

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
        return setError(form, "Unsupported file type");
      }

      icon = await blobToB64(formDataIcon);
    }

    const projData = {
      icon,
      type: "datapack",
      url: data.url,
      title: data.title,
      description: data.description,
      body: data.body,
      category: data.category.split(","),
      status: "draft"
    };

    const result = await fetch(`${API}/projects/create`, {
      method: "POST",
      body: JSON.stringify(projData),
      headers: {
        Authorization: "Basic " + cookies.get("dph_token")
      }
    });

    if (result.ok) {
      redirect(307, "/project/" + data.url);
    } else {
      return setError(form, await result.text());
    }
  }
};
