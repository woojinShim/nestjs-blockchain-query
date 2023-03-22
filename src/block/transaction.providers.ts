import { Transaction } from '../transaction/transaction.entity';
import { DataSource } from 'typeorm';

export const transactionProviders = [
  {
    provide: 'TRANSACTION_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Transaction),
    inject: ['DATA_SOURCE'],
  },
];