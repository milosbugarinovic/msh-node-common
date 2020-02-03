import { format } from 'winston'
import { LogstashTransportOptions } from '../../util/customTypings'
import { LogstashTransport } from 'winston-logstash-ts'

const { combine, timestamp, json } = format

const logstashTransport = {
  create: (options: LogstashTransportOptions) => {
    options = options || {}

    options.level = options.level || 'info'
    options.protocol = options.protocol || 'udp'
    options.format = options.format || combine(timestamp(), json())
    options.host = options.host || 'localhost'
    options.port = options.port || 9600

    return new LogstashTransport(options)
  },
}

export { logstashTransport }
