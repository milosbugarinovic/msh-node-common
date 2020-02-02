import { format, transports } from 'winston'
import { WinstonTransportOptions } from '../../util/customTypings'

const { combine, timestamp, json } = format

const consoleTransport = {
  create: (options: WinstonTransportOptions | undefined) => {
    options = options || {}
    options.level = options.level || 'info'
    return new transports.Console({
      level: options.level,
      format: combine(timestamp(), json()),
    })
  },
}

export { consoleTransport }
