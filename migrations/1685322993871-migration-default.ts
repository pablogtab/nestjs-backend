import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationDefault1685322993871 implements MigrationInterface {
    name = 'MigrationDefault1685322993871'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "userRole" varchar(30) NOT NULL CONSTRAINT "DF_9acf5b718fdc83bc4f6d6b9e869" DEFAULT 'GUEST'`);
        await queryRunner.query(`ALTER TABLE "loginDataHistoric" DROP COLUMN "hash"`);
        await queryRunner.query(`ALTER TABLE "loginDataHistoric" ADD "hash" varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "loginDataHistoric" DROP COLUMN "salt"`);
        await queryRunner.query(`ALTER TABLE "loginDataHistoric" ADD "salt" varchar(40) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "loginDataHistoric" DROP COLUMN "salt"`);
        await queryRunner.query(`ALTER TABLE "loginDataHistoric" ADD "salt" varchar(20) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "loginDataHistoric" DROP COLUMN "hash"`);
        await queryRunner.query(`ALTER TABLE "loginDataHistoric" ADD "hash" varchar(70) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "DF_9acf5b718fdc83bc4f6d6b9e869"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "userRole"`);
    }

}
