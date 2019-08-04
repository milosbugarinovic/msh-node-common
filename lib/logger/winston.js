"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const SentryTransport_1 = require("./SentryTransport");
const { combine, timestamp } = winston_1.format;
const winston = {
    /**
     * Create Winston logger with sentry transport
     * Sentry must be registered first
     */
    create: (session = { id: 'global' }, consoleLogLevel = 'debug', sentryLogLevel = 'error') => {
        const sessionMetaDataJsonFormatter = logEntry => {
            const base = {
                sessionId: session.id,
            };
            if (session.userData) {
                base.userId = session.userData.id;
                base.userName = session.userData.name;
                base.userTenantId = session.userData.tenantId;
                base.userExp = session.userData.exp;
                base.userIat = session.userData.iat;
            }
            const jsonLogEntry = Object.assign(base, logEntry);
            logEntry[Symbol.for('message')] = JSON.stringify(jsonLogEntry);
            return logEntry;
        };
        const transports = [
            new winston_1.transports.Console({
                level: consoleLogLevel,
                format: combine(timestamp(), winston_1.format(sessionMetaDataJsonFormatter)()),
            }),
            new SentryTransport_1.SentryTransport({ level: sentryLogLevel }),
        ];
        const exceptionHandlers = [new winston_1.transports.Console()];
        return winston_1.createLogger({
            transports,
            exceptionHandlers,
        });
    },
};
exports.winston = winston;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2luc3Rvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9sb2dnZXIvd2luc3Rvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHFDQUE0RjtBQUU1Rix1REFBbUQ7QUFFbkQsTUFBTSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsR0FBRyxnQkFBTyxDQUFBO0FBQ3RDLE1BQU0sT0FBTyxHQUFHO0lBQ2Q7OztPQUdHO0lBQ0gsTUFBTSxFQUFFLENBQ04sVUFBK0MsRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLEVBQy9ELGVBQWUsR0FBRyxPQUFPLEVBQ3pCLGNBQWMsR0FBRyxPQUFPLEVBQ2hCLEVBQUU7UUFDVixNQUFNLDRCQUE0QixHQUFHLFFBQVEsQ0FBQyxFQUFFO1lBQzlDLE1BQU0sSUFBSSxHQUFRO2dCQUNoQixTQUFTLEVBQUUsT0FBTyxDQUFDLEVBQUU7YUFDdEIsQ0FBQTtZQUNELElBQUksT0FBTyxDQUFDLFFBQVEsRUFBRTtnQkFDcEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQTtnQkFDakMsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQTtnQkFDckMsSUFBSSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQTtnQkFDN0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQTtnQkFDbkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQTthQUNwQztZQUVELE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFBO1lBQ2xELFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQTtZQUM5RCxPQUFPLFFBQVEsQ0FBQTtRQUNqQixDQUFDLENBQUE7UUFFRCxNQUFNLFVBQVUsR0FBUTtZQUN0QixJQUFJLG9CQUFXLENBQUMsT0FBTyxDQUFDO2dCQUN0QixLQUFLLEVBQUUsZUFBZTtnQkFDdEIsTUFBTSxFQUFFLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRSxnQkFBTyxDQUFDLDRCQUE0QixDQUFDLEVBQUUsQ0FBQzthQUN0RSxDQUFDO1lBQ0YsSUFBSSxpQ0FBZSxDQUFDLEVBQUUsS0FBSyxFQUFFLGNBQWMsRUFBRSxDQUFDO1NBQy9DLENBQUE7UUFFRCxNQUFNLGlCQUFpQixHQUFRLENBQUMsSUFBSSxvQkFBVyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUE7UUFFMUQsT0FBTyxzQkFBWSxDQUFDO1lBQ2xCLFVBQVU7WUFDVixpQkFBaUI7U0FDbEIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNGLENBQUE7QUFDUSwwQkFBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZUxvZ2dlciwgZm9ybWF0IGFzIHdGb3JtYXQsIExvZ2dlciwgdHJhbnNwb3J0cyBhcyB3VHJhbnNmb3JtcyB9IGZyb20gJ3dpbnN0b24nXG5pbXBvcnQgeyBVc2VyRGF0YSB9IGZyb20gJy4uL3V0aWwvY3VzdG9tVHlwaW5ncydcbmltcG9ydCB7IFNlbnRyeVRyYW5zcG9ydCB9IGZyb20gJy4vU2VudHJ5VHJhbnNwb3J0J1xuXG5jb25zdCB7IGNvbWJpbmUsIHRpbWVzdGFtcCB9ID0gd0Zvcm1hdFxuY29uc3Qgd2luc3RvbiA9IHtcbiAgLyoqXG4gICAqIENyZWF0ZSBXaW5zdG9uIGxvZ2dlciB3aXRoIHNlbnRyeSB0cmFuc3BvcnRcbiAgICogU2VudHJ5IG11c3QgYmUgcmVnaXN0ZXJlZCBmaXJzdFxuICAgKi9cbiAgY3JlYXRlOiAoXG4gICAgc2Vzc2lvbjogeyBpZDogc3RyaW5nOyB1c2VyRGF0YT86IFVzZXJEYXRhIH0gPSB7IGlkOiAnZ2xvYmFsJyB9LFxuICAgIGNvbnNvbGVMb2dMZXZlbCA9ICdkZWJ1ZycsXG4gICAgc2VudHJ5TG9nTGV2ZWwgPSAnZXJyb3InXG4gICk6IExvZ2dlciA9PiB7XG4gICAgY29uc3Qgc2Vzc2lvbk1ldGFEYXRhSnNvbkZvcm1hdHRlciA9IGxvZ0VudHJ5ID0+IHtcbiAgICAgIGNvbnN0IGJhc2U6IGFueSA9IHtcbiAgICAgICAgc2Vzc2lvbklkOiBzZXNzaW9uLmlkLFxuICAgICAgfVxuICAgICAgaWYgKHNlc3Npb24udXNlckRhdGEpIHtcbiAgICAgICAgYmFzZS51c2VySWQgPSBzZXNzaW9uLnVzZXJEYXRhLmlkXG4gICAgICAgIGJhc2UudXNlck5hbWUgPSBzZXNzaW9uLnVzZXJEYXRhLm5hbWVcbiAgICAgICAgYmFzZS51c2VyVGVuYW50SWQgPSBzZXNzaW9uLnVzZXJEYXRhLnRlbmFudElkXG4gICAgICAgIGJhc2UudXNlckV4cCA9IHNlc3Npb24udXNlckRhdGEuZXhwXG4gICAgICAgIGJhc2UudXNlcklhdCA9IHNlc3Npb24udXNlckRhdGEuaWF0XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGpzb25Mb2dFbnRyeSA9IE9iamVjdC5hc3NpZ24oYmFzZSwgbG9nRW50cnkpXG4gICAgICBsb2dFbnRyeVtTeW1ib2wuZm9yKCdtZXNzYWdlJyldID0gSlNPTi5zdHJpbmdpZnkoanNvbkxvZ0VudHJ5KVxuICAgICAgcmV0dXJuIGxvZ0VudHJ5XG4gICAgfVxuXG4gICAgY29uc3QgdHJhbnNwb3J0czogYW55ID0gW1xuICAgICAgbmV3IHdUcmFuc2Zvcm1zLkNvbnNvbGUoe1xuICAgICAgICBsZXZlbDogY29uc29sZUxvZ0xldmVsLFxuICAgICAgICBmb3JtYXQ6IGNvbWJpbmUodGltZXN0YW1wKCksIHdGb3JtYXQoc2Vzc2lvbk1ldGFEYXRhSnNvbkZvcm1hdHRlcikoKSksXG4gICAgICB9KSxcbiAgICAgIG5ldyBTZW50cnlUcmFuc3BvcnQoeyBsZXZlbDogc2VudHJ5TG9nTGV2ZWwgfSksXG4gICAgXVxuXG4gICAgY29uc3QgZXhjZXB0aW9uSGFuZGxlcnM6IGFueSA9IFtuZXcgd1RyYW5zZm9ybXMuQ29uc29sZSgpXVxuXG4gICAgcmV0dXJuIGNyZWF0ZUxvZ2dlcih7XG4gICAgICB0cmFuc3BvcnRzLFxuICAgICAgZXhjZXB0aW9uSGFuZGxlcnMsXG4gICAgfSlcbiAgfSxcbn1cbmV4cG9ydCB7IHdpbnN0b24gfVxuIl19