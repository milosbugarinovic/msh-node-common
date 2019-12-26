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
            if (lodash_1.get(options, 'slackVerificationToken', 'no-token') === lodash_1.get(req, 'body.token', null))
                return next();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXV0aC90b2tlbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFDQSxrREFBbUM7QUFDbkMsbUNBQTRCO0FBQzVCLGlEQUE0QjtBQUM1QixzQ0FBbUM7QUFHbkMsTUFBTSxLQUFLLEdBQUc7SUFDWixLQUFLLEVBQUUsQ0FBQyxPQUEwQixFQUFRLEVBQUU7UUFDMUMsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQTtRQUM3QixNQUFNLGtCQUFrQixHQUFHLE9BQU8sQ0FBQyxrQkFBa0IsSUFBSSxFQUFFLENBQUE7UUFDM0QsTUFBTSxlQUFlLEdBQUcsT0FBTyxDQUFDLGVBQWUsSUFBSSxFQUFFLENBQUE7UUFDckQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDO1lBQUUsZUFBZSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUU3RCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBbUIsRUFBRSxHQUFhLEVBQUUsSUFBa0IsRUFBRSxFQUFFO1lBQ3BFLHlDQUF5QztZQUN6QyxNQUFNLFNBQVMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsWUFBWSxJQUFJLFlBQU0sRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUE7WUFDbkUsR0FBRyxDQUFDLE9BQU8sR0FBRztnQkFDWixFQUFFLEVBQUUsU0FBUztnQkFDYixNQUFNLEVBQUUsZ0JBQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLENBQUM7YUFDL0IsQ0FBQTtZQUVaLHFEQUFxRDtZQUNyRCxJQUFJLGVBQWUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQUUsT0FBTyxJQUFJLEVBQUUsQ0FBQTtZQUVsRSxJQUFJLFlB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S0FBSyxFQUFFLElBQUksQ0FBQztZQUM5QixHQUFHLEVBQUUsWUFBRyxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDO1NBQy9CLENBQUE7SUFDSCxDQUFDO0NBQ0YsQ0FBQTtBQUVRLHNCQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dEZ1bmN0aW9uLCBSZXNwb25zZSB9IGZyb20gJ2V4cHJlc3MnXG5pbXBvcnQgKiBhcyBqd3QgZnJvbSAnanNvbndlYnRva2VuJ1xuaW1wb3J0IHsgZ2V0IH0gZnJvbSAnbG9kYXNoJ1xuaW1wb3J0IHV1aWR2NCBmcm9tICd1dWlkL3Y0J1xuaW1wb3J0IHsgd2luc3RvbiB9IGZyb20gJy4uL2xvZ2dlcidcbmltcG9ydCB7IENoZWNrVG9rZW5PcHRpb25zLCBSZXF1ZXN0TVNPcHRpb25zLCBSZXF1ZXN0U2Vzc2lvbiwgU2Vzc2lvbiwgVXNlckRhdGEgfSBmcm9tICcuLi91dGlsL2N1c3RvbVR5cGluZ3MnXG5cbmNvbnN0IHRva2VuID0ge1xuICBjaGVjazogKG9wdGlvbnM6IENoZWNrVG9rZW5PcHRpb25zKTogdm9pZCA9PiB7XG4gICAgY29uc3Qgcm91dGVyID0gb3B0aW9ucy5yb3V0ZXJcbiAgICBjb25zdCBhbGxvd2VkQXBwQXV0aEtleXMgPSBvcHRpb25zLmFsbG93ZWRBcHBBdXRoS2V5cyB8fCBbXVxuICAgIGNvbnN0IGFsbG93ZWRVcmxQYXRocyA9IG9wdGlvbnMuYWxsb3dlZFVybFBhdGhzIHx8IFtdXG4gICAgaWYgKCFhbGxvd2VkVXJsUGF0aHMuaW5jbHVkZXMoJy8nKSkgYWxsb3dlZFVybFBhdGhzLnB1c2goJy8nKVxuXG4gICAgcm91dGVyLnVzZSgocmVxOiBSZXF1ZXN0U2Vzc2lvbiwgcmVzOiBSZXNwb25zZSwgbmV4dDogTmV4dEZ1bmN0aW9uKSA9PiB7XG4gICAgICAvLyBpZiB0aGVyZSBpcyBubyBzZXNzaW9uIGlkIGdlbmVyYXRlIG5ld1xuICAgICAgY29uc3Qgc2Vzc2lvbklkID0gKHJlcS5oZWFkZXJzLmxvZ1Nlc3Npb25JZCB8fCB1dWlkdjQoKSkudG9TdHJpbmcoKVxuICAgICAgcmVxLnNlc3Npb24gPSB7XG4gICAgICAgIGlkOiBzZXNzaW9uSWQsXG4gICAgICAgIGxvZ2dlcjogd2luc3Rvbi5jcmVhdGUoeyBpZDogc2Vzc2lvbklkIH0pLFxuICAgICAgfSBhcyBTZXNzaW9uXG5cbiAgICAgIC8vIGZpeG1lIGZpbmQgYSBiZXR0ZXIgd2F5IHRvIGNoZWNrIGlmIHVybCBpcyBhbGxvd2VkXG4gICAgICBpZiAoYWxsb3dlZFVybFBhdGhzLmluY2x1ZGVzKHJlcS51cmwuc3BsaXQoJz8nKVswXSkpIHJldHVybiBuZXh0KClcblxuICAgICAgaWYgKGdldChvcHRpb25zLCdzbGFja1ZlcmlmaWNhdGlvblRva2VuJywnbm8tdG9rZW4nKSA9PT0gZ2V0KHJlcSwnYm9keS50b2tlbicsbnVsbCkpIHJldHVybiBuZXh0KClcblxuICAgICAgLy8gY2hlY2sgaGVhZGVyIG9yIHVybCBwYXJhbWV0ZXJzIG9yIHBvc3QgcGFyYW1ldGVycyBmb3IgdG9rZW5cbiAgICAgIC8vIGxldCB0b2tlbiA9IHJlcS5ib2R5LnRva2VuIHx8IHJlcS5xdWVyeS50b2tlbiB8fCByZXEuaGVhZGVyc1snYXV0aG9yaXphdGlvbiddO1xuICAgICAgY29uc3QgYXV0aFRva2VuID0gdG9rZW4uY2xlYW5Ub2tlbihyZXEuaGVhZGVycy5hdXRob3JpemF0aW9uIHx8ICcnKVxuICAgICAgaWYgKGFsbG93ZWRBcHBBdXRoS2V5cy5pbmNsdWRlcyhhdXRoVG9rZW4pKSByZXR1cm4gbmV4dCgpXG5cbiAgICAgIGlmICghYXV0aFRva2VuKSB7XG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMykuc2VuZCh7XG4gICAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgICAgbWVzc2FnZTogJ05vIHRva2VuIHByb3ZpZGVkLicsXG4gICAgICAgIH0pXG4gICAgICB9XG5cbiAgICAgIHJlcS5zZXNzaW9uLnJlcXVlc3RNU09wdGlvbnMgPSAodXJpOiBzdHJpbmcsIHJlcXVlc3RPcHRpb25zPzogYW55KSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdXJpOiBgaHR0cDovLyR7cmVxLmhlYWRlcnMuaG9zdH0ke3VyaX1gLFxuICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgIGF1dGhvcml6YXRpb246IHJlcS5oZWFkZXJzLmF1dGhvcml6YXRpb24sXG4gICAgICAgICAgICAuLi4ocmVxdWVzdE9wdGlvbnMgJiYgcmVxdWVzdE9wdGlvbnMuaGVhZGVycyA/IHJlcXVlc3RPcHRpb25zLmhlYWRlcnMgOiB7fSksXG4gICAgICAgICAgfSxcbiAgICAgICAgICBqc29uOiB0cnVlLFxuICAgICAgICAgIC4uLihyZXF1ZXN0T3B0aW9ucyB8fCB7fSksXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgand0LnZlcmlmeShhdXRoVG9rZW4sIG9wdGlvbnMuYXV0aG9yaXphdGlvblB1YmxpY0tleSwgKGVycjogYW55LCBkZWNvZGVkOiBhbnkpID0+IHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIGdsb2JhbC5sb2dnZXIud2FybihlcnIpXG4gICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAxKS5zZW5kKHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICAgICAgbWVzc2FnZTogJ0ZhaWxlZCB0byBhdXRoZW50aWNhdGUgdG9rZW4uJyxcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGlmIGV2ZXJ5dGhpbmcgaXMgZ29vZCwgc2F2ZSB0byByZXF1ZXN0IGZvciB1c2UgaW4gb3RoZXIgcm91dGVcbiAgICAgICAgICBjb25zdCB1c2VyRGF0YSA9IHRva2VuLmdlbmVyYXRlVXNlckRhdGEoZGVjb2RlZClcbiAgICAgICAgICByZXEuc2Vzc2lvbiEudXNlckRhdGEgPSB1c2VyRGF0YVxuICAgICAgICAgIHJlcS5zZXNzaW9uIS5sb2dnZXIgPSB3aW5zdG9uLmNyZWF0ZSh7IGlkOiBzZXNzaW9uSWQsIHVzZXJEYXRhIH0pXG4gICAgICAgICAgcmV0dXJuIG5leHQoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG4gIH0sXG5cbiAgY2xlYW5Ub2tlbjogKGF1dGhUb2tlbjogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICBjb25zdCB0b2tlblNwbGl0ID0gYXV0aFRva2VuLnNwbGl0KCcgJylcbiAgICByZXR1cm4gdG9rZW5TcGxpdFt0b2tlblNwbGl0Lmxlbmd0aCAtIDFdXG4gIH0sXG5cbiAgZ2VuZXJhdGVVc2VyRGF0YTogKGRlY29kZWQ6IGFueSk6IFVzZXJEYXRhID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgaWQ6IGdldChkZWNvZGVkLCAnaWQnLCBudWxsKSxcbiAgICAgIG5hbWU6IGdldChkZWNvZGVkLCAnbmFtZScsIG51bGwpLFxuICAgICAgdGVuYW50SWQ6IGdldChkZWNvZGVkLCAncGVyc29uYWxUZW5hbnRJZCcsIG51bGwpLFxuICAgICAgZXhwOiBnZXQoZGVjb2RlZCwgJ2V4cCcsIG51bGwpLFxuICAgICAgaWF0OiBnZXQoZGVjb2RlZCwgJ2lhdCcsIG51bGwpLFxuICAgIH1cbiAgfSxcbn1cblxuZXhwb3J0IHsgdG9rZW4gfVxuIl19