"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
const Students_1 = require("./src/entities/Students");
const Teachers_1 = require("./src/entities/Teachers");
const Lessons_1 = require("./src/entities/Lessons");
const Macros_1 = require("./src/entities/Macros");
const SMSs_1 = require("./src/entities/SMSs");
dotenv_1.default.config();
const dataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [Students_1.Students, Teachers_1.Teachers, SMSs_1.SMSs, Lessons_1.Lessons, Macros_1.Macros],
    migrations: [__dirname + '/src/migrations/*.ts'],
    synchronize: true,
    charset: 'utf8mb4_general_ci',
    logging: true,
});
exports.default = dataSource;
//# sourceMappingURL=dataSource.js.map