const fs = require('fs')
const crypto = require('crypto')

const generator = require('./generator.js')
const lsystem = require('./lsystem.js')
// const twitterer = require('./twitterer.js')
// const mentionHandler = require('./mentionHandler.js')
// twitterer.useCreds(JSON.parse(fs.readFileSync('./creds.json')))

const action = function () {
  const system = generator.generate()
  const canvasBuf = lsystem.expand(system, 10)

  if (canvasBuf === null) {
    console.log('path not good enough, retrying...')
    retry()
    return
  }

  const systemString = JSON.stringify(system)
  const hash = crypto.createHash('md5').update(systemString).digest('hex')
  const filename = `${__dirname}/lsystem_result_${hash}.png`
  fs.writeFileSync(filename, canvasBuf)

  // console.log('tweeting:', systemString)

  // twitterer.tweet(systemString, canvasBuf, undefined, function(error, res) {
  //    if(error || (res||{}).statusCode !== 200) {
  //         console.log('error tweeting:', error, (res||{}).body)
  //        retry()
  //    } else {
  //        console.log('tweet success')
  //    }
  // })

  // mentionHandler.handleMentions(twitterer)
}

const retry = function () {
  setTimeout(action, 1)
}

action()
