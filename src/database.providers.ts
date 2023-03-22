import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
dotenv.config();

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'asdf1234*^',
        database: 'nestjs-db',
        entities: ["dist/**/*.entity.js"],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];