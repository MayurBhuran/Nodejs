const fs = require('fs')
const os =require('os')

const EventEmiiter = require('events')

class Looger extends EventEmiiter{
    log(message){
        this.emit('message',{message}) 
    } 
  }

const logger = new Looger ()
const logFile = './eventlog.txt'

const logToFile = (event) => {
    const logMessage = `${new Date().toISOString()} - ${event.message} \n}`
    fs.appendFileSync(logFile, logMessage) 
}

logger.on('message', logToFile)

setInterval(() => {
  const memoryUsage = (os.freemem()/ os.totalmem()) * 100
  logger.log(`current memory usage: ${memoryUsage.toFixed(2)}`)

},3000)

logger.log('Application started')
logger.log("Application event occurred")