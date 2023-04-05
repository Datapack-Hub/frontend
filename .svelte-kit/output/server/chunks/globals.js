import { w as writable } from "./index.js";
const isDark = writable(true);
const isAuthenticated = writable(false);
const userData = writable({ id: -1, username: "", bio: "", profile_icon: "", role: "default" });
const apiURL = "https://api.datapackhub.net";
export {
  isAuthenticated as a,
  apiURL as b,
  isDark as i,
  userData as u
};
