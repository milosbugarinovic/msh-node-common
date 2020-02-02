import { Logger } from 'winston';
import { WinstonTransportConfig } from '../util/customTypings';
declare enum AVAILABLE_TRANSFORMS {
    SENTRY = "SENTRY",
    SLACK = "SLACK",
    CONSOLE = "CONSOLE"
}
declare const winston: {
    create: (configs?: WinstonTransportConfig[] | undefined, defaultMeta?: any) => Logger;
};
export { winston, AVAILABLE_TRANSFORMS };
