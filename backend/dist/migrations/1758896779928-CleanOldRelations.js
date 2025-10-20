"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CleanOldRelations1758896779928 = void 0;
class CleanOldRelations1758896779928 {
    constructor() {
        this.name = 'CleanOldRelations1758896779928';
    }
    async up(queryRunner) {
        // Remover relacionamento antigo User -> Barber
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT IF EXISTS "FK_0522096af26faf40ffd5bfe415a"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN IF EXISTS "barberIdBarber"`);
        // Remover colunas antigas de Service
        await queryRunner.query(`ALTER TABLE "services" DROP COLUMN IF EXISTS "barberIdBarber"`);
        await queryRunner.query(`ALTER TABLE "services" DROP COLUMN IF EXISTS "userId"`);
    }
    async down(queryRunner) {
        // Recriar colunas antigas caso precise reverter
        await queryRunner.query(`ALTER TABLE "barbers" ADD "userIdUser" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD "barberIdBarber" integer`);
        await queryRunner.query(`ALTER TABLE "services" ADD "barberIdBarber" integer`);
        await queryRunner.query(`ALTER TABLE "services" ADD "userId" integer`);
    }
}
exports.CleanOldRelations1758896779928 = CleanOldRelations1758896779928;
