"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const SentryNode = __importStar(require("@sentry/node"));
const sentry = {
    init: (options) => {
        return SentryNode.init(options);
    },
};
exports.sentry = sentry;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VudHJ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xvZ2dlci9zZW50cnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEseURBQTBDO0FBUTFDLE1BQU0sTUFBTSxHQUFHO0lBQ2IsSUFBSSxFQUFFLENBQUMsT0FBcUIsRUFBUSxFQUFFO1FBQ3BDLE9BQU8sVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUNqQyxDQUFDO0NBQ0YsQ0FBQTtBQUVRLHdCQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgU2VudHJ5Tm9kZSBmcm9tICdAc2VudHJ5L25vZGUnXG5cbmludGVyZmFjZSBTZW50cnlDb25maWcge1xuICBkc246IHN0cmluZ1xuICBlbnZpcm9ubWVudDogc3RyaW5nXG4gIGRlZmF1bHRJbnRlZ3JhdGlvbnM6IGFueVtdXG59XG5cbmNvbnN0IHNlbnRyeSA9IHtcbiAgaW5pdDogKG9wdGlvbnM6IFNlbnRyeUNvbmZpZyk6IHZvaWQgPT4ge1xuICAgIHJldHVybiBTZW50cnlOb2RlLmluaXQob3B0aW9ucylcbiAgfSxcbn1cblxuZXhwb3J0IHsgc2VudHJ5LCBTZW50cnlDb25maWcgfVxuIl19