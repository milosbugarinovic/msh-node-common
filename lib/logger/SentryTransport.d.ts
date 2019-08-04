import Transport from 'winston-transport';
export declare class SentryTransport extends Transport {
    constructor(opts: Transport.TransportStreamOptions);
    log(info: any, callback: () => void): void;
}
