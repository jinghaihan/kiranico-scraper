import { scrapeResponseForItems, scrapeResponseForMonsters, scrapeResponseForSkills } from './scraping-function'

export const HOST_NAME = 'mhrise.kiranico.com'

export const LOCALIZATIONS = {
  'zh': '简体中文',
  'zh-Hant': '繁體中文',
  'ja': '日本語',
  'en': 'English',
}

export const SCRAPES_PAGES: Record<string, { path: string, scrapingFunction: ScrapingFunctionType }> = {
  MONSTERS_PAGE: {
    path: `data/monsters?view=lg`,
    scrapingFunction: scrapeResponseForMonsters,
  },
  ITEMS_CONSUME_PAGE: {
    path: `data/items?view=consume`,
    scrapingFunction: (html: string, locale: LocaleType) => scrapeResponseForItems(html, locale, 'consume'),
  },
  ITEMS_MATERIAL_PAGE: {
    path: `data/items?view=material`,
    scrapingFunction: (html: string, locale: LocaleType) => scrapeResponseForItems(html, locale, 'material'),
  },
  ITEMS_SCRAP_PAGE: {
    path: `data/items?view=scrap`,
    scrapingFunction: (html: string, locale: LocaleType) => scrapeResponseForItems(html, locale, 'scrap'),
  },
  ITEMS_AMMO_PAGE: {
    path: `data/items?view=ammo`,
    scrapingFunction: (html: string, locale: LocaleType) => scrapeResponseForItems(html, locale, 'ammo'),
  },
  ITEMS_ACCOUNT_PAGE: {
    path: `data/items?view=account`,
    scrapingFunction: (html: string, locale: LocaleType) => scrapeResponseForItems(html, locale, 'account'),
  },
  ITEMS_ANTIQUE_PAGE: {
    path: `data/items?view=antique`,
    scrapingFunction: (html: string, locale: LocaleType) => scrapeResponseForItems(html, locale, 'antique'),
  },
  SKILLS_PAGE: {
    path: `data/skills`,
    scrapingFunction: scrapeResponseForSkills,
  },
}

export type LocaleType = keyof typeof LOCALIZATIONS

export type ScrapingFunctionType = (html: string, locale: LocaleType) => Promise<void>

export interface ScrapeProps {
  locale: LocaleType
  path: string
  scrapingFunction: ScrapingFunctionType
}
