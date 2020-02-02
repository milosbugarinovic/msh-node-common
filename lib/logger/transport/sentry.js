"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_transport_sentry_node_1 = __importDefault(require("winston-transport-sentry-node"));
const os = require('os');
const sentryTransport = {
    create: (options, defaultMega = {}) => {
        options = options || {};
        options.level = options.level || 'error';
        options.sentry = options.sentry || {};
        if (!options.sentry.dsn)
            throw new Error('Sentry requires dsn');
        options.sentry.serverName = options.sentry.serverName || os.hostname();
        options.sentry.environment = options.sentry.environment || defaultMega.environment;
        options.sentry.release = options.sentry.release || defaultMega.release;
        return new winston_transport_sentry_node_1.default(options);
    },
};
exports.sentryTransport = sentryTransport;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VudHJ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xvZ2dlci90cmFuc3BvcnQvc2VudHJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0dBQWtEO0FBR2xELE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUV4QixNQUFNLGVBQWUsR0FBRztJQUN0QixNQUFNLEVBQUUsQ0FBQyxPQUEyQyxFQUFFLGNBQW1CLEVBQUUsRUFBRSxFQUFFO1FBQzdFLE9BQU8sR0FBRyxPQUFPLElBQUksRUFBRSxDQUFBO1FBQ3ZCLE9BQU8sQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssSUFBSSxPQUFPLENBQUE7UUFFeEMsT0FBTyxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQTtRQUNyQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHO1lBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFBO1FBRS9ELE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBVSxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQTtRQUN0RSxPQUFPLENBQUMsTUFBTSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLFdBQVcsSUFBSSxXQUFXLENBQUMsV0FBVyxDQUFBO1FBQ2xGLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxJQUFJLFdBQVcsQ0FBQyxPQUFPLENBQUE7UUFFdEUsT0FBTyxJQUFJLHVDQUFNLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDNUIsQ0FBQztDQUNGLENBQUE7QUFFUSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTZW50cnkgZnJvbSAnd2luc3Rvbi10cmFuc3BvcnQtc2VudHJ5LW5vZGUnXG5pbXBvcnQgeyBTZW50cnlUcmFuc3BvcnRPcHRpb25zIH0gZnJvbSAnLi4vLi4vdXRpbC9jdXN0b21UeXBpbmdzJ1xuXG5jb25zdCBvcyA9IHJlcXVpcmUoJ29zJylcblxuY29uc3Qgc2VudHJ5VHJhbnNwb3J0ID0ge1xuICBjcmVhdGU6IChvcHRpb25zOiBTZW50cnlUcmFuc3BvcnRPcHRpb25zIHwgdW5kZWZpbmVkLCBkZWZhdWx0TWVnYTogYW55ID0ge30pID0+IHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuICAgIG9wdGlvbnMubGV2ZWwgPSBvcHRpb25zLmxldmVsIHx8ICdlcnJvcidcblxuICAgIG9wdGlvbnMuc2VudHJ5ID0gb3B0aW9ucy5zZW50cnkgfHwge31cbiAgICBpZiAoIW9wdGlvbnMuc2VudHJ5LmRzbikgdGhyb3cgbmV3IEVycm9yKCdTZW50cnkgcmVxdWlyZXMgZHNuJylcblxuICAgIG9wdGlvbnMuc2VudHJ5LnNlcnZlck5hbWUgPSBvcHRpb25zLnNlbnRyeS5zZXJ2ZXJOYW1lIHx8IG9zLmhvc3RuYW1lKClcbiAgICBvcHRpb25zLnNlbnRyeS5lbnZpcm9ubWVudCA9IG9wdGlvbnMuc2VudHJ5LmVudmlyb25tZW50IHx8IGRlZmF1bHRNZWdhLmVudmlyb25tZW50XG4gICAgb3B0aW9ucy5zZW50cnkucmVsZWFzZSA9IG9wdGlvbnMuc2VudHJ5LnJlbGVhc2UgfHwgZGVmYXVsdE1lZ2EucmVsZWFzZVxuXG4gICAgcmV0dXJuIG5ldyBTZW50cnkob3B0aW9ucylcbiAgfSxcbn1cblxuZXhwb3J0IHsgc2VudHJ5VHJhbnNwb3J0IH1cbiJdfQ==