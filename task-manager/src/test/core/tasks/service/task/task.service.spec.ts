import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from 'src/core/tasks/service/task/task.service';
import { TaskRepository } from 'src/core/tasks/task.repository';
import { DataSource } from 'typeorm';
import { dataSourceMockFactory } from 'src/test/utils';
import { TaskNotFoundException } from 'src/core/tasks/service/errors/task-not-found.exception';

describe('TaskService', () => {
  let service: TaskService;
  const taskRepositoryMock = { findOneBy: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService, 
        { provide: TaskRepository, useValue: taskRepositoryMock },
        { provide: DataSource, useFactory: dataSourceMockFactory }
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Given that the user is updating a task', () => {
    describe('When the task does not exist', () => {
      taskRepositoryMock.findOneBy.mockResolvedValueOnce(null);
      it('Then throws an exception', (done) => {
        expect.assertions(1);
        service.update(1, { id: 1, title: 'Update that fails' })
          .then(() => fail('should fail!!'))
          .catch(e => {
            expect(e).toBeInstanceOf(TaskNotFoundException);
            done();
          });
      });
    });
  });

  describe('Given that the user is deleting a task', () => {
    describe('When the task does not exist', () => {
      taskRepositoryMock.findOneBy.mockResolvedValueOnce(null);
      it('Then throws an exception', (done) => {
        expect.assertions(1);
        service.delete(1, 1)
          .then(() => fail('should fail!!'))
          .catch(e => {
            expect(e).toBeInstanceOf(TaskNotFoundException);
            done();
          });
      });
    });
  });
});
