import { Injectable, Inject, NotFoundException, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Web3Service } from '../web3/web3.service';
import { Transaction } from '../transaction/transaction.entity';
import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig } from 'axios';
import { lastValueFrom } from 'rxjs';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BlockService {
  private readonly logger = new Logger(BlockService.name);
  constructor(
    private readonly configService: ConfigService,
    private httpService: HttpService,
    private web3Service: Web3Service,
    @Inject('TRANSACTION_REPOSITORY') private transactionRepository: Repository<Transaction>,
  ) {}

  @Cron(CronExpression.EVERY_5_MINUTES)
  async currentTxCron() {    
    const result = await this.transactionRepository.count()
    const { sum } = await this.transactionRepository
      .createQueryBuilder('transaction')
      .select("SUM(transaction.logLength)", "sum")
      .getRawOne(); 

    const obj = `현재 트랜잭션의 갯수는 ${result}, Log의 갯수는 ${sum}입니다.`
    this.logger.debug(obj);
    const requestConfig: AxiosRequestConfig = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    const data = {
      text: obj,
    };
    const URL = this.configService.get<string>('SLACK_WEBHOOK_URL');
    await lastValueFrom(
      this.httpService.post(URL, data, requestConfig)
    )
  }

  @Cron(CronExpression.EVERY_HOUR)
  async handleCron() {
    const requestConfig: AxiosRequestConfig = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    const data = {
      text: "서버가 정상 동작 중입니다.",
    };

    const URL = this.configService.get<string>('SLACK_WEBHOOK_URL');
    await lastValueFrom(
      this.httpService.post(URL, data, requestConfig)
    )
  }

  async getCurrentBlock(): Promise<number> {
    return await this.web3Service.getBlockNumber();
  }

  async getBlock(id: number) {
    const result = await this.transactionRepository
      .createQueryBuilder('transaction')
      .where("transaction.blockNumber = :blockNumber", {blockNumber: id})
      .getOne()
    
    if(!result) {
      const res = await this.web3Service.getBlock(id);
        if(!res) {
          throw new NotFoundException('blockNumber not found');
        }
      return res
    }

    return result
  }
  
}
