import { TaskStatus } from "src/core/tasks/task-status";

export const taskSchema = {
    schema: {
        properties: {
            id: { type: 'number' },
            title: { type: 'string' },
            description: { type: 'string' },
            dueDate: { type: 'string', format: 'date' },
            status: { 
                type: 'enum', 
                enum: [
                    TaskStatus.FINISHED,
                    TaskStatus.IN_PROGRESS,
                    TaskStatus.PENDING
                ] 
            },
            ownerId: { type: 'number' },
            creatdAt: { type: 'string', format: 'date' },
            updatedAt: { type: 'string', format: 'date' }
        }
    }
};