const ejs = require('ejs')
const fs = require('fs-extra')

const staticDir = 'static/'
const pagesDir = 'views/pages/'
const outDir = '.out/'

const pages = [
  [ '/index.ejs', '/'           ],
  [ '/faq.ejs',   '/faq', 'FAQ' ]
]

console.log('> Cleaning up...')
fs.emptyDirSync(outDir)

console.log('> Copying static files...')
fs.copySync(staticDir, outDir)

console.log('> Building pages...')
for (let page of pages) {
  const path = `${pagesDir}${page[0]}`
  const raw = fs.readFileSync(path).toString()

  const rendered = ejs.render(raw, {
    url: page[1],
    page: page[2]
  }, { filename: path })
  fs.ensureFileSync(`${outDir}/${page[1]}.html`)
  fs.writeFileSync(`${outDir}/${page[1]}.html`, rendered)
}

console.log('> Build completed!')