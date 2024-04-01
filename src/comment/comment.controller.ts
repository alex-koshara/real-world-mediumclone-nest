import { User } from '@app/user/decorators/user.decorator';
import { AuthGuard } from '@app/user/guards/auth.guard';
import { UserEntity } from '@app/user/user.entity';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AddCommentDto } from './dto/add.comment.dto';
import { CommentService } from './comment.service';
import { DeleteResult } from 'typeorm';
import { ICommentResponseInterface } from './types/commentResponse.interface';
import { ICommentsResponseInterface } from './types/commentsResponse.interface';

@Controller('articles/:slug/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @UseGuards(AuthGuard)
  async addCommentToArticle(
    @User() currentUser: UserEntity,
    @Param('slug') slug: string,
    @Body('comment') addCommentDto: AddCommentDto,
  ): Promise<ICommentResponseInterface> {
    const comment = await this.commentService.addComment(
      currentUser,
      slug,
      addCommentDto.body,
    );

    return this.commentService.buildCommentResponse(comment);
  }

  @Get()
  async getComments(
    @Param('slug') slug: string,
  ): Promise<ICommentsResponseInterface> {
    return await this.commentService.findAll(slug);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteComment(
    @User() currentUser: UserEntity,
    @Param('slug') slug: string,
    @Param('id') deletedCommentId: number,
  ): Promise<DeleteResult> {
    return await this.commentService.deleteComment(
      currentUser,
      slug,
      deletedCommentId,
    );
  }
}
