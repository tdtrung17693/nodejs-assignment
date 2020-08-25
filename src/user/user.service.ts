import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/User';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userService: Repository<User>
    ) {
    }

    findAll(): Promise<User[]> {
        return this.userService.find();
    }


}
