const express = require('express')
const app = express()

app.use('/', express.static('static/'))

app.set('view engine', 'ejs')
const defineRoute = (url, name) => {
  app.get(url, (req, res) => {
    res.render(`pages${url}`, {
      url: req.url,
      page: name
    })
  })
}

defineRoute('/')
defineRoute('/faq', 'FAQ')

const port = parseInt(process.env.PORT) || 8080
app.listen(port)
console.log(`> Listening on port ${port}`)