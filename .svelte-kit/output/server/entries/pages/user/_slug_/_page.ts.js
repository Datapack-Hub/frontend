import { e as error } from "../../../../chunks/index.js";
const load = async ({ params, fetch }) => {
  const [user, projects] = await Promise.all([
    fetch(`https://api.datapackhub.net/user/${params.slug}`),
    fetch(`https://api.datapackhub.net/user/${params.slug}/projects`)
  ]);
  if (user.status == 404) {
    throw error(404, {
      message: "User not found",
      description: "You may have hallucinated their existence"
    });
  }
  if (user.ok && projects.ok) {
    const profileJson = await user.json();
    const projectJson = (await projects.json()).result;
    return {
      profile: profileJson,
      projects: projectJson
    };
  }
  return {};
};
export {
  load
};
