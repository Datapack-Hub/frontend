import { defineConfig } from 'unlighthouse'
import { config } from 'dotenv'

config()

const token = process.env.UNLIGHTHOUSE_DPH_TOKEN
const futureDate = new Date()

futureDate.setTime(futureDate.getTime() + (24*60*60*1000))

export default defineConfig({
  // example
  site: 'datapackhub.net',
  scanner: { exclude: ['/moderation/*'] },
  urls: [ //TODO: Add a sitemap.xml so i dont have to do this
    '/staff',
    '/rules',
    '/user/hoodierocks',
    '/project/realistic-dropped-items',
    '/'
  ],
  debug: true,
  hooks: {
    "puppeteer:before-goto": async(page) => {
      await page.setCookie({
        name: "dph_token",
        value: token ?? "",
        expires: futureDate.getTime(),
        secure: true,
        domain: "datapackhub.net",
        path: "/"
      });
    }
  },
  outputPath: './lighthouse'
})
