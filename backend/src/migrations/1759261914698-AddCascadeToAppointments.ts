import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCascadeToAppointments1759261914698 implements MigrationInterface {
    name = 'AddCascadeToAppointments1759261914698'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_01733651151c8a1d6d980135cc4"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_40ba2a25066184a434d47cdd5c2"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_f77953c373efb8ab146d98e90c3"`);
        await queryRunner.query(`ALTER TABLE "barbers" ALTER COLUMN "adminplus" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_01733651151c8a1d6d980135cc4" FOREIGN KEY ("userId") REFERENCES "users"("id_user") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_40ba2a25066184a434d47cdd5c2" FOREIGN KEY ("barberId") REFERENCES "barbers"("id_barber") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_f77953c373efb8ab146d98e90c3" FOREIGN KEY ("serviceId") REFERENCES "services"("id_service") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_f77953c373efb8ab146d98e90c3"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_40ba2a25066184a434d47cdd5c2"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_01733651151c8a1d6d980135cc4"`);
        await queryRunner.query(`ALTER TABLE "barbers" ALTER COLUMN "adminplus" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_f77953c373efb8ab146d98e90c3" FOREIGN KEY ("serviceId") REFERENCES "services"("id_service") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_40ba2a25066184a434d47cdd5c2" FOREIGN KEY ("barberId") REFERENCES "barbers"("id_barber") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_01733651151c8a1d6d980135cc4" FOREIGN KEY ("userId") REFERENCES "users"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
