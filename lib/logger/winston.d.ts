import { Logger } from 'winston';
import { UserData } from '../util/customTypings';
declare const winston: {
    /**
     * Create Winston logger with sentry transport
     * Sentry must be registered first
     */
    create: (session?: {
        id: string;
        userData?: UserData | undefined;
    }, consoleLogLevel?: string, sentryLogLevel?: string) => Logger;
};
export { winston };
