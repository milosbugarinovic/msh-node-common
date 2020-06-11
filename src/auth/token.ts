import { NextFunction, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import { get } from 'lodash'
import { v4 as uuidv4 } from 'uuid';
import { CheckTokenOptions, RequestSession, Session, UserData } from '../util/customTypings'

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
        logger: global.logger.child({ tags: { sessionId } }),
      } as Session

      // fixme find a better way to check if url is allowed
      if (allowedUrlPaths.includes(req.url.split('?')[0])) return next()

      const { headers, method, originalUrl, params, query, body } = req
      req.session.logger.debug('request that need auth', { request: { headers, method, originalUrl, params, query, body } })

      if (options && options.allowedTokens) {
        for (const at of options.allowedTokens) {
          if (at.urls && at.urls.filter(Boolean).length > 0) {
            if (!at.urls.includes(req.url.split('?')[0])) continue
          }
          if (at.expectedToken === get(req, at.tokenLocation)) return next()
        }
      }

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
          req.session!.logger.warn(err)
          return res.status(401).send({
            success: false,
            message: 'Failed to authenticate token.',
          })
        } else {
          // if everything is good, save to request for use in other route
          const userData = token.generateUserData(decoded)
          req.session!.userData = userData
          req.session!.logger = global.logger.child({ tags: { sessionId: req.session!.id, userData } })
          return next()
        }
      })
    })
  },

  cleanToken: (authToken: string): string => {
    const tokenSplit = authToken.split(' ')
    return tokenSplit[tokenSplit.length - 1]
  },

  /**
   * Generate user data from decoded jwt
   * @param {object} decoded
   * @param {number} [decoded.id]
   * @param {string} [decoded.name]
   * @param {number} [decoded.personalTenantId]
   * @param {number} [decoded.exp]
   * @param {number} [decoded.iat]
   * @returns {UserData}
   */
  generateUserData: (decoded: any): UserData => {
    if (!decoded) return {}
    return {
      id: +decoded?.id,
      name: decoded.name ? decoded.name.toString() : undefined,
      tenantId: decoded.personalTenantId ? +decoded.personalTenantId : undefined,
      exp: decoded.exp ? +decoded.exp : undefined,
      iat: decoded.iat ? +decoded.iat : undefined,
    }
  },
}

export { token }
