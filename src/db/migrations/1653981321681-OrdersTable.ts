import { MigrationInterface, QueryRunner } from 'typeorm';

export class OrdersTable1653981321681 implements MigrationInterface {
  name = 'OrdersTable1653981321681';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order" ADD "totalSum" integer NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "totalSum"`);
  }
}
