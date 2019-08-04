import { ClientSide } from './base'

export class BadRequest extends ClientSide {
  constructor(message = 'Bad Request') {
    super(message, 400)
  }
}

export class Unauthorized extends ClientSide {
  constructor(message = 'Unauthorized') {
    super(message, 401)
  }
}

export class Forbidden extends ClientSide {
  constructor(message = 'Forbidden') {
    super(message, 403)
  }
}

export class NotFound extends ClientSide {
  constructor(message = 'Not Found') {
    super(message, 404)
  }
}

export class RequestTimeOut extends ClientSide {
  constructor(message = 'Request Time-Out') {
    super(message, 408)
  }
}

export class Conflict extends ClientSide {
  constructor(message = 'Conflict') {
    super(message, 409)
  }
}


export class PreconditionFailed extends ClientSide {
  constructor(message = 'Precondition Failed') {
    super(message, 412)
  }
}
