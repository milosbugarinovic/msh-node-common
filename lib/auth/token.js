"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = __importStar(require("jsonwebtoken"));
const lodash_1 = require("lodash");
const v4_1 = __importDefault(require("uuid/v4"));
const logger_1 = require("../logger");
const token = {
    check: (options) => {
        const router = options.router;
        const allowedAppAuthKeys = options.allowedAppAuthKeys || [];
        const allowedUrlPaths = options.allowedUrlPaths || [];
        if (!allowedUrlPaths.includes('/'))
            allowedUrlPaths.push('/');
        router.use((req, res, next) => {
            // if there is no session id generate new
            const sessionId = (req.headers.logSessionId || v4_1.default()).toString();
            req.session = {
                id: sessionId,
                logger: logger_1.winston.create({ id: sessionId }),
            };
            // fixme find a better way to check if url is allowed
            if (allowedUrlPaths.includes(req.url.split('?')[0]))
                return next();
            if (options.slackVerificationToken && options.slackVerificationToken === lodash_1.get(req, 'body.token', null))
                return next();
            if (options && options.allowedTokens) {
                for (const at of options.allowedTokens) {
                    if (at.urls && at.urls.filter(Boolean).length > 0) {
                        if (!at.urls.includes(req.url.split('?')[0]))
                            continue;
                    }
                    if (at.expectedToken === lodash_1.get(req, at.tokenLocation))
                        return next();
                }
            }
            // check header or url parameters or post parameters for token
            // let token = req.body.token || req.query.token || req.headers['authorization'];
            const authToken = token.cleanToken(req.headers.authorization || '');
            if (allowedAppAuthKeys.includes(authToken))
                return next();
            if (!authToken) {
                return res.status(403).send({
                    success: false,
                    message: 'No token provided.',
                });
            }
            req.session.requestMSOptions = (uri, requestOptions) => {
                return Object.assign({ uri: `http://${req.headers.host}${uri}`, headers: Object.assign({ authorization: req.headers.authorization }, (requestOptions && requestOptions.headers ? requestOptions.headers : {})), json: true }, (requestOptions || {}));
            };
            jwt.verify(authToken, options.authorizationPublicKey, (err, decoded) => {
                if (err) {
                    global.logger.warn(err);
                    return res.status(401).send({
                        success: false,
                        message: 'Failed to authenticate token.',
                    });
                }
                else {
                    // if everything is good, save to request for use in other route
                    const userData = token.generateUserData(decoded);
                    req.session.userData = userData;
                    req.session.logger = logger_1.winston.create({ id: sessionId, userData });
                    return next();
                }
            });
        });
    },
    cleanToken: (authToken) => {
        const tokenSplit = authToken.split(' ');
        return tokenSplit[tokenSplit.length - 1];
    },
    generateUserData: (decoded) => {
        return {
            id: lodash_1.get(decoded, 'id', null),
            name: lodash_1.get(decoded, 'name', null),
            tenantId: lodash_1.get(decoded, 'personalTenantId', null),
            exp: lodash_1.get(decoded, 'exp', null),
            iat: lodash_1.get(decoded, 'iat', null),
        };
    },
};
exports.token = token;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXV0aC90b2tlbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFDQSxrREFBbUM7QUFDbkMsbUNBQTRCO0FBQzVCLGlEQUE0QjtBQUM1QixzQ0FBbUM7QUFHbkMsTUFBTSxLQUFLLEdBQUc7SUFDWixLQUFLLEVBQUUsQ0FBQyxPQUEwQixFQUFRLEVBQUU7UUFDMUMsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQTtRQUM3QixNQUFNLGtCQUFrQixHQUFHLE9BQU8sQ0FBQyxrQkFBa0IsSUFBSSxFQUFFLENBQUE7UUFDM0QsTUFBTSxlQUFlLEdBQUcsT0FBTyxDQUFDLGVBQWUsSUFBSSxFQUFFLENBQUE7UUFDckQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDO1lBQUUsZUFBZSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUU3RCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBbUIsRUFBRSxHQUFhLEVBQUUsSUFBa0IsRUFBRSxFQUFFO1lBQ3BFLHlDQUF5QztZQUN6QyxNQUFNLFNBQVMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsWUFBWSxJQUFJLFlBQU0sRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUE7WUFDbkUsR0FBRyxDQUFDLE9BQU8sR0FBRztnQkFDWixFQUFFLEVBQUUsU0FBUztnQkFDYixNQUFNLEVBQUUsZ0JBQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLENBQUM7YUFDL0IsQ0FBQTtZQUVaLHFEQUFxRDtZQUNyRCxJQUFJLGVBQWUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQUUsT0FBTyxJQUFJLEVBQUUsQ0FBQTtZQUdsRSxJQUFLLE9B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QUM7SUFFRCxVQUFVLEVBQUUsQ0FBQyxTQUFpQixFQUFVLEVBQUU7UUFDeEMsTUFBTSxVQUFVLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUN2QyxPQUFPLFVBQVUsQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFBO0lBQzFDLENBQUM7SUFFRCxnQkFBZ0IsRUFBRSxDQUFDLE9BQVksRUFBWSxFQUFFO1FBQzNDLE9BQU87WUFDTCxFQUFFLEVBQUUsWUFBRyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDO1lBQzVCLElBQUksRUFBRSxZQUFHLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUM7WUFDaEMsUUFBUSxFQUFFLFlBQUcsQ0FBQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxDQUFDO1lBQ2hELEdBQUcsRUFBRSxZQUFHLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUM7WUFDOUIsR0FBRyxFQUFFLFlBQUcsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQztTQUMvQixDQUFBO0lBQ0gsQ0FBQztDQUNGLENBQUE7QUFFUSxzQkFBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRGdW5jdGlvbiwgUmVzcG9uc2UgfSBmcm9tICdleHByZXNzJ1xuaW1wb3J0ICogYXMgand0IGZyb20gJ2pzb253ZWJ0b2tlbidcbmltcG9ydCB7IGdldCB9IGZyb20gJ2xvZGFzaCdcbmltcG9ydCB1dWlkdjQgZnJvbSAndXVpZC92NCdcbmltcG9ydCB7IHdpbnN0b24gfSBmcm9tICcuLi9sb2dnZXInXG5pbXBvcnQgeyBDaGVja1Rva2VuT3B0aW9ucywgUmVxdWVzdE1TT3B0aW9ucywgUmVxdWVzdFNlc3Npb24sIFNlc3Npb24sIFVzZXJEYXRhIH0gZnJvbSAnLi4vdXRpbC9jdXN0b21UeXBpbmdzJ1xuXG5jb25zdCB0b2tlbiA9IHtcbiAgY2hlY2s6IChvcHRpb25zOiBDaGVja1Rva2VuT3B0aW9ucyk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IHJvdXRlciA9IG9wdGlvbnMucm91dGVyXG4gICAgY29uc3QgYWxsb3dlZEFwcEF1dGhLZXlzID0gb3B0aW9ucy5hbGxvd2VkQXBwQXV0aEtleXMgfHwgW11cbiAgICBjb25zdCBhbGxvd2VkVXJsUGF0aHMgPSBvcHRpb25zLmFsbG93ZWRVcmxQYXRocyB8fCBbXVxuICAgIGlmICghYWxsb3dlZFVybFBhdGhzLmluY2x1ZGVzKCcvJykpIGFsbG93ZWRVcmxQYXRocy5wdXNoKCcvJylcblxuICAgIHJvdXRlci51c2UoKHJlcTogUmVxdWVzdFNlc3Npb24sIHJlczogUmVzcG9uc2UsIG5leHQ6IE5leHRGdW5jdGlvbikgPT4ge1xuICAgICAgLy8gaWYgdGhlcmUgaXMgbm8gc2Vzc2lvbiBpZCBnZW5lcmF0ZSBuZXdcbiAgICAgIGNvbnN0IHNlc3Npb25JZCA9IChyZXEuaGVhZGVycy5sb2dTZXNzaW9uSWQgfHwgdXVpZHY0KCkpLnRvU3RyaW5nKClcbiAgICAgIHJlcS5zZXNzaW9uID0ge1xuICAgICAgICBpZDogc2Vzc2lvbklkLFxuICAgICAgICBsb2dnZXI6IHdpbnN0b24uY3JlYXRlKHsgaWQ6IHNlc3Npb25JZCB9KSxcbiAgICAgIH0gYXMgU2Vzc2lvblxuXG4gICAgICAvLyBmaXhtZSBmaW5kIGEgYmV0dGVyIHdheSB0byBjaGVjayBpZiB1cmwgaXMgYWxsb3dlZFxuICAgICAgaWYgKGFsbG93ZWRVcmxQYXRocy5pbmNsdWRlcyhyZXEudXJsLnNwbGl0KCc/JylbMF0pKSByZXR1cm4gbmV4dCgpXG5cblxuICAgICAgaWYgKCBvcHRpb25zLnNsYWNrVmVyaWZpY2F0aW9uVG9rZW4gJiYgb3B0aW9ucy5zbGFja1ZlcmlmaWNhdGlvblRva2VuID09PSBnZXQocmVxLCAnYm9keS50b2tlbicsIG51bGwpKSByZXR1cm4gbmV4dCgpXG5cbiAgICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMuYWxsb3dlZFRva2Vucykge1xuICAgICAgICBmb3IgKGNvbnN0IGF0IG9mIG9wdGlvbnMuYWxsb3dlZFRva2Vucykge1xuICAgICAgICAgIGlmIChhdC51cmxzICYmIGF0LnVybHMuZmlsdGVyKEJvb2xlYW4pLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGlmICghYXQudXJscy5pbmNsdWRlcyhyZXEudXJsLnNwbGl0KCc/JylbMF0pKSBjb250aW51ZVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZihhdC5leHBlY3RlZFRva2VuID09PSBnZXQocmVxLGF0LnRva2VuTG9jYXRpb24pKSByZXR1cm4gbmV4dCgpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gY2hlY2sgaGVhZGVyIG9yIHVybCBwYXJhbWV0ZXJzIG9yIHBvc3QgcGFyYW1ldGVycyBmb3IgdG9rZW5cbiAgICAgIC8vIGxldCB0b2tlbiA9IHJlcS5ib2R5LnRva2VuIHx8IHJlcS5xdWVyeS50b2tlbiB8fCByZXEuaGVhZGVyc1snYXV0aG9yaXphdGlvbiddO1xuICAgICAgY29uc3QgYXV0aFRva2VuID0gdG9rZW4uY2xlYW5Ub2tlbihyZXEuaGVhZGVycy5hdXRob3JpemF0aW9uIHx8ICcnKVxuICAgICAgaWYgKGFsbG93ZWRBcHBBdXRoS2V5cy5pbmNsdWRlcyhhdXRoVG9rZW4pKSByZXR1cm4gbmV4dCgpXG5cbiAgICAgIGlmICghYXV0aFRva2VuKSB7XG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMykuc2VuZCh7XG4gICAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgICAgbWVzc2FnZTogJ05vIHRva2VuIHByb3ZpZGVkLicsXG4gICAgICAgIH0pXG4gICAgICB9XG5cbiAgICAgIHJlcS5zZXNzaW9uLnJlcXVlc3RNU09wdGlvbnMgPSAodXJpOiBzdHJpbmcsIHJlcXVlc3RPcHRpb25zPzogYW55KSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdXJpOiBgaHR0cDovLyR7cmVxLmhlYWRlcnMuaG9zdH0ke3VyaX1gLFxuICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgIGF1dGhvcml6YXRpb246IHJlcS5oZWFkZXJzLmF1dGhvcml6YXRpb24sXG4gICAgICAgICAgICAuLi4ocmVxdWVzdE9wdGlvbnMgJiYgcmVxdWVzdE9wdGlvbnMuaGVhZGVycyA/IHJlcXVlc3RPcHRpb25zLmhlYWRlcnMgOiB7fSksXG4gICAgICAgICAgfSxcbiAgICAgICAgICBqc29uOiB0cnVlLFxuICAgICAgICAgIC4uLihyZXF1ZXN0T3B0aW9ucyB8fCB7fSksXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgand0LnZlcmlmeShhdXRoVG9rZW4sIG9wdGlvbnMuYXV0aG9yaXphdGlvblB1YmxpY0tleSwgKGVycjogYW55LCBkZWNvZGVkOiBhbnkpID0+IHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIGdsb2JhbC5sb2dnZXIud2FybihlcnIpXG4gICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAxKS5zZW5kKHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICAgICAgbWVzc2FnZTogJ0ZhaWxlZCB0byBhdXRoZW50aWNhdGUgdG9rZW4uJyxcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGlmIGV2ZXJ5dGhpbmcgaXMgZ29vZCwgc2F2ZSB0byByZXF1ZXN0IGZvciB1c2UgaW4gb3RoZXIgcm91dGVcbiAgICAgICAgICBjb25zdCB1c2VyRGF0YSA9IHRva2VuLmdlbmVyYXRlVXNlckRhdGEoZGVjb2RlZClcbiAgICAgICAgICByZXEuc2Vzc2lvbiEudXNlckRhdGEgPSB1c2VyRGF0YVxuICAgICAgICAgIHJlcS5zZXNzaW9uIS5sb2dnZXIgPSB3aW5zdG9uLmNyZWF0ZSh7IGlkOiBzZXNzaW9uSWQsIHVzZXJEYXRhIH0pXG4gICAgICAgICAgcmV0dXJuIG5leHQoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG4gIH0sXG5cbiAgY2xlYW5Ub2tlbjogKGF1dGhUb2tlbjogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICBjb25zdCB0b2tlblNwbGl0ID0gYXV0aFRva2VuLnNwbGl0KCcgJylcbiAgICByZXR1cm4gdG9rZW5TcGxpdFt0b2tlblNwbGl0Lmxlbmd0aCAtIDFdXG4gIH0sXG5cbiAgZ2VuZXJhdGVVc2VyRGF0YTogKGRlY29kZWQ6IGFueSk6IFVzZXJEYXRhID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgaWQ6IGdldChkZWNvZGVkLCAnaWQnLCBudWxsKSxcbiAgICAgIG5hbWU6IGdldChkZWNvZGVkLCAnbmFtZScsIG51bGwpLFxuICAgICAgdGVuYW50SWQ6IGdldChkZWNvZGVkLCAncGVyc29uYWxUZW5hbnRJZCcsIG51bGwpLFxuICAgICAgZXhwOiBnZXQoZGVjb2RlZCwgJ2V4cCcsIG51bGwpLFxuICAgICAgaWF0OiBnZXQoZGVjb2RlZCwgJ2lhdCcsIG51bGwpLFxuICAgIH1cbiAgfSxcbn1cblxuZXhwb3J0IHsgdG9rZW4gfVxuIl19