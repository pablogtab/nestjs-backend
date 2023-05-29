import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationDefault1685302104602 implements MigrationInterface {
    name = 'MigrationDefault1685302104602'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "loginData" DROP COLUMN "hash"`);
        await queryRunner.query(`ALTER TABLE "loginData" ADD "hash" nvarchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "loginData" DROP COLUMN "salt"`);
        await queryRunner.query(`ALTER TABLE "loginData" ADD "salt" nvarchar(40) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "loginData" DROP COLUMN "salt"`);
        await queryRunner.query(`ALTER TABLE "loginData" ADD "salt" nvarchar(20) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "loginData" DROP COLUMN "hash"`);
        await queryRunner.query(`ALTER TABLE "loginData" ADD "hash" nvarchar(70) NOT NULL`);
    }

}
