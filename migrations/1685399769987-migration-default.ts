import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationDefault1685399769987 implements MigrationInterface {
    name = 'MigrationDefault1685399769987'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "DF_cb3724030e9674f2c17b7573aa5"`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "DF_cb3724030e9674f2c17b7573aa5" DEFAULT getdate() FOR "created_at"`);
        await queryRunner.query(`ALTER TABLE "tasks" ALTER COLUMN "updated_at" datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "DF_02edb0ba1ef4287a15bc4c271ee"`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "DF_02edb0ba1ef4287a15bc4c271ee" DEFAULT getdate() FOR "updated_at"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "DF_02edb0ba1ef4287a15bc4c271ee"`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "DF_02edb0ba1ef4287a15bc4c271ee" DEFAULT getutcdate() FOR "updated_at"`);
        await queryRunner.query(`ALTER TABLE "tasks" ALTER COLUMN "updated_at" datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "DF_cb3724030e9674f2c17b7573aa5"`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "DF_cb3724030e9674f2c17b7573aa5" DEFAULT getutcdate() FOR "created_at"`);
    }

}
