import type { LocaleType } from './constants.js'
import { LOCALIZATIONS, SCRAPES_PAGES } from './constants.js'
import { Scrape, Scraper } from './scrapers.js'

const scraper = new Scraper()
const scrapes: Scrape[] = []

Object.values(SCRAPES_PAGES).forEach((item) => {
  Object.keys(LOCALIZATIONS).forEach((locale) => {
    scraper.addScrape(new Scrape({
      locale: locale as LocaleType,
      path: item.path,
      scrapingFunction: item.scrapingFunction,
    }))
  })
})

scrapes.forEach((scrape) => {
  scraper.addScrape(scrape)
})

scraper.scrapeAll()
