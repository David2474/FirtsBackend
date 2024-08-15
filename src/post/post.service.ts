import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { createPostDto } from './dto/createPost.dto';

@Injectable()
export class PostService {

    constructor(
        @InjectRepository(Post) private postRepository:Repository<Post>,
        private usersService: UsersService 
    ) {}

    async createTask(post: createPostDto){
        const userFound = await this.usersService.getUser(post.authorId);

        if(!userFound){
            return (
                new HttpException('user not found', HttpStatus.NOT_FOUND)
            )
        }

        const newPost = this.postRepository.create(post);
        return this.postRepository.save(newPost);
    }

    getPost(){
        return this.postRepository.find({
            relations: ['author'],
        });
    }

}