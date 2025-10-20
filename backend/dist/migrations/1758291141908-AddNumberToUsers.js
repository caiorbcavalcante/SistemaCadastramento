"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddNumberToUsers1699999999999 = void 0;
const typeorm_1 = require("typeorm");
class AddNumberToUsers1699999999999 {
    async up(queryRunner) {
        await queryRunner.addColumn("users", new typeorm_1.TableColumn({
            name: "number",
            type: "varchar",
            isNullable: false,
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropColumn("users", "number");
    }
}
exports.AddNumberToUsers1699999999999 = AddNumberToUsers1699999999999;
