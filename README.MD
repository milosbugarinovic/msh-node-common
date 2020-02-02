msh-node-common


# Winston config example

```js
const log = logger.winston.create(
  [
    {transportType: 'CONSOLE', options: {level: 'debug'}},
    {
      transportType: 'SENTRY',
      options: {
        level: 'error',
        sentry: {dsn: 'https://##########@sentry.io/00000000'}
      }
    },
    {
      transportType:'SLACK',
      options: {
        webhookUrl:'https://hooks.slack.com/services/####/####/####'
      }
    }
  ],
  {release: 'v0.0.1', environment: 'dev'}
);

```
