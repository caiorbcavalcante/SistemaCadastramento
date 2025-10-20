"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddRoleToUserAndBarber1759266647302 = void 0;
class AddRoleToUserAndBarber1759266647302 {
    constructor() {
        this.name = 'AddRoleToUserAndBarber1759266647302';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "barbers" ADD "role" character varying NOT NULL DEFAULT 'barber'`);
        await queryRunner.query(`ALTER TABLE "users" ADD "role" character varying NOT NULL DEFAULT 'user'`);
        await queryRunner.query(`UPDATE "barbers" SET "number" = '0000' WHERE "number" IS NULL`);
        await queryRunner.query(`ALTER TABLE "barbers" ALTER COLUMN "number" SET NOT NULL`);
        await queryRunner.query(`UPDATE "users" SET "number" = '0000' WHERE "number" IS NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "number" SET NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "barbers" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "barbers" ALTER COLUMN "number" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "number" DROP NOT NULL`);
    }
}
exports.AddRoleToUserAndBarber1759266647302 = AddRoleToUserAndBarber1759266647302;
