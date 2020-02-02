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
                logger: global.logger.child({ tags: { sessionId } }),
            };
            // fixme find a better way to check if url is allowed
            if (allowedUrlPaths.includes(req.url.split('?')[0]))
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
                    req.session.logger = global.logger.child({ tags: { sessionId: req.session.id, userData } });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXV0aC90b2tlbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFDQSxrREFBbUM7QUFDbkMsbUNBQTRCO0FBQzVCLGlEQUE0QjtBQUc1QixNQUFNLEtBQUssR0FBRztJQUNaLEtBQUssRUFBRSxDQUFDLE9BQTBCLEVBQVEsRUFBRTtRQUMxQyxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFBO1FBQzdCLE1BQU0sa0JBQWtCLEdBQUcsT0FBTyxDQUFDLGtCQUFrQixJQUFJLEVBQUUsQ0FBQTtRQUMzRCxNQUFNLGVBQWUsR0FBRyxPQUFPLENBQUMsZUFBZSxJQUFJLEVBQUUsQ0FBQTtRQUNyRCxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7WUFBRSxlQUFlLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBRTdELE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFtQixFQUFFLEdBQWEsRUFBRSxJQUFrQixFQUFFLEVBQUU7WUFDcEUseUNBQXlDO1lBQ3pDLE1BQU0sU0FBUyxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxZQUFZLElBQUksWUFBTSxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQTtZQUNuRSxHQUFHLENBQUMsT0FBTyxHQUFHO2dCQUNaLEVBQUUsRUFBRSxTQUFTO2dCQUNiLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLENBQUM7YUFDMUMsQ0FBQTtZQUVaLHFEQUFxRDtZQUNyRCxJQUFJLGVBQWUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQUUsT0FBTyxJQUFJLEVBQUUsQ0FBQTtZQUVsRSxJ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QUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUN2QyxPQUFPLFVBQVUsQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFBO0lBQzFDLENBQUM7SUFFRCxnQkFBZ0IsRUFBRSxDQUFDLE9BQVksRUFBWSxFQUFFO1FBQzNDLE9BQU87WUFDTCxFQUFFLEVBQUUsWUFBRyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDO1lBQzVCLElBQUksRUFBRSxZQUFHLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUM7WUFDaEMsUUFBUSxFQUFFLFlBQUcsQ0FBQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxDQUFDO1lBQ2hELEdBQUcsRUFBRSxZQUFHLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUM7WUFDOUIsR0FBRyxFQUFFLFlBQUcsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQztTQUMvQixDQUFBO0lBQ0gsQ0FBQztDQUNGLENBQUE7QUFFUSxzQkFBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRGdW5jdGlvbiwgUmVzcG9uc2UgfSBmcm9tICdleHByZXNzJ1xuaW1wb3J0ICogYXMgand0IGZyb20gJ2pzb253ZWJ0b2tlbidcbmltcG9ydCB7IGdldCB9IGZyb20gJ2xvZGFzaCdcbmltcG9ydCB1dWlkdjQgZnJvbSAndXVpZC92NCdcbmltcG9ydCB7IENoZWNrVG9rZW5PcHRpb25zLCBSZXF1ZXN0U2Vzc2lvbiwgU2Vzc2lvbiwgVXNlckRhdGEgfSBmcm9tICcuLi91dGlsL2N1c3RvbVR5cGluZ3MnXG5cbmNvbnN0IHRva2VuID0ge1xuICBjaGVjazogKG9wdGlvbnM6IENoZWNrVG9rZW5PcHRpb25zKTogdm9pZCA9PiB7XG4gICAgY29uc3Qgcm91dGVyID0gb3B0aW9ucy5yb3V0ZXJcbiAgICBjb25zdCBhbGxvd2VkQXBwQXV0aEtleXMgPSBvcHRpb25zLmFsbG93ZWRBcHBBdXRoS2V5cyB8fCBbXVxuICAgIGNvbnN0IGFsbG93ZWRVcmxQYXRocyA9IG9wdGlvbnMuYWxsb3dlZFVybFBhdGhzIHx8IFtdXG4gICAgaWYgKCFhbGxvd2VkVXJsUGF0aHMuaW5jbHVkZXMoJy8nKSkgYWxsb3dlZFVybFBhdGhzLnB1c2goJy8nKVxuXG4gICAgcm91dGVyLnVzZSgocmVxOiBSZXF1ZXN0U2Vzc2lvbiwgcmVzOiBSZXNwb25zZSwgbmV4dDogTmV4dEZ1bmN0aW9uKSA9PiB7XG4gICAgICAvLyBpZiB0aGVyZSBpcyBubyBzZXNzaW9uIGlkIGdlbmVyYXRlIG5ld1xuICAgICAgY29uc3Qgc2Vzc2lvbklkID0gKHJlcS5oZWFkZXJzLmxvZ1Nlc3Npb25JZCB8fCB1dWlkdjQoKSkudG9TdHJpbmcoKVxuICAgICAgcmVxLnNlc3Npb24gPSB7XG4gICAgICAgIGlkOiBzZXNzaW9uSWQsXG4gICAgICAgIGxvZ2dlcjogZ2xvYmFsLmxvZ2dlci5jaGlsZCh7IHRhZ3M6IHsgc2Vzc2lvbklkIH0gfSksXG4gICAgICB9IGFzIFNlc3Npb25cblxuICAgICAgLy8gZml4bWUgZmluZCBhIGJldHRlciB3YXkgdG8gY2hlY2sgaWYgdXJsIGlzIGFsbG93ZWRcbiAgICAgIGlmIChhbGxvd2VkVXJsUGF0aHMuaW5jbHVkZXMocmVxLnVybC5zcGxpdCgnPycpWzBdKSkgcmV0dXJuIG5leHQoKVxuXG4gICAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLmFsbG93ZWRUb2tlbnMpIHtcbiAgICAgICAgZm9yIChjb25zdCBhdCBvZiBvcHRpb25zLmFsbG93ZWRUb2tlbnMpIHtcbiAgICAgICAgICBpZiAoYXQudXJscyAmJiBhdC51cmxzLmZpbHRlcihCb29sZWFuKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBpZiAoIWF0LnVybHMuaW5jbHVkZXMocmVxLnVybC5zcGxpdCgnPycpWzBdKSkgY29udGludWVcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGF0LmV4cGVjdGVkVG9rZW4gPT09IGdldChyZXEsIGF0LnRva2VuTG9jYXRpb24pKSByZXR1cm4gbmV4dCgpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gY2hlY2sgaGVhZGVyIG9yIHVybCBwYXJhbWV0ZXJzIG9yIHBvc3QgcGFyYW1ldGVycyBmb3IgdG9rZW5cbiAgICAgIC8vIGxldCB0b2tlbiA9IHJlcS5ib2R5LnRva2VuIHx8IHJlcS5xdWVyeS50b2tlbiB8fCByZXEuaGVhZGVyc1snYXV0aG9yaXphdGlvbiddO1xuICAgICAgY29uc3QgYXV0aFRva2VuID0gdG9rZW4uY2xlYW5Ub2tlbihyZXEuaGVhZGVycy5hdXRob3JpemF0aW9uIHx8ICcnKVxuICAgICAgaWYgKGFsbG93ZWRBcHBBdXRoS2V5cy5pbmNsdWRlcyhhdXRoVG9rZW4pKSByZXR1cm4gbmV4dCgpXG5cbiAgICAgIGlmICghYXV0aFRva2VuKSB7XG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMykuc2VuZCh7XG4gICAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgICAgbWVzc2FnZTogJ05vIHRva2VuIHByb3ZpZGVkLicsXG4gICAgICAgIH0pXG4gICAgICB9XG5cbiAgICAgIHJlcS5zZXNzaW9uLnJlcXVlc3RNU09wdGlvbnMgPSAodXJpOiBzdHJpbmcsIHJlcXVlc3RPcHRpb25zPzogYW55KSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdXJpOiBgaHR0cDovLyR7cmVxLmhlYWRlcnMuaG9zdH0ke3VyaX1gLFxuICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgIGF1dGhvcml6YXRpb246IHJlcS5oZWFkZXJzLmF1dGhvcml6YXRpb24sXG4gICAgICAgICAgICAuLi4ocmVxdWVzdE9wdGlvbnMgJiYgcmVxdWVzdE9wdGlvbnMuaGVhZGVycyA/IHJlcXVlc3RPcHRpb25zLmhlYWRlcnMgOiB7fSksXG4gICAgICAgICAgfSxcbiAgICAgICAgICBqc29uOiB0cnVlLFxuICAgICAgICAgIC4uLihyZXF1ZXN0T3B0aW9ucyB8fCB7fSksXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgand0LnZlcmlmeShhdXRoVG9rZW4sIG9wdGlvbnMuYXV0aG9yaXphdGlvblB1YmxpY0tleSwgKGVycjogYW55LCBkZWNvZGVkOiBhbnkpID0+IHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIGdsb2JhbC5sb2dnZXIud2FybihlcnIpXG4gICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAxKS5zZW5kKHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICAgICAgbWVzc2FnZTogJ0ZhaWxlZCB0byBhdXRoZW50aWNhdGUgdG9rZW4uJyxcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGlmIGV2ZXJ5dGhpbmcgaXMgZ29vZCwgc2F2ZSB0byByZXF1ZXN0IGZvciB1c2UgaW4gb3RoZXIgcm91dGVcbiAgICAgICAgICBjb25zdCB1c2VyRGF0YSA9IHRva2VuLmdlbmVyYXRlVXNlckRhdGEoZGVjb2RlZClcbiAgICAgICAgICByZXEuc2Vzc2lvbiEudXNlckRhdGEgPSB1c2VyRGF0YVxuICAgICAgICAgIHJlcS5zZXNzaW9uIS5sb2dnZXIgPSBnbG9iYWwubG9nZ2VyLmNoaWxkKHsgdGFnczogeyBzZXNzaW9uSWQ6IHJlcS5zZXNzaW9uIS5pZCwgdXNlckRhdGEgfSB9KVxuICAgICAgICAgIHJldHVybiBuZXh0KClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuICB9LFxuXG4gIGNsZWFuVG9rZW46IChhdXRoVG9rZW46IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gICAgY29uc3QgdG9rZW5TcGxpdCA9IGF1dGhUb2tlbi5zcGxpdCgnICcpXG4gICAgcmV0dXJuIHRva2VuU3BsaXRbdG9rZW5TcGxpdC5sZW5ndGggLSAxXVxuICB9LFxuXG4gIGdlbmVyYXRlVXNlckRhdGE6IChkZWNvZGVkOiBhbnkpOiBVc2VyRGF0YSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlkOiBnZXQoZGVjb2RlZCwgJ2lkJywgbnVsbCksXG4gICAgICBuYW1lOiBnZXQoZGVjb2RlZCwgJ25hbWUnLCBudWxsKSxcbiAgICAgIHRlbmFudElkOiBnZXQoZGVjb2RlZCwgJ3BlcnNvbmFsVGVuYW50SWQnLCBudWxsKSxcbiAgICAgIGV4cDogZ2V0KGRlY29kZWQsICdleHAnLCBudWxsKSxcbiAgICAgIGlhdDogZ2V0KGRlY29kZWQsICdpYXQnLCBudWxsKSxcbiAgICB9XG4gIH0sXG59XG5cbmV4cG9ydCB7IHRva2VuIH1cbiJdfQ==