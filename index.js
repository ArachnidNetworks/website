const express = require('express')
const app = express()

app.use('/', express.static('static/'))

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('pages/index', {
    url: req.url
  })
})

app.get('/faq', (req, res) => {
  res.render('pages/faq', {
    page: 'FAQ',
    url: req.url
  })
})

const port = parseInt(process.env.PORT) || 8080
app.listen(port)
console.log(`> Listening on port ${port}`)