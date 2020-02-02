import { transports } from 'winston';
import { WinstonTransportOptions } from '../../util/customTypings';
declare const consoleTransport: {
    create: (options: WinstonTransportOptions | undefined) => transports.ConsoleTransportInstance;
};
export { consoleTransport };
