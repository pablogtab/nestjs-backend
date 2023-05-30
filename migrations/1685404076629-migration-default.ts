import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationDefault1685404076629 implements MigrationInterface {
    name = 'MigrationDefault1685404076629'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "clientsByProjects" ("projectsIdProject" int NOT NULL, "clientsIdClient" int NOT NULL, CONSTRAINT "PK_0c66dbbb872b3a45ada7de70a06" PRIMARY KEY ("projectsIdProject", "clientsIdClient"))`);
        await queryRunner.query(`CREATE INDEX "IDX_567ca4516667d2f0721cc804b2" ON "clientsByProjects" ("projectsIdProject") `);
        await queryRunner.query(`CREATE INDEX "IDX_c7f75506e0c237dd3dd0fc985b" ON "clientsByProjects" ("clientsIdClient") `);
        await queryRunner.query(`ALTER TABLE "clientsByProjects" ADD CONSTRAINT "FK_567ca4516667d2f0721cc804b22" FOREIGN KEY ("projectsIdProject") REFERENCES "projects"("idProject") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "clientsByProjects" ADD CONSTRAINT "FK_c7f75506e0c237dd3dd0fc985bd" FOREIGN KEY ("clientsIdClient") REFERENCES "clients"("idClient") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clientsByProjects" DROP CONSTRAINT "FK_c7f75506e0c237dd3dd0fc985bd"`);
        await queryRunner.query(`ALTER TABLE "clientsByProjects" DROP CONSTRAINT "FK_567ca4516667d2f0721cc804b22"`);
        await queryRunner.query(`DROP INDEX "IDX_c7f75506e0c237dd3dd0fc985b" ON "clientsByProjects"`);
        await queryRunner.query(`DROP INDEX "IDX_567ca4516667d2f0721cc804b2" ON "clientsByProjects"`);
        await queryRunner.query(`DROP TABLE "clientsByProjects"`);
    }

}
