import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddNumberToBarbers1699999999999 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "barbers",
      new TableColumn({
        name: "number",
        type: "varchar",
        isNullable: false
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("barbers", "number");
  }
}
