import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from '../../../../../core/tasks/service/task/task.service';
import { TaskRepository } from '../../../../../core/tasks/task.repository';
import { DataSource } from 'typeorm';
import { dataSourceMockFactory } from '../../../../utils';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService, 
        TaskRepository,
        { provide: DataSource, useFactory: dataSourceMockFactory }
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
