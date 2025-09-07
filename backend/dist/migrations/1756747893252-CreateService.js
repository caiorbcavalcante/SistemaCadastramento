"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateService1690000000000 = void 0;
const typeorm_1 = require("typeorm");
class CreateService1690000000000 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "services",
            columns: [
                {
                    name: "id_service",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "price",
                    type: "decimal",
                    isNullable: false
                },
                {
                    name: "description",
                    type: "varchar",
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
                }
            ]
        }), true);
        await queryRunner.createForeignKey("services", new typeorm_1.TableForeignKey({
            columnNames: ["userId"],
            referencedColumnNames: ["id_user"],
            referencedTableName: "users",
            onDelete: "CASCADE"
        }));
        await queryRunner.createForeignKey("services", new typeorm_1.TableForeignKey({
            columnNames: ["barberId"],
            referencedColumnNames: ["id"],
            referencedTableName: "barbers",
            onDelete: "CASCADE"
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("services");
    }
}
exports.CreateService1690000000000 = CreateService1690000000000;
