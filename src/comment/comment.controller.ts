import { User } from '@app/user/decorators/user.decorator';
import { AuthGuard } from '@app/user/guards/auth.guard';
import { UserEntity } from '@app/user/user.entity';
import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { AddCommentDto } from './dto/add.comment.dto';

@Controller('articles')
export class CommentController {
  @Post(':slug/comments')
  @UseGuards(AuthGuard)
  async addCommentToArticle(
    @User() currentUser: UserEntity,
    @Param('slug') slug: string,
    @Body('comment') addCommentDto: AddCommentDto,
  ) {
    console.log(currentUser, slug, addCommentDto);
    return 'comment is added';
  }
}
