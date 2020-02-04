"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_elasticsearch_1 = __importDefault(require("winston-elasticsearch"));
const elasticSearchTransport = {
    create: (options) => {
        options = options || {};
        options.level = options.level || 'info';
        return new winston_elasticsearch_1.default(options);
    },
};
exports.elasticSearchTransport = elasticSearchTransport;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxzYXRpY3NlYXJjaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sb2dnZXIvdHJhbnNwb3J0L2Vsc2F0aWNzZWFyY2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxrRkFBaUQ7QUFHakQsTUFBTSxzQkFBc0IsR0FBRztJQUM3QixNQUFNLEVBQUUsQ0FBQyxPQUFzQyxFQUFFLEVBQUU7UUFDakQsT0FBTyxHQUFHLE9BQU8sSUFBSSxFQUFFLENBQUE7UUFDdkIsT0FBTyxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxJQUFJLE1BQU0sQ0FBQTtRQUN2QyxPQUFPLElBQUksK0JBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUNuQyxDQUFDO0NBQ0YsQ0FBQTtBQUVRLHdEQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFbGFzdGljU2VhcmNoIGZyb20gJ3dpbnN0b24tZWxhc3RpY3NlYXJjaCdcbmltcG9ydCB7IEVsYXN0aWNTZWFyY2hUcmFuc3BvcnRPcHRpb25zIH0gZnJvbSAnLi4vLi4vdXRpbC9jdXN0b21UeXBpbmdzJ1xuXG5jb25zdCBlbGFzdGljU2VhcmNoVHJhbnNwb3J0ID0ge1xuICBjcmVhdGU6IChvcHRpb25zOiBFbGFzdGljU2VhcmNoVHJhbnNwb3J0T3B0aW9ucykgPT4ge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG4gICAgb3B0aW9ucy5sZXZlbCA9IG9wdGlvbnMubGV2ZWwgfHwgJ2luZm8nXG4gICAgcmV0dXJuIG5ldyBFbGFzdGljU2VhcmNoKG9wdGlvbnMpXG4gIH0sXG59XG5cbmV4cG9ydCB7IGVsYXN0aWNTZWFyY2hUcmFuc3BvcnQgfVxuIl19