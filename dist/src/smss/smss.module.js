"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmssModule = void 0;
const common_1 = require("@nestjs/common");
const smss_service_1 = require("./smss.service");
const smss_controller_1 = require("./smss.controller");
const typeorm_1 = require("@nestjs/typeorm");
const Students_1 = require("../entities/Students");
const SMSs_1 = require("../entities/SMSs");
let SmssModule = class SmssModule {
};
exports.SmssModule = SmssModule;
exports.SmssModule = SmssModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([Students_1.Students, SMSs_1.SMSs])],
        controllers: [smss_controller_1.SmssController],
        providers: [smss_service_1.SmssService],
    })
], SmssModule);
//# sourceMappingURL=smss.module.js.map