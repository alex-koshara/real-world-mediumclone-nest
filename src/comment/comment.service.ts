import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from './comment.entity';
import { DataSource, DeleteResult, Repository } from 'typeorm';
import { UserEntity } from '@app/user/user.entity';
import { ArticleService } from '@app/article/article.service';
import { ICommentResponseInterface } from './types/commentResponse.interface';
import { ICommentsResponseInterface } from './types/commentsResponse.interface';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
    private readonly articleService: ArticleService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private dataSource: DataSource,
  ) {}

  async addComment(
    currentUser: UserEntity,
    slug: string,
    commentBody: string,
  ): Promise<CommentEntity> {
    const article = await this.articleService.findBySlug(slug);

    if (!article) {
      throw new HttpException(
        'Comment cant be added without authorization',
        HttpStatus.NOT_FOUND,
      );
    }

    const comment = new CommentEntity();
    comment.body = commentBody;
    comment.author = currentUser;
    comment.article = article;

    return await this.commentRepository.save(comment);
  }

  buildCommentResponse(comment: any): ICommentResponseInterface {
    delete comment.author.email;
    delete comment.article;

    return {
      comment,
    };
  }

  async findAll(slug: string): Promise<ICommentsResponseInterface> {
    const article = await this.articleService.findBySlug(slug);

    if (!article) {
      throw new HttpException('Comments does not found', HttpStatus.NOT_FOUND);
    }

    const queryBuilder = this.dataSource
      .getRepository(CommentEntity)
      .createQueryBuilder('comments')
      .leftJoinAndSelect('comments.article', 'article');

    queryBuilder.where('article.slug = :slug', { slug });

    queryBuilder.orderBy('comments.createdAt', 'DESC');

    return {
      comments: await queryBuilder.getMany(),
    };
  }

  async deleteComment(
    currentUser,
    slug,
    deletedCommentId,
  ): Promise<DeleteResult> {
    const article = await this.articleService.findBySlug(slug);
    const comment = await this.commentRepository.findOne({
      where: {
        id: deletedCommentId,
      },
    });

    if (comment.author.id !== currentUser.id) {
      throw new HttpException('You are not an author', HttpStatus.FORBIDDEN);
    }

    if (!comment) {
      throw new HttpException('Comment does not exist', HttpStatus.NOT_FOUND);
    }

    if (!article) {
      throw new HttpException('Article does not exist', HttpStatus.NOT_FOUND);
    }

    return await this.commentRepository.delete({
      id: deletedCommentId,
    });
  }
}
