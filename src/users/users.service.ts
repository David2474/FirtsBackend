import { HttpException, HttpStatus, Injectable, Post } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { createUserDto } from './dto/create-users.dto';
import { updateUser } from './dto/update-user.dto';
import { createProfileDto } from './dto/create-profile.dto';
import { Profile } from './profile.entity';

@Injectable()
export class UsersService {
// Este constructor permite usar typeorm y hacer consultas
    constructor(
      @InjectRepository(User) private userRepository:Repository<User>,
      @InjectRepository(Profile) private profileRepository:Repository<Profile>,
   ) {}
    
     createUser(user: createUserDto){
         const newUser = this.userRepository.create(user)
         return this.userRepository.save(newUser);
     }

     getUsers(){
         return this.userRepository.find();
     }

     getUser(id: number){
         return this.userRepository.findOne({
         where:{
            id: id
         },
         relations:['profile'],
      })
     }

     deleteUser(id: number){
         return this.userRepository.delete(id);
     }

   // Funcion de service TYPEORM
     updateUser(id: number, user: updateUser ){
      return this.userRepository.update(id, user);
     }

    async createProfile(id: number, profile: createProfileDto){
        const userFound = await this.userRepository.findOne({
         where:{
         id,
        },
      })

      if(!userFound){
        return new HttpException('user not found', HttpStatus.NOT_FOUND);
      }

      const newProfile = this.profileRepository.create(profile);
      const saveProfile = await this.profileRepository.save(newProfile);
      userFound.profile = saveProfile;
      return this.userRepository.save(userFound); 

    }

}  
