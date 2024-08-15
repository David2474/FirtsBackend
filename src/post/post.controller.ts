import { Controller, Post, Body, Get } from '@nestjs/common';
import { PostService } from './post.service';
import { createPostDto } from './dto/createPost.dto';

@Controller('posts')
export class PostController {

    constructor(
        private postsService: PostService
    ){}

    @Post()
    createPost(@Body() post: createPostDto){
        return this.postsService.createTask(post);
    }

    @Get()
    getPost(){
        return this.postsService.getPost();
    }

}
