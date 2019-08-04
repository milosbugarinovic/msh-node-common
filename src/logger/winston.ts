import { createLogger, format as wFormat, Logger, transports as wTransforms } from 'winston'
import { UserData } from '../util/customTypings'
import { SentryTransport } from './SentryTransport'

const { combine, timestamp } = wFormat
const winston = {
  /**
   * Create Winston logger with sentry transport
   * Sentry must be registered first
   */
  create: (
    session: { id: string; userData?: UserData } = { id: 'global' },
    consoleLogLevel = 'debug',
    sentryLogLevel = 'error'
  ): Logger => {
    const sessionMetaDataJsonFormatter = logEntry => {
      const base: any = {
        sessionId: session.id,
      }
      if (session.userData) {
        base.userId = session.userData.id
        base.userName = session.userData.name
        base.userTenantId = session.userData.tenantId
        base.userExp = session.userData.exp
        base.userIat = session.userData.iat
      }

      const jsonLogEntry = Object.assign(base, logEntry)
      logEntry[Symbol.for('message')] = JSON.stringify(jsonLogEntry)
      return logEntry
    }

    const transports: any = [
      new wTransforms.Console({
        level: consoleLogLevel,
        format: combine(timestamp(), wFormat(sessionMetaDataJsonFormatter)()),
      }),
      new SentryTransport({ level: sentryLogLevel }),
    ]

    const exceptionHandlers: any = [new wTransforms.Console()]

    return createLogger({
      transports,
      exceptionHandlers,
    })
  },
}
export { winston }
