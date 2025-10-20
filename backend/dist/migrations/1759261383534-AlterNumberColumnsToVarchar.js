"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterNumberColumnsToVarchar1759261383534 = void 0;
class AlterNumberColumnsToVarchar1759261383534 {
    async up(queryRunner) {
        await queryRunner.query(`
      ALTER TABLE "users"
      ALTER COLUMN "number" TYPE VARCHAR(20)
    `);
        await queryRunner.query(`
      ALTER TABLE "barbers"
      ALTER COLUMN "number" TYPE VARCHAR(20)
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
      ALTER TABLE "users"
      ALTER COLUMN "number" TYPE INTEGER
    `);
        await queryRunner.query(`
      ALTER TABLE "barbers"
      ALTER COLUMN "number" TYPE INTEGER
    `);
    }
}
exports.AlterNumberColumnsToVarchar1759261383534 = AlterNumberColumnsToVarchar1759261383534;
