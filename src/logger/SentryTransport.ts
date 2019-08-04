import { captureException, captureMessage, Severity } from '@sentry/node'
import Transport from 'winston-transport'

export class SentryTransport extends Transport {
  constructor(opts: Transport.TransportStreamOptions) {
    super(opts)
  }

  public log(info: any, callback: () => void): void {
    setImmediate(() => this.emit('logged', info))

    if (info.level.includes('error')) {
      if (info.message.error && info.message.error instanceof Error) {
        captureException(info.message.error)
      } else {
        const error: any = new Error(info.message)
        error.data = info[Symbol.for('message')]
        captureException(error)
      }
    }

    if (info.level.includes('warn')) {
      captureMessage(info.message, Severity.Warning)
    }

    callback()
  }
}
