"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const _ = __importStar(require("lodash"));
const __1 = require("..");
const concurrentDataAccessHelper_1 = require("./concurrentDataAccessHelper");
class EntitiesDao {
    constructor(model) {
        this.entityUsesTenantId = (model) => _.get(model, 'tableAttributes.tenantId', false);
        this.getTenantIdFromSession = (session) => _.get(session, 'userData.tenantId', undefined);
        this.getAll = async (session, transaction) => {
            const where = {};
            if (this.entityUsesTenantId(this.model))
                where.tenantId = this.getTenantIdFromSession(session);
            // @ts-ignore
            return await this.model.findAll({ where, transaction, logging: msg => session.logger.debug(msg) });
        };
        this.getById = async (session, id, transaction) => {
            const where = { id };
            if (this.entityUsesTenantId(this.model))
                where.tenantId = this.getTenantIdFromSession(session);
            // @ts-ignore
            return await this.model.findOne({ where, transaction, logging: msg => session.logger.debug(msg) });
        };
        this.insert = async (session, entity, transaction) => {
            if (this.entityUsesTenantId(this.model))
                entity.tenantId = this.getTenantIdFromSession(session);
            // @ts-ignore
            const result = await this.model.create(entity, { transaction, logging: msg => session.logger.debug(msg) });
            // @ts-ignore
            await __1.rmq.MQ.publish(`db.insert.${this.model.getTableName().tableName}.${result.id}`, result.toJSON());
            return result;
        };
        this.update = async (session, id, entity, transaction) => {
            const where = {
                id,
                updatedAt: entity.updatedAt,
            };
            if (this.entityUsesTenantId(this.model))
                where.tenantId = this.getTenantIdFromSession(session);
            if (entity.hasOwnProperty('id'))
                delete entity.id;
            // @ts-ignore
            const result = await this.model.findOne({ where, transaction, logging: msg => session.logger.debug(msg) });
            if (!result) {
                // @ts-ignore
                const concurCheckEntity = await this.model.findOne({
                    where: { id },
                    transaction,
                    logging: msg => session.logger.debug(msg),
                });
                throw concurrentDataAccessHelper_1.concurrentDataAccessHelper.checkForConcurrentDataAccessError(Object.assign({ id }, entity), concurCheckEntity);
            }
            const updatedEntity = await result.update(entity, { transaction, logging: msg => session.logger.debug(msg) });
            // @ts-ignore
            await __1.rmq.MQ.publish(`db.update.${this.model.getTableName().tableName}.${updatedEntity.id}`, updatedEntity.toJSON());
            return updatedEntity;
        };
        /***
         * Delete entity by ID or sending the whole object
         * @param session
         * @param entityOrId
         * @param transaction transaction
         * @returns promise
         */
        this.deleteBy = async (session, entityOrId, transaction) => {
            const deleteId = _.isObject(entityOrId) ? entityOrId.id : +entityOrId;
            const where = { id: deleteId };
            if (this.entityUsesTenantId(this.model))
                where.tenantId = this.getTenantIdFromSession(session);
            // @ts-ignore
            await this.model.destroy({ where, transaction, logging: msg => session.logger.debug(msg) });
            // @ts-ignore
            await __1.rmq.MQ.publish(`db.delete.${this.model.getTableName().tableName}.${deleteId}`, {});
        };
        this.getWhere = async (session, where, transaction) => {
            if (this.entityUsesTenantId(this.model))
                where.tenantId = this.getTenantIdFromSession(session);
            // @ts-ignore
            return await this.model.findAll({ where, transaction, logging: msg => session.logger.debug(msg) });
        };
        this.model = model;
    }
}
exports.EntitiesDao = EntitiesDao;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW50aXRpZXNEYW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWwvRW50aXRpZXNEYW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsMENBQTJCO0FBRTNCLDBCQUF3QjtBQUV4Qiw2RUFBc0Y7QUFFdEYsTUFBYSxXQUFXO0lBTXRCLFlBQVksS0FBSztRQUhULHVCQUFrQixHQUFHLENBQUMsS0FBSyxFQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSwwQkFBMEIsRUFBRSxLQUFLLENBQUMsQ0FBQTtRQUN4RiwyQkFBc0IsR0FBRyxDQUFDLE9BQU8sRUFBc0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLFNBQVMsQ0FBQyxDQUFBO1FBTXpHLFdBQU0sR0FBRyxLQUFLLEVBQUUsT0FBZ0IsRUFBRSxXQUF5QixFQUFrQixFQUFFO1lBQ3BGLE1BQU0sS0FBSyxHQUFRLEVBQUUsQ0FBQTtZQUNyQixJQUFJLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUFFLEtBQUssQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBQzlGLGFBQWE7WUFDYixPQUFPLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUNwRyxDQUFDLENBQUE7UUFFTSxZQUFPLEdBQUcsS0FBSyxFQUFFLE9BQWdCLEVBQUUsRUFBVSxFQUFFLFdBQXlCLEVBQWdCLEVBQUU7WUFDL0YsTUFBTSxLQUFLLEdBQVEsRUFBRSxFQUFFLEVBQUUsQ0FBQTtZQUN6QixJQUFJLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUFFLEtBQUssQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBQzlGLGFBQWE7WUFDYixPQUFPLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUNwRyxDQUFDLENBQUE7UUFFTSxXQUFNLEdBQUcsS0FBSyxFQUFFLE9BQWdCLEVBQUUsTUFBVyxFQUFFLFdBQXlCLEVBQWdCLEVBQUU7WUFDL0YsSUFBSSxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFBRSxNQUFNLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxPQUFPLENBQUMsQ0FBQTtZQUMvRixhQUFhO1lBQ2IsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFBO1lBQzFHLGFBQWE7WUFDYixNQUFNLE9BQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLGFBQWEsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQyxTQUFTLElBQUksTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFBO1lBQ3RHLE9BQU8sTUFBTSxDQUFBO1FBQ2YsQ0FBQyxDQUFBO1FBRU0sV0FBTSxHQUFHLEtBQUssRUFBRSxPQUFnQixFQUFFLEVBQVUsRUFBRSxNQUFXLEVBQUUsV0FBeUIsRUFBZ0IsRUFBRTtZQUMzRyxNQUFNLEtBQUssR0FBUTtnQkFDakIsRUFBRTtnQkFDRixTQUFTLEVBQUUsTUFBTSxDQUFDLFNBQVM7YUFDNUIsQ0FBQTtZQUNELElBQUksSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQUUsS0FBSyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsT0FBTyxDQUFDLENBQUE7WUFDOUYsSUFBSSxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQztnQkFBRSxPQUFPLE1BQU0sQ0FBQyxFQUFFLENBQUE7WUFDakQsYUFBYTtZQUNiLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQTtZQUMxRyxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNYLGFBQWE7Z0JBQ2IsTUFBTSxpQkFBaUIsR0FBRyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO29CQUNqRCxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUU7b0JBQ2IsV0FBVztvQkFDWCxPQUFPLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7aUJBQzFDLENBQUMsQ0FBQTtnQkFDRixNQUFNLHVEQUFTLENBQUMsaUNBQWlDLGlCQUFHLEVBQUUsSUFBSyxNQUFNLEdBQUksaUJBQWlCLENBQUMsQ0FBQTthQUN4RjtZQUNELE1BQU0sYUFBYSxHQUFHLE1BQU0sTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFBO1lBQzdHLGFBQWE7WUFDYixNQUFNLE9BQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLGFBQWEsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQyxTQUFTLElBQUksYUFBYSxDQUFDLEVBQUUsRUFBRSxFQUFFLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFBO1lBQ3BILE9BQU8sYUFBYSxDQUFBO1FBQ3RCLENBQUMsQ0FBQTtRQUVEOzs7Ozs7V0FNRztRQUNJLGFBQVEsR0FBRyxLQUFLLEVBQ3JCLE9BQWdCLEVBQ2hCLFVBQXVDLEVBQ3ZDLFdBQXlCLEVBQ1YsRUFBRTtZQUNqQixNQUFNLFFBQVEsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQTtZQUNyRSxNQUFNLEtBQUssR0FBUSxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsQ0FBQTtZQUNuQyxJQUFJLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUFFLEtBQUssQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBQzlGLGFBQWE7WUFDYixNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUE7WUFDM0YsYUFBYTtZQUNiLE1BQU0sT0FBRyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsYUFBYSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDLFNBQVMsSUFBSSxRQUFRLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQTtRQUMxRixDQUFDLENBQUE7UUFFTSxhQUFRLEdBQUcsS0FBSyxFQUFFLE9BQWdCLEVBQUUsS0FBVSxFQUFFLFdBQXlCLEVBQWtCLEVBQUU7WUFDbEcsSUFBSSxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFBRSxLQUFLLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxPQUFPLENBQUMsQ0FBQTtZQUM5RixhQUFhO1lBQ2IsT0FBTyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDcEcsQ0FBQyxDQUFBO1FBM0VDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFBO0lBQ3BCLENBQUM7Q0EyRUY7QUFuRkQsa0NBbUZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnXG5pbXBvcnQgeyBNb2RlbCwgVHJhbnNhY3Rpb24gfSBmcm9tICdzZXF1ZWxpemUnXG5pbXBvcnQgeyBybXEgfSBmcm9tICcuLidcbmltcG9ydCB7IEJhc2VNb2RlbEF0dHJpYnV0ZSwgU2Vzc2lvbiB9IGZyb20gJy4uL3V0aWwvY3VzdG9tVHlwaW5ncydcbmltcG9ydCB7IGNvbmN1cnJlbnREYXRhQWNjZXNzSGVscGVyIGFzIGNkYUhlbHBlciB9IGZyb20gJy4vY29uY3VycmVudERhdGFBY2Nlc3NIZWxwZXInXG5cbmV4cG9ydCBjbGFzcyBFbnRpdGllc0RhbyB7XG4gIHByaXZhdGUgcmVhZG9ubHkgbW9kZWw6IE1vZGVsXG5cbiAgcHJpdmF0ZSBlbnRpdHlVc2VzVGVuYW50SWQgPSAobW9kZWwpOiBib29sZWFuID0+IF8uZ2V0KG1vZGVsLCAndGFibGVBdHRyaWJ1dGVzLnRlbmFudElkJywgZmFsc2UpXG4gIHByaXZhdGUgZ2V0VGVuYW50SWRGcm9tU2Vzc2lvbiA9IChzZXNzaW9uKTogbnVtYmVyIHwgdW5kZWZpbmVkID0+IF8uZ2V0KHNlc3Npb24sICd1c2VyRGF0YS50ZW5hbnRJZCcsIHVuZGVmaW5lZClcblxuICBjb25zdHJ1Y3Rvcihtb2RlbCkge1xuICAgIHRoaXMubW9kZWwgPSBtb2RlbFxuICB9XG5cbiAgcHVibGljIGdldEFsbCA9IGFzeW5jIChzZXNzaW9uOiBTZXNzaW9uLCB0cmFuc2FjdGlvbj86IFRyYW5zYWN0aW9uKTogUHJvbWlzZTxhbnlbXT4gPT4ge1xuICAgIGNvbnN0IHdoZXJlOiBhbnkgPSB7fVxuICAgIGlmICh0aGlzLmVudGl0eVVzZXNUZW5hbnRJZCh0aGlzLm1vZGVsKSkgd2hlcmUudGVuYW50SWQgPSB0aGlzLmdldFRlbmFudElkRnJvbVNlc3Npb24oc2Vzc2lvbilcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgcmV0dXJuIGF3YWl0IHRoaXMubW9kZWwuZmluZEFsbCh7IHdoZXJlLCB0cmFuc2FjdGlvbiwgbG9nZ2luZzogbXNnID0+IHNlc3Npb24ubG9nZ2VyLmRlYnVnKG1zZykgfSlcbiAgfVxuXG4gIHB1YmxpYyBnZXRCeUlkID0gYXN5bmMgKHNlc3Npb246IFNlc3Npb24sIGlkOiBudW1iZXIsIHRyYW5zYWN0aW9uPzogVHJhbnNhY3Rpb24pOiBQcm9taXNlPGFueT4gPT4ge1xuICAgIGNvbnN0IHdoZXJlOiBhbnkgPSB7IGlkIH1cbiAgICBpZiAodGhpcy5lbnRpdHlVc2VzVGVuYW50SWQodGhpcy5tb2RlbCkpIHdoZXJlLnRlbmFudElkID0gdGhpcy5nZXRUZW5hbnRJZEZyb21TZXNzaW9uKHNlc3Npb24pXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIHJldHVybiBhd2FpdCB0aGlzLm1vZGVsLmZpbmRPbmUoeyB3aGVyZSwgdHJhbnNhY3Rpb24sIGxvZ2dpbmc6IG1zZyA9PiBzZXNzaW9uLmxvZ2dlci5kZWJ1Zyhtc2cpIH0pXG4gIH1cblxuICBwdWJsaWMgaW5zZXJ0ID0gYXN5bmMgKHNlc3Npb246IFNlc3Npb24sIGVudGl0eTogYW55LCB0cmFuc2FjdGlvbj86IFRyYW5zYWN0aW9uKTogUHJvbWlzZTxhbnk+ID0+IHtcbiAgICBpZiAodGhpcy5lbnRpdHlVc2VzVGVuYW50SWQodGhpcy5tb2RlbCkpIGVudGl0eS50ZW5hbnRJZCA9IHRoaXMuZ2V0VGVuYW50SWRGcm9tU2Vzc2lvbihzZXNzaW9uKVxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLm1vZGVsLmNyZWF0ZShlbnRpdHksIHsgdHJhbnNhY3Rpb24sIGxvZ2dpbmc6IG1zZyA9PiBzZXNzaW9uLmxvZ2dlci5kZWJ1Zyhtc2cpIH0pXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGF3YWl0IHJtcS5NUS5wdWJsaXNoKGBkYi5pbnNlcnQuJHt0aGlzLm1vZGVsLmdldFRhYmxlTmFtZSgpLnRhYmxlTmFtZX0uJHtyZXN1bHQuaWR9YCwgcmVzdWx0LnRvSlNPTigpKVxuICAgIHJldHVybiByZXN1bHRcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGUgPSBhc3luYyAoc2Vzc2lvbjogU2Vzc2lvbiwgaWQ6IG51bWJlciwgZW50aXR5OiBhbnksIHRyYW5zYWN0aW9uPzogVHJhbnNhY3Rpb24pOiBQcm9taXNlPGFueT4gPT4ge1xuICAgIGNvbnN0IHdoZXJlOiBhbnkgPSB7XG4gICAgICBpZCxcbiAgICAgIHVwZGF0ZWRBdDogZW50aXR5LnVwZGF0ZWRBdCxcbiAgICB9XG4gICAgaWYgKHRoaXMuZW50aXR5VXNlc1RlbmFudElkKHRoaXMubW9kZWwpKSB3aGVyZS50ZW5hbnRJZCA9IHRoaXMuZ2V0VGVuYW50SWRGcm9tU2Vzc2lvbihzZXNzaW9uKVxuICAgIGlmIChlbnRpdHkuaGFzT3duUHJvcGVydHkoJ2lkJykpIGRlbGV0ZSBlbnRpdHkuaWRcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5tb2RlbC5maW5kT25lKHsgd2hlcmUsIHRyYW5zYWN0aW9uLCBsb2dnaW5nOiBtc2cgPT4gc2Vzc2lvbi5sb2dnZXIuZGVidWcobXNnKSB9KVxuICAgIGlmICghcmVzdWx0KSB7XG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICBjb25zdCBjb25jdXJDaGVja0VudGl0eSA9IGF3YWl0IHRoaXMubW9kZWwuZmluZE9uZSh7XG4gICAgICAgIHdoZXJlOiB7IGlkIH0sXG4gICAgICAgIHRyYW5zYWN0aW9uLFxuICAgICAgICBsb2dnaW5nOiBtc2cgPT4gc2Vzc2lvbi5sb2dnZXIuZGVidWcobXNnKSxcbiAgICAgIH0pXG4gICAgICB0aHJvdyBjZGFIZWxwZXIuY2hlY2tGb3JDb25jdXJyZW50RGF0YUFjY2Vzc0Vycm9yKHsgaWQsIC4uLmVudGl0eSB9LCBjb25jdXJDaGVja0VudGl0eSlcbiAgICB9XG4gICAgY29uc3QgdXBkYXRlZEVudGl0eSA9IGF3YWl0IHJlc3VsdC51cGRhdGUoZW50aXR5LCB7IHRyYW5zYWN0aW9uLCBsb2dnaW5nOiBtc2cgPT4gc2Vzc2lvbi5sb2dnZXIuZGVidWcobXNnKSB9KVxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBhd2FpdCBybXEuTVEucHVibGlzaChgZGIudXBkYXRlLiR7dGhpcy5tb2RlbC5nZXRUYWJsZU5hbWUoKS50YWJsZU5hbWV9LiR7dXBkYXRlZEVudGl0eS5pZH1gLCB1cGRhdGVkRW50aXR5LnRvSlNPTigpKVxuICAgIHJldHVybiB1cGRhdGVkRW50aXR5XG4gIH1cblxuICAvKioqXG4gICAqIERlbGV0ZSBlbnRpdHkgYnkgSUQgb3Igc2VuZGluZyB0aGUgd2hvbGUgb2JqZWN0XG4gICAqIEBwYXJhbSBzZXNzaW9uXG4gICAqIEBwYXJhbSBlbnRpdHlPcklkXG4gICAqIEBwYXJhbSB0cmFuc2FjdGlvbiB0cmFuc2FjdGlvblxuICAgKiBAcmV0dXJucyBwcm9taXNlXG4gICAqL1xuICBwdWJsaWMgZGVsZXRlQnkgPSBhc3luYyAoXG4gICAgc2Vzc2lvbjogU2Vzc2lvbixcbiAgICBlbnRpdHlPcklkOiBudW1iZXIgfCBCYXNlTW9kZWxBdHRyaWJ1dGUsXG4gICAgdHJhbnNhY3Rpb24/OiBUcmFuc2FjdGlvblxuICApOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBjb25zdCBkZWxldGVJZCA9IF8uaXNPYmplY3QoZW50aXR5T3JJZCkgPyBlbnRpdHlPcklkLmlkIDogK2VudGl0eU9ySWRcbiAgICBjb25zdCB3aGVyZTogYW55ID0geyBpZDogZGVsZXRlSWQgfVxuICAgIGlmICh0aGlzLmVudGl0eVVzZXNUZW5hbnRJZCh0aGlzLm1vZGVsKSkgd2hlcmUudGVuYW50SWQgPSB0aGlzLmdldFRlbmFudElkRnJvbVNlc3Npb24oc2Vzc2lvbilcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgYXdhaXQgdGhpcy5tb2RlbC5kZXN0cm95KHsgd2hlcmUsIHRyYW5zYWN0aW9uLCBsb2dnaW5nOiBtc2cgPT4gc2Vzc2lvbi5sb2dnZXIuZGVidWcobXNnKSB9KVxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBhd2FpdCBybXEuTVEucHVibGlzaChgZGIuZGVsZXRlLiR7dGhpcy5tb2RlbC5nZXRUYWJsZU5hbWUoKS50YWJsZU5hbWV9LiR7ZGVsZXRlSWR9YCwge30pXG4gIH1cblxuICBwdWJsaWMgZ2V0V2hlcmUgPSBhc3luYyAoc2Vzc2lvbjogU2Vzc2lvbiwgd2hlcmU6IGFueSwgdHJhbnNhY3Rpb24/OiBUcmFuc2FjdGlvbik6IFByb21pc2U8YW55W10+ID0+IHtcbiAgICBpZiAodGhpcy5lbnRpdHlVc2VzVGVuYW50SWQodGhpcy5tb2RlbCkpIHdoZXJlLnRlbmFudElkID0gdGhpcy5nZXRUZW5hbnRJZEZyb21TZXNzaW9uKHNlc3Npb24pXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIHJldHVybiBhd2FpdCB0aGlzLm1vZGVsLmZpbmRBbGwoeyB3aGVyZSwgdHJhbnNhY3Rpb24sIGxvZ2dpbmc6IG1zZyA9PiBzZXNzaW9uLmxvZ2dlci5kZWJ1Zyhtc2cpIH0pXG4gIH1cbn1cbiJdfQ==