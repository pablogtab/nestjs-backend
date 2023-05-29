import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationDefault1685296426156 implements MigrationInterface {
    name = 'MigrationDefault1685296426156'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "loginDataHistoric" ("idLoginDataHistoric" int NOT NULL IDENTITY(1,1), "hash" varchar(70) NOT NULL, "salt" varchar(20) NOT NULL, "createdAt" datetime NOT NULL CONSTRAINT "DF_1041221ff405866a8df999c48c7" DEFAULT getutcdate(), "idUser" int, CONSTRAINT "PK_a3cb2347c9866a3359d2b21ec69" PRIMARY KEY ("idLoginDataHistoric"))`);
        await queryRunner.query(`CREATE TABLE "users" ("idUser" int NOT NULL IDENTITY(1,1), "name" nvarchar(50) NOT NULL, "lastname" nvarchar(50) NOT NULL, "email" nvarchar(50) NOT NULL, "valid" bit NOT NULL CONSTRAINT "DF_372e24e00d2d022beb79785d20d" DEFAULT '1', "created_at" datetime NOT NULL CONSTRAINT "DF_c9b5b525a96ddc2c5647d7f7fa5" DEFAULT getutcdate(), "updated_at" datetime NOT NULL CONSTRAINT "DF_6d596d799f9cb9dac6f7bf7c23c" DEFAULT getutcdate(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_65e7c74bbeaca3cb19ae90bf6ee" PRIMARY KEY ("idUser"))`);
        await queryRunner.query(`CREATE TABLE "loginData" ("idLoginData" int NOT NULL IDENTITY(1,1), "hash" varchar(70) NOT NULL, "salt" varchar(20) NOT NULL, "created_at" datetime NOT NULL CONSTRAINT "DF_417839f3e988a9b76a9247cedfa" DEFAULT getutcdate(), "idUser" int, CONSTRAINT "PK_dd268ea82e2177ea8438e1c869d" PRIMARY KEY ("idLoginData"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_54f42c827fa5b709450c0856fd" ON "loginData" ("idUser") WHERE "idUser" IS NOT NULL`);
        await queryRunner.query(`CREATE TABLE "tasks" ("idTask" int NOT NULL IDENTITY(1,1), "name" nvarchar(50) NOT NULL, "description" nvarchar(50) NOT NULL, "status" nvarchar(20) NOT NULL, "created_at" datetime NOT NULL CONSTRAINT "DF_cb3724030e9674f2c17b7573aa5" DEFAULT getutcdate(), "updated_at" datetime NOT NULL CONSTRAINT "DF_02edb0ba1ef4287a15bc4c271ee" DEFAULT getutcdate(), "deleted_at" datetime, CONSTRAINT "PK_061b8d71079453713129c23fcda" PRIMARY KEY ("idTask"))`);
        await queryRunner.query(`ALTER TABLE "loginDataHistoric" ADD CONSTRAINT "FK_3502d5ead7123c664512bc0b3b1" FOREIGN KEY ("idUser") REFERENCES "users"("idUser") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "loginData" ADD CONSTRAINT "FK_54f42c827fa5b709450c0856fd7" FOREIGN KEY ("idUser") REFERENCES "users"("idUser") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "loginData" DROP CONSTRAINT "FK_54f42c827fa5b709450c0856fd7"`);
        await queryRunner.query(`ALTER TABLE "loginDataHistoric" DROP CONSTRAINT "FK_3502d5ead7123c664512bc0b3b1"`);
        await queryRunner.query(`DROP TABLE "tasks"`);
        await queryRunner.query(`DROP INDEX "REL_54f42c827fa5b709450c0856fd" ON "loginData"`);
        await queryRunner.query(`DROP TABLE "loginData"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "loginDataHistoric"`);
    }

}
