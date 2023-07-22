import { z } from "zod";

export const userSchema = z.object({
  id: z.number(),
  banData: z.optional(
    z.object({
      message: z.string(),
      expires: z.number()
    })
  ),
  banned: z.oboolean(),
  bio: z.string().max(500, {
    message: "Bio too long"
  }),
  profile_icon: z.string().url(),
  role: z.enum([
    "admin",
    "moderator",
    "helper",
    "verified",
    "nerd",
    "donator",
    "default"
  ]),
  username: z.string().max(32, {
    message: "Username too long"
  }),
  badges: z.array(z.string()).nullish()
});

export const projectSchema = z.object({
  ID: z.onumber(),
  author: z.object(userSchema.shape),
  body: z.ostring(),
  category: z.optional(z.array(z.string())),
  description: z.ostring(),
  icon: z.string().url().nullish(),
  mod_message: z.string().nullish(),
  status: z.optional(
    z.enum([
      "unpublished",
      "live",
      "draft",
      "disabled",
      "deleted",
      "publish_queue",
      "review_queue"
    ])
  ),
  title: z.string(),
  type: z.enum(["datapack"]),
  url: z.string(),
  latest_version: z.optional(
    z.object({
      name: z.string(),
      description: z.ostring(),
      minecraft_versions: z.string(),
      version_code: z.string()
    })
  ),
  downloads: z.onumber(),
  updated: z.onumber()
});

export const notificationSchema = z.object({
  id: z.number(),
  description: z.ostring(),
  message: z.string(),
  read: z.number(),
  type: z.enum([
    "announcement",
    "ban",
    "warn",
    "default",
    "important",
    "rainbow"
  ])
});

export const roleSchema = z.object({
  name: z.string(),
  color: z
    .string()
    .regex(/#([a-f]|[A-F]|[0-9]){3,6}/, {
      message: "Not a valid colour"
    })
    .nullish(),
  verified: z.boolean(),
  permissions: z.array(
    z.enum([
      "BAN_USER",
      "WARN_USER",
      "EDIT_USER",
      "DELETE_CONTENT",
      "USE_CONSOLE"
    ])
  )
});

export const versionSchema = z.object({
  name: z.string(),
  description: z.string(),
  minecraft_versions: z.string(),
  primary_download: z.string(),
  resource_pack_download: z.ostring(),
  version_code: z.string()
});

export const reportSchema = z.object({
  id: z.number(),
  message: z.string(),
  project: z.object(projectSchema.shape),
  reporter: z.object(userSchema.shape)
});

export const commentSchema = z.object({
  id: z.number(),
  author: z.object(userSchema.shape),
  message: z.string(),
  sent: z.number(),
  replies: z.array(
    z.object({
      id: z.number(),
      message: z.string(),
      author: z.object(userSchema.shape),
      sent: z.number()
    })
  )
});

export type User = z.infer<typeof userSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Notif = z.infer<typeof notificationSchema>;
export type Role = z.infer<typeof roleSchema>;
export type Version = z.infer<typeof versionSchema>;
export type Report = z.infer<typeof reportSchema>;
export type DPHComment = z.infer<typeof commentSchema>;
