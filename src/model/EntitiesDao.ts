import * as _ from 'lodash'
import { Model, Transaction } from 'sequelize'
import { rmq } from '..'
import { BaseModelAttribute, Session } from '../util/customTypings'
import { concurrentDataAccessHelper as cdaHelper } from './concurrentDataAccessHelper'

export class EntitiesDao {
  private readonly model: Model

  private entityUsesTenantId = (model): boolean => _.get(model, 'tableAttributes.tenantId', false)
  private getTenantIdFromSession = (session): number | undefined => _.get(session, 'userData.tenantId', undefined)

  constructor(model) {
    this.model = model
  }

  public getAll = async (session: Session, transaction?: Transaction): Promise<any[]> => {
    const where: any = {}
    if (this.entityUsesTenantId(this.model)) where.tenantId = this.getTenantIdFromSession(session)
    // @ts-ignore
    return await this.model.findAll({ where, transaction, logging: msg => session.logger.debug(msg) })
  }

  public getById = async (session: Session, id: number, transaction?: Transaction): Promise<any> => {
    const where: any = { id }
    if (this.entityUsesTenantId(this.model)) where.tenantId = this.getTenantIdFromSession(session)
    // @ts-ignore
    return await this.model.findOne({ where, transaction, logging: msg => session.logger.debug(msg) })
  }

  public insert = async (session: Session, entity: any, transaction?: Transaction): Promise<any> => {
    if (this.entityUsesTenantId(this.model)) entity.tenantId = this.getTenantIdFromSession(session)
    // @ts-ignore
    const result = await this.model.create(entity, { transaction, logging: msg => session.logger.debug(msg) })
    // @ts-ignore
    await rmq.MQ.publish(`db.insert.${this.model.getTableName().tableName}.${result.id}`, result.toJSON())
    return result
  }

  public update = async (session: Session, id: number, entity: any, transaction?: Transaction): Promise<any> => {
    const where: any = {
      id,
      updatedAt: entity.updatedAt,
    }
    if (this.entityUsesTenantId(this.model)) where.tenantId = this.getTenantIdFromSession(session)
    if (entity.hasOwnProperty('id')) delete entity.id
    // @ts-ignore
    const result = await this.model.findOne({ where, transaction, logging: msg => session.logger.debug(msg) })
    if (!result) {
      // @ts-ignore
      const concurCheckEntity = await this.model.findOne({
        where: { id },
        transaction,
        logging: msg => session.logger.debug(msg),
      })
      throw cdaHelper.checkForConcurrentDataAccessError({ id, ...entity }, concurCheckEntity)
    }
    const updatedEntity = await result.update(entity, { transaction, logging: msg => session.logger.debug(msg) })
    // @ts-ignore
    await rmq.MQ.publish(`db.update.${this.model.getTableName().tableName}.${updatedEntity.id}`, updatedEntity.toJSON())
    return updatedEntity
  }

  /***
   * Delete entity by ID or sending the whole object
   * @param session
   * @param entityOrId
   * @param transaction transaction
   * @returns promise
   */
  public deleteBy = async (
    session: Session,
    entityOrId: number | BaseModelAttribute,
    transaction?: Transaction
  ): Promise<void> => {
    const deleteId = _.isObject(entityOrId) ? entityOrId.id : +entityOrId
    const where: any = { id: deleteId }
    if (this.entityUsesTenantId(this.model)) where.tenantId = this.getTenantIdFromSession(session)
    // @ts-ignore
    await this.model.destroy({ where, transaction, logging: msg => session.logger.debug(msg) })
    // @ts-ignore
    await rmq.MQ.publish(`db.delete.${this.model.getTableName().tableName}.${deleteId}`, {})
  }

  public getWhere = async (session: Session, where: any, transaction?: Transaction): Promise<any[]> => {
    if (this.entityUsesTenantId(this.model)) where.tenantId = this.getTenantIdFromSession(session)
    // @ts-ignore
    return await this.model.findAll({ where, transaction, logging: msg => session.logger.debug(msg) })
  }
}
