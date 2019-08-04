"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const cors = {
    init: (app) => {
        app.use(cors_1.default({
            origin: (origin, callback) => {
                callback(null, true);
            },
            credentials: true,
        }));
    },
};
exports.cors = cors;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsL2NvcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxnREFBd0M7QUFHeEMsTUFBTSxJQUFJLEdBQUc7SUFDWCxJQUFJLEVBQUUsQ0FBQyxHQUFZLEVBQVEsRUFBRTtRQUMzQixHQUFHLENBQUMsR0FBRyxDQUNMLGNBQUksQ0FBQztZQUNILE1BQU0sRUFBRSxDQUFDLE1BQVcsRUFBRSxRQUE2QyxFQUFFLEVBQUU7Z0JBQ3JFLFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUE7WUFDdEIsQ0FBQztZQUNELFdBQVcsRUFBRSxJQUFJO1NBQ0gsQ0FBQyxDQUNsQixDQUFBO0lBQ0gsQ0FBQztDQUNGLENBQUE7QUFFUSxvQkFBSSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDT1JTLCB7IENvcnNPcHRpb25zIH0gZnJvbSAnY29ycydcbmltcG9ydCB7IEV4cHJlc3MgfSBmcm9tICdleHByZXNzJ1xuXG5jb25zdCBjb3JzID0ge1xuICBpbml0OiAoYXBwOiBFeHByZXNzKTogdm9pZCA9PiB7XG4gICAgYXBwLnVzZShcbiAgICAgIENPUlMoe1xuICAgICAgICBvcmlnaW46IChvcmlnaW46IGFueSwgY2FsbGJhY2s6IChlcnI6IGFueSwgcmVzdWx0OiBib29sZWFuKSA9PiB2b2lkKSA9PiB7XG4gICAgICAgICAgY2FsbGJhY2sobnVsbCwgdHJ1ZSlcbiAgICAgICAgfSxcbiAgICAgICAgY3JlZGVudGlhbHM6IHRydWUsXG4gICAgICB9IGFzIENvcnNPcHRpb25zKVxuICAgIClcbiAgfSxcbn1cblxuZXhwb3J0IHsgY29ycyB9XG4iXX0=