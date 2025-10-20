"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddAdminplusToBarber1759173884089 = void 0;
class AddAdminplusToBarber1759173884089 {
    constructor() {
        this.name = 'AddAdminplusToBarber1759173884089';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_581bdedb6ef7042f0aaa449e62f"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_e8cfb075922c562d10482437797"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_bca9e95aca167ed0add3ad87cfb"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "userIdUser"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "barberIdBarber"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "serviceIdService"`);
        // Adminplus
        await queryRunner.query(`ALTER TABLE "barbers" ADD "adminplus" boolean`);
        await queryRunner.query(`UPDATE "barbers" SET "adminplus" = false WHERE "adminplus" IS NULL`);
        await queryRunner.query(`ALTER TABLE "barbers" ALTER COLUMN "adminplus" SET NOT NULL`);
        // Number barbers
        await queryRunner.query(`ALTER TABLE "barbers" DROP COLUMN "number"`);
        await queryRunner.query(`ALTER TABLE "barbers" ADD "number" integer`);
        await queryRunner.query(`UPDATE "barbers" SET "number" = 0 WHERE "number" IS NULL`);
        await queryRunner.query(`ALTER TABLE "barbers" ALTER COLUMN "number" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD "barberId" integer`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD "serviceId" integer`);
        // Number users
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "number"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "number" integer`);
        await queryRunner.query(`UPDATE "users" SET "number" = 0 WHERE "number" IS NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "number" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_01733651151c8a1d6d980135cc4" FOREIGN KEY ("userId") REFERENCES "users"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_40ba2a25066184a434d47cdd5c2" FOREIGN KEY ("barberId") REFERENCES "barbers"("id_barber") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_f77953c373efb8ab146d98e90c3" FOREIGN KEY ("serviceId") REFERENCES "services"("id_service") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_f77953c373efb8ab146d98e90c3"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_40ba2a25066184a434d47cdd5c2"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_01733651151c8a1d6d980135cc4"`);
        // Reverter number barbers
        await queryRunner.query(`ALTER TABLE "barbers" DROP COLUMN "number"`);
        await queryRunner.query(`ALTER TABLE "barbers" ADD "number" character varying NOT NULL`);
        // Reverter adminplus
        await queryRunner.query(`ALTER TABLE "barbers" DROP COLUMN "adminplus"`);
        // Reverter number users
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "number"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "number" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "serviceId"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "barberId"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD "serviceIdService" integer`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD "barberIdBarber" integer`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD "userIdUser" integer`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_bca9e95aca167ed0add3ad87cfb" FOREIGN KEY ("serviceIdService") REFERENCES "services"("id_service") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_e8cfb075922c562d10482437797" FOREIGN KEY ("barberIdBarber") REFERENCES "barbers"("id_barber") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_581bdedb6ef7042f0aaa449e62f" FOREIGN KEY ("userIdUser") REFERENCES "users"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
exports.AddAdminplusToBarber1759173884089 = AddAdminplusToBarber1759173884089;
