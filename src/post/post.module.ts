import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports:[TypeOrmModule.forFeature([Post]), UsersModule],
    providers:[PostService],
    controllers: [PostController]
})
export class PostModule {}
