import { transactionProviders } from './transaction.providers';
import { Module } from '@nestjs/common';

import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { DatabaseModule } from 'src/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [TransactionController],
  providers: [...transactionProviders, TransactionService],
  exports: [TransactionService],
})
export class TransactionModule {}
