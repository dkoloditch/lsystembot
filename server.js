const path = require('path')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
require('dotenv').config()

app.use(express.static(path.join(__dirname, '/')))

app.get('/', (req, res) => {
  const authHeader = req.headers.authorization
  const bearerPresent = new RegExp(/Bearer \w*/).test(authHeader)
  if (!bearerPresent) {
    console.log('Error: Bearer not present. Auth Header:', authHeader)
    return res.sendStatus(401)
  }

  const token = authHeader.replace('Bearer ', '')
  if (token !== process.env.SECRET_KEY) {
    console.log('Error: Secret key does not match. Key:', token)
    return res.sendStatus(401)
  }

  // do the thing
  console.log('Successful request. Processing...')
  res.sendStatus(200)
})

app.listen(port, function () {
  console.log('Example app listening on port ' + port + '!')
})
