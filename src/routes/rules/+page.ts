import { browser } from "$app/environment";
import { apiURL } from "$globals";

export const load = async ({ fetch }) => {
  if (browser) {
    const unread = await fetch(`${apiURL}/rules`);
    if (unread.ok) {
      return {
        rules: await unread.text(),
      };
    } else {
      alert("hi is error");
    }
  }
};
