import { DataSource } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import { config } from 'dotenv';
import { join } from "path";
import { cwd } from "process";
import { User } from "src/core/users/user";
import { Task } from "src/core/tasks/task";

config();

const options = {
    type: process.env.DB_DRIVER || 'postgres',
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    username: process.env.DB_USER,
    poolSize: 10,
    retryAttempts: 5,
    port: parseInt(process.env.DB_PORT || '5432'),
    logging: process.env.NODE_ENV !== 'production',
    migrations: [join(cwd(), 'resources/migrations/*.ts')],
    entities:[User, Task]
} as PostgresConnectionOptions;

const datasource = new DataSource(options);
datasource.initialize();
export default datasource;