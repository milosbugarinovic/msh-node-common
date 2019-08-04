"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class BaseExpressController {
    constructor() {
        this._router = express_1.Router();
    }
    get router() {
        return this._router;
    }
}
exports.BaseExpressController = BaseExpressController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZUV4cHJlc3NDb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2h0dHAvQmFzZUV4cHJlc3NDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscUNBQWdDO0FBRWhDLE1BQXNCLHFCQUFxQjtJQUEzQztRQUtVLFlBQU8sR0FBRyxnQkFBTSxFQUFFLENBQUE7SUFDNUIsQ0FBQztJQUxDLElBQVcsTUFBTTtRQUNmLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQTtJQUNyQixDQUFDO0NBR0Y7QUFORCxzREFNQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJvdXRlciB9IGZyb20gJ2V4cHJlc3MnXG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNlRXhwcmVzc0NvbnRyb2xsZXIge1xuICBwdWJsaWMgZ2V0IHJvdXRlcigpOiBSb3V0ZXIge1xuICAgIHJldHVybiB0aGlzLl9yb3V0ZXJcbiAgfVxuXG4gIHByaXZhdGUgX3JvdXRlciA9IFJvdXRlcigpXG59XG4iXX0=