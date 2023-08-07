import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { PagedRequest } from "src/app/shared/paged-request";
import { Task } from "src/core/tasks/task";
import { TaskStatus } from "src/core/tasks/task-status";

export class TaskFilter extends PagedRequest<Task> {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({ enum: TaskStatus, type:'enum', required: false })
    public readonly status?: TaskStatus;
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({ required: false })
    public readonly title?: string;
}