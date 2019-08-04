import * as fs from 'fs'
import * as util from 'util'

const secrets = {
  get: (secret: string): string => {
    try {
      return fs.readFileSync(util.format('/run/secrets/%s', secret), 'utf8').trim()
    } catch (e) {
      return ''
    }
  },
}

export { secrets }
