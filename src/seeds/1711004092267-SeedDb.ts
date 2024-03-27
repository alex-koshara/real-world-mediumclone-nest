import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedDb1711004092267 implements MigrationInterface {
  name = 'SeedDb1711004092267';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO tags (name) VALUES ('rock'), ('coffee'), ('nestjs')`,
    );

    // password is 123
    await queryRunner.query(
      `INSERT INTO users (username, email, password) VALUES ('foo', 'foo@gmail.foo', '$2b$10$tOPinqH4KbCSue8GbQi5..1vFwdjDrlAXwUZEl5xLb1A7JnaCLEvC')`,
    );

    await queryRunner.query(
      `INSERT INTO articles (slug, title, description, body, "tagList", "authorId") VALUES ('first-article', 'First article', 'first article desc', 'article body', 'rock,drive,coffee', 1)`,
    );

    await queryRunner.query(
      `INSERT INTO articles (slug, title, description, body, "tagList", "authorId") VALUES ('second-article', 'second article', 'second article desc', 'article seocn body', 'drag,drive,coffee', 1)`,
    );
  }

  public async down(): Promise<void> {}
}
