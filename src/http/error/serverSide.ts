import { ServerSide } from './base'

export class InternalServerError extends ServerSide {
  constructor(message = 'Internal Server Error') {
    super(message, 500)
  }
}

export class BadGateway extends ServerSide {
  constructor(message = 'Bad Gateway') {
    super(message, 502)
  }
}

export class ServiceTemporarilyUnavailable extends ServerSide {
  constructor(message = 'Service Temporarily Unavailable') {
    super(message, 503)
  }
}

export class GatewayTimeOut extends ServerSide {
  constructor(message = 'Gateway Time-Out') {
    super(message, 504)
  }
}
