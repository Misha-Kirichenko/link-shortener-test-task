import { Test, TestingModule } from '@nestjs/testing';
import { LinkShortenerController } from './link-shortener.controller';

describe('LinkShortenerController', () => {
  let controller: LinkShortenerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LinkShortenerController],
    }).compile();

    controller = module.get<LinkShortenerController>(LinkShortenerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
