import { Router } from 'express'

export abstract class BaseExpressController {
  public get router(): Router {
    return this._router
  }

  private _router = Router()
}
