import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateBarberTable1756415138522 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
    new Table({
        name: "barbers", 
        columns: [
            {
                name: "id",
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
                name: "service",
                type: "varchar",
                isNullable: false,
            },
        ],
    })
);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
