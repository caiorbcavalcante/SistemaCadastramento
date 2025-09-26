import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserToBarberRelation1758894651957 implements MigrationInterface {
    name = 'AddUserToBarberRelation1758894651957'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Remove a FK antiga em barber
        await queryRunner.query(`ALTER TABLE "barbers" DROP CONSTRAINT "FK_d9b834e58f92f3e895e2f45ad88"`);
        // Remove a coluna antiga que ligava barber ao user
        await queryRunner.query(`ALTER TABLE "barbers" DROP COLUMN "userIdUser"`);
        // Adiciona coluna em users para referenciar barber
        await queryRunner.query(`ALTER TABLE "users" ADD "barberIdBarber" integer`);
        // Cria a nova FK
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_0522096af26faf40ffd5bfe415a" FOREIGN KEY ("barberIdBarber") REFERENCES "barbers"("id_barber") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remove a nova FK
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_0522096af26faf40ffd5bfe415a"`);
        // Remove a coluna adicionada
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "barberIdBarber"`);
        // Recria a coluna antiga em barber
        await queryRunner.query(`ALTER TABLE "barbers" ADD "userIdUser" integer`);
        // Recria a FK antiga
        await queryRunner.query(`ALTER TABLE "barbers" ADD CONSTRAINT "FK_d9b834e58f92f3e895e2f45ad88" FOREIGN KEY ("userIdUser") REFERENCES "users"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
