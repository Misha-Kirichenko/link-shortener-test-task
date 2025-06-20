import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { IShortLinkListItem } from 'src/common/interfaces';
import { UrlModule } from 'src/url/url.module';
import { DbModule } from 'src/db/db.module';

describe('UrlController (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [DbModule, UrlModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('(GET) /urls/list ', () => {
    let res: request.Response & { body: IShortLinkListItem[] };
    beforeAll(async () => {
      res = await request(app.getHttpServer()).get('/urls/list');
    });

    it('Response status must be 200', () => {
      expect(res.status).toBe(200);
    });

    it('Response body must be an array', () => {
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('All url list objects must have valid form', () => {
      const validUrList = (body: IShortLinkListItem[]) => {
        const requiredKeys = ['alias', 'shortUrl'];
        if (Array.isArray(body) && !body.length) return true;

        const hasInvalidBodyObject = body.some((item: IShortLinkListItem) => {
          const itemKeys = Object.keys(item).toSorted().join('-');
          const reqKeys = requiredKeys.toSorted().join('-');
          return itemKeys !== reqKeys;
        });

        return !hasInvalidBodyObject;
      };
      expect(validUrList(res.body as IShortLinkListItem[])).toBe(true);
    });
  });
});
