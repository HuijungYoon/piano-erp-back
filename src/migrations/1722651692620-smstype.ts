import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1722651692620 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE pianoerp.smss
            DROP COLUMN title,
            ADD COLUMN smstype ENUM('SMS', 'LMS') NOT NULL, 
            ADD COLUMN status ENUM('success', 'fail') NOT NULL
        `);
    await queryRunner.query(`
          ALTER TABLE pianoerp.smss AUTO_INCREMENT = 1
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE pianoerp.smss
            ADD COLUMN title VARCHAR(100), 
            DROP COLUMN smstype, 
            DROP COLUMN status
        `);
  }
}
