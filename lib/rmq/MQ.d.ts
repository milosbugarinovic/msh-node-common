import { Channel, Connection, Message, Options, Replies } from 'amqplib';
export declare class MQ {
    private static _conn;
    private static _ch;
    private static _ex;
    private static user;
    private static pass;
    private static host;
    private static vhost;
    private static receiveQueueName;
    private static defaultExchangeName;
    static getConn(): Promise<Connection>;
    static getCh(): Promise<Channel>;
    static getEx(): Promise<Replies.AssertExchange>;
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
    static consume(onMessage: (msg: Message, data?: any) => any, options?: Options.Consume): Promise<Replies.Consume>;
    /**
     * Bind queue to exchange
     * ...bindings
     * mq.receive.bindQueue('parser.html.diff-notifier', [(await mq.getEx).exchange]);
     * ...
     * @param pattern Route path <serviceName>.<action>.<option1>.<option2>
     * @param exchangeSource (optional)
     * @param args (optional)
     */
    static bindQueue(pattern: string, exchangeSource?: string, args?: any): Promise<Replies.Empty>;
    /**
     * Push messages to RMQ
     * use
     * mq.send.publish('action.option1', content);
     *
     * @param routingKey Route key which is automatically prefixed with service name <action>.<option1>.<option2>
     * @param content can be object or buffer
     * @param options
     */
    static publish(routingKey: string, content: Buffer | any, options?: Options.Publish): Promise<boolean>;
    static init(config: any): Promise<void>;
}
