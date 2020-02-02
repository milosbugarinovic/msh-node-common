import SlackHook from 'winston-slack-webhook-transport'
import { SlackTransportOptions } from '../../util/customTypings'

const slackTransport = {
  create: (options: SlackTransportOptions | undefined) => {
    options = options || {}
    options.level = options.level || 'info'
    if (!options.webhookUrl) throw new Error('Slack webhook url is required')

    return new SlackHook(options)
  },
}

export { slackTransport }
