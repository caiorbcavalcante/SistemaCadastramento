"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAppointment1690000000000 = void 0;
const typeorm_1 = require("typeorm");
class CreateAppointment1690000000000 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "appointments",
            columns: [
                {
                    name: "id_appointment",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "date",
                    type: "timestamp",
                    isNullable: false
                },
                {
                    name: "userId",
                    type: "int",
                    isNullable: false
                },
                {
                    name: "barberId",
                    type: "int",
                    isNullable: false
                },
                {
                    name: "serviceId",
                    type: "int",
                    isNullable: false
                }
            ]
        }), true);
        await queryRunner.createForeignKey("appointments", new typeorm_1.TableForeignKey({
            columnNames: ["userId"],
            referencedColumnNames: ["id_user"],
            referencedTableName: "users",
            onDelete: "CASCADE"
        }));
        await queryRunner.createForeignKey("appointments", new typeorm_1.TableForeignKey({
            columnNames: ["barberId"],
            referencedColumnNames: ["id"],
            referencedTableName: "barbers",
            onDelete: "CASCADE"
        }));
        await queryRunner.createForeignKey("appointments", new typeorm_1.TableForeignKey({
            columnNames: ["serviceId"],
            referencedColumnNames: ["id_service"],
            referencedTableName: "services",
            onDelete: "CASCADE"
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("appointments");
    }
}
exports.CreateAppointment1690000000000 = CreateAppointment1690000000000;
