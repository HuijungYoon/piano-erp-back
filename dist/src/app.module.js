"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const logger_middleware_1 = require("./middlewares/logger.middleware");
const typeorm_1 = require("@nestjs/typeorm");
const Macros_1 = require("./entities/Macros");
const SMSs_1 = require("./entities/SMSs");
const Teachers_1 = require("./entities/Teachers");
const lessons_module_1 = require("./lessons/lessons.module");
const smss_module_1 = require("./smss/smss.module");
const Lessons_1 = require("./entities/Lessons");
const Students_1 = require("./entities/Students");
const students_module_1 = require("./students/students.module");
const teachers_module_1 = require("./teachers/teachers.module");
const auth_module_1 = require("./auth/auth.module");
const macros_module_1 = require("./macros/macros.module");
let AppModule = class AppModule {
    configure(consumer) {
        console.log('AppModule configure()');
        consumer.apply(logger_middleware_1.LoggerMiddleware).forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE,
                entities: [Lessons_1.Lessons, Macros_1.Macros, SMSs_1.SMSs, Teachers_1.Teachers, Students_1.Students],
                synchronize: false,
                keepConnectionAlive: true,
                charset: 'utf8mb4',
                logging: true,
            }),
            typeorm_1.TypeOrmModule.forFeature([Teachers_1.Teachers]),
            lessons_module_1.LessonsModule,
            smss_module_1.SmssModule,
            students_module_1.StudentsModule,
            teachers_module_1.TeachersModule,
            auth_module_1.AuthModule,
            macros_module_1.MacrosModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map