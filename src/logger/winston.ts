import { createLogger, Logger } from 'winston'
import { consoleTransport } from './transport/console'
import { sentryTransport } from './transport/sentry'
import { slackTransport } from './transport/slack'
import {
  ElasticSearchTransportOptions,
  LogstashTransportOptions,
  SlackTransportOptions,
  WinstonTransportConfig,
} from '../util/customTypings'
import { logstashTransport } from './transport/logstash'
import { elasticSearchTransport } from './transport/elsaticsearch'

enum AVAILABLE_TRANSFORMS {
  SENTRY = 'SENTRY',
  SLACK = 'SLACK',
  CONSOLE = 'CONSOLE',
  LOGSTASH = 'LOGSTASH',
  ELASTIC_SEARCH= 'ELASTIC_SEARCH',
}

const winston = {
  create: (configs?: WinstonTransportConfig[], defaultMeta: any = {}): Logger => {
    const transports: any = []
    const exceptionHandlers: any = []
    configs = configs || []

    for (const trType of Object.keys(AVAILABLE_TRANSFORMS)) {
      const cfg = configs.find(o => o.transportType === trType)
      if (!cfg) continue

      let newTransform
      switch (cfg.transportType) {
        case AVAILABLE_TRANSFORMS.SENTRY:
          newTransform = sentryTransport.create(cfg.options, defaultMeta)
          break
        case AVAILABLE_TRANSFORMS.SLACK:
          newTransform = slackTransport.create(cfg.options as SlackTransportOptions)
          break
        case AVAILABLE_TRANSFORMS.LOGSTASH:
          newTransform = logstashTransport.create(cfg.options as LogstashTransportOptions)
          break
        case AVAILABLE_TRANSFORMS.ELASTIC_SEARCH:
          newTransform = elasticSearchTransport.create(cfg.options as ElasticSearchTransportOptions)
          break
        case AVAILABLE_TRANSFORMS.CONSOLE:
          newTransform = consoleTransport.create(cfg.options)
          exceptionHandlers.push(newTransform)
          break
        default:
          continue
      }
      transports.push(newTransform)
    }

    return createLogger({
      transports,
      exceptionHandlers,
      defaultMeta,
    })
  },
}
export { winston, AVAILABLE_TRANSFORMS}
