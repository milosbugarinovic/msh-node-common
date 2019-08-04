"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const base64 = __importStar(require("base-64"));
const secrets_1 = require("./secrets");
class EnvHelper {
    constructor(projectName) {
        this.getEnv = (envName, defaultValue) => {
            const pEnvName = `${this.pName}_${envName}`;
            return (secrets_1.secrets.get(pEnvName) ||
                secrets_1.secrets.get(envName) ||
                process.env[pEnvName] ||
                process.env[envName] ||
                defaultValue ||
                '');
        };
        this.getEnvJSON = (envName, defaultValue) => {
            const env = this.getEnv(envName);
            try {
                if (env === '')
                    return defaultValue || {};
                return JSON.parse(env);
            }
            catch (ex) {
                console.error(ex.message || ex); // tslint:disable-line
                return defaultValue || {};
            }
        };
        this.getEnvBase64 = (envName, defaultValue) => {
            const env = this.getEnv(envName);
            try {
                return base64.decode(env);
            }
            catch (ex) {
                console.error(ex.message || ex); // tslint:disable-line
                return defaultValue || '';
            }
        };
        this.pName = projectName;
    }
}
exports.EnvHelper = EnvHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW52SGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWwvRW52SGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLGdEQUFpQztBQUNqQyx1Q0FBbUM7QUFFbkMsTUFBYSxTQUFTO0lBR3BCLFlBQVksV0FBbUI7UUFJeEIsV0FBTSxHQUFHLENBQUMsT0FBZSxFQUFFLFlBQXFCLEVBQUUsRUFBRTtZQUN6RCxNQUFNLFFBQVEsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLElBQUksT0FBTyxFQUFFLENBQUE7WUFDM0MsT0FBTyxDQUNMLGlCQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQztnQkFDckIsaUJBQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDO2dCQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQztnQkFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUM7Z0JBQ3BCLFlBQVk7Z0JBQ1osRUFBRSxDQUNILENBQUE7UUFDSCxDQUFDLENBQUE7UUFFTSxlQUFVLEdBQVEsQ0FBQyxPQUFlLEVBQUUsWUFBa0IsRUFBRSxFQUFFO1lBQy9ELE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUE7WUFDaEMsSUFBSTtnQkFDRixJQUFJLEdBQUcsS0FBSyxFQUFFO29CQUFFLE9BQU8sWUFBWSxJQUFJLEVBQUUsQ0FBQTtnQkFDekMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO2FBQ3ZCO1lBQUMsT0FBTyxFQUFFLEVBQUU7Z0JBQ1gsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQyxDQUFBLENBQUMsc0JBQXNCO2dCQUN0RCxPQUFPLFlBQVksSUFBSSxFQUFFLENBQUE7YUFDMUI7UUFDSCxDQUFDLENBQUE7UUFFTSxpQkFBWSxHQUFHLENBQUMsT0FBZSxFQUFFLFlBQXFCLEVBQUUsRUFBRTtZQUMvRCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBQ2hDLElBQUk7Z0JBQ0YsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFBO2FBQzFCO1lBQUMsT0FBTyxFQUFFLEVBQUU7Z0JBQ1gsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQyxDQUFBLENBQUMsc0JBQXNCO2dCQUN0RCxPQUFPLFlBQVksSUFBSSxFQUFFLENBQUE7YUFDMUI7UUFDSCxDQUFDLENBQUE7UUFsQ0MsSUFBSSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUE7SUFDMUIsQ0FBQztDQWtDRjtBQXZDRCw4QkF1Q0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBiYXNlNjQgZnJvbSAnYmFzZS02NCdcbmltcG9ydCB7IHNlY3JldHMgfSBmcm9tICcuL3NlY3JldHMnXG5cbmV4cG9ydCBjbGFzcyBFbnZIZWxwZXIge1xuICBwcml2YXRlIHJlYWRvbmx5IHBOYW1lOiBzdHJpbmdcblxuICBjb25zdHJ1Y3Rvcihwcm9qZWN0TmFtZTogc3RyaW5nKSB7XG4gICAgdGhpcy5wTmFtZSA9IHByb2plY3ROYW1lXG4gIH1cblxuICBwdWJsaWMgZ2V0RW52ID0gKGVudk5hbWU6IHN0cmluZywgZGVmYXVsdFZhbHVlPzogc3RyaW5nKSA9PiB7XG4gICAgY29uc3QgcEVudk5hbWUgPSBgJHt0aGlzLnBOYW1lfV8ke2Vudk5hbWV9YFxuICAgIHJldHVybiAoXG4gICAgICBzZWNyZXRzLmdldChwRW52TmFtZSkgfHxcbiAgICAgIHNlY3JldHMuZ2V0KGVudk5hbWUpIHx8XG4gICAgICBwcm9jZXNzLmVudltwRW52TmFtZV0gfHxcbiAgICAgIHByb2Nlc3MuZW52W2Vudk5hbWVdIHx8XG4gICAgICBkZWZhdWx0VmFsdWUgfHxcbiAgICAgICcnXG4gICAgKVxuICB9XG5cbiAgcHVibGljIGdldEVudkpTT046IGFueSA9IChlbnZOYW1lOiBzdHJpbmcsIGRlZmF1bHRWYWx1ZT86IGFueSkgPT4ge1xuICAgIGNvbnN0IGVudiA9IHRoaXMuZ2V0RW52KGVudk5hbWUpXG4gICAgdHJ5IHtcbiAgICAgIGlmIChlbnYgPT09ICcnKSByZXR1cm4gZGVmYXVsdFZhbHVlIHx8IHt9XG4gICAgICByZXR1cm4gSlNPTi5wYXJzZShlbnYpXG4gICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXgubWVzc2FnZSB8fCBleCkgLy8gdHNsaW50OmRpc2FibGUtbGluZVxuICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZSB8fCB7fVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXRFbnZCYXNlNjQgPSAoZW52TmFtZTogc3RyaW5nLCBkZWZhdWx0VmFsdWU/OiBzdHJpbmcpID0+IHtcbiAgICBjb25zdCBlbnYgPSB0aGlzLmdldEVudihlbnZOYW1lKVxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gYmFzZTY0LmRlY29kZShlbnYpXG4gICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXgubWVzc2FnZSB8fCBleCkgLy8gdHNsaW50OmRpc2FibGUtbGluZVxuICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZSB8fCAnJ1xuICAgIH1cbiAgfVxufVxuIl19