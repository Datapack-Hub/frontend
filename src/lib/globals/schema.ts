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

export const versionSchema = z.object({
  name: z.string().max(50, { message: "Version name too long"}),
  description: z.string().max(1e6, { message: "Version description too long (somehow?)"}),
  minecraft_versions: z.string(),
  primary_download: z.string(),
  resource_pack_download: z.ostring(),
  version_code: z.string().max(15, { message: "Version code too long"})
});

export const projectSchema = z.object({
  ID: z.number(),
  author: z.object(userSchema.shape),
  body: z.string().max(1e4, { message: "Body too long"}),
  category: z.optional(z.array(z.string())),
  dependencies: z.array(z.string()).nullish(),
  description: z.string().max(200, { message: "Description too long"}),
  downloads: z.number(),
  icon: z.string().url().nullish(),
  latest_version: z.optional(versionSchema.omit({ primary_download: true, resource_pack_download: true})),
  licence: z.string().nullish(),
  mod_message: z.string().nullish(),
  status: z.enum([
    "unpublished",
    "live",
    "draft",
    "disabled",
    "deleted",
    "publish_queue",
    "review_queue"
  ]),
  title: z.string().max(35),
  type: z.enum(["datapack"]),
  updated: z.number().nonnegative(),
  url: z.string().regex(/[a-z-]+/)
});

export const notificationSchema = z.object({
  id: z.number().nonnegative(),
  description: z.ostring(),
  message: z.string().max(200, { message: "Notification message too long"}),
  read: z.number().nonnegative(),
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
    .regex(/#([a-f]|[A-F]|\d){3,6}/, {
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


export const reportSchema = z.object({
  id: z.number().nonnegative(),
  message: z.string().max(500, { message: "Report too long"}),
  project: z.object(projectSchema.shape),
  reporter: z.object(userSchema.shape)
});

export const commentSchema = z.object({
  id: z.number().nonnegative(),
  author: z.object(userSchema.shape),
  message: z.string(),
  sent: z.number().nonnegative(),
  replies: z.array(
    z.object({
      id: z.number().nonnegative(),
      message: z.string(),
      author: z.object(userSchema.shape),
      sent: z.number().nonnegative()
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
