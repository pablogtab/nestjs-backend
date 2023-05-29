import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationDefault1685301578268 implements MigrationInterface {
    name = 'MigrationDefault1685301578268'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" ADD "idUser" int`);
        await queryRunner.query(`ALTER TABLE "loginData" DROP COLUMN "hash"`);
        await queryRunner.query(`ALTER TABLE "loginData" ADD "hash" nvarchar(70) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "loginData" DROP COLUMN "salt"`);
        await queryRunner.query(`ALTER TABLE "loginData" ADD "salt" nvarchar(20) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_bb6d6962f0d05af65d6c679c394" FOREIGN KEY ("idUser") REFERENCES "users"("idUser") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_bb6d6962f0d05af65d6c679c394"`);
        await queryRunner.query(`ALTER TABLE "loginData" DROP COLUMN "salt"`);
        await queryRunner.query(`ALTER TABLE "loginData" ADD "salt" varchar(20) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "loginData" DROP COLUMN "hash"`);
        await queryRunner.query(`ALTER TABLE "loginData" ADD "hash" varchar(70) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "idUser"`);
    }

}
