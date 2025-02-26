import fs from 'node:fs'
import path from 'node:path'
import { kebabCase } from 'lodash-es'
import { LOCALIZATIONS } from './constants'
import { readJson, saveJson, validatePath } from './utils'

class I18nGenerator {
  public properties: Record<string, string> = {}

  constructor() {
    this.properties = {}
  }

  async generate(): Promise<void> {
    const en = await this.getData('data', 'en', true)
    saveJson('en', 'i18n', en)

    await Promise.all(
      Object.keys(LOCALIZATIONS).map(async (locale) => {
        if (locale !== 'en') {
          const data = await this.getData('data', locale, false)
          saveJson(locale, 'i18n', data)
        }
      }),
    )
    this.properties = {}
  }

  async getData(dirPath: string, locale: string, isEnglish: boolean): Promise<any> {
    const result: any = {}
    validatePath(dirPath)

    const items = await fs.promises.readdir(dirPath, { withFileTypes: true })
    await Promise.all(
      items.map(async (item) => {
        const fullPath = path.join(dirPath, item.name)

        if (item.isDirectory()) {
          result[item.name] = await this.getData(fullPath, locale, isEnglish)
        }

        if (item.isFile() && item.name === `${locale}.json`) {
          await this.processFile(fullPath, dirPath, result, isEnglish)
        }
      }),
    )
    return result
  }

  async processFile(fullPath: string, dirPath: string, result: any, isEnglish: boolean): Promise<void> {
    const data = await readJson(fullPath)
    data.forEach((item: { id: string, name: string }) => {
      const key = kebabCase(item.name)

      if (isEnglish) {
        result[key] = item.name
        const arr = [...dirPath.split('/'), key]
        this.properties[item.id] = arr.join('.')
      }
      else {
        const path = this.properties[item.id]
        if (path) {
          const key = path.split('.').pop() ?? ''
          result[key] = item.name
        }
      }
    })
  }
}

const generator = new I18nGenerator()
generator.generate()
