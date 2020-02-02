import { SlackTransportOptions } from '../../util/customTypings';
declare const slackTransport: {
    create: (options: SlackTransportOptions | undefined) => any;
};
export { slackTransport };
