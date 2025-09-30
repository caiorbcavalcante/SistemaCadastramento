import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterNumberColumnsToVarchar1759261383534 implements MigrationInterface {
 

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "users"
      ALTER COLUMN "number" TYPE VARCHAR(20)
    `);

    await queryRunner.query(`
      ALTER TABLE "barbers"
      ALTER COLUMN "number" TYPE VARCHAR(20)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "users"
      ALTER COLUMN "number" TYPE INTEGER
    `);

    await queryRunner.query(`
      ALTER TABLE "barbers"
      ALTER COLUMN "number" TYPE INTEGER
    `);
  }
}
