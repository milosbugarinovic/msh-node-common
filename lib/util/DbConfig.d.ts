import { EnvHelper } from './EnvHelper';
export declare class DbConfig {
    constructor(envHelper: EnvHelper);
    readonly host: string;
    readonly name: string;
    readonly port: string;
    readonly user: string;
    readonly pass: string;
    readonly option: any;
    conn(): string;
}
