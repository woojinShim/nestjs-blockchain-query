import { transactionProviders } from './transaction.providers';
import { Module } from '@nestjs/common';
import { BlockController } from './block.controller';
import { BlockService } from './block.service';
import { DatabaseModule } from 'src/database.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [DatabaseModule, 
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),],
  controllers: [BlockController],
  providers: [...transactionProviders, BlockService],
  exports: [BlockService],
})
export class BlockModule {}
