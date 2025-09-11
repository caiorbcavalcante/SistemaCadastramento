import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddUserForeignKeyToBarber1699990200000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("barbers", new TableColumn({
            name: "userId",
            type: "int",
            isNullable: false,
        }));
 
        await queryRunner.createForeignKey("barbers", new TableForeignKey({
            columnNames: ["userId"],
            referencedColumnNames: ["id_user"],
            referencedTableName: "users",
            onDelete: "CASCADE",
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
       
        const table = await queryRunner.getTable("barbers");
        const foreignKey = table!.foreignKeys.find(fk => fk.columnNames.indexOf("userId") !== -1);
        if (foreignKey) {
            await queryRunner.dropForeignKey("barbers", foreignKey);
        }

       
        await queryRunner.dropColumn("barbers", "userId");
    }

}
