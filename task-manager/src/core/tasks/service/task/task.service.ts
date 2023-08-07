import { Injectable } from '@nestjs/common';
import { TaskRepository } from '../../task.repository';
import { TaskFilter } from 'src/app/controllers/tasks/dto/task-filter';
import { TaskCreateRequest } from 'src/app/controllers/tasks/dto/task-create.request';
import { TaskUpdateRequest } from 'src/app/controllers/tasks/dto/task-update.request';
import { TaskNotFoundException } from '../errors/task-not-found.exception';
import { Like } from 'typeorm';

@Injectable()
export class TaskService {
    constructor(private taskRepository: TaskRepository) {}
    
    findAll(ownerId: number, filter: TaskFilter) {
        return this.taskRepository.find({
            where: { 
                status: filter.status,
                title: filter.title ? Like('%' + filter.title + '%') : undefined,
                ownerId
            },
            ...filter.asObjectQuery
        });
    }
    
    create(ownerId: number, taskRequest: TaskCreateRequest) {
        const task = this.taskRepository.create({
            ...taskRequest,
            ownerId
        });
        return this.taskRepository.save(task);
    }
    
    async update(ownerId: number, taskRequest: TaskUpdateRequest) {
        const task = await this.taskRepository.findOneBy({
            ownerId,
            id: taskRequest.id
        });
        if(!task) {
            throw new TaskNotFoundException();
        }
        const mergedTask = this.taskRepository.merge(task, taskRequest);
        return this.taskRepository.save(mergedTask);
    }

    async delete(ownerId: number, id: number) {
        const task = await this.taskRepository.findOneBy({ ownerId, id });
        if(!task) {
            throw new TaskNotFoundException();
        }
        await this.taskRepository.delete(task);
    }
}
