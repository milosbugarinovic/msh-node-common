"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const concurrentDataAccessHelper = {
    errorMessage: Object.freeze({
        concurrentDataAccess: (dbData) => {
            const errMessage = {
                status: 412,
                message: {
                    msg: 'Scheduler_DB-ERROR_Concurrent-Data-Access',
                },
            };
            if (dbData) {
                errMessage.message.refreshData = dbData;
            }
            return errMessage;
        },
        notFound: () => {
            return {
                status: 404,
                message: {
                    msg: 'Scheduler_DB-ERROR_Not-Found',
                },
            };
        },
    }),
    // FIXME make better method for checking concurrent data access error
    checkForConcurrentDataAccessError: (userData, dbData) => {
        const uId = userData.id;
        const dId = dbData.id;
        const uUpdatedAt = userData.updatedAt;
        const dUpdatedAt = dbData.updatedAt;
        return uId && dId && uId === dId && uUpdatedAt && dUpdatedAt && uUpdatedAt !== dUpdatedAt
            ? new index_1.http.ClientSideError.PreconditionFailed('Scheduler_DB-ERROR_Concurrent-Data-Access')
            : new index_1.http.ClientSideError.NotFound('Scheduler_DB-ERROR_Not-Found');
    },
};
exports.concurrentDataAccessHelper = concurrentDataAccessHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uY3VycmVudERhdGFBY2Nlc3NIZWxwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWwvY29uY3VycmVudERhdGFBY2Nlc3NIZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxvQ0FBK0I7QUFFL0IsTUFBTSwwQkFBMEIsR0FBRztJQUNqQyxZQUFZLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUMxQixvQkFBb0IsRUFBRSxDQUFDLE1BQVksRUFBRSxFQUFFO1lBQ3JDLE1BQU0sVUFBVSxHQUFRO2dCQUN0QixNQUFNLEVBQUUsR0FBRztnQkFDWCxPQUFPLEVBQUU7b0JBQ1AsR0FBRyxFQUFFLDJDQUEyQztpQkFDakQ7YUFDRixDQUFBO1lBRUQsSUFBSSxNQUFNLEVBQUU7Z0JBQ1YsVUFBVSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFBO2FBQ3hDO1lBRUQsT0FBTyxVQUFVLENBQUE7UUFDbkIsQ0FBQztRQUNELFFBQVEsRUFBRSxHQUFHLEVBQUU7WUFDYixPQUFPO2dCQUNMLE1BQU0sRUFBRSxHQUFHO2dCQUNYLE9BQU8sRUFBRTtvQkFDUCxHQUFHLEVBQUUsOEJBQThCO2lCQUNwQzthQUNGLENBQUE7UUFDSCxDQUFDO0tBQ0YsQ0FBQztJQUNGLHFFQUFxRTtJQUNyRSxpQ0FBaUMsRUFBRSxDQUFDLFFBQWEsRUFBRSxNQUFXLEVBQVMsRUFBRTtRQUN2RSxNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsRUFBRSxDQUFBO1FBQ3ZCLE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUE7UUFDckIsTUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQTtRQUNyQyxNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFBO1FBQ25DLE9BQU8sR0FBRyxJQUFJLEdBQUcsSUFBSSxHQUFHLEtBQUssR0FBRyxJQUFJLFVBQVUsSUFBSSxVQUFVLElBQUksVUFBVSxLQUFLLFVBQVU7WUFDdkYsQ0FBQyxDQUFDLElBQUksWUFBSSxDQUFDLGVBQWUsQ0FBQyxrQkFBa0IsQ0FBQywyQ0FBMkMsQ0FBQztZQUMxRixDQUFDLENBQUMsSUFBSSxZQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFBO0lBQ3ZFLENBQUM7Q0FDRixDQUFBO0FBQ1EsZ0VBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaHR0cCB9IGZyb20gJy4uL2luZGV4J1xuXG5jb25zdCBjb25jdXJyZW50RGF0YUFjY2Vzc0hlbHBlciA9IHtcbiAgZXJyb3JNZXNzYWdlOiBPYmplY3QuZnJlZXplKHtcbiAgICBjb25jdXJyZW50RGF0YUFjY2VzczogKGRiRGF0YT86IGFueSkgPT4ge1xuICAgICAgY29uc3QgZXJyTWVzc2FnZTogYW55ID0ge1xuICAgICAgICBzdGF0dXM6IDQxMixcbiAgICAgICAgbWVzc2FnZToge1xuICAgICAgICAgIG1zZzogJ1NjaGVkdWxlcl9EQi1FUlJPUl9Db25jdXJyZW50LURhdGEtQWNjZXNzJyxcbiAgICAgICAgfSxcbiAgICAgIH1cblxuICAgICAgaWYgKGRiRGF0YSkge1xuICAgICAgICBlcnJNZXNzYWdlLm1lc3NhZ2UucmVmcmVzaERhdGEgPSBkYkRhdGFcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGVyck1lc3NhZ2VcbiAgICB9LFxuICAgIG5vdEZvdW5kOiAoKSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdGF0dXM6IDQwNCxcbiAgICAgICAgbWVzc2FnZToge1xuICAgICAgICAgIG1zZzogJ1NjaGVkdWxlcl9EQi1FUlJPUl9Ob3QtRm91bmQnLFxuICAgICAgICB9LFxuICAgICAgfVxuICAgIH0sXG4gIH0pLFxuICAvLyBGSVhNRSBtYWtlIGJldHRlciBtZXRob2QgZm9yIGNoZWNraW5nIGNvbmN1cnJlbnQgZGF0YSBhY2Nlc3MgZXJyb3JcbiAgY2hlY2tGb3JDb25jdXJyZW50RGF0YUFjY2Vzc0Vycm9yOiAodXNlckRhdGE6IGFueSwgZGJEYXRhOiBhbnkpOiBFcnJvciA9PiB7XG4gICAgY29uc3QgdUlkID0gdXNlckRhdGEuaWRcbiAgICBjb25zdCBkSWQgPSBkYkRhdGEuaWRcbiAgICBjb25zdCB1VXBkYXRlZEF0ID0gdXNlckRhdGEudXBkYXRlZEF0XG4gICAgY29uc3QgZFVwZGF0ZWRBdCA9IGRiRGF0YS51cGRhdGVkQXRcbiAgICByZXR1cm4gdUlkICYmIGRJZCAmJiB1SWQgPT09IGRJZCAmJiB1VXBkYXRlZEF0ICYmIGRVcGRhdGVkQXQgJiYgdVVwZGF0ZWRBdCAhPT0gZFVwZGF0ZWRBdFxuICAgICAgPyBuZXcgaHR0cC5DbGllbnRTaWRlRXJyb3IuUHJlY29uZGl0aW9uRmFpbGVkKCdTY2hlZHVsZXJfREItRVJST1JfQ29uY3VycmVudC1EYXRhLUFjY2VzcycpXG4gICAgICA6IG5ldyBodHRwLkNsaWVudFNpZGVFcnJvci5Ob3RGb3VuZCgnU2NoZWR1bGVyX0RCLUVSUk9SX05vdC1Gb3VuZCcpXG4gIH0sXG59XG5leHBvcnQgeyBjb25jdXJyZW50RGF0YUFjY2Vzc0hlbHBlciB9XG4iXX0=