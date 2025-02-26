import type { LocaleType, ScrapeProps, ScrapingFunctionType } from './constants'
import { HOST_NAME } from './constants'

async function request(locale: LocaleType, path: string): Promise<string> {
  const url = `https://${HOST_NAME}/${locale}/${path}`
  // eslint-disable-next-line no-console
  console.log('Beginning scrape:', url)
  return await fetch(url).then(res => res.text())
}

export class Scrape {
  public locale: LocaleType
  public path: string
  public scrapingFunction: ScrapingFunctionType

  constructor(props: ScrapeProps) {
    this.locale = props.locale
    this.path = props.path
    this.scrapingFunction = props.scrapingFunction
  }

  async scrape(): Promise<void> {
    const response = await request(this.locale, this.path)
    await this.scrapingFunction(response, this.locale)
  }
}

export class Scraper {
  public scrapes: Scrape[]

  constructor() {
    this.scrapes = []
  }

  addScrape(scrape: Scrape): void {
    this.scrapes.push(scrape)
  }

  scrapeAll(): void {
    const interval = setInterval(() => {
      this.scrapes[0].scrape()
      this.scrapes.shift()
      if (this.scrapes[0] === undefined)
        clearInterval(interval)
    }, 1000)
  }
}
