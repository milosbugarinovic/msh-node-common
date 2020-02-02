import Sentry from 'winston-transport-sentry-node'
import { SentryTransportOptions } from '../../util/customTypings'

const os = require('os')

const sentryTransport = {
  create: (options: SentryTransportOptions | undefined, defaultMega: any = {}) => {
    options = options || {}
    options.level = options.level || 'error'

    options.sentry = options.sentry || {}
    if (!options.sentry.dsn) throw new Error('Sentry requires dsn')

    options.sentry.serverName = options.sentry.serverName || os.hostname()
    options.sentry.environment = options.sentry.environment || defaultMega.environment
    options.sentry.release = options.sentry.release || defaultMega.release

    return new Sentry(options)
  },
}

export { sentryTransport }
