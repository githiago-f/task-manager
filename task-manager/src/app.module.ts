import { Module } from '@nestjs/common';
import serverConfig from './app/config/server-config';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app/controllers/app.controller';
import { TaskService } from './core/tasks/service/task/task.service';
import { TasksController } from './app/controllers/tasks/tasks.controller';
import { UsersController } from './app/controllers/users/users.controller';
import { TaskRepository } from './core/tasks/task.repository';
import { UserService } from './core/users/service/user/user.service';
import { Encription } from './core/users/providers/encription/encryption';
import { UserRepository } from './core/users/user.repository';
import typeormConfig from './app/config/typeorm-config';
import authConfig from './app/config/auth-config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ConfigModule.forFeature(serverConfig),
    typeormConfig,
    authConfig
  ],
  controllers: [AppController, TasksController, UsersController],
  providers: [
    TaskService, 
    TaskRepository, 
    UserRepository, 
    UserService, 
    Encription
  ],
})
export class AppModule {}
