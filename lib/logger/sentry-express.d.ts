import { Express } from 'express';
interface SentryConfig {
    dsn: string;
    environment: string;
    defaultIntegrations: any[];
    release: string;
}
declare const sentryExpress: {
    init: (options: SentryConfig) => void;
    /**
     * Setup express requestHandler
     * Call before any route is called
     * @param app
     */
    requestHandler: (app: Express) => void;
    /**
     * Setup express errorHandler
     * Call after all routes are already setup
     * @param app
     */
    errorHandler: (app: Express) => void;
};
export { sentryExpress };
