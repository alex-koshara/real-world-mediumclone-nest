import { ArticleEntity } from '@app/article/article.entity';
import { UserEntity } from '@app/user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'comment' })
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column()
  body: string;

  @ManyToOne(() => UserEntity, (user) => user.comments, {
    eager: true,
  })
  author: UserEntity;

  @ManyToOne(() => ArticleEntity, (article) => article.comments, {
    eager: true,
  })
  article: ArticleEntity;
}
