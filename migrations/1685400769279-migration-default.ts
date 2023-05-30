import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationDefault1685400769279 implements MigrationInterface {
    name = 'MigrationDefault1685400769279'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_55786b2ef4bef7b8cc7625d5792"`);
        await queryRunner.query(`CREATE TABLE "timers" ("idTimer" int NOT NULL IDENTITY(1,1), "timeElapsed" varchar(20) NOT NULL CONSTRAINT "DF_91760bef6ea4eef262dd9464e42" DEFAULT 0, "billableTimestamp" varchar(20) NOT NULL CONSTRAINT "DF_0b14a4f868016ce17c54903db4a" DEFAULT 0, "startTime" datetime, "created_at" datetime NOT NULL CONSTRAINT "DF_2d769b22d943bcff5322284db18" DEFAULT getdate(), "updated_at" datetime NOT NULL CONSTRAINT "DF_159052df74c61d65b20e772ce25" DEFAULT getdate(), "taskIdTask" int, "userIdUser" int, CONSTRAINT "PK_27fccbc4a18a4734f3f89eb0701" PRIMARY KEY ("idTimer"))`);
        await queryRunner.query(`CREATE TABLE "tasks_users_users" ("tasksIdTask" int NOT NULL, "usersIdUser" int NOT NULL, CONSTRAINT "PK_b7dcd50f32bf4c05f10a926c7c1" PRIMARY KEY ("tasksIdTask", "usersIdUser"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e8ff4c57174f7bfd414ffb6820" ON "tasks_users_users" ("tasksIdTask") `);
        await queryRunner.query(`CREATE INDEX "IDX_587047b289c27fe248e24e6dc5" ON "tasks_users_users" ("usersIdUser") `);
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "userIdUser"`);
        await queryRunner.query(`ALTER TABLE "timers" ADD CONSTRAINT "FK_ed64ac257d0a28b8e2080ff674e" FOREIGN KEY ("taskIdTask") REFERENCES "tasks"("idTask") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "timers" ADD CONSTRAINT "FK_34048b82840583a3a877f1a9083" FOREIGN KEY ("userIdUser") REFERENCES "users"("idUser") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tasks_users_users" ADD CONSTRAINT "FK_e8ff4c57174f7bfd414ffb6820b" FOREIGN KEY ("tasksIdTask") REFERENCES "tasks"("idTask") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tasks_users_users" ADD CONSTRAINT "FK_587047b289c27fe248e24e6dc5c" FOREIGN KEY ("usersIdUser") REFERENCES "users"("idUser") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks_users_users" DROP CONSTRAINT "FK_587047b289c27fe248e24e6dc5c"`);
        await queryRunner.query(`ALTER TABLE "tasks_users_users" DROP CONSTRAINT "FK_e8ff4c57174f7bfd414ffb6820b"`);
        await queryRunner.query(`ALTER TABLE "timers" DROP CONSTRAINT "FK_34048b82840583a3a877f1a9083"`);
        await queryRunner.query(`ALTER TABLE "timers" DROP CONSTRAINT "FK_ed64ac257d0a28b8e2080ff674e"`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "userIdUser" int`);
        await queryRunner.query(`DROP INDEX "IDX_587047b289c27fe248e24e6dc5" ON "tasks_users_users"`);
        await queryRunner.query(`DROP INDEX "IDX_e8ff4c57174f7bfd414ffb6820" ON "tasks_users_users"`);
        await queryRunner.query(`DROP TABLE "tasks_users_users"`);
        await queryRunner.query(`DROP TABLE "timers"`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_55786b2ef4bef7b8cc7625d5792" FOREIGN KEY ("userIdUser") REFERENCES "users"("idUser") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
