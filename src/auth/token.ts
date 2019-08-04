import { NextFunction, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import { get } from 'lodash'
import uuidv4 from 'uuid/v4'
import { winston } from '../logger'
import { CheckTokenOptions, RequestMSOptions, RequestSession, Session, UserData } from '../util/customTypings'

const token = {
  check: (options: CheckTokenOptions): void => {
    const router = options.router
    const allowedAppAuthKeys = options.allowedAppAuthKeys || []
    const allowedUrlPaths = options.allowedUrlPaths || []
    if (!allowedUrlPaths.includes('/')) allowedUrlPaths.push('/')

    router.use((req: RequestSession, res: Response, next: NextFunction) => {
      // if there is no session id generate new
      const sessionId = (req.headers.logSessionId || uuidv4()).toString()
      req.session = {
        id: sessionId,
        logger: winston.create({ id: sessionId }),
      } as Session

      // fixme find a better way to check if url is allowed
      if (allowedUrlPaths.includes(req.url.split('?')[0])) return next()

      // check header or url parameters or post parameters for token
      // let token = req.body.token || req.query.token || req.headers['authorization'];
      const authToken = token.cleanToken(req.headers.authorization || '')
      if (allowedAppAuthKeys.includes(authToken)) return next()

      if (!authToken) {
        return res.status(403).send({
          success: false,
          message: 'No token provided.',
        })
      }

      req.session.requestMSOptions = (uri: string, requestOptions?: any) => {
        return {
          uri: `http://${req.headers.host}${uri}`,
          headers: {
            authorization: req.headers.authorization,
            ...(requestOptions && requestOptions.headers ? requestOptions.headers : {}),
          },
          json: true,
          ...(requestOptions || {}),
        }
      }

      jwt.verify(authToken, options.authorizationPublicKey, (err: any, decoded: any) => {
        if (err) {
          global.logger.warn(err)
          return res.status(401).send({
            success: false,
            message: 'Failed to authenticate token.',
          })
        } else {
          // if everything is good, save to request for use in other route
          const userData = token.generateUserData(decoded)
          req.session!.userData = userData
          req.session!.logger = winston.create({ id: sessionId, userData })
          return next()
        }
      })
    })
  },

  cleanToken: (authToken: string): string => {
    const tokenSplit = authToken.split(' ')
    return tokenSplit[tokenSplit.length - 1]
  },

  generateUserData: (decoded: any): UserData => {
    return {
      id: get(decoded, 'id', null),
      name: get(decoded, 'name', null),
      tenantId: get(decoded, 'personalTenantId', null),
      exp: get(decoded, 'exp', null),
      iat: get(decoded, 'iat', null),
    }
  },
}

export { token }
