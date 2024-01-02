import { PrismaClient } from '@prisma/client';
import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  let prismaService: PrismaService;

  beforeEach(async () => {
    prismaService = new PrismaService();
    prismaService.$connect = jest.fn();
  });

  it('should extend PrismaClient', () => {
    expect(PrismaService.prototype instanceof PrismaClient);
  });

  describe('onModuleInit', () => {
    it('should this.$connect', async () => {
      await prismaService.onModuleInit();
      expect(prismaService.$connect).toHaveBeenCalledTimes(1);
    });
  });
});
