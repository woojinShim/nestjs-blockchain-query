import { Module } from '@nestjs/common';
import { Web3Module } from './web3/web3.module';
import { ConfigModule } from '@nestjs/config';
import { BlockController } from './block/block.controller';
import { TransactionController } from './transaction/transaction.controller';
import { TransactionModule } from './transaction/transaction.module';
import { BlockModule } from './block/block.module';
import { ScheduleModule } from '@nestjs/schedule';


@Module({
  imports: [
    Web3Module,
    BlockModule,
    TransactionModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ScheduleModule.forRoot()
  ],
  controllers: [BlockController, TransactionController],
})
export class AppModule {}
