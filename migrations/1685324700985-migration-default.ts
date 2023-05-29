import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationDefault1685324700985 implements MigrationInterface {
    name = 'MigrationDefault1685324700985'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`EXEC sp_rename "taskhub.dbo.users.userRole", "role"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "DF_9acf5b718fdc83bc4f6d6b9e869"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "DF_ace513fa30d485cfd25c11a9e4a" DEFAULT 'GUEST' FOR "role"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "DF_ace513fa30d485cfd25c11a9e4a"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "DF_9acf5b718fdc83bc4f6d6b9e869" DEFAULT 'GUEST' FOR "role"`);
        await queryRunner.query(`EXEC sp_rename "taskhub.dbo.users.role", "userRole"`);
    }

}
