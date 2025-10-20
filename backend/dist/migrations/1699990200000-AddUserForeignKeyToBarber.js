"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddUserForeignKeyToBarber1699990200000 = void 0;
const typeorm_1 = require("typeorm");
class AddUserForeignKeyToBarber1699990200000 {
    async up(queryRunner) {
        await queryRunner.addColumn("barbers", new typeorm_1.TableColumn({
            name: "userId",
            type: "int",
            isNullable: false,
        }));
        await queryRunner.createForeignKey("barbers", new typeorm_1.TableForeignKey({
            columnNames: ["userId"],
            referencedColumnNames: ["id_user"],
            referencedTableName: "users",
            onDelete: "CASCADE",
        }));
    }
    async down(queryRunner) {
        const table = await queryRunner.getTable("barbers");
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("userId") !== -1);
        if (foreignKey) {
            await queryRunner.dropForeignKey("barbers", foreignKey);
        }
        await queryRunner.dropColumn("barbers", "userId");
    }
}
exports.AddUserForeignKeyToBarber1699990200000 = AddUserForeignKeyToBarber1699990200000;
