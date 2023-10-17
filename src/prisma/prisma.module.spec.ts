import { Test, TestingModule } from '@nestjs/testing';

import { PrismaModule } from './prisma.module';
import { PrismaService } from './services/prisma.service';

describe('GravatarModule', () => {
  let prismaModule: TestingModule;

  beforeEach(async () => {
    prismaModule = await Test.createTestingModule({
      imports: [PrismaModule]
    }).compile(); 
  });

  it('should have been defined correctly with the correct imports, providers and exports', () => {
    expect(prismaModule).toBeDefined();
    expect(prismaModule.get<PrismaService>(PrismaService)).toBeDefined();
  });
});
