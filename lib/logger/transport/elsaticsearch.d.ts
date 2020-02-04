import ElasticSearch from 'winston-elasticsearch';
import { ElasticSearchTransportOptions } from '../../util/customTypings';
declare const elasticSearchTransport: {
    create: (options: ElasticSearchTransportOptions) => ElasticSearch;
};
export { elasticSearchTransport };
