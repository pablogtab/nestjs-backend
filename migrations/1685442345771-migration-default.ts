import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationDefault1685442345771 implements MigrationInterface {
    name = 'MigrationDefault1685442345771'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" ADD "valid" bit NOT NULL CONSTRAINT "DF_df9ada8d23dddb9311c4c17b75b" DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "UQ_2187088ab5ef2a918473cb99007" UNIQUE ("name")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "UQ_2187088ab5ef2a918473cb99007"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "DF_df9ada8d23dddb9311c4c17b75b"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "valid"`);
    }

}
