msh-node-common

# Winston config example

```js
const log = logger.winston.create(
  [
    {
      transportType: AVAILABLE_TRANSFORMS.CONSOLE,
      options: { level: 'info' } as WinstonTransportOptions,
    },
    {
      transportType: AVAILABLE_TRANSFORMS.SENTRY,
      options: {
        level: 'error',
        sentry: { dsn: 'https://##########@sentry.io/00000000' },
      } as SentryTransportOptions,
    },
    {
      transportType: AVAILABLE_TRANSFORMS.SLACK,
      options: {
        webhookUrl: 'https://hooks.slack.com/services/####/####/####',
        level: 'info',
      } as SlackTransportOptions,
    },
    {
      transportType: AVAILABLE_TRANSFORMS.LOGSTASH,
      options: {
        application: 'app-name',
        host: '129.168.#.#',
        level: 'info',
        port: 5000,
      } as LogstashTransportOptions,
    },
    {
      transportType: AVAILABLE_TRANSFORMS.ELASTIC_SEARCH,
      options: {
        clientOpts: {
          node: 'http://usr:pas@192.168.#.#:9200',
        },
      },
    },
  ],
  {release: 'v0.0.1', environment: 'dev'}
).child({ sessionId: 'global' });

```
