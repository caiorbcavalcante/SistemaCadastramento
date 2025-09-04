import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateService1690000000000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
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

        await queryRunner.createForeignKey("services", new TableForeignKey({
            columnNames: ["userId"],
            referencedColumnNames: ["id_user"],
            referencedTableName: "users",
            onDelete: "CASCADE"
        }));

        
        await queryRunner.createForeignKey("services", new TableForeignKey({
            columnNames: ["barberId"],
            referencedColumnNames: ["id"],
            referencedTableName: "barbers",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("services");
    }

}

