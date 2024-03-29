import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from './comment.entity';
import { CommentController } from './comment.controller';
import { UserEntity } from '@app/user/user.entity';
import { ArticleEntity } from '@app/article/article.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentEntity, UserEntity, ArticleEntity]),
  ],
  controllers: [CommentController],
})
export class CommentModule {}
