import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, INestApplication } from '@nestjs/common';
import { App } from 'supertest/types';
import { AppModule } from 'src/app/app.module';
import { DataSource, QueryRunner } from 'typeorm';
import { LinkShortenerService } from 'src/link-shortener/link-shortener.service';
import { UrlDTO } from 'src/link-shortener/dto/url.dto';

describe('Link Shortener (e2e)', () => {
  let app: INestApplication<App>;
  let service: LinkShortenerService;
  let queryRunner: QueryRunner;
  const minimalDTO: UrlDTO = {
    originalUrl: 'http://example.com/some-long-damn-link/category-1',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const dataSource = app.get(DataSource);
    queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    service = new LinkShortenerService(
      queryRunner.manager.getRepository('ShortLink'),
    );
  });

  afterAll(async () => {
    await queryRunner.rollbackTransaction();
    await queryRunner.release();
    await app.close();
  });

  describe('Shorten url ', () => {
    it('should return shortUrl', async () => {
      const result = await service.shortenUrl(minimalDTO);
      expect(result).toHaveProperty('shortUrl');
      expect(typeof result.shortUrl).toBe('string');
    });

    const dtoWithAlias = {
      ...minimalDTO,
      alias: 'example',
    };

    it('Returned shortUrl should contain passed alias', async () => {
      const result = await service.shortenUrl(dtoWithAlias);
      expect(typeof result.shortUrl).toBe('string');
      expect(result['shortUrl']).toContain(dtoWithAlias.alias);
    });

    it('Field shortUrl must be unique. must throw "Conflict Error": 409', async () => {
      await expect(service.shortenUrl(dtoWithAlias)).rejects.toThrow(
        ConflictException,
      );
    });
  });
});
