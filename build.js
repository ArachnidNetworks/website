const { createSitemap } = require('sitemap')
const ejs = require('ejs')
const fs = require('fs-extra')

const staticDir = 'static/'
const pagesDir = 'views/pages/'
const outDir = '.out/'

const pages = [
  // Path, canonical, priority, name
  [ '/index', '/',    1          ],
  [ '/faq',   '/faq', 0.5, 'FAQ' ]
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
    name: page[3]
  }, { filename: inPath })

  fs.ensureFileSync(outPath)
  fs.writeFileSync(outPath, rendered)
}

console.log('> Generating sitemap...')
const sitemap = createSitemap({
  hostname: 'https://arachnid.cc',
  cacheTime: 600000,
  urls: pages.map((page) => ({
    url: page[1],
    priority: page[2],
    changeFreq: 'daily',
    lastmodfile: `${pagesDir}/${page[0]}.ejs`
  }))
})
const xml = sitemap.toXML()
fs.writeFileSync(`${outDir}/sitemap.xml`, xml)

console.log('> Build completed!')