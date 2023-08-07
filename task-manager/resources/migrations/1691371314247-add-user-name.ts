import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserName1691371314247 implements MigrationInterface {
    name = 'AddUserName1691371314247'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "name" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`);
    }

}
