// https://github.com/perisdevs/kiranico-scraper
import type { LocaleType } from './constants'
import jsdom from 'jsdom'
import { saveJson } from './utils'

const { JSDOM } = jsdom

export async function scrapeResponseForMonsters(html: string, locale: LocaleType): Promise<void> {
  const { document } = (new JSDOM(html)).window
  const elements = Array.from(document.getElementsByClassName('group relative p-4 border-r border-b border-gray-200 dark:border-gray-800 sm:p-6'))
  const datasource: unknown[] = []
  elements.forEach((el) => {
    const tag = el.querySelector('.mt-3.flex.flex-col.items-center')
    if (tag) {
      tag.remove()
    }
    const img = el.querySelector('img')?.getAttribute('src') ?? ''
    const id = img?.split('/').pop()?.split('.')[0] ?? ''
    const name = el.textContent?.trim() ?? ''
    const link = el.querySelector('a')?.getAttribute('href') ?? ''
    datasource.push({
      img,
      id,
      name,
      link,
    })
  })
  saveJson(locale, 'data/monsters', datasource)
}

export async function scrapeResponseForItems(html: string, locale: LocaleType, name: string): Promise<void> {
  const { document } = (new JSDOM(html)).window
  const elements = Array.from(document.getElementsByClassName('flex items-center border-r border-b border-gray-200 dark:border-gray-800 p-2 sm:p-1'))
  const datasource: unknown[] = []
  elements.forEach((el) => {
    const img = el.querySelector('img')?.getAttribute('src') ?? ''
    const id = img?.split('/').pop()?.split('.')[0] ?? ''
    const name = el.getElementsByClassName('text-sm font-medium text-sky-500 dark:text-sky-400 group-hover:text-sky-900 dark:group-hover:text-sky-300')[0]?.textContent?.trim() ?? ''
    const link = el.querySelector('a')?.getAttribute('href') ?? ''
    datasource.push({
      img,
      id,
      name,
      link,
    })
  })
  saveJson(locale, `data/items/${name}`, datasource)
}

export async function scrapeResponseForSkills(html: string, locale: LocaleType): Promise<void> {
  const { document } = (new JSDOM(html)).window
  const elements = Array.from(document.querySelectorAll('tr'))
  const datasource: unknown[] = []
  elements.forEach((el) => {
    const td = el.querySelector('td')
    const href = td?.querySelector('a')?.getAttribute('href') ?? ''
    const id = href?.split('/').pop() ?? ''
    const name = td?.getElementsByClassName('text-sm font-medium text-sky-500 dark:text-sky-400 group-hover:text-sky-900 dark:group-hover:text-sky-300')[0]?.textContent?.trim() ?? ''
    datasource.push({
      id,
      name,
      link: href,
    })
  })
  saveJson(locale, 'data/skills', datasource)
}
