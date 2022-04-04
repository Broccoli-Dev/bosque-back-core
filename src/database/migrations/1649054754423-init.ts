import {MigrationInterface, QueryRunner} from "typeorm";

export class init1649054754423 implements MigrationInterface {
    name = 'init1649054754423'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("document" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(20) NOT NULL, "name" character varying(255) NOT NULL, "role" character varying(150) NOT NULL, "nick" character varying(150) NOT NULL, CONSTRAINT "PK_71fdad8489d3d818ec393e6eb14" PRIMARY KEY ("document"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
