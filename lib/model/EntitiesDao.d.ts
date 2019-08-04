import { Transaction } from 'sequelize';
import { BaseModelAttribute, Session } from '../util/customTypings';
export declare class EntitiesDao {
    private readonly model;
    private entityUsesTenantId;
    private getTenantIdFromSession;
    constructor(model: any);
    getAll: (session: Session, transaction?: Transaction | undefined) => Promise<any[]>;
    getById: (session: Session, id: number, transaction?: Transaction | undefined) => Promise<any>;
    insert: (session: Session, entity: any, transaction?: Transaction | undefined) => Promise<any>;
    update: (session: Session, id: number, entity: any, transaction?: Transaction | undefined) => Promise<any>;
    /***
     * Delete entity by ID or sending the whole object
     * @param session
     * @param entityOrId
     * @param transaction transaction
     * @returns promise
     */
    deleteBy: (session: Session, entityOrId: number | BaseModelAttribute, transaction?: Transaction | undefined) => Promise<void>;
    getWhere: (session: Session, where: any, transaction?: Transaction | undefined) => Promise<any[]>;
}
