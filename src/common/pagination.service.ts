import { Injectable, Query } from '@nestjs/common';
import { Repository } from 'typeorm';


export interface Pagination<T> {
    page: number;
    totalPages: number;
    totalItems: number;
    data: T[];
}

@Injectable()
export class PaginationService {
    constructor(
        @Query() private query
    ) {}
    async paginate<T>(repository: Repository<T>, perPage: number): Promise<Pagination<T>> {
        const page = this.query["page"] || 1;
        const data = await repository.find({
            take: perPage,
            skip: (page - 1) * perPage
        });

        return {
            page: 0,
            totalPages: 0,
            totalItems: 0,
            data
        };
    }
}