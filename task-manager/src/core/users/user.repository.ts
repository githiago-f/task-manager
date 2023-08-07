import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { User } from "./user";

@Injectable()
export class UserRepository extends Repository<User> {
    constructor(@InjectDataSource() private dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    findByEmail(email: string) {
        return this.findOneBy({ email });
    }
}