const path = require('path')
const fs = require('fs')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
require('dotenv').config()

const bot = require('./bot')

app.use(express.static(path.join(__dirname, '/')))

app.get('/', async (req, res) => {
  try {
    const token = req.query.token
    if (!token) {
      console.log('Error: Token not present. Auth Header:', token)
      return res.sendStatus(401)
    }

    if (token !== process.env.SECRET_KEY) {
      console.log('Error: Secret key does not match. Key:', token)
      return res.sendStatus(401)
    }

    console.log('Successful request. Processing...')
    const fullFilePath = await bot()
    return await res.download(fullFilePath, error => {
      if (error) {
        console.log('Download error:', error)
      } else {
        fs.unlinkSync(fullFilePath)
      }
    })
  } catch (error) {
    console.log('Server Error:', error)
    return res.send(500)
  }
})

app.listen(port, function () {
  console.log('Example app listening on port ' + port + '!')
})
