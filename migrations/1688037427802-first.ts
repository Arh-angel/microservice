import { MigrationInterface, QueryRunner } from "typeorm";

export class First1688037427802 implements MigrationInterface {
    name = 'First1688037427802'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "post" ("id" uuid NOT NULL, "title" character varying NOT NULL, "message" character varying NOT NULL, "author_id" character varying NOT NULL, "is_published" boolean NOT NULL, "created_at" character varying NOT NULL, "updated_at" character varying NOT NULL, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "post"`);
    }

}
