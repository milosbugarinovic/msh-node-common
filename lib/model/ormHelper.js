"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ormHelper = {
    unixNow: 'CAST((EXTRACT(EPOCH FROM NOW()) * 1000) AS BIGINT)',
    jsonGetter: (self, propertyName) => {
        try {
            if (typeof self.getDataValue(propertyName) === 'string') {
                return JSON.parse(self.getDataValue(propertyName));
            }
            return self.getDataValue(propertyName);
        }
        catch (err) {
            return {};
        }
    },
    // FIXME return object instead of any
    baseModelOptions: (dbSchema) => {
        return {
            schema: dbSchema,
            timestamps: true,
            updatedAt: 'updatedAt',
            createdAt: 'createdAt',
            underscoredAll: true,
            underscored: true,
            freezeTableName: true,
        };
    },
};
exports.ormHelper = ormHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JtSGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZGVsL29ybUhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE1BQU0sU0FBUyxHQUFHO0lBQ2hCLE9BQU8sRUFBRSxvREFBb0Q7SUFFN0QsVUFBVSxFQUFFLENBQUMsSUFBSSxFQUFFLFlBQVksRUFBTyxFQUFFO1FBQ3RDLElBQUk7WUFDRixJQUFJLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsS0FBSyxRQUFRLEVBQUU7Z0JBQ3ZELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUE7YUFDbkQ7WUFDRCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUE7U0FDdkM7UUFBQyxPQUFPLEdBQUcsRUFBRTtZQUNaLE9BQU8sRUFBRSxDQUFBO1NBQ1Y7SUFDSCxDQUFDO0lBRUQscUNBQXFDO0lBQ3JDLGdCQUFnQixFQUFFLENBQUMsUUFBZ0IsRUFBTyxFQUFFO1FBQzFDLE9BQU87WUFDTCxNQUFNLEVBQUUsUUFBUTtZQUNoQixVQUFVLEVBQUUsSUFBSTtZQUNoQixTQUFTLEVBQUUsV0FBVztZQUN0QixTQUFTLEVBQUUsV0FBVztZQUN0QixjQUFjLEVBQUUsSUFBSTtZQUNwQixXQUFXLEVBQUUsSUFBSTtZQUNqQixlQUFlLEVBQUUsSUFBSTtTQUN0QixDQUFBO0lBQ0gsQ0FBQztDQUNGLENBQUE7QUFFUSw4QkFBUyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IG9ybUhlbHBlciA9IHtcbiAgdW5peE5vdzogJ0NBU1QoKEVYVFJBQ1QoRVBPQ0ggRlJPTSBOT1coKSkgKiAxMDAwKSBBUyBCSUdJTlQpJyxcblxuICBqc29uR2V0dGVyOiAoc2VsZiwgcHJvcGVydHlOYW1lKTogYW55ID0+IHtcbiAgICB0cnkge1xuICAgICAgaWYgKHR5cGVvZiBzZWxmLmdldERhdGFWYWx1ZShwcm9wZXJ0eU5hbWUpID09PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShzZWxmLmdldERhdGFWYWx1ZShwcm9wZXJ0eU5hbWUpKVxuICAgICAgfVxuICAgICAgcmV0dXJuIHNlbGYuZ2V0RGF0YVZhbHVlKHByb3BlcnR5TmFtZSlcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiB7fVxuICAgIH1cbiAgfSxcblxuICAvLyBGSVhNRSByZXR1cm4gb2JqZWN0IGluc3RlYWQgb2YgYW55XG4gIGJhc2VNb2RlbE9wdGlvbnM6IChkYlNjaGVtYTogc3RyaW5nKTogYW55ID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgc2NoZW1hOiBkYlNjaGVtYSxcbiAgICAgIHRpbWVzdGFtcHM6IHRydWUsXG4gICAgICB1cGRhdGVkQXQ6ICd1cGRhdGVkQXQnLFxuICAgICAgY3JlYXRlZEF0OiAnY3JlYXRlZEF0JyxcbiAgICAgIHVuZGVyc2NvcmVkQWxsOiB0cnVlLFxuICAgICAgdW5kZXJzY29yZWQ6IHRydWUsXG4gICAgICBmcmVlemVUYWJsZU5hbWU6IHRydWUsXG4gICAgfVxuICB9LFxufVxuXG5leHBvcnQgeyBvcm1IZWxwZXIgfVxuIl19