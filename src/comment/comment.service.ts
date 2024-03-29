import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from './comment.entity';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from '@app/user/user.entity';
import { AddCommentDto } from './dto/add.comment.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private dataSource: DataSource,
  ) {}

  async addComment(
    currentUser: UserEntity,
    slug: string,
    commentBody: string,
  ) {}
}
