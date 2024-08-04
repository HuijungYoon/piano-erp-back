"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migrations1722651692620 = void 0;
class Migrations1722651692620 {
    async up(queryRunner) {
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
    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE pianoerp.smss
            ADD COLUMN title VARCHAR(100), 
            DROP COLUMN smstype, 
            DROP COLUMN status
        `);
    }
}
exports.Migrations1722651692620 = Migrations1722651692620;
//# sourceMappingURL=1722651692620-smstype.js.map