const ejs = require('ejs')
const fs = require('fs-extra')

const staticDir = 'static/'
const pagesDir = 'views/pages/'
const outDir = '.out/'

const pages = [
  // Path, canonical, name
  [ '/index', '/'           ],
  [ '/faq',   '/faq', 'FAQ' ]
]

console.log('> Cleaning up...')
fs.emptyDirSync(outDir)

console.log('> Copying static files...')
fs.copySync(staticDir, outDir)

console.log('> Building pages...')
for (let page of pages) {
  const inPath = `${pagesDir}/${page[0]}.ejs`
  const outPath = `${outDir}/${page[0]}.html`

  const raw = fs.readFileSync(inPath).toString()
  const rendered = ejs.render(raw, {
    canonical: page[1],
    name: page[2]
  }, { filename: inPath })

  fs.ensureFileSync(outPath)
  fs.writeFileSync(outPath, rendered)
}

console.log('> Build completed!')