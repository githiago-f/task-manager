import { Logger } from "@nestjs/common";
import { ConfigModule, ConfigType, registerAs } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Task } from "src/core/tasks/task";
import { User } from "src/core/users/user";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

export const config = registerAs('typeorm-config', () => ({
    type: process.env.DB_DRIVER || 'postgres',
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    username: process.env.DB_USER,
    poolSize: 10,
    retryAttempts: 5,
    port: parseInt(process.env.DB_PORT || '5432'),
    logging: process.env.NODE_ENV !== 'production'
} as PostgresConnectionOptions));

export default TypeOrmModule.forRootAsync({
    inject: [config.KEY],
    imports: [ConfigModule.forFeature(config)],
    async useFactory(conf: ConfigType<typeof config>) {
        const message = `Connecting to ${conf.type} on port ${conf.port}`;
        Logger.log(message, 'TypeOrmModule');
        return {
            ...conf, 
            entities: [Task, User], 
            syncronize: true
        };
    }
});
