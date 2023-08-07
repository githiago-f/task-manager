import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { TaskStatus } from "src/core/tasks/task-status";

export class TaskCreateRequest {
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    @ApiProperty({
        description: 'Title that identifies the task'
    })
    public readonly title: string;
    @IsString()
    @MinLength(3)
    @ApiProperty({
        description: 'Description for the task'
    })
    public readonly description: string;
    @IsOptional()
    @IsEnum(TaskStatus)
    @ApiProperty({
        description: 'Task status',
        enum: TaskStatus,
        required: false
    })
    public readonly status?: TaskStatus;
    @IsOptional()
    @IsDateString()
    @ApiProperty({
        required: false,
        type: 'string',
        format: 'date',
        description: 'Optional task due date',
    })
    public readonly dueDate?: string;
}
