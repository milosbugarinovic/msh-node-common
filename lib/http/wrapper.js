"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wrapper = {
    /**
     * Wrap async express http request end return promise or call next on catch
     * @param target
     * @param key
     * @param descriptor
     */
    httpAsyncWrap: (target, key, descriptor) => {
        const originalMethod = descriptor.value;
        descriptor.value = function () {
            // tslint:disable-line
            const next = arguments[2];
            return Promise.resolve(originalMethod.apply(this, arguments)).catch(next);
        };
        return descriptor;
    },
};
exports.wrapper = wrapper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JhcHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9odHRwL3dyYXBwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxNQUFNLE9BQU8sR0FBRztJQUNkOzs7OztPQUtHO0lBQ0gsYUFBYSxFQUFFLENBQUMsTUFBYyxFQUFFLEdBQVcsRUFBRSxVQUF3QyxFQUFPLEVBQUU7UUFDNUYsTUFBTSxjQUFjLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQTtRQUN2QyxVQUFVLENBQUMsS0FBSyxHQUFHO1lBQ2pCLHNCQUFzQjtZQUN0QixNQUFNLElBQUksR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDekIsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQzNFLENBQUMsQ0FBQTtRQUNELE9BQU8sVUFBVSxDQUFBO0lBQ25CLENBQUM7Q0FDRixDQUFBO0FBRVEsMEJBQU8iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB3cmFwcGVyID0ge1xuICAvKipcbiAgICogV3JhcCBhc3luYyBleHByZXNzIGh0dHAgcmVxdWVzdCBlbmQgcmV0dXJuIHByb21pc2Ugb3IgY2FsbCBuZXh0IG9uIGNhdGNoXG4gICAqIEBwYXJhbSB0YXJnZXRcbiAgICogQHBhcmFtIGtleVxuICAgKiBAcGFyYW0gZGVzY3JpcHRvclxuICAgKi9cbiAgaHR0cEFzeW5jV3JhcDogKHRhcmdldDogb2JqZWN0LCBrZXk6IHN0cmluZywgZGVzY3JpcHRvcjogVHlwZWRQcm9wZXJ0eURlc2NyaXB0b3I8YW55Pik6IGFueSA9PiB7XG4gICAgY29uc3Qgb3JpZ2luYWxNZXRob2QgPSBkZXNjcmlwdG9yLnZhbHVlXG4gICAgZGVzY3JpcHRvci52YWx1ZSA9IGZ1bmN0aW9uKCk6IGFueSB7XG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lXG4gICAgICBjb25zdCBuZXh0ID0gYXJndW1lbnRzWzJdXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG9yaWdpbmFsTWV0aG9kLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpLmNhdGNoKG5leHQpXG4gICAgfVxuICAgIHJldHVybiBkZXNjcmlwdG9yXG4gIH0sXG59XG5cbmV4cG9ydCB7IHdyYXBwZXIgfVxuIl19