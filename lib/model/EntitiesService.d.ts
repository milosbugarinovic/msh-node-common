import { Transaction } from 'sequelize';
import { Session } from '../util/customTypings';
export declare class EntitiesService {
    private ModelDao;
    constructor(model: any);
    getById: (session: Session, id: number, t?: Transaction | undefined) => Promise<any>;
    getAll: (session: Session, t?: Transaction | undefined) => Promise<any[]>;
    save: (session: Session, entity: any, t?: Transaction | undefined) => Promise<any>;
    insert: (session: any, entity: any, t?: Transaction | undefined) => Promise<any>;
    saveBulk: (session: Session, data: any[], t?: Transaction | undefined) => Promise<any[]>;
    update: (session: Session, id: number, entity: any, t?: Transaction | undefined) => Promise<any>;
    deleteBy: (session: Session, entityOrId: any, t?: Transaction | undefined) => Promise<void>;
    getWhere: (session: Session, where: any, t?: Transaction | undefined) => Promise<any[]>;
}
