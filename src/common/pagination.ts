import { Repository } from 'typeorm';


export interface Pagination<T> {
    page: number;
    totalPages: number;
    totalItems: number;
    items: T[];
}

export async function paginate<T>(page = 1, repository: Repository<T>, perPage: number): Promise<Pagination<T>> {
    if (page < 1) page = 1;

    const [items, totalItems] = await repository.findAndCount({
        take: perPage,
        skip: (page - 1) * perPage
    });

    return {
        page,
        totalPages: Math.ceil(totalItems / perPage),
        totalItems,
        items,
    };
}