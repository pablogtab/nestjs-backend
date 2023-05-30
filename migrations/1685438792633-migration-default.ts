import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationDefault1685438792633 implements MigrationInterface {
    name = 'MigrationDefault1685438792633'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" ADD "parentTaskIdTask" int`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_706f0d9745c05a942a298829f56" FOREIGN KEY ("parentTaskIdTask") REFERENCES "tasks"("idTask") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_706f0d9745c05a942a298829f56"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "parentTaskIdTask"`);
    }

}
