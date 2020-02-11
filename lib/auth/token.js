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
            req.session.logger.debug('request that need auth', req);
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
                    req.session.logger.warn(err);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXV0aC90b2tlbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFDQSxrREFBbUM7QUFDbkMsbUNBQTRCO0FBQzVCLGlEQUE0QjtBQUc1QixNQUFNLEtBQUssR0FBRztJQUNaLEtBQUssRUFBRSxDQUFDLE9BQTBCLEVBQVEsRUFBRTtRQUMxQyxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFBO1FBQzdCLE1BQU0sa0JBQWtCLEdBQUcsT0FBTyxDQUFDLGtCQUFrQixJQUFJLEVBQUUsQ0FBQTtRQUMzRCxNQUFNLGVBQWUsR0FBRyxPQUFPLENBQUMsZUFBZSxJQUFJLEVBQUUsQ0FBQTtRQUNyRCxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7WUFBRSxlQUFlLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBRTdELE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFtQixFQUFFLEdBQWEsRUFBRSxJQUFrQixFQUFFLEVBQUU7WUFDcEUseUNBQXlDO1lBQ3pDLE1BQU0sU0FBUyxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxZQUFZLElBQUksWUFBTSxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQTtZQUNuRSxHQUFHLENBQUMsT0FBTyxHQUFHO2dCQUNaLEVBQUUsRUFBRSxTQUFTO2dCQUNiLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLENBQUM7YUFDMUMsQ0FBQTtZQUVaLHFEQUFxRDtZQUNyRCxJQUFJLGVBQWUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQUUsT0FBTyxJQUFJLEVBQUUsQ0FBQTtZQUVsRSxH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Q0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELFVBQVUsRUFBRSxDQUFDLFNBQWlCLEVBQVUsRUFBRTtRQUN4QyxNQUFNLFVBQVUsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ3ZDLE9BQU8sVUFBVSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUE7SUFDMUMsQ0FBQztJQUVELGdCQUFnQixFQUFFLENBQUMsT0FBWSxFQUFZLEVBQUU7UUFDM0MsT0FBTztZQUNMLEVBQUUsRUFBRSxZQUFHLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7WUFDNUIsSUFBSSxFQUFFLFlBQUcsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQztZQUNoQyxRQUFRLEVBQUUsWUFBRyxDQUFDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxJQUFJLENBQUM7WUFDaEQsR0FBRyxFQUFFLFlBQUcsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQztZQUM5QixHQUFHLEVBQUUsWUFBRyxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDO1NBQy9CLENBQUE7SUFDSCxDQUFDO0NBQ0YsQ0FBQTtBQUVRLHNCQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dEZ1bmN0aW9uLCBSZXNwb25zZSB9IGZyb20gJ2V4cHJlc3MnXG5pbXBvcnQgKiBhcyBqd3QgZnJvbSAnanNvbndlYnRva2VuJ1xuaW1wb3J0IHsgZ2V0IH0gZnJvbSAnbG9kYXNoJ1xuaW1wb3J0IHV1aWR2NCBmcm9tICd1dWlkL3Y0J1xuaW1wb3J0IHsgQ2hlY2tUb2tlbk9wdGlvbnMsIFJlcXVlc3RTZXNzaW9uLCBTZXNzaW9uLCBVc2VyRGF0YSB9IGZyb20gJy4uL3V0aWwvY3VzdG9tVHlwaW5ncydcblxuY29uc3QgdG9rZW4gPSB7XG4gIGNoZWNrOiAob3B0aW9uczogQ2hlY2tUb2tlbk9wdGlvbnMpOiB2b2lkID0+IHtcbiAgICBjb25zdCByb3V0ZXIgPSBvcHRpb25zLnJvdXRlclxuICAgIGNvbnN0IGFsbG93ZWRBcHBBdXRoS2V5cyA9IG9wdGlvbnMuYWxsb3dlZEFwcEF1dGhLZXlzIHx8IFtdXG4gICAgY29uc3QgYWxsb3dlZFVybFBhdGhzID0gb3B0aW9ucy5hbGxvd2VkVXJsUGF0aHMgfHwgW11cbiAgICBpZiAoIWFsbG93ZWRVcmxQYXRocy5pbmNsdWRlcygnLycpKSBhbGxvd2VkVXJsUGF0aHMucHVzaCgnLycpXG5cbiAgICByb3V0ZXIudXNlKChyZXE6IFJlcXVlc3RTZXNzaW9uLCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pID0+IHtcbiAgICAgIC8vIGlmIHRoZXJlIGlzIG5vIHNlc3Npb24gaWQgZ2VuZXJhdGUgbmV3XG4gICAgICBjb25zdCBzZXNzaW9uSWQgPSAocmVxLmhlYWRlcnMubG9nU2Vzc2lvbklkIHx8IHV1aWR2NCgpKS50b1N0cmluZygpXG4gICAgICByZXEuc2Vzc2lvbiA9IHtcbiAgICAgICAgaWQ6IHNlc3Npb25JZCxcbiAgICAgICAgbG9nZ2VyOiBnbG9iYWwubG9nZ2VyLmNoaWxkKHsgdGFnczogeyBzZXNzaW9uSWQgfSB9KSxcbiAgICAgIH0gYXMgU2Vzc2lvblxuXG4gICAgICAvLyBmaXhtZSBmaW5kIGEgYmV0dGVyIHdheSB0byBjaGVjayBpZiB1cmwgaXMgYWxsb3dlZFxuICAgICAgaWYgKGFsbG93ZWRVcmxQYXRocy5pbmNsdWRlcyhyZXEudXJsLnNwbGl0KCc/JylbMF0pKSByZXR1cm4gbmV4dCgpXG5cbiAgICAgIHJlcS5zZXNzaW9uLmxvZ2dlci5kZWJ1ZygncmVxdWVzdCB0aGF0IG5lZWQgYXV0aCcsIHJlcSlcblxuICAgICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5hbGxvd2VkVG9rZW5zKSB7XG4gICAgICAgIGZvciAoY29uc3QgYXQgb2Ygb3B0aW9ucy5hbGxvd2VkVG9rZW5zKSB7XG4gICAgICAgICAgaWYgKGF0LnVybHMgJiYgYXQudXJscy5maWx0ZXIoQm9vbGVhbikubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgaWYgKCFhdC51cmxzLmluY2x1ZGVzKHJlcS51cmwuc3BsaXQoJz8nKVswXSkpIGNvbnRpbnVlXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChhdC5leHBlY3RlZFRva2VuID09PSBnZXQocmVxLCBhdC50b2tlbkxvY2F0aW9uKSkgcmV0dXJuIG5leHQoKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIGNoZWNrIGhlYWRlciBvciB1cmwgcGFyYW1ldGVycyBvciBwb3N0IHBhcmFtZXRlcnMgZm9yIHRva2VuXG4gICAgICAvLyBsZXQgdG9rZW4gPSByZXEuYm9keS50b2tlbiB8fCByZXEucXVlcnkudG9rZW4gfHwgcmVxLmhlYWRlcnNbJ2F1dGhvcml6YXRpb24nXTtcbiAgICAgIGNvbnN0IGF1dGhUb2tlbiA9IHRva2VuLmNsZWFuVG9rZW4ocmVxLmhlYWRlcnMuYXV0aG9yaXphdGlvbiB8fCAnJylcbiAgICAgIGlmIChhbGxvd2VkQXBwQXV0aEtleXMuaW5jbHVkZXMoYXV0aFRva2VuKSkgcmV0dXJuIG5leHQoKVxuXG4gICAgICBpZiAoIWF1dGhUb2tlbikge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDMpLnNlbmQoe1xuICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICAgIG1lc3NhZ2U6ICdObyB0b2tlbiBwcm92aWRlZC4nLFxuICAgICAgICB9KVxuICAgICAgfVxuXG4gICAgICByZXEuc2Vzc2lvbi5yZXF1ZXN0TVNPcHRpb25zID0gKHVyaTogc3RyaW5nLCByZXF1ZXN0T3B0aW9ucz86IGFueSkgPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHVyaTogYGh0dHA6Ly8ke3JlcS5oZWFkZXJzLmhvc3R9JHt1cml9YCxcbiAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICBhdXRob3JpemF0aW9uOiByZXEuaGVhZGVycy5hdXRob3JpemF0aW9uLFxuICAgICAgICAgICAgLi4uKHJlcXVlc3RPcHRpb25zICYmIHJlcXVlc3RPcHRpb25zLmhlYWRlcnMgPyByZXF1ZXN0T3B0aW9ucy5oZWFkZXJzIDoge30pLFxuICAgICAgICAgIH0sXG4gICAgICAgICAganNvbjogdHJ1ZSxcbiAgICAgICAgICAuLi4ocmVxdWVzdE9wdGlvbnMgfHwge30pLFxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGp3dC52ZXJpZnkoYXV0aFRva2VuLCBvcHRpb25zLmF1dGhvcml6YXRpb25QdWJsaWNLZXksIChlcnI6IGFueSwgZGVjb2RlZDogYW55KSA9PiB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICByZXEuc2Vzc2lvbiEubG9nZ2VyLndhcm4oZXJyKVxuICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMSkuc2VuZCh7XG4gICAgICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgICAgIG1lc3NhZ2U6ICdGYWlsZWQgdG8gYXV0aGVudGljYXRlIHRva2VuLicsXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBpZiBldmVyeXRoaW5nIGlzIGdvb2QsIHNhdmUgdG8gcmVxdWVzdCBmb3IgdXNlIGluIG90aGVyIHJvdXRlXG4gICAgICAgICAgY29uc3QgdXNlckRhdGEgPSB0b2tlbi5nZW5lcmF0ZVVzZXJEYXRhKGRlY29kZWQpXG4gICAgICAgICAgcmVxLnNlc3Npb24hLnVzZXJEYXRhID0gdXNlckRhdGFcbiAgICAgICAgICByZXEuc2Vzc2lvbiEubG9nZ2VyID0gZ2xvYmFsLmxvZ2dlci5jaGlsZCh7IHRhZ3M6IHsgc2Vzc2lvbklkOiByZXEuc2Vzc2lvbiEuaWQsIHVzZXJEYXRhIH0gfSlcbiAgICAgICAgICByZXR1cm4gbmV4dCgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcbiAgfSxcblxuICBjbGVhblRva2VuOiAoYXV0aFRva2VuOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICAgIGNvbnN0IHRva2VuU3BsaXQgPSBhdXRoVG9rZW4uc3BsaXQoJyAnKVxuICAgIHJldHVybiB0b2tlblNwbGl0W3Rva2VuU3BsaXQubGVuZ3RoIC0gMV1cbiAgfSxcblxuICBnZW5lcmF0ZVVzZXJEYXRhOiAoZGVjb2RlZDogYW55KTogVXNlckRhdGEgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICBpZDogZ2V0KGRlY29kZWQsICdpZCcsIG51bGwpLFxuICAgICAgbmFtZTogZ2V0KGRlY29kZWQsICduYW1lJywgbnVsbCksXG4gICAgICB0ZW5hbnRJZDogZ2V0KGRlY29kZWQsICdwZXJzb25hbFRlbmFudElkJywgbnVsbCksXG4gICAgICBleHA6IGdldChkZWNvZGVkLCAnZXhwJywgbnVsbCksXG4gICAgICBpYXQ6IGdldChkZWNvZGVkLCAnaWF0JywgbnVsbCksXG4gICAgfVxuICB9LFxufVxuXG5leHBvcnQgeyB0b2tlbiB9XG4iXX0=