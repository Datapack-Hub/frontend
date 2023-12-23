import { API } from "$lib/globals/consts";
import { fail } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";
import { z } from "zod";
import type { PageServerLoad } from "./$types";

const newProjectSchema = z.object({
  icon: z.ostring(),
  url: z
    .string()
    .regex(/^[a-z]+(-[a-z]+)*$/)
    .max(35),
  title: z.string().max(35),
  description: z.string().min(3).max(100),
  body: z.string().min(100).max(10_000),
  category: z.string()
});

export const load = (async event => {
  const form = await superValidate(event, newProjectSchema);

  return { form };
}) satisfies PageServerLoad;

export const actions = {
  default: async ({ request, cookies, fetch }) => {
    const form = await superValidate(request, newProjectSchema);
    console.log("POST", form);

    if (!form.valid) {
      return fail(400, { form });
    }

    const data = form.data;

    const projData = {
      icon: data.icon,
      type: "datapack",
      url: data.url,
      title: data.title,
      description: data.description,
      body: data.body,
      category: data.category.split(", ").slice(0, 2),
      status: "draft"
    };

    const result = await fetch(`${API}/projects/create`, {
      method: "POST",
      body: JSON.stringify(projData),
      headers: {
        Authorization: "Basic " + cookies.get("dph_token")
      }
    });

    return { form };
  }
};
