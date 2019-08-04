import CORS, { CorsOptions } from 'cors'
import { Express } from 'express'

const cors = {
  init: (app: Express): void => {
    app.use(
      CORS({
        origin: (origin: any, callback: (err: any, result: boolean) => void) => {
          callback(null, true)
        },
        credentials: true,
      } as CorsOptions)
    )
  },
}

export { cors }
