import ElasticSearch from 'winston-elasticsearch'
import { ElasticSearchTransportOptions } from '../../util/customTypings'

const elasticSearchTransport = {
  create: (options: ElasticSearchTransportOptions) => {
    options = options || {}
    options.level = options.level || 'info'
    return new ElasticSearch(options)
  },
}

export { elasticSearchTransport }
