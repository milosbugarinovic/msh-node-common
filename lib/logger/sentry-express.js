"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Sentry = __importStar(require("@sentry/node"));
const base_1 = require("../http/error/base");
const sentryExpress = {
    init: (options) => {
        return Sentry.init(options);
    },
    /**
     * Setup express requestHandler
     * Call before any route is called
     * @param app
     */
    requestHandler: (app) => {
        app.use(Sentry.Handlers.requestHandler());
    },
    /**
     * Setup express errorHandler
     * Call after all routes are already setup
     * @param app
     */
    errorHandler: (app) => {
        app.use(Sentry.Handlers.errorHandler());
        app.use((err, req, res) => {
            res.statusCode = (err instanceof base_1.HttpError ? err.status : null) || 500;
            res.end(err.message + (res.sentry ? `\n${res.sentry}\n` : ''));
        });
    },
};
exports.sentryExpress = sentryExpress;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VudHJ5LWV4cHJlc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbG9nZ2VyL3NlbnRyeS1leHByZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLHFEQUFzQztBQUV0Qyw2Q0FBOEM7QUFTOUMsTUFBTSxhQUFhLEdBQUc7SUFDcEIsSUFBSSxFQUFFLENBQUMsT0FBcUIsRUFBUSxFQUFFO1FBQ3BDLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUM3QixDQUFDO0lBQ0Q7Ozs7T0FJRztJQUNILGNBQWMsRUFBRSxDQUFDLEdBQVksRUFBUSxFQUFFO1FBQ3JDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxjQUFjLEVBQW9CLENBQUMsQ0FBQTtJQUM3RCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILFlBQVksRUFBRSxDQUFDLEdBQVksRUFBUSxFQUFFO1FBQ25DLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQXlCLENBQUMsQ0FBQTtRQUM5RCxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBUSxFQUFFLEdBQVEsRUFBRSxHQUFRLEVBQUUsRUFBRTtZQUN2QyxHQUFHLENBQUMsVUFBVSxHQUFHLENBQUMsR0FBRyxZQUFZLGdCQUFTLENBQUMsQ0FBQyxDQUFFLEdBQWlCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUE7WUFDckYsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDaEUsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0NBQ0YsQ0FBQTtBQUNRLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgU2VudHJ5IGZyb20gJ0BzZW50cnkvbm9kZSdcbmltcG9ydCB7IEVycm9yUmVxdWVzdEhhbmRsZXIsIEV4cHJlc3MsIFJlcXVlc3RIYW5kbGVyIH0gZnJvbSAnZXhwcmVzcydcbmltcG9ydCB7IEh0dHBFcnJvciB9IGZyb20gJy4uL2h0dHAvZXJyb3IvYmFzZSdcblxuaW50ZXJmYWNlIFNlbnRyeUNvbmZpZyB7XG4gIGRzbjogc3RyaW5nXG4gIGVudmlyb25tZW50OiBzdHJpbmdcbiAgZGVmYXVsdEludGVncmF0aW9uczogYW55W11cbiAgcmVsZWFzZTogc3RyaW5nXG59XG5cbmNvbnN0IHNlbnRyeUV4cHJlc3MgPSB7XG4gIGluaXQ6IChvcHRpb25zOiBTZW50cnlDb25maWcpOiB2b2lkID0+IHtcbiAgICByZXR1cm4gU2VudHJ5LmluaXQob3B0aW9ucylcbiAgfSxcbiAgLyoqXG4gICAqIFNldHVwIGV4cHJlc3MgcmVxdWVzdEhhbmRsZXJcbiAgICogQ2FsbCBiZWZvcmUgYW55IHJvdXRlIGlzIGNhbGxlZFxuICAgKiBAcGFyYW0gYXBwXG4gICAqL1xuICByZXF1ZXN0SGFuZGxlcjogKGFwcDogRXhwcmVzcyk6IHZvaWQgPT4ge1xuICAgIGFwcC51c2UoU2VudHJ5LkhhbmRsZXJzLnJlcXVlc3RIYW5kbGVyKCkgYXMgUmVxdWVzdEhhbmRsZXIpXG4gIH0sXG5cbiAgLyoqXG4gICAqIFNldHVwIGV4cHJlc3MgZXJyb3JIYW5kbGVyXG4gICAqIENhbGwgYWZ0ZXIgYWxsIHJvdXRlcyBhcmUgYWxyZWFkeSBzZXR1cFxuICAgKiBAcGFyYW0gYXBwXG4gICAqL1xuICBlcnJvckhhbmRsZXI6IChhcHA6IEV4cHJlc3MpOiB2b2lkID0+IHtcbiAgICBhcHAudXNlKFNlbnRyeS5IYW5kbGVycy5lcnJvckhhbmRsZXIoKSBhcyBFcnJvclJlcXVlc3RIYW5kbGVyKVxuICAgIGFwcC51c2UoKGVycjogYW55LCByZXE6IGFueSwgcmVzOiBhbnkpID0+IHtcbiAgICAgIHJlcy5zdGF0dXNDb2RlID0gKGVyciBpbnN0YW5jZW9mIEh0dHBFcnJvciA/IChlcnIgYXMgSHR0cEVycm9yKS5zdGF0dXMgOiBudWxsKSB8fCA1MDBcbiAgICAgIHJlcy5lbmQoZXJyLm1lc3NhZ2UgKyAocmVzLnNlbnRyeSA/IGBcXG4ke3Jlcy5zZW50cnl9XFxuYCA6ICcnKSlcbiAgICB9KVxuICB9LFxufVxuZXhwb3J0IHsgc2VudHJ5RXhwcmVzcyB9XG4iXX0=