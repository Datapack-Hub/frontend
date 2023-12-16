import { API } from "$lib/globals/consts";
import { serverGetAuthed } from "$lib/globals/functions";
import { roleSchema, userSchema, type Role } from "$lib/globals/schema";
import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load = (async ({ cookies, fetch, url }) => {
  const cookie = cookies.get("dph_token");

  const roleResponse = await fetch(`${API}/users/roles`);
  const rolesJson = await roleResponse.json();

  const parameters = url.searchParams;

  if (parameters.has("token")) {
    const newToken = parameters.get("token") || "";
    const expiry = new Date();

    expiry.setDate(expiry.getDate() + 30);
    cookies.set("dph_token", newToken, {
      expires: expiry,
      httpOnly: false,
      path: "/"
    });

    redirect(307, url.pathname);
  }

  if (cookie) {
    const userResponse = await serverGetAuthed("/users/me", cookies, fetch);

    if (userResponse.status === 401) {
      cookies.delete("dph_token", { path: "/" });
      redirect(307, url.pathname);
    }
    
    const user = await userSchema.parseAsync(await userResponse.json());
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const role = roleSchema
      .array()
      .parse(rolesJson.roles)
      .find((v: Role) => v.name === user.role);

    return {
      user,
      role,
      roles: rolesJson.roles
    };
  }
  return {
    roles: rolesJson.roles
  };
}) satisfies LayoutServerLoad;
