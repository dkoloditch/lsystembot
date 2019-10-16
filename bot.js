const fs = require('fs')
const crypto = require('crypto')

const generator = require('./generator.js')
const lsystem = require('./lsystem.js')

const bot = async function () {
  const system = generator.generate()
  const canvasBuf = lsystem.expand(system, 10)

  if (canvasBuf === null) {
    console.log('path not good enough, retrying...')
    retry()
    return
  }

  const systemString = JSON.stringify(system)
  const hash = crypto.createHash('md5').update(systemString).digest('hex')
  const filePath = __dirname
  const fileName = `/lsystem_result_${hash}.png`
  const fullFilePath = `${filePath}${fileName}`
  await fs.writeFileSync(fullFilePath, canvasBuf)
  return fullFilePath
}

const retry = function () {
  setTimeout(bot, 1)
}

module.exports = bot
