import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationDefault1685403303367 implements MigrationInterface {
    name = 'MigrationDefault1685403303367'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "clients" ("idClient" int NOT NULL IDENTITY(1,1), "name" nvarchar(50) NOT NULL, "valid" bit NOT NULL CONSTRAINT "DF_ff325cdb9b43250b89ba30b1f03" DEFAULT 1, CONSTRAINT "PK_45de41ddf9227da20595d5bce1f" PRIMARY KEY ("idClient"))`);
        await queryRunner.query(`CREATE TABLE "projects" ("idProject" int NOT NULL IDENTITY(1,1), "name" nvarchar(50) NOT NULL, "created_at" datetime NOT NULL CONSTRAINT "DF_301eb04c3ee67cb2ab9cb2ab7b0" DEFAULT getdate(), "updated_at" datetime NOT NULL CONSTRAINT "DF_b9317874583ab06dcdd7a34c5b4" DEFAULT getdate(), CONSTRAINT "PK_2878770d6ad83e4c9319775906c" PRIMARY KEY ("idProject"))`);
        await queryRunner.query(`CREATE TABLE "tasksByUsers" ("tasksIdTask" int NOT NULL, "usersIdUser" int NOT NULL, CONSTRAINT "PK_f822f26b618747a584fe34ceff6" PRIMARY KEY ("tasksIdTask", "usersIdUser"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d034981e828ad02b753ee66119" ON "tasksByUsers" ("tasksIdTask") `);
        await queryRunner.query(`CREATE INDEX "IDX_bb5d1447b0c234149766ff2fc9" ON "tasksByUsers" ("usersIdUser") `);
        await queryRunner.query(`CREATE TABLE "tasksByClients" ("tasksIdTask" int NOT NULL, "clientsIdClient" int NOT NULL, CONSTRAINT "PK_6fd3bbeb85685b86b07e8de8bd2" PRIMARY KEY ("tasksIdTask", "clientsIdClient"))`);
        await queryRunner.query(`CREATE INDEX "IDX_870f264d3daede032e0507bc85" ON "tasksByClients" ("tasksIdTask") `);
        await queryRunner.query(`CREATE INDEX "IDX_8725bed70905393d147076598f" ON "tasksByClients" ("clientsIdClient") `);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "projectIdProject" int`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_e69d0b25af474185a1f5164b5e5" FOREIGN KEY ("projectIdProject") REFERENCES "projects"("idProject") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tasksByUsers" ADD CONSTRAINT "FK_d034981e828ad02b753ee661191" FOREIGN KEY ("tasksIdTask") REFERENCES "tasks"("idTask") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tasksByUsers" ADD CONSTRAINT "FK_bb5d1447b0c234149766ff2fc9f" FOREIGN KEY ("usersIdUser") REFERENCES "users"("idUser") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tasksByClients" ADD CONSTRAINT "FK_870f264d3daede032e0507bc850" FOREIGN KEY ("tasksIdTask") REFERENCES "tasks"("idTask") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tasksByClients" ADD CONSTRAINT "FK_8725bed70905393d147076598fa" FOREIGN KEY ("clientsIdClient") REFERENCES "clients"("idClient") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasksByClients" DROP CONSTRAINT "FK_8725bed70905393d147076598fa"`);
        await queryRunner.query(`ALTER TABLE "tasksByClients" DROP CONSTRAINT "FK_870f264d3daede032e0507bc850"`);
        await queryRunner.query(`ALTER TABLE "tasksByUsers" DROP CONSTRAINT "FK_bb5d1447b0c234149766ff2fc9f"`);
        await queryRunner.query(`ALTER TABLE "tasksByUsers" DROP CONSTRAINT "FK_d034981e828ad02b753ee661191"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_e69d0b25af474185a1f5164b5e5"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "projectIdProject"`);
        await queryRunner.query(`DROP INDEX "IDX_8725bed70905393d147076598f" ON "tasksByClients"`);
        await queryRunner.query(`DROP INDEX "IDX_870f264d3daede032e0507bc85" ON "tasksByClients"`);
        await queryRunner.query(`DROP TABLE "tasksByClients"`);
        await queryRunner.query(`DROP INDEX "IDX_bb5d1447b0c234149766ff2fc9" ON "tasksByUsers"`);
        await queryRunner.query(`DROP INDEX "IDX_d034981e828ad02b753ee66119" ON "tasksByUsers"`);
        await queryRunner.query(`DROP TABLE "tasksByUsers"`);
        await queryRunner.query(`DROP TABLE "projects"`);
        await queryRunner.query(`DROP TABLE "clients"`);
    }

}
