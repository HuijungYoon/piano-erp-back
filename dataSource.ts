import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { Students } from './src/entities/Students';
import { Teachers } from './src/entities/Teachers';
import { Lessons } from './src/entities/Lessons';
import { Macros } from './src/entities/Macros';
import { SMSs } from './src/entities/SMSs';

dotenv.config();

const dataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Students, Teachers, SMSs, Lessons, Macros],
  migrations: [__dirname + '/src/migrations/*.ts'],
  synchronize: true,
  charset: 'utf8mb4_general_ci',
  logging: true,
});

export default dataSource;
