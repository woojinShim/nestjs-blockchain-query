import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Web3Service } from '../web3/web3.service';
import { Transaction } from './transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    private web3Service: Web3Service,
    @Inject('TRANSACTION_REPOSITORY') private transactionRepository: Repository<Transaction>,
  ) {}

  async getTransactionReceipt(hash: string): Promise<any> {
      const result = await this.transactionRepository
        .createQueryBuilder('transaction')
        .where("transaction.txHash = :txHash", {txHash: hash})
        .getOne()
      
      if(!result) {
        const transaction = await this.web3Service.getTransactionReceipt(
          hash,
        );
        if(!transaction) {
          throw new NotFoundException('transaction not found');
        }
        
        await this.transactionRepository
          .createQueryBuilder()
          .insert()
          .into(Transaction)
          .values({
            blockNumber: transaction.blockNumber,
            txHash: transaction.logs[0]['transactionHash'],
            from: transaction.from,
            to: transaction.to,
            content: JSON.stringify(transaction),
            logs: JSON.stringify(transaction.logs),
            logLength: transaction.logs.length
          })
          .execute()
        return transaction
      }
      return result
  }

  async getFrom(address: string): Promise<any> {
    const result = await this.transactionRepository
    .createQueryBuilder('transaction')
    .where("transaction.from = :from", {from: address})
    .getOne()
    
    if(!result) {
      throw new NotFoundException('address not found')
    }
    return result
  }

  async getTo(address: string): Promise<any> {
    const result = await this.transactionRepository
    .createQueryBuilder('transaction')
    .where("transaction.to = :to", {to: address})
    .getOne()
    
    if(!result) {
      throw new NotFoundException('address not found')
    }
    return result
  }

}
