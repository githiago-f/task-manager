import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from 'src/app/controllers/tasks/tasks.controller';
import { TaskService } from 'src/core/tasks/service/task/task.service';
import { TaskRepository } from 'src/core/tasks/task.repository';

describe('TasksController', () => {
  let controller: TasksController;
  const taskRepositoryMock = {};
  const jwtServiceMock = { verifyAsync: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        TaskService,
        { provide: TaskRepository, useValue: taskRepositoryMock },
        { provide: JwtService, useValue: jwtServiceMock }
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
