import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRoleToUserAndBarber1759266647302 implements MigrationInterface {
    name = 'AddRoleToUserAndBarber1759266647302'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "barbers" ADD "role" character varying NOT NULL DEFAULT 'barber'`);
        await queryRunner.query(`ALTER TABLE "users" ADD "role" character varying NOT NULL DEFAULT 'user'`);
        await queryRunner.query(`UPDATE "barbers" SET "number" = '0000' WHERE "number" IS NULL`);
        await queryRunner.query(`ALTER TABLE "barbers" ALTER COLUMN "number" SET NOT NULL`);
        await queryRunner.query(`UPDATE "users" SET "number" = '0000' WHERE "number" IS NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "number" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "barbers" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "barbers" ALTER COLUMN "number" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "number" DROP NOT NULL`);
    }
}
