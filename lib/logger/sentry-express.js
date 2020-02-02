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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VudHJ5LWV4cHJlc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbG9nZ2VyL3NlbnRyeS1leHByZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLHFEQUFzQztBQUV0Qyw2Q0FBOEM7QUFROUMsTUFBTSxhQUFhLEdBQUc7SUFDcEIsSUFBSSxFQUFFLENBQUMsT0FBcUIsRUFBUSxFQUFFO1FBQ3BDLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUM3QixDQUFDO0lBQ0Q7Ozs7T0FJRztJQUNILGNBQWMsRUFBRSxDQUFDLEdBQVksRUFBUSxFQUFFO1FBQ3JDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxjQUFjLEVBQW9CLENBQUMsQ0FBQTtJQUM3RCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILFlBQVksRUFBRSxDQUFDLEdBQVksRUFBUSxFQUFFO1FBQ25DLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQXlCLENBQUMsQ0FBQTtRQUM5RCxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBUSxFQUFFLEdBQVEsRUFBRSxHQUFRLEVBQUUsRUFBRTtZQUN2QyxHQUFHLENBQUMsVUFBVSxHQUFHLENBQUMsR0FBRyxZQUFZLGdCQUFTLENBQUMsQ0FBQyxDQUFFLEdBQWlCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUE7WUFDckYsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDaEUsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0NBQ0YsQ0FBQTtBQUNRLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgU2VudHJ5IGZyb20gJ0BzZW50cnkvbm9kZSdcbmltcG9ydCB7IEVycm9yUmVxdWVzdEhhbmRsZXIsIEV4cHJlc3MsIFJlcXVlc3RIYW5kbGVyIH0gZnJvbSAnZXhwcmVzcydcbmltcG9ydCB7IEh0dHBFcnJvciB9IGZyb20gJy4uL2h0dHAvZXJyb3IvYmFzZSdcblxuaW50ZXJmYWNlIFNlbnRyeUNvbmZpZyB7XG4gIGRzbjogc3RyaW5nXG4gIGVudmlyb25tZW50OiBzdHJpbmdcbiAgZGVmYXVsdEludGVncmF0aW9uczogYW55W11cbn1cblxuY29uc3Qgc2VudHJ5RXhwcmVzcyA9IHtcbiAgaW5pdDogKG9wdGlvbnM6IFNlbnRyeUNvbmZpZyk6IHZvaWQgPT4ge1xuICAgIHJldHVybiBTZW50cnkuaW5pdChvcHRpb25zKVxuICB9LFxuICAvKipcbiAgICogU2V0dXAgZXhwcmVzcyByZXF1ZXN0SGFuZGxlclxuICAgKiBDYWxsIGJlZm9yZSBhbnkgcm91dGUgaXMgY2FsbGVkXG4gICAqIEBwYXJhbSBhcHBcbiAgICovXG4gIHJlcXVlc3RIYW5kbGVyOiAoYXBwOiBFeHByZXNzKTogdm9pZCA9PiB7XG4gICAgYXBwLnVzZShTZW50cnkuSGFuZGxlcnMucmVxdWVzdEhhbmRsZXIoKSBhcyBSZXF1ZXN0SGFuZGxlcilcbiAgfSxcblxuICAvKipcbiAgICogU2V0dXAgZXhwcmVzcyBlcnJvckhhbmRsZXJcbiAgICogQ2FsbCBhZnRlciBhbGwgcm91dGVzIGFyZSBhbHJlYWR5IHNldHVwXG4gICAqIEBwYXJhbSBhcHBcbiAgICovXG4gIGVycm9ySGFuZGxlcjogKGFwcDogRXhwcmVzcyk6IHZvaWQgPT4ge1xuICAgIGFwcC51c2UoU2VudHJ5LkhhbmRsZXJzLmVycm9ySGFuZGxlcigpIGFzIEVycm9yUmVxdWVzdEhhbmRsZXIpXG4gICAgYXBwLnVzZSgoZXJyOiBhbnksIHJlcTogYW55LCByZXM6IGFueSkgPT4ge1xuICAgICAgcmVzLnN0YXR1c0NvZGUgPSAoZXJyIGluc3RhbmNlb2YgSHR0cEVycm9yID8gKGVyciBhcyBIdHRwRXJyb3IpLnN0YXR1cyA6IG51bGwpIHx8IDUwMFxuICAgICAgcmVzLmVuZChlcnIubWVzc2FnZSArIChyZXMuc2VudHJ5ID8gYFxcbiR7cmVzLnNlbnRyeX1cXG5gIDogJycpKVxuICAgIH0pXG4gIH0sXG59XG5leHBvcnQgeyBzZW50cnlFeHByZXNzIH1cbiJdfQ==