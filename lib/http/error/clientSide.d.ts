import { ClientSide } from './base';
export declare class BadRequest extends ClientSide {
    constructor(message?: string);
}
export declare class Unauthorized extends ClientSide {
    constructor(message?: string);
}
export declare class Forbidden extends ClientSide {
    constructor(message?: string);
}
export declare class NotFound extends ClientSide {
    constructor(message?: string);
}
export declare class RequestTimeOut extends ClientSide {
    constructor(message?: string);
}
export declare class Conflict extends ClientSide {
    constructor(message?: string);
}
export declare class PreconditionFailed extends ClientSide {
    constructor(message?: string);
}
