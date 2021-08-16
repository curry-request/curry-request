import fs from "fs"
import { URL } from "url";
import path from "path";
import marked from "marked"

const url = new URL(import.meta.url)
const pkgDir = path.dirname(url.pathname)

const exampleContentsFolder = path.join(pkgDir, '/docs-src/example-contents')
const content = fs.readdirSync(exampleContentsFolder)
const mdFiles = content.filter(x => x.match(/\.md/))


const htmlFiles= mdFiles.reduce((ac, x) => {
  const file = path.join(pkgDir, '/docs-src/example-contents', x)
  return {...ac, [x]: marked(fs.readFileSync(file, 'utf8'), {breaks: true})}
}, {})

const cachedMdToHtmlFiles = JSON.stringify(htmlFiles)

fs.writeFileSync(path.join(pkgDir, '/docs-src/example-contents/cachedMdToHtmlFiles.json'), cachedMdToHtmlFiles)