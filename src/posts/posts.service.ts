import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>,
    private usersService: UsersService,
  ) {}

  async createPost(post: CreatePostDto) {
    const userFound = await this.usersService.getUser(post.authorId);

    if (!userFound) {
      return new HttpException('Author not found', HttpStatus.NOT_FOUND);
    }

    const newPost = this.postsRepository.create(post);
    return this.postsRepository.save(newPost);
  }

  getPosts() {
    return this.postsRepository.find({
      relations: ['author'],
    });
  }

  /* async getPost() {
    return this.postsRepository.find();

    const postFound = await this.postsRepository.findOne({
      where: { id },
    });

    if (!postFound) {
      return new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }

    return postFound;
  } */

  /* async deletePost(id: number) {
    const result = await this.postsRepository.delete({ id });

    if (result.affected === 0) {
      return new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }

    return result;
  } */
}
