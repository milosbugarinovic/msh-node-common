import Sentry from 'winston-transport-sentry-node';
import { SentryTransportOptions } from '../../util/customTypings';
declare const sentryTransport: {
    create: (options: SentryTransportOptions | undefined, defaultMega?: any) => Sentry;
};
export { sentryTransport };
