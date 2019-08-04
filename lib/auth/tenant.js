"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tenant = {
    getTenantId: (req) => {
        if (req && 'personalTenantId' in req && req.personalTenantId)
            return req.personalTenantId;
        return null;
    },
};
exports.tenant = tenant;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVuYW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2F1dGgvdGVuYW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsTUFBTSxNQUFNLEdBQUc7SUFDYixXQUFXLEVBQUUsQ0FBQyxHQUFRLEVBQU8sRUFBRTtRQUM3QixJQUFJLEdBQUcsSUFBSSxrQkFBa0IsSUFBSSxHQUFHLElBQUksR0FBRyxDQUFDLGdCQUFnQjtZQUFFLE9BQU8sR0FBRyxDQUFDLGdCQUFnQixDQUFBO1FBQ3pGLE9BQU8sSUFBSSxDQUFBO0lBQ2IsQ0FBQztDQUNGLENBQUE7QUFFUSx3QkFBTSIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHRlbmFudCA9IHtcbiAgZ2V0VGVuYW50SWQ6IChyZXE6IGFueSk6IGFueSA9PiB7XG4gICAgaWYgKHJlcSAmJiAncGVyc29uYWxUZW5hbnRJZCcgaW4gcmVxICYmIHJlcS5wZXJzb25hbFRlbmFudElkKSByZXR1cm4gcmVxLnBlcnNvbmFsVGVuYW50SWRcbiAgICByZXR1cm4gbnVsbFxuICB9LFxufVxuXG5leHBvcnQgeyB0ZW5hbnQgfVxuIl19