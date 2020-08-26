import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import {v4 as uuidv4 } from 'uuid';

import { BaseEntityService } from 'src/common/BaseEntityService';
import { paginate, Pagination } from 'src/common/pagination';
import { User } from 'src/entities/User';

export interface UserDTO {
    firstname?: string;
    lastname?: string;
    email?: string;
}

@Injectable()
export class UserService extends BaseEntityService<User> {
    constructor(
        @InjectRepository(User)
        protected readonly repository: Repository<User>,
    ) {
        super();
    }

    async findAll(page = 1): Promise<Pagination<User>> {
        return await paginate<User>(page, this.repository, 10);
    }

    async create(user: UserDTO) {
        const newId = uuidv4();
        return await this.repository.insert({ id: newId, ...user });
    }

    async findId(id: string) {
        await this._checkExist(id);
        return await this.repository.findOne(id);
    }

    async update(id: string, userData: UserDTO) {
        await this._checkExist(id);
        await this.repository.update(id, userData);

        return await this.repository.findOne(id)
    }

    async delete(id: string) {
        await this._checkExist(id);
        await this.repository.delete(id)
        return;
    }
}
