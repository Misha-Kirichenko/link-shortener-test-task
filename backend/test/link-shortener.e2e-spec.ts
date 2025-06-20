import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { App } from 'supertest/types';
import { AppModule } from 'src/app/app.module';
import * as request from 'supertest';
import { DataSource } from 'typeorm';
import { UrlDTO } from 'src/link-shortener/dto/url.dto';
import { IShortUrl } from 'src/common/interfaces';

describe('Link Shortener (e2e)', () => {
  let app: INestApplication<App>;
  let dto: UrlDTO;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    dto = {
      originalUrl: 'https://docs.nestjs.com/security/encryption-and-hashing',
      alias: 'security',
    };
  });

  afterAll(async () => {
    const dataSource = app.get(DataSource);

    await dataSource.query(`DELETE FROM short_links WHERE alias = $1;`, [
      dto.alias,
    ]);

    await dataSource.query(`
    SELECT setval(
      pg_get_serial_sequence('short_links', 'id'),
      COALESCE((SELECT MAX(id) FROM short_links), 1),
      true
    );
  `);

    await app.close();
  });

  describe('Shorten url and check redirects', () => {
    let aliasUrlObj: IShortUrl;

    beforeAll(async () => {
      const res: request.Response & { body: IShortUrl } = await request(
        app.getHttpServer(),
      )
        .post('/link-shortener/shorten')
        .send(dto);

      aliasUrlObj = res.body as IShortUrl;
    });

    it('function shortenUrl should return object with key: shortUrl', () => {
      expect(aliasUrlObj).toHaveProperty('shortUrl');
      expect(aliasUrlObj.shortUrl).toEqual(
        expect.stringContaining(`/${dto.alias}`),
      );
    });

    it(`GET request on /:shortUrl should return 301 status code`, async () => {
      // Link is permanent (no expiresAt), so it should return "301: Moved Permanently"
      await request(app.getHttpServer()).get(`/${dto.alias}`).expect(301);
    });

    it(`GET request on /:shortUrl should redirect to original url`, async () => {
      const res: request.Response = await request(app.getHttpServer()).get(
        `/${dto.alias}`,
      );
      expect(res.headers.location).toBe(dto.originalUrl);
    });

    it('Throw "409: Conflict Error" when trying to create duplicate alias', async () => {
      const res = await request(app.getHttpServer())
        .post('/link-shortener/shorten')
        .send(dto);

      expect(res.status).toBe(409);
    });
  });
});
