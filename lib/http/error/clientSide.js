"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
class BadRequest extends base_1.ClientSide {
    constructor(message = 'Bad Request') {
        super(message, 400);
    }
}
exports.BadRequest = BadRequest;
class Unauthorized extends base_1.ClientSide {
    constructor(message = 'Unauthorized') {
        super(message, 401);
    }
}
exports.Unauthorized = Unauthorized;
class Forbidden extends base_1.ClientSide {
    constructor(message = 'Forbidden') {
        super(message, 403);
    }
}
exports.Forbidden = Forbidden;
class NotFound extends base_1.ClientSide {
    constructor(message = 'Not Found') {
        super(message, 404);
    }
}
exports.NotFound = NotFound;
class RequestTimeOut extends base_1.ClientSide {
    constructor(message = 'Request Time-Out') {
        super(message, 408);
    }
}
exports.RequestTimeOut = RequestTimeOut;
class Conflict extends base_1.ClientSide {
    constructor(message = 'Conflict') {
        super(message, 409);
    }
}
exports.Conflict = Conflict;
class PreconditionFailed extends base_1.ClientSide {
    constructor(message = 'Precondition Failed') {
        super(message, 412);
    }
}
exports.PreconditionFailed = PreconditionFailed;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50U2lkZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9odHRwL2Vycm9yL2NsaWVudFNpZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpQ0FBbUM7QUFFbkMsTUFBYSxVQUFXLFNBQVEsaUJBQVU7SUFDeEMsWUFBWSxPQUFPLEdBQUcsYUFBYTtRQUNqQyxLQUFLLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFBO0lBQ3JCLENBQUM7Q0FDRjtBQUpELGdDQUlDO0FBRUQsTUFBYSxZQUFhLFNBQVEsaUJBQVU7SUFDMUMsWUFBWSxPQUFPLEdBQUcsY0FBYztRQUNsQyxLQUFLLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFBO0lBQ3JCLENBQUM7Q0FDRjtBQUpELG9DQUlDO0FBRUQsTUFBYSxTQUFVLFNBQVEsaUJBQVU7SUFDdkMsWUFBWSxPQUFPLEdBQUcsV0FBVztRQUMvQixLQUFLLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFBO0lBQ3JCLENBQUM7Q0FDRjtBQUpELDhCQUlDO0FBRUQsTUFBYSxRQUFTLFNBQVEsaUJBQVU7SUFDdEMsWUFBWSxPQUFPLEdBQUcsV0FBVztRQUMvQixLQUFLLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFBO0lBQ3JCLENBQUM7Q0FDRjtBQUpELDRCQUlDO0FBRUQsTUFBYSxjQUFlLFNBQVEsaUJBQVU7SUFDNUMsWUFBWSxPQUFPLEdBQUcsa0JBQWtCO1FBQ3RDLEtBQUssQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUE7SUFDckIsQ0FBQztDQUNGO0FBSkQsd0NBSUM7QUFFRCxNQUFhLFFBQVMsU0FBUSxpQkFBVTtJQUN0QyxZQUFZLE9BQU8sR0FBRyxVQUFVO1FBQzlCLEtBQUssQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUE7SUFDckIsQ0FBQztDQUNGO0FBSkQsNEJBSUM7QUFHRCxNQUFhLGtCQUFtQixTQUFRLGlCQUFVO0lBQ2hELFlBQVksT0FBTyxHQUFHLHFCQUFxQjtRQUN6QyxLQUFLLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFBO0lBQ3JCLENBQUM7Q0FDRjtBQUpELGdEQUlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2xpZW50U2lkZSB9IGZyb20gJy4vYmFzZSdcblxuZXhwb3J0IGNsYXNzIEJhZFJlcXVlc3QgZXh0ZW5kcyBDbGllbnRTaWRlIHtcbiAgY29uc3RydWN0b3IobWVzc2FnZSA9ICdCYWQgUmVxdWVzdCcpIHtcbiAgICBzdXBlcihtZXNzYWdlLCA0MDApXG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFVuYXV0aG9yaXplZCBleHRlbmRzIENsaWVudFNpZGUge1xuICBjb25zdHJ1Y3RvcihtZXNzYWdlID0gJ1VuYXV0aG9yaXplZCcpIHtcbiAgICBzdXBlcihtZXNzYWdlLCA0MDEpXG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEZvcmJpZGRlbiBleHRlbmRzIENsaWVudFNpZGUge1xuICBjb25zdHJ1Y3RvcihtZXNzYWdlID0gJ0ZvcmJpZGRlbicpIHtcbiAgICBzdXBlcihtZXNzYWdlLCA0MDMpXG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIE5vdEZvdW5kIGV4dGVuZHMgQ2xpZW50U2lkZSB7XG4gIGNvbnN0cnVjdG9yKG1lc3NhZ2UgPSAnTm90IEZvdW5kJykge1xuICAgIHN1cGVyKG1lc3NhZ2UsIDQwNClcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgUmVxdWVzdFRpbWVPdXQgZXh0ZW5kcyBDbGllbnRTaWRlIHtcbiAgY29uc3RydWN0b3IobWVzc2FnZSA9ICdSZXF1ZXN0IFRpbWUtT3V0Jykge1xuICAgIHN1cGVyKG1lc3NhZ2UsIDQwOClcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ29uZmxpY3QgZXh0ZW5kcyBDbGllbnRTaWRlIHtcbiAgY29uc3RydWN0b3IobWVzc2FnZSA9ICdDb25mbGljdCcpIHtcbiAgICBzdXBlcihtZXNzYWdlLCA0MDkpXG4gIH1cbn1cblxuXG5leHBvcnQgY2xhc3MgUHJlY29uZGl0aW9uRmFpbGVkIGV4dGVuZHMgQ2xpZW50U2lkZSB7XG4gIGNvbnN0cnVjdG9yKG1lc3NhZ2UgPSAnUHJlY29uZGl0aW9uIEZhaWxlZCcpIHtcbiAgICBzdXBlcihtZXNzYWdlLCA0MTIpXG4gIH1cbn1cbiJdfQ==