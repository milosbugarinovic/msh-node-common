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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXV0aC90b2tlbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFDQSxrREFBbUM7QUFDbkMsbUNBQTRCO0FBQzVCLGlEQUE0QjtBQUM1QixzQ0FBbUM7QUFHbkMsTUFBTSxLQUFLLEdBQUc7SUFDWixLQUFLLEVBQUUsQ0FBQyxPQUEwQixFQUFRLEVBQUU7UUFDMUMsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQTtRQUM3QixNQUFNLGtCQUFrQixHQUFHLE9BQU8sQ0FBQyxrQkFBa0IsSUFBSSxFQUFFLENBQUE7UUFDM0QsTUFBTSxlQUFlLEdBQUcsT0FBTyxDQUFDLGVBQWUsSUFBSSxFQUFFLENBQUE7UUFDckQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDO1lBQUUsZUFBZSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUU3RCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBbUIsRUFBRSxHQUFhLEVBQUUsSUFBa0IsRUFBRSxFQUFFO1lBQ3BFLHlDQUF5QztZQUN6QyxNQUFNLFNBQVMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsWUFBWSxJQUFJLFlBQU0sRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUE7WUFDbkUsR0FBRyxDQUFDLE9BQU8sR0FBRztnQkFDWixFQUFFLEVBQUUsU0FBUztnQkFDYixNQUFNLEVBQUUsZ0JBQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLENBQUM7YUFDL0IsQ0FBQTtZQUVaLHFEQUFxRDtZQUNyRCxJQUFJLGVBQWUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQUUsT0FBTyxJQUFJLEVBQUUsQ0FBQTtZQUVsRSw4REFBOEQ7WUFDOUQsaUZBQWlGO1lBQ2pGLE1BQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxhQUFhLElBQUksRUFBRSxDQUFDLENBQUE7WUFDbkUsSUFBSSxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDO2dCQUFFLE9BQU8sSUFBSSxFQUFFLENBQUE7WUFFekQsSUFBSSxDQUFDLFNBQVMsRUFBRTtnQkFDZCxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO29CQUMxQixPQUFPLEVBQUUsS0FBSztvQkFDZCxPQUFPLEVBQUUsb0JBQW9CO2lCQUM5QixDQUFDLENBQUE7YUFDSDtZQUVELEdBQUcsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxHQUFXLEVBQUUsY0FBb0IsRUFBRSxFQUFFO2dCQUNuRSx1QkFDRSxHQUFHLEVBQUUsVUFBVSxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxHQUFHLEVBQUUsRUFDdkMsT0FBTyxrQkFDTCxhQUFhLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxhQUFhLElBQ3JDLENBQUMsY0FBYyxJQUFJLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUU3RSxJQUFJLEVBQUUsSUFBSSxJQUNQLENBQUMsY0FBYyxJQUFJLEVBQUUsQ0FBQyxFQUMxQjtZQUNILENBQUMsQ0FBQTtZQUVELEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxzQkFBc0IsRUFBRSxDQUFDLEdBQVEsRUFBRSxPQUFZLEVBQUUsRUFBRTtnQkFDL0UsSUFBSSxHQUFHLEVBQUU7b0JBQ1AsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7b0JBQ3ZCLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7d0JBQzFCLE9BQU8sRUFBRSxLQUFLO3dCQUNkLE9BQU8sRUFBRSwrQkFBK0I7cUJBQ3pDLENBQUMsQ0FBQTtpQkFDSDtxQkFBTTtvQkFDTCxnRUFBZ0U7b0JBQ2hFLE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQTtvQkFDaEQsR0FBRyxDQUFDLE9BQVEsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFBO29CQUNoQyxHQUFHLENBQUMsT0FBUSxDQUFDLE1BQU0sR0FBRyxnQkFBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQTtvQkFDakUsT0FBTyxJQUFJLEVBQUUsQ0FBQTtpQkFDZDtZQUNILENBQUMsQ0FBQyxDQUFBO1FBQ0osQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQsVUFBVSxFQUFFLENBQUMsU0FBaUIsRUFBVSxFQUFFO1FBQ3hDLE1BQU0sVUFBVSxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDdkMsT0FBTyxVQUFVLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQTtJQUMxQyxDQUFDO0lBRUQsZ0JBQWdCLEVBQUUsQ0FBQyxPQUFZLEVBQVksRUFBRTtRQUMzQyxPQUFPO1lBQ0wsRUFBRSxFQUFFLFlBQUcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQztZQUM1QixJQUFJLEVBQUUsWUFBRyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDO1lBQ2hDLFFBQVEsRUFBRSxZQUFHLENBQUMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLElBQUksQ0FBQztZQUNoRCxHQUFHLEVBQUUsWUFBRyxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDO1lBQzlCLEdBQUcsRUFBRSxZQUFHLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUM7U0FDL0IsQ0FBQTtJQUNILENBQUM7Q0FDRixDQUFBO0FBRVEsc0JBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0RnVuY3Rpb24sIFJlc3BvbnNlIH0gZnJvbSAnZXhwcmVzcydcbmltcG9ydCAqIGFzIGp3dCBmcm9tICdqc29ud2VidG9rZW4nXG5pbXBvcnQgeyBnZXQgfSBmcm9tICdsb2Rhc2gnXG5pbXBvcnQgdXVpZHY0IGZyb20gJ3V1aWQvdjQnXG5pbXBvcnQgeyB3aW5zdG9uIH0gZnJvbSAnLi4vbG9nZ2VyJ1xuaW1wb3J0IHsgQ2hlY2tUb2tlbk9wdGlvbnMsIFJlcXVlc3RNU09wdGlvbnMsIFJlcXVlc3RTZXNzaW9uLCBTZXNzaW9uLCBVc2VyRGF0YSB9IGZyb20gJy4uL3V0aWwvY3VzdG9tVHlwaW5ncydcblxuY29uc3QgdG9rZW4gPSB7XG4gIGNoZWNrOiAob3B0aW9uczogQ2hlY2tUb2tlbk9wdGlvbnMpOiB2b2lkID0+IHtcbiAgICBjb25zdCByb3V0ZXIgPSBvcHRpb25zLnJvdXRlclxuICAgIGNvbnN0IGFsbG93ZWRBcHBBdXRoS2V5cyA9IG9wdGlvbnMuYWxsb3dlZEFwcEF1dGhLZXlzIHx8IFtdXG4gICAgY29uc3QgYWxsb3dlZFVybFBhdGhzID0gb3B0aW9ucy5hbGxvd2VkVXJsUGF0aHMgfHwgW11cbiAgICBpZiAoIWFsbG93ZWRVcmxQYXRocy5pbmNsdWRlcygnLycpKSBhbGxvd2VkVXJsUGF0aHMucHVzaCgnLycpXG5cbiAgICByb3V0ZXIudXNlKChyZXE6IFJlcXVlc3RTZXNzaW9uLCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pID0+IHtcbiAgICAgIC8vIGlmIHRoZXJlIGlzIG5vIHNlc3Npb24gaWQgZ2VuZXJhdGUgbmV3XG4gICAgICBjb25zdCBzZXNzaW9uSWQgPSAocmVxLmhlYWRlcnMubG9nU2Vzc2lvbklkIHx8IHV1aWR2NCgpKS50b1N0cmluZygpXG4gICAgICByZXEuc2Vzc2lvbiA9IHtcbiAgICAgICAgaWQ6IHNlc3Npb25JZCxcbiAgICAgICAgbG9nZ2VyOiB3aW5zdG9uLmNyZWF0ZSh7IGlkOiBzZXNzaW9uSWQgfSksXG4gICAgICB9IGFzIFNlc3Npb25cblxuICAgICAgLy8gZml4bWUgZmluZCBhIGJldHRlciB3YXkgdG8gY2hlY2sgaWYgdXJsIGlzIGFsbG93ZWRcbiAgICAgIGlmIChhbGxvd2VkVXJsUGF0aHMuaW5jbHVkZXMocmVxLnVybC5zcGxpdCgnPycpWzBdKSkgcmV0dXJuIG5leHQoKVxuXG4gICAgICAvLyBjaGVjayBoZWFkZXIgb3IgdXJsIHBhcmFtZXRlcnMgb3IgcG9zdCBwYXJhbWV0ZXJzIGZvciB0b2tlblxuICAgICAgLy8gbGV0IHRva2VuID0gcmVxLmJvZHkudG9rZW4gfHwgcmVxLnF1ZXJ5LnRva2VuIHx8IHJlcS5oZWFkZXJzWydhdXRob3JpemF0aW9uJ107XG4gICAgICBjb25zdCBhdXRoVG9rZW4gPSB0b2tlbi5jbGVhblRva2VuKHJlcS5oZWFkZXJzLmF1dGhvcml6YXRpb24gfHwgJycpXG4gICAgICBpZiAoYWxsb3dlZEFwcEF1dGhLZXlzLmluY2x1ZGVzKGF1dGhUb2tlbikpIHJldHVybiBuZXh0KClcblxuICAgICAgaWYgKCFhdXRoVG9rZW4pIHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAzKS5zZW5kKHtcbiAgICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgICBtZXNzYWdlOiAnTm8gdG9rZW4gcHJvdmlkZWQuJyxcbiAgICAgICAgfSlcbiAgICAgIH1cblxuICAgICAgcmVxLnNlc3Npb24ucmVxdWVzdE1TT3B0aW9ucyA9ICh1cmk6IHN0cmluZywgcmVxdWVzdE9wdGlvbnM/OiBhbnkpID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB1cmk6IGBodHRwOi8vJHtyZXEuaGVhZGVycy5ob3N0fSR7dXJpfWAsXG4gICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgYXV0aG9yaXphdGlvbjogcmVxLmhlYWRlcnMuYXV0aG9yaXphdGlvbixcbiAgICAgICAgICAgIC4uLihyZXF1ZXN0T3B0aW9ucyAmJiByZXF1ZXN0T3B0aW9ucy5oZWFkZXJzID8gcmVxdWVzdE9wdGlvbnMuaGVhZGVycyA6IHt9KSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGpzb246IHRydWUsXG4gICAgICAgICAgLi4uKHJlcXVlc3RPcHRpb25zIHx8IHt9KSxcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBqd3QudmVyaWZ5KGF1dGhUb2tlbiwgb3B0aW9ucy5hdXRob3JpemF0aW9uUHVibGljS2V5LCAoZXJyOiBhbnksIGRlY29kZWQ6IGFueSkgPT4ge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgZ2xvYmFsLmxvZ2dlci53YXJuKGVycilcbiAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDEpLnNlbmQoe1xuICAgICAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgICAgICBtZXNzYWdlOiAnRmFpbGVkIHRvIGF1dGhlbnRpY2F0ZSB0b2tlbi4nLFxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gaWYgZXZlcnl0aGluZyBpcyBnb29kLCBzYXZlIHRvIHJlcXVlc3QgZm9yIHVzZSBpbiBvdGhlciByb3V0ZVxuICAgICAgICAgIGNvbnN0IHVzZXJEYXRhID0gdG9rZW4uZ2VuZXJhdGVVc2VyRGF0YShkZWNvZGVkKVxuICAgICAgICAgIHJlcS5zZXNzaW9uIS51c2VyRGF0YSA9IHVzZXJEYXRhXG4gICAgICAgICAgcmVxLnNlc3Npb24hLmxvZ2dlciA9IHdpbnN0b24uY3JlYXRlKHsgaWQ6IHNlc3Npb25JZCwgdXNlckRhdGEgfSlcbiAgICAgICAgICByZXR1cm4gbmV4dCgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcbiAgfSxcblxuICBjbGVhblRva2VuOiAoYXV0aFRva2VuOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICAgIGNvbnN0IHRva2VuU3BsaXQgPSBhdXRoVG9rZW4uc3BsaXQoJyAnKVxuICAgIHJldHVybiB0b2tlblNwbGl0W3Rva2VuU3BsaXQubGVuZ3RoIC0gMV1cbiAgfSxcblxuICBnZW5lcmF0ZVVzZXJEYXRhOiAoZGVjb2RlZDogYW55KTogVXNlckRhdGEgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICBpZDogZ2V0KGRlY29kZWQsICdpZCcsIG51bGwpLFxuICAgICAgbmFtZTogZ2V0KGRlY29kZWQsICduYW1lJywgbnVsbCksXG4gICAgICB0ZW5hbnRJZDogZ2V0KGRlY29kZWQsICdwZXJzb25hbFRlbmFudElkJywgbnVsbCksXG4gICAgICBleHA6IGdldChkZWNvZGVkLCAnZXhwJywgbnVsbCksXG4gICAgICBpYXQ6IGdldChkZWNvZGVkLCAnaWF0JywgbnVsbCksXG4gICAgfVxuICB9LFxufVxuXG5leHBvcnQgeyB0b2tlbiB9XG4iXX0=