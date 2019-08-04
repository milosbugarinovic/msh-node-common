interface SentryConfig {
    dsn: string;
    environment: string;
    defaultIntegrations: any[];
}
declare const sentry: {
    init: (options: SentryConfig) => void;
};
export { sentry, SentryConfig };
