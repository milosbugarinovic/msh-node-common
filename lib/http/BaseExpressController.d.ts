import { Router } from 'express';
export declare abstract class BaseExpressController {
    get router(): Router;
    private _router;
}
