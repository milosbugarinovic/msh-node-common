import { Transaction } from 'sequelize'
import { Session } from '../util/customTypings'
import { EntitiesDao } from './EntitiesDao'

export class EntitiesService {
  private ModelDao: EntitiesDao

  constructor(model) {
    this.ModelDao = new EntitiesDao(model)
  }

  public getById = async (session: Session, id: number, t?: Transaction): Promise<any> => {
    return this.ModelDao.getById(session, id, t)
  }

  public getAll = async (session: Session, t?: Transaction): Promise<any[]> => {
    return this.ModelDao.getAll(session, t)
  }

  public save = async (session: Session, entity: any, t?: Transaction): Promise<any> => {
    if (entity.delete) {
      if (!entity.id) return undefined
      return await this.ModelDao.deleteBy(session, entity.id, t)
    } else if (entity.id) {
      return await this.ModelDao.update(session, entity.id, entity, t)
    } else {
      return await this.ModelDao.insert(session, entity, t)
    }
  }

  // FIXME userData undefined
  public insert = async (session, entity: any, t?: Transaction): Promise<any> => {
    return this.ModelDao.insert(session, entity, t)
  }

  public saveBulk = async (session: Session, data: any[], t?: Transaction): Promise<any[]> => {
    const results: any[] = []

    for (const entity of data) {
      results.push(await this.save(session, entity, t))
    }
    return results
  }

  public update = async (session: Session, id: number, entity: any, t?: Transaction): Promise<any> => {
    return this.ModelDao.update(session, id, entity, t)
  }

  public deleteBy = (session: Session, entityOrId: number | any, t?: Transaction): Promise<void> => {
    return this.ModelDao.deleteBy(session, entityOrId, t)
  }

  public getWhere = async (session: Session, where: any, t?: Transaction): Promise<any[]> => {
    return this.ModelDao.getWhere(session, where, t)
  }
}
