"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_slack_webhook_transport_1 = __importDefault(require("winston-slack-webhook-transport"));
const slackTransport = {
    create: (options) => {
        options = options || {};
        options.level = options.level || 'info';
        if (!options.webhookUrl)
            throw new Error('Slack webhook url is required');
        return new winston_slack_webhook_transport_1.default(options);
    },
};
exports.slackTransport = slackTransport;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbG9nZ2VyL3RyYW5zcG9ydC9zbGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNHQUF1RDtBQUd2RCxNQUFNLGNBQWMsR0FBRztJQUNyQixNQUFNLEVBQUUsQ0FBQyxPQUEwQyxFQUFFLEVBQUU7UUFDckQsT0FBTyxHQUFHLE9BQU8sSUFBSSxFQUFFLENBQUE7UUFDdkIsT0FBTyxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxJQUFJLE1BQU0sQ0FBQTtRQUN2QyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVU7WUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLCtCQUErQixDQUFDLENBQUE7UUFFekUsT0FBTyxJQUFJLHlDQUFTLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDL0IsQ0FBQztDQUNGLENBQUE7QUFFUSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTbGFja0hvb2sgZnJvbSAnd2luc3Rvbi1zbGFjay13ZWJob29rLXRyYW5zcG9ydCdcbmltcG9ydCB7IFNsYWNrVHJhbnNwb3J0T3B0aW9ucyB9IGZyb20gJy4uLy4uL3V0aWwvY3VzdG9tVHlwaW5ncydcblxuY29uc3Qgc2xhY2tUcmFuc3BvcnQgPSB7XG4gIGNyZWF0ZTogKG9wdGlvbnM6IFNsYWNrVHJhbnNwb3J0T3B0aW9ucyB8IHVuZGVmaW5lZCkgPT4ge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG4gICAgb3B0aW9ucy5sZXZlbCA9IG9wdGlvbnMubGV2ZWwgfHwgJ2luZm8nXG4gICAgaWYgKCFvcHRpb25zLndlYmhvb2tVcmwpIHRocm93IG5ldyBFcnJvcignU2xhY2sgd2ViaG9vayB1cmwgaXMgcmVxdWlyZWQnKVxuXG4gICAgcmV0dXJuIG5ldyBTbGFja0hvb2sob3B0aW9ucylcbiAgfSxcbn1cblxuZXhwb3J0IHsgc2xhY2tUcmFuc3BvcnQgfVxuIl19