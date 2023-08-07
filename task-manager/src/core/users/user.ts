import { 
    Column, 
    CreateDateColumn, 
    Entity, 
    OneToMany, 
    PrimaryGeneratedColumn 
} from "typeorm";
import { Task } from "../tasks/task";

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn({ name: 'user_id' })
    public readonly id: number;

    @Column()
    public readonly name: string;
    @Column()
    public readonly email: string;
    @Column({ name: 'password' })
    private _passwordHash: string;

    @OneToMany(() => Task, 'ownerId', {
        cascade: ['insert', 'soft-remove'],
        lazy: true,
        onDelete: "CASCADE"
    })
    public readonly tasks: Promise<Task[]>;

    @CreateDateColumn()
    public readonly createdAt: Date;

    async setPasswordHash(password: string, hasher: (pass: string) => Promise<string>) {
        this._passwordHash = await hasher(password);
    }

    comparePasswords(comparer: (hashPass: string) => Promise<boolean>) {
        return comparer(this._passwordHash);
    }
}
