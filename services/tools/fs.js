import * as fs from 'fs'
import * as path from 'path'

export function visitFolders(dir, callback) {
  fs.readdirSync(dir).forEach((file) => {
    var pathname = path.join(dir, file)
    if(fs.statSync(pathname).isDirectory()) {
      callback(pathname, file)
    }
  })
}

export function visitFiles(dir, callback) {
  fs.readdirSync(dir).forEach((file) => {
    var pathname = path.join(dir, file)
    if(!fs.statSync(pathname).isDirectory()) {
      callback(pathname, file)
    }
  })
}