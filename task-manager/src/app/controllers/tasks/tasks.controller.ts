import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { TaskService } from 'src/core/tasks/service/task/task.service';
import { TaskFilter } from './dto/task-filter';
import { TaskCreateRequest } from './dto/task-create.request';
import { TaskUpdateRequest } from './dto/task-update.request';
import { ApiBearerAuth, ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/app/shared/user';
import { JwtGuard } from 'src/app/guards/jwt/jwt.guard';
import { taskSchema } from './dto/task-response.schema';

@ApiBearerAuth()
@ApiTags('tasks')
@Controller('tasks')
@UseGuards(JwtGuard)
export class TasksController {
    private readonly logger = new Logger(TasksController.name);
    constructor(private readonly taskService: TaskService) {}

    @Get()
    @ApiOkResponse({schema: {items: {
        properties: taskSchema.schema.properties
    }}})
    findTasks(@User() user: {sub:number}, @Query() filter: TaskFilter) {
        this.logger.log(`User: ${JSON.stringify(user)}`);
        return this.taskService.findAll(user.sub, filter);
    }

    @Post()
    @ApiOkResponse(taskSchema)
    createTask(@User() user: {sub:number}, @Body() taskRequest: TaskCreateRequest) {
        return this.taskService.create(user.sub, taskRequest);
    }

    @Patch()
    @ApiOkResponse(taskSchema)
    updateTask(@User() user: {sub:number}, @Body() taskRequest: TaskUpdateRequest) {
        return this.taskService.update(user.sub, taskRequest);
    }

    @Delete(':id')
    @ApiNoContentResponse()
    deleteTask(@User() user: {sub:number}, @Param('id') id: number) {
        this.taskService.delete(user.sub, id);
    }
}
