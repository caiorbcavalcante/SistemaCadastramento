"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddCascadeToAppointments1759261914698 = void 0;
class AddCascadeToAppointments1759261914698 {
    constructor() {
        this.name = 'AddCascadeToAppointments1759261914698';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_01733651151c8a1d6d980135cc4"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_40ba2a25066184a434d47cdd5c2"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_f77953c373efb8ab146d98e90c3"`);
        await queryRunner.query(`ALTER TABLE "barbers" ALTER COLUMN "adminplus" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_01733651151c8a1d6d980135cc4" FOREIGN KEY ("userId") REFERENCES "users"("id_user") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_40ba2a25066184a434d47cdd5c2" FOREIGN KEY ("barberId") REFERENCES "barbers"("id_barber") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_f77953c373efb8ab146d98e90c3" FOREIGN KEY ("serviceId") REFERENCES "services"("id_service") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_f77953c373efb8ab146d98e90c3"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_40ba2a25066184a434d47cdd5c2"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_01733651151c8a1d6d980135cc4"`);
        await queryRunner.query(`ALTER TABLE "barbers" ALTER COLUMN "adminplus" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_f77953c373efb8ab146d98e90c3" FOREIGN KEY ("serviceId") REFERENCES "services"("id_service") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_40ba2a25066184a434d47cdd5c2" FOREIGN KEY ("barberId") REFERENCES "barbers"("id_barber") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_01733651151c8a1d6d980135cc4" FOREIGN KEY ("userId") REFERENCES "users"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
exports.AddCascadeToAppointments1759261914698 = AddCascadeToAppointments1759261914698;
