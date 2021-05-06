import { join } from 'path';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

const config: MysqlConnectionOptions = {
  host: '119.23.41.42',
  username: 'root',
  password: 'lin060340',
  type: 'mysql',
  port: 3306,
  database: 'yezi',
  entities: [join(__dirname, '../', '**/**.entity{.ts,.js}')],
  synchronize: true,
};
export default config;
