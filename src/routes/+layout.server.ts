import { API } from "$lib/globals/consts";
import { serverFetchAuthed } from "$lib/globals/functions";
import { roleSchema, userSchema, type Role } from "$lib/globals/schema";
import { parallel } from "radash";
import type { LayoutServerLoad } from "./$types";

export const load = (async ({ cookies }) => {
  const cookie = cookies.get("dph_token");

  if (cookie) {
    const [userResponse, roleResponse] = await parallel(
      2,
      await Promise.all([
        serverFetchAuthed("get", "/user/me", cookies),
        fetch(`${API}/user/staff/roles`)
      ]),
      async response => await response.json()
    );

    const user = await userSchema.parseAsync(userResponse);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const role = roleSchema
      .array()
      .parse(roleResponse.roles)
      .find((v: Role) => v.name == user.role)!;

    return {
      user,
      role
    };
  }
  return {}
}) satisfies LayoutServerLoad;
