import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { AuthGuard } from '@app/user/guards/auth.guard';
import { UserEntity } from '@app/user/user.entity';
import { CreateArticleDTO } from './dto/create.article.dto';
import { User } from '@app/user/decorators/user.decorator';
import { IArticleResponseInterface } from './types/articleResponse.interface';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async create(
    @User() currentUser: UserEntity,
    @Body('article') createArticleDto: CreateArticleDTO,
  ): Promise<IArticleResponseInterface> {
    const article = await this.articleService.createArticle(
      currentUser,
      createArticleDto,
    );

    return this.articleService.buildArticleResponse(article);
  }

  @Get(':slug')
  async getArticle(
    @Param('slug') slug: string,
  ): Promise<IArticleResponseInterface> {
    const article = await this.articleService.findBySlug(slug);
    return this.articleService.buildArticleResponse(article);
  }

  @Put(':slug')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async updateCurrentArticle(
    @User('id') currentUserId: number,
    @Body('article') createArticleDto: CreateArticleDTO,
    @Param('slug') slug: string,
  ): Promise<IArticleResponseInterface> {
    const article = await this.articleService.updateArticle(
      currentUserId,
      slug,
      createArticleDto,
    );

    return this.articleService.buildArticleResponse(article);
  }

  @Delete(':slug')
  @UseGuards(AuthGuard)
  async deleteArticle(
    @User('id') currentUserId: number,
    @Param('slug') slug: string,
  ) {
    return await this.articleService.deleteArticle(slug, currentUserId);
  }
}
