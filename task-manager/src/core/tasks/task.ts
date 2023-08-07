import { TaskStatus } from './task-status';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({name: 'tasks'})
export class Task {
    @PrimaryGeneratedColumn({ name: 'task_id' })
    public readonly id: number;
    @Column({ name: 'owner_id' })
    public readonly ownerId: number;
    @Column({ enum: TaskStatus, type: 'simple-enum' })
    public readonly status: TaskStatus;
    @Column()
    public readonly title: string;
    @Column()
    public readonly description: string;
    @Column({ type: 'timestamp', name: 'due_date' })
    public readonly dueDate: Date;
    
    @CreateDateColumn()
    public readonly createdAt: Date;
    @UpdateDateColumn()
    public readonly updatedAt: Date;
}
