import {format} from 'date-fns'
import {v4 as uuidv4} from 'uuid';
import fs, {promises as fsPromises} from 'fs'
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const logEventsAsync = async (message, logFileName = 'defaultFileLogs') => {
    if (process.env.DISABLE_LOGS === 'true') {
        return
    }
    const dateTime = format(new Date(), 'yyyy-MM-dd HH:mm:ss')
    const logItem = `${dateTime}\t${uuidv4()}\t->\t${message}\t\n`

    try {
        const directoryPath = path.join(__dirname, '..', 'logs')
        if (!fs.existsSync(directoryPath)) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
        }
        const filePath = path.join(directoryPath, logFileName)
        if (!fs.existsSync(filePath)) {
            const logItemHeader = `DATE\tID\t->\tMESSAGE\n`
            await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFileName), logItemHeader)
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFileName), logItem)
    } catch (err) {
        console.error(err)
    }
}
export const logEvents = (message, logFileName = 'defaultFileLogs') => {
    logEventsAsync(message, logFileName).then()
}
export const logger = async (req, res, next) => {
    const urlReq = `${req.method}\t${req.url}\tOrigin: ${req.headers.origin}`
    await logEventsAsync(urlReq)
    next()
}