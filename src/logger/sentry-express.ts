import * as Sentry from '@sentry/node'
import { ErrorRequestHandler, Express, RequestHandler } from 'express'
import { HttpError } from '../http/error/base'

interface SentryConfig {
  dsn: string
  environment: string
  defaultIntegrations: any[]
  release: string
}

const sentryExpress = {
  init: (options: SentryConfig): void => {
    return Sentry.init(options)
  },
  /**
   * Setup express requestHandler
   * Call before any route is called
   * @param app
   */
  requestHandler: (app: Express): void => {
    app.use(Sentry.Handlers.requestHandler() as RequestHandler)
  },

  /**
   * Setup express errorHandler
   * Call after all routes are already setup
   * @param app
   */
  errorHandler: (app: Express): void => {
    app.use(Sentry.Handlers.errorHandler() as ErrorRequestHandler)
    app.use((err: any, req: any, res: any) => {
      res.statusCode = (err instanceof HttpError ? (err as HttpError).status : null) || 500
      res.end(err.message + (res.sentry ? `\n${res.sentry}\n` : ''))
    })
  },
}
export { sentryExpress }
