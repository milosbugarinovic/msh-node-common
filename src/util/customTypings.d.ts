import { Logger, Format } from 'winston'
import { Request, Router } from 'express'
import { LogstashOption } from 'winston-logstash-ts'
import exp = require('constants')
import { ElasticsearchTransportOptions as ESTransportOptions } from 'winston-elasticsearch'

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

export interface AllowedToken {
  urls: string[]
  tokenLocation: string
  expectedToken: string
}

export interface CheckTokenOptions {
  router: Router
  allowedUrlPaths?: string[]
  allowedAppAuthKeys?: string[]
  authorizationPublicKey: string
  slackVerificationToken: string
  allowedTokens: AllowedToken[]
}

export interface BaseModelAttribute {
  id?: number
  createdAt?: number
  updatedAt?: number

  delete?: boolean
  touched?: boolean
}

export interface WinstonTransportConfig {
  transportType: availableTransforms
  options?: WinstonTransportOptions
}

export interface WinstonTransportOptions {
  level?: string
}

export interface SentryTransportOptions extends WinstonTransportOptions {
  sentry?: {
    dsn?: string
    release?: string
    environment?: string
    serverName?: string
  }
}

export interface SlackTransportOptions extends WinstonTransportOptions {
  webhookUrl?: string
}

export interface LogstashTransportOptions extends WinstonTransportOptions, LogstashOption {}

export interface ElasticSearchTransportOptions extends WinstonTransportOptions, ESTransportOptions {}
