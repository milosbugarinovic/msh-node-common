"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const util = __importStar(require("util"));
const secrets = {
    get: (secret) => {
        try {
            return fs.readFileSync(util.format('/run/secrets/%s', secret), 'utf8').trim();
        }
        catch (e) {
            return '';
        }
    },
};
exports.secrets = secrets;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VjcmV0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsL3NlY3JldHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsdUNBQXdCO0FBQ3hCLDJDQUE0QjtBQUU1QixNQUFNLE9BQU8sR0FBRztJQUNkLEdBQUcsRUFBRSxDQUFDLE1BQWMsRUFBVSxFQUFFO1FBQzlCLElBQUk7WUFDRixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxNQUFNLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtTQUM5RTtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1YsT0FBTyxFQUFFLENBQUE7U0FDVjtJQUNILENBQUM7Q0FDRixDQUFBO0FBRVEsMEJBQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBmcyBmcm9tICdmcydcbmltcG9ydCAqIGFzIHV0aWwgZnJvbSAndXRpbCdcblxuY29uc3Qgc2VjcmV0cyA9IHtcbiAgZ2V0OiAoc2VjcmV0OiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gZnMucmVhZEZpbGVTeW5jKHV0aWwuZm9ybWF0KCcvcnVuL3NlY3JldHMvJXMnLCBzZWNyZXQpLCAndXRmOCcpLnRyaW0oKVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiAnJ1xuICAgIH1cbiAgfSxcbn1cblxuZXhwb3J0IHsgc2VjcmV0cyB9XG4iXX0=