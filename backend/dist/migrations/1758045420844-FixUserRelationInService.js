"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FixUserRelationInService1758045420844 = void 0;
class FixUserRelationInService1758045420844 {
    constructor() {
        this.name = 'FixUserRelationInService1758045420844';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "services" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "services" ADD CONSTRAINT "FK_3905389899d96c4f1b3619f68d5" FOREIGN KEY ("userId") REFERENCES "users"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "services" DROP CONSTRAINT "FK_3905389899d96c4f1b3619f68d5"`);
        await queryRunner.query(`ALTER TABLE "services" DROP COLUMN "userId"`);
    }
}
exports.FixUserRelationInService1758045420844 = FixUserRelationInService1758045420844;
