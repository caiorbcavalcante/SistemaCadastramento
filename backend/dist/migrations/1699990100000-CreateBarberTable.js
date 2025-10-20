"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBarberTable1699990100000 = void 0;
const typeorm_1 = require("typeorm");
class CreateBarberTable1699990100000 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "barbers",
            columns: [
                {
                    name: "id_barber",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "name",
                    type: "varchar",
                    isNullable: false,
                },
                {
                    name: "email",
                    type: "varchar",
                    isUnique: true,
                    isNullable: false,
                },
                {
                    name: "password",
                    type: "varchar",
                    isNullable: false,
                },
            ],
        }));
    }
    async down(queryRunner) {
    }
}
exports.CreateBarberTable1699990100000 = CreateBarberTable1699990100000;
