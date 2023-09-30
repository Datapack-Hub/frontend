import { defineConfig } from 'unlighthouse'
import { config } from 'dotenv'

config()

const token = process.env.UNLIGHTHOUSE_TOKEN
const futureDate = new Date()

futureDate.setDate(futureDate.getDate() + 1)

export default defineConfig({
  // example
  scanner: {
    // throttle: true
  },
  puppeteerClusterOptions: {
    maxConcurrency: 2
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
