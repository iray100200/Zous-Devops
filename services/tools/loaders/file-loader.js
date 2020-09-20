import * as fs from 'fs'

export function loadFileSync(path) {
  return fs.readFileSync(path).toString('utf-8')
}