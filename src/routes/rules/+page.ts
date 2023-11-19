import type { PageLoad } from "./$types";

export const load = (async ({ fetch }) => {
  const response = await fetch(
    "https://gist.githubusercontent.com/Silabear/aa806fc89430c56c8c0bef107e4fc898/raw/86f70bb7725b9f073777b969bf8d8b14186173b9/dh-rules.md",
  );
  if (response.ok) {
    return {
      rules: await response.text(),
    };
  }

  return {
    rules: "Failed to load rules",
  };
}) satisfies PageLoad;
