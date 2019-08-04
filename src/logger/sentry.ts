import * as SentryNode from '@sentry/node'

interface SentryConfig {
  dsn: string
  environment: string
  defaultIntegrations: any[]
}

const sentry = {
  init: (options: SentryConfig): void => {
    return SentryNode.init(options)
  },
}

export { sentry, SentryConfig }
