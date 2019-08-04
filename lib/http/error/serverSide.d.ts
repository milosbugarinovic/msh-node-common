import { ServerSide } from './base';
export declare class InternalServerError extends ServerSide {
    constructor(message?: string);
}
export declare class BadGateway extends ServerSide {
    constructor(message?: string);
}
export declare class ServiceTemporarilyUnavailable extends ServerSide {
    constructor(message?: string);
}
export declare class GatewayTimeOut extends ServerSide {
    constructor(message?: string);
}
