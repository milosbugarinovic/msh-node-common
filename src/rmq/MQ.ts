import { Channel, connect, Connection, ConsumeMessage, Message, Options, Replies } from 'amqplib'

export class MQ {
  private static _conn: Connection | null
  private static _ch: Channel | null
  private static _ex: Replies.AssertExchange | null
  private static user: string
  private static pass: string
  private static host: string
  private static vhost: string
  private static receiveQueueName: string
  private static defaultExchangeName: string

  public static async getConn(): Promise<Connection> {
    if (!MQ._conn) {
      MQ._conn = await connect(
        `amqp://${encodeURIComponent(MQ.user)}:${encodeURIComponent(MQ.pass)}@${MQ.host}/${MQ.vhost}`
      )
      MQ._conn.on('close', () => (MQ._conn = null))
    }
    return MQ._conn!
  }

  public static async getCh(): Promise<Channel> {
    if (!MQ._ch) {
      const conn = await MQ.getConn()
      MQ._ch = await conn.createChannel()
      MQ._ch!.on('close', () => (MQ._ch = null))
    }
    return MQ._ch!
  }

  public static async getEx(): Promise<Replies.AssertExchange> {
    if (!MQ._ex) {
      const ch = await MQ.getCh()
      MQ._ex = await ch.assertExchange(MQ.defaultExchangeName, 'topic', { durable: true })
    }
    return MQ._ex
  }

  /**
   * Consume message received to the queue assigned to this service
   * use
   * mq.consume( async (msg, data) => {
   *  ...
   *  (await mq.getCh).ack(msg);
   * });
   * @param onMessage(msg, data?) contains original message and data if it could be parsed to JSON
   * @param options
   */
  public static async consume(
    onMessage: (msg: Message, data?: any) => any,
    options?: Options.Consume
  ): Promise<Replies.Consume> {
    return await (await MQ.getCh()).consume(
      MQ.receiveQueueName,
      (msg: ConsumeMessage | null) => {
        let data: any
        try {
          data = JSON.parse(msg!.content.toString())
        } catch (err) {
          global.logger.error(`RMQ message could not be parsed to json object: ${err}`)
        }
        onMessage(msg!, data)
      },
      options
    )
  }

  /**
   * Bind queue to exchange
   * ...bindings
   * mq.receive.bindQueue('parser.html.diff-notifier', [(await mq.getEx).exchange]);
   * ...
   * @param pattern Route path <serviceName>.<action>.<option1>.<option2>
   * @param exchangeSource (optional)
   * @param args (optional)
   */
  public static async bindQueue(pattern: string, exchangeSource?: string, args?: any): Promise<Replies.Empty> {
    exchangeSource = exchangeSource || (await MQ.getEx()).exchange
    return await (await MQ.getCh()).bindQueue(MQ.receiveQueueName, exchangeSource, pattern, args)
  }

  /**
   * Push messages to RMQ
   * use
   * mq.send.publish('action.option1', content);
   *
   * @param routingKey Route key which is automatically prefixed with service name <action>.<option1>.<option2>
   * @param content can be object or buffer
   * @param options
   */
  public static async publish(routingKey: string, content: Buffer | any, options?: Options.Publish): Promise<boolean> {
    if (!Buffer.isBuffer(content)) content = new Buffer(JSON.stringify(content))
    return (await MQ.getCh()).publish(
      (await MQ.getEx()).exchange,
      `${global.projectName.toLowerCase()}.${routingKey}`,
      content,
      options
    )
  }

  public static async init(config: any): Promise<void> {
    MQ.user = config.rabbitMqUser
    MQ.pass = config.rabbitMqPass
    MQ.host = config.rabbitMqHost
    MQ.vhost = config.rabbitMqVhost
    MQ.receiveQueueName = config.receiveQueueName
    MQ.defaultExchangeName = config.defaultExchangeName

    // TODO get connection, on error set timeout and try again
    await MQ.getEx()
    const ch = await MQ.getCh()
    await ch.assertQueue(MQ.receiveQueueName)
    await ch.prefetch(1)
  }
}
