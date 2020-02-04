import { LogstashTransportOptions } from '../../util/customTypings';
import { LogstashTransport } from 'winston-logstash-ts';
declare const logstashTransport: {
    create: (options: LogstashTransportOptions) => LogstashTransport;
};
export { logstashTransport };
