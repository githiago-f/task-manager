import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { Task } from "./task";

@Injectable()
export class TaskRepository extends Repository<Task> {
    constructor(@InjectDataSource() private dataSource: DataSource) {
        super(Task, dataSource.createEntityManager());
    }
}