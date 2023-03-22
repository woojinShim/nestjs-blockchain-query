import { Controller, Get, Param } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Transaction')
@Controller('/transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get('/hash/:transactionHash')
  async getHash(@Param('transactionHash') transactionHash: string) {
    return await this.transactionService.getTransactionReceipt(transactionHash);
  }

  @Get('/from/:address')
  async getFrom(@Param('address') address: string) {
    return await this.transactionService.getFrom(address);
  }

  @Get('/to/:address')
  async getTo(@Param('address') address: string) {
    return await this.transactionService.getTo(address);
  }
}
