"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddNumberToBarbers1699999999999 = void 0;
const typeorm_1 = require("typeorm");
class AddNumberToBarbers1699999999999 {
    async up(queryRunner) {
        await queryRunner.addColumn("barbers", new typeorm_1.TableColumn({
            name: "number",
            type: "varchar",
            isNullable: false
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropColumn("barbers", "number");
    }
}
exports.AddNumberToBarbers1699999999999 = AddNumberToBarbers1699999999999;
