import { Logger } from 'winston'
import { Request, Router } from 'express'

export interface UserData {
  id: number
  name: string
  tenantId: number
  iat: number
  exp: number
}

export interface Session {
  id: string
  userData: UserData
  logger: Logger
  requestMSOptions: RequestMSOptions
}

/**
 * Generate request for communication between micro-services.
 * Base url is fixed and header auth is passed trough.
 */
export type RequestMSOptions = (uri: string, options?: any) => any

export interface RequestSession extends Request {
  session?: Session
}

export interface CheckTokenOptions {
  router: Router
  allowedUrlPaths?: string[]
  allowedAppAuthKeys?: string[]
  authorizationPublicKey: string
  slackVerificationToken: string
}

export interface BaseModelAttribute {
  id?: number
  createdAt?: number
  updatedAt?: number

  delete?: boolean
  touched?: boolean
}
