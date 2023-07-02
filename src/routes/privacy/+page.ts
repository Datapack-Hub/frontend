import type { PageLoad } from "./$types";

export const load = (async ({ fetch }) => {
  const res = await fetch(
    "https://gist.githubusercontent.com/Silabear/2fae770ffd59b563668f68dafaa90b82/raw/d9d1ed01a772d4906495982fc6cfc707b93adf6b/policy.md"
  );
  if (res.ok)
    return {
      policy: await res.text()
    };
  return {
    policy: "Failed to load policy"
  };
}) satisfies PageLoad;
