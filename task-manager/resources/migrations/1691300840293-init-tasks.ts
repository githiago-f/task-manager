import { MigrationInterface, QueryRunner } from "typeorm";

export class InitTasks1691300840293 implements MigrationInterface {
    name = 'InitTasks1691300840293'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tasks" ("task_id" SERIAL NOT NULL, "slug" character varying NOT NULL, "owner_id" integer NOT NULL, "status" character varying NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "due_date" TIMESTAMP NOT NULL, CONSTRAINT "PK_3feca00d238e5cf50185fab8d46" PRIMARY KEY ("task_id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_de87864b54eb03384b9845b2ba" ON "tasks" ("slug") `);
        await queryRunner.query(`CREATE TABLE "users" ("user_id" SERIAL NOT NULL, CONSTRAINT "PK_96aac72f1574b88752e9fb00089" PRIMARY KEY ("user_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_de87864b54eb03384b9845b2ba"`);
        await queryRunner.query(`DROP TABLE "tasks"`);
    }

}
