import { Controller, Get } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/User';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationService, Pagination } from 'src/common/pagination.service';

@Controller('user')
export class UserController {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private pagination: PaginationService
    ) {

    }

    @Get()
    getAll(): Promise<Pagination<User>> {
        return this.pagination.paginate(this.userRepository, 10);
    }
}
