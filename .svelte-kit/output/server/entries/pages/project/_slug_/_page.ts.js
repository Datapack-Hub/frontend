import { b as apiURL } from "../../../../chunks/globals.js";
const load = async ({ params }) => {
  const projectReq = await fetch(apiURL + "/projects/get/" + params.slug);
  if (projectReq.ok) {
    return {
      project: await projectReq.json()
    };
  }
  return {};
};
export {
  load
};
