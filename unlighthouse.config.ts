import { defineConfig } from 'unlighthouse'
import { config } from 'dotenv'

config()

const token = process.env.UNLIGHTHOUSE_DPH_TOKEN
const futureDate = new Date()

futureDate.setTime(futureDate.getTime() + (24*60*60*1000))

export default defineConfig({
  // example
  scanner: {
    throttle: true
  },
  site: 'datapackhub.net',
  urls: [ //TODO: Add a sitemap.xml
    '/staff',
    '/rules',
    '/user/silabear',
    '/project/taglib',
    '/projects',
    '/notifications',
    '/moderation',
    '/moderation/console',
    '/jam',
    '/privacy',
    '/settings',
    '/install',
    '/login',
    '/'
  ],
  cookies: [{
    name: "dph_token",
    value: token ?? "",
    domain: "datapackhub.net",
    path: "/",
  }],
  outputPath: './lighthouse',
})
