import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class  CreateBarberTable1699990100000  implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
    new Table({
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
    })
);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
