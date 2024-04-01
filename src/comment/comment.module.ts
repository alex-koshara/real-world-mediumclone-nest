import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from './comment.entity';
import { CommentController } from './comment.controller';
import { UserEntity } from '@app/user/user.entity';
import { ArticleEntity } from '@app/article/article.entity';
import { CommentService } from './comment.service';
import { FollowEntity } from '@app/profile/follow.entity';
import { ArticleService } from '@app/article/article.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CommentEntity,
      UserEntity,
      ArticleEntity,
      FollowEntity,
    ]),
  ],
  controllers: [CommentController],
  providers: [CommentService, ArticleService],
})
export class CommentModule {}
