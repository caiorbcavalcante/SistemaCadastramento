import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class  CreateAppointment1699990400000  implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
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

        
        await queryRunner.createForeignKey("appointments", new TableForeignKey({
            columnNames: ["userId"],
            referencedColumnNames: ["id_user"],
            referencedTableName: "users",
            onDelete: "CASCADE"
        }));

        
        await queryRunner.createForeignKey("appointments", new TableForeignKey({
            columnNames: ["barberId"],
            referencedColumnNames: ["id_barber"],
            referencedTableName: "barbers",
            onDelete: "CASCADE"
        }));

      
        await queryRunner.createForeignKey("appointments", new TableForeignKey({
            columnNames: ["serviceId"],
            referencedColumnNames: ["id_service"],
            referencedTableName: "services",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("appointments");
    }

}
