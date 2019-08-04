import { Express } from 'express';
declare const express: {
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
export { express };
