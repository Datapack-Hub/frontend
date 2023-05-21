const userCache = new Map<string | number, User>();

export function userExistsInCache(key: string | number): boolean {
  return userCache.has(key);
}

export function getUserFromCache(key: string | number): User {
  if (!userExistsInCache(key)) throw TypeError("Can not get null user");
  return (
    userCache.get(key) ?? {
      id: -1,
      bio: "",
      username: "",
      role: "default",
      profile_icon: "what",
      banned: false
    } // if this ever gets returned shoot me
  );
}
