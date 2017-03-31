const express = require('express')
const compression = require('compression')
const path = require('path')
const app = express()
const opn = require('opn')

app.use(compression());

app.use(express.static(path.join(__dirname, '../dist')))

app.listen(3000, () => {
  console.log(`App listening at port: 3000`)
  opn('http://localhost:3000')
})
