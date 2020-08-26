import { EntityId } from 'typeorm/repository/EntityId'
import { Repository } from "typeorm";
import { EntityNotFoundError } from "./EntityNotFoundError";

type Identifiable = {id: EntityId};

export abstract class BaseEntityService<T extends Identifiable> {
    protected readonly repository: Repository<T>;
    async _checkExist(entityId: EntityId) {
        const entityCount = await this.repository.count({ where: {id: entityId} });
        if (entityCount === 0) {
            throw new EntityNotFoundError();
        }
    }
}