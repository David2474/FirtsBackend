import { Body, Controller, Get, Post, Param, ParseIntPipe, Delete, Patch } from '@nestjs/common';
import { createUserDto } from './dto/create-users.dto';
import { UsersService } from './users.service';
import { updateUser } from './dto/update-user.dto';
import { createProfileDto } from './dto/create-profile.dto';

@Controller('users')
export class UsersController {
// se agrega el servicio con el metodo para crear usuario
    constructor(private usersService: UsersService){}

    @Get()
    getUsers(){
        return this.usersService.getUsers();
    }

    @Get(':id')
    getUser(@Param('id', ParseIntPipe) id: number){
        return this.usersService.getUser(id);
    }

    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number){
        console.log(typeof id)
        console.log(id)
        return this.usersService.deleteUser(id);
    }

    @Post()
    createUser(@Body() newUser: createUserDto){
        this.usersService.createUser(newUser);
    }

    // Peticion para actualizar registros
    @Patch(':id')
    updateUser(@Param('id', ParseIntPipe) id: number, @Body()
    user: updateUser){
        return this.usersService.updateUser(id, user);
    }

    
    @Post(':id/profile')
    createProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body()profile: createProfileDto
    ){
        return this.usersService.createProfile(id, profile);
    }
}
 