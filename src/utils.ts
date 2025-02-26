import fs from 'node:fs'
import path from 'node:path'

export function saveJson(fileName: string, dirPath: string, obj: any): void {
  if (!fs.existsSync(dirPath))
    fs.mkdirSync(dirPath, { recursive: true })

  fs.writeFileSync(`${dirPath}/${fileName}.json`, JSON.stringify(obj, null, 2))
}

export async function readJson(fullPath: string): Promise<any> {
  const content = await fs.promises.readFile(fullPath, 'utf8')
  return JSON.parse(content)
}

export function validatePath(dirPath: string): void {
  const resolvedPath = path.resolve(dirPath)
  if (!resolvedPath.startsWith(path.resolve('data'))) {
    throw new Error('Invalid directory path')
  }
}
