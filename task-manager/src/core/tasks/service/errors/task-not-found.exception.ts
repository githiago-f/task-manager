import { NotFoundException } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

const message = 'Task not found for this id';

export class TaskNotFoundException extends NotFoundException {
    @ApiProperty({ example: message })
    message: string;
    constructor() {
        super(message);
    }
}