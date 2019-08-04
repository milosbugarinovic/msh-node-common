"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("@sentry/node");
const winston_transport_1 = __importDefault(require("winston-transport"));
class SentryTransport extends winston_transport_1.default {
    constructor(opts) {
        super(opts);
    }
    log(info, callback) {
        setImmediate(() => this.emit('logged', info));
        if (info.level.includes('error')) {
            if (info.message.error && info.message.error instanceof Error) {
                node_1.captureException(info.message.error);
            }
            else {
                const error = new Error(info.message);
                error.data = info[Symbol.for('message')];
                node_1.captureException(error);
            }
        }
        if (info.level.includes('warn')) {
            node_1.captureMessage(info.message, node_1.Severity.Warning);
        }
        callback();
    }
}
exports.SentryTransport = SentryTransport;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VudHJ5VHJhbnNwb3J0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xvZ2dlci9TZW50cnlUcmFuc3BvcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSx1Q0FBeUU7QUFDekUsMEVBQXlDO0FBRXpDLE1BQWEsZUFBZ0IsU0FBUSwyQkFBUztJQUM1QyxZQUFZLElBQXNDO1FBQ2hELEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNiLENBQUM7SUFFTSxHQUFHLENBQUMsSUFBUyxFQUFFLFFBQW9CO1FBQ3hDLFlBQVksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFBO1FBRTdDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDaEMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssWUFBWSxLQUFLLEVBQUU7Z0JBQzdELHVCQUFnQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUE7YUFDckM7aUJBQU07Z0JBQ0wsTUFBTSxLQUFLLEdBQVEsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO2dCQUMxQyxLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUE7Z0JBQ3hDLHVCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFBO2FBQ3hCO1NBQ0Y7UUFFRCxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQy9CLHFCQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxlQUFRLENBQUMsT0FBTyxDQUFDLENBQUE7U0FDL0M7UUFFRCxRQUFRLEVBQUUsQ0FBQTtJQUNaLENBQUM7Q0FDRjtBQXhCRCwwQ0F3QkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjYXB0dXJlRXhjZXB0aW9uLCBjYXB0dXJlTWVzc2FnZSwgU2V2ZXJpdHkgfSBmcm9tICdAc2VudHJ5L25vZGUnXG5pbXBvcnQgVHJhbnNwb3J0IGZyb20gJ3dpbnN0b24tdHJhbnNwb3J0J1xuXG5leHBvcnQgY2xhc3MgU2VudHJ5VHJhbnNwb3J0IGV4dGVuZHMgVHJhbnNwb3J0IHtcbiAgY29uc3RydWN0b3Iob3B0czogVHJhbnNwb3J0LlRyYW5zcG9ydFN0cmVhbU9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRzKVxuICB9XG5cbiAgcHVibGljIGxvZyhpbmZvOiBhbnksIGNhbGxiYWNrOiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgc2V0SW1tZWRpYXRlKCgpID0+IHRoaXMuZW1pdCgnbG9nZ2VkJywgaW5mbykpXG5cbiAgICBpZiAoaW5mby5sZXZlbC5pbmNsdWRlcygnZXJyb3InKSkge1xuICAgICAgaWYgKGluZm8ubWVzc2FnZS5lcnJvciAmJiBpbmZvLm1lc3NhZ2UuZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICBjYXB0dXJlRXhjZXB0aW9uKGluZm8ubWVzc2FnZS5lcnJvcilcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGVycm9yOiBhbnkgPSBuZXcgRXJyb3IoaW5mby5tZXNzYWdlKVxuICAgICAgICBlcnJvci5kYXRhID0gaW5mb1tTeW1ib2wuZm9yKCdtZXNzYWdlJyldXG4gICAgICAgIGNhcHR1cmVFeGNlcHRpb24oZXJyb3IpXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGluZm8ubGV2ZWwuaW5jbHVkZXMoJ3dhcm4nKSkge1xuICAgICAgY2FwdHVyZU1lc3NhZ2UoaW5mby5tZXNzYWdlLCBTZXZlcml0eS5XYXJuaW5nKVxuICAgIH1cblxuICAgIGNhbGxiYWNrKClcbiAgfVxufVxuIl19