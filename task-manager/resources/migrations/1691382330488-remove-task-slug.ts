import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveTaskSlug1691382330488 implements MigrationInterface {
    name = 'RemoveTaskSlug1691382330488'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_de87864b54eb03384b9845b2ba"`);
        await queryRunner.query(`ALTER TABLE "tasks" RENAME COLUMN "slug" TO "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "updatedAt" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tasks" RENAME COLUMN "updatedAt" TO "slug"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_de87864b54eb03384b9845b2ba" ON "tasks" ("slug") `);
    }

}
