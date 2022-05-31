import { MigrationInterface, QueryRunner } from 'typeorm';

export class OrdersTable1653928661560 implements MigrationInterface {
  name = 'OrdersTable1653928661560';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "order" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "orderedById" uuid, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "FK_55a19832ba4b85f23fa01b0fd97" FOREIGN KEY ("orderedById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order" DROP CONSTRAINT "FK_55a19832ba4b85f23fa01b0fd97"`,
    );
    await queryRunner.query(`DROP TABLE "order"`);
  }
}
