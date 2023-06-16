import { z } from "zod";

export const userSchema = z.object({
  id: z.number(),
  banData: z.optional(
    z.object({
      message: z.string(),
      expires: z.number()
    })
  ),
  banned: z.optional(z.boolean()),
  bio: z.string(),
  profile_icon: z.string(),
  role: z.string(),
  username: z.string()
});

export const projectSchema = z.object({
  ID: z.optional(z.number()),
  author: z.number(),
  body: z.ostring(),
  category: z.ostring(),
  description: z.ostring(),
  icon: z.ostring(),
  mod_message: z.string().nullish(),
  status: z.optional(
    z.enum([
      "unpublished",
      "in_queue",
      "live",
      "draft",
      "disabled",
      "deleted",
      "ghost",
      "publish_queue",
      "review_queue"
    ])
  ),
  title: z.string(),
  type: z.enum(["datapack", "url"]),
  url: z.string(),
  latest_version: z.optional(
    z.object({
      name: z.string(),
      description: z.string(),
      minecraft_versions: z.string(),
      version_code: z.string()
    })
  )
});

export const notificationSchema = z.object({
  id: z.number(),
  description: z.ostring(),
  message: z.string(),
  read: z.boolean(),
  type: z.enum(["announcement", "ban", "warn", "default", "rainbow"])
});

export const roleSchema = z.object({
  name: z.string(),
  color: z.ostring(),
  verified: z.boolean(),
  permissions: z.array(z.string())
});

export const versionSchema = z.object({
  name: z.string(),
  description: z.string(),
  file_name: z.string(),
  minecraft_versions: z.string(),
  primary_download: z.string(),
  resource_pack_download: z.ostring(),
  version_code: z.string()
});

export type User = z.infer<typeof userSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Notif = z.infer<typeof notificationSchema>;
export type Role = z.infer<typeof roleSchema>;
export type Version = z.infer<typeof versionSchema>;
