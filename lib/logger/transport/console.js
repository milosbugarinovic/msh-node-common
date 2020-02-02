"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const { combine, timestamp, json } = winston_1.format;
const consoleTransport = {
    create: (options) => {
        options = options || {};
        options.level = options.level || 'info';
        return new winston_1.transports.Console({
            level: options.level,
            format: combine(timestamp(), json()),
        });
    },
};
exports.consoleTransport = consoleTransport;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc29sZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sb2dnZXIvdHJhbnNwb3J0L2NvbnNvbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxQ0FBNEM7QUFHNUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLEdBQUcsZ0JBQU0sQ0FBQTtBQUUzQyxNQUFNLGdCQUFnQixHQUFHO0lBQ3ZCLE1BQU0sRUFBRSxDQUFDLE9BQTRDLEVBQUUsRUFBRTtRQUN2RCxPQUFPLEdBQUcsT0FBTyxJQUFJLEVBQUUsQ0FBQTtRQUN2QixPQUFPLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLElBQUksTUFBTSxDQUFBO1FBQ3ZDLE9BQU8sSUFBSSxvQkFBVSxDQUFDLE9BQU8sQ0FBQztZQUM1QixLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUs7WUFDcEIsTUFBTSxFQUFFLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQztTQUNyQyxDQUFDLENBQUE7SUFDSixDQUFDO0NBQ0YsQ0FBQTtBQUVRLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGZvcm1hdCwgdHJhbnNwb3J0cyB9IGZyb20gJ3dpbnN0b24nXG5pbXBvcnQgeyBXaW5zdG9uVHJhbnNwb3J0T3B0aW9ucyB9IGZyb20gJy4uLy4uL3V0aWwvY3VzdG9tVHlwaW5ncydcblxuY29uc3QgeyBjb21iaW5lLCB0aW1lc3RhbXAsIGpzb24gfSA9IGZvcm1hdFxuXG5jb25zdCBjb25zb2xlVHJhbnNwb3J0ID0ge1xuICBjcmVhdGU6IChvcHRpb25zOiBXaW5zdG9uVHJhbnNwb3J0T3B0aW9ucyB8IHVuZGVmaW5lZCkgPT4ge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG4gICAgb3B0aW9ucy5sZXZlbCA9IG9wdGlvbnMubGV2ZWwgfHwgJ2luZm8nXG4gICAgcmV0dXJuIG5ldyB0cmFuc3BvcnRzLkNvbnNvbGUoe1xuICAgICAgbGV2ZWw6IG9wdGlvbnMubGV2ZWwsXG4gICAgICBmb3JtYXQ6IGNvbWJpbmUodGltZXN0YW1wKCksIGpzb24oKSksXG4gICAgfSlcbiAgfSxcbn1cblxuZXhwb3J0IHsgY29uc29sZVRyYW5zcG9ydCB9XG4iXX0=