import { Controller, Get, Param, Put, Body, NotFoundException, Delete, HttpCode, Query, Post } from '@nestjs/common';
import { UserService, UserDTO } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ) {}

    @Get()
    async getAll(@Query('page') page) {
        return await this.userService.findAll(page);
    }

    @Post()
    async storeUser(@Body() userData: UserDTO) {
        return await this.userService.create(userData);
    }

    @Get(':id')
    async getUserDetails(@Param('id') id) {
        try {
            return await this.userService.findId(id);
        } catch (e) {
            throw new NotFoundException();
        }
    }

    @Put(':id')
    async updateUserDetails(@Param('id') id, @Body() userData: UserDTO) {
        try {
            return await this.userService.update(id, userData);
        } catch (e) {
            throw new NotFoundException();
        }
    }

    @Delete(':id')
    @HttpCode(204)
    async deleteUser(@Param('id') id) {
        try {
            await this.userService.delete(id);
            return 
        } catch (e) {
            throw new NotFoundException();
        }
    }
}
