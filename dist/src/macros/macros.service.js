"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MacrosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Macros_1 = require("../entities/Macros");
const typeorm_2 = require("typeorm");
let MacrosService = class MacrosService {
    constructor(macroRepository) {
        this.macroRepository = macroRepository;
    }
    async create(name, format) {
        const macro = await this.macroRepository.findOne({
            where: { name },
        });
        if (macro) {
            throw new common_1.UnauthorizedException(`이미 존재하는 매크로 이름입니다.`);
        }
        await this.macroRepository.save({
            name,
            format,
        });
    }
    async findAll() {
        const macros = await this.macroRepository.find();
        return macros;
    }
    async findOne(id) {
        const macro = this.macroRepository.findOne({
            where: { id },
        });
        if (!macro) {
            throw new common_1.UnauthorizedException(`존재하지 않는 매크로입니다.`);
        }
        return await macro;
    }
    async update(id, updateMacroDto) {
        const macro = this.macroRepository.findOne({
            where: { id },
        });
        if (!macro) {
            throw new common_1.UnauthorizedException(`존재하지 않는 매크로입니다.`);
        }
        return await this.macroRepository.update(id, updateMacroDto);
    }
    async remove(id) {
        const macro = this.macroRepository.findOne({
            where: { id },
        });
        if (!macro) {
            throw new common_1.UnauthorizedException(`존재하지 않는 매크로입니다.`);
        }
        await this.macroRepository.delete(id);
    }
};
exports.MacrosService = MacrosService;
exports.MacrosService = MacrosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Macros_1.Macros)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MacrosService);
//# sourceMappingURL=macros.service.js.map