import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationDefault1685396300341 implements MigrationInterface {
    name = 'MigrationDefault1685396300341'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_bb6d6962f0d05af65d6c679c394"`);
        await queryRunner.query(`EXEC sp_rename "taskhub.dbo.tasks.idUser", "userIdUser"`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_55786b2ef4bef7b8cc7625d5792" FOREIGN KEY ("userIdUser") REFERENCES "users"("idUser") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_55786b2ef4bef7b8cc7625d5792"`);
        await queryRunner.query(`EXEC sp_rename "taskhub.dbo.tasks.userIdUser", "idUser"`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_bb6d6962f0d05af65d6c679c394" FOREIGN KEY ("idUser") REFERENCES "users"("idUser") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
