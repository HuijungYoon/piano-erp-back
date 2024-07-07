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
exports.MacrosController = void 0;
const common_1 = require("@nestjs/common");
const macros_service_1 = require("./macros.service");
const create_macro_dto_1 = require("./dto/create-macro.dto");
const update_macro_dto_1 = require("./dto/update-macro.dto");
let MacrosController = class MacrosController {
    constructor(macrosService) {
        this.macrosService = macrosService;
    }
    async create(createMacroDto) {
        return await this.macrosService.create(createMacroDto.name, createMacroDto.format);
    }
    async findAll() {
        return await this.macrosService.findAll();
    }
    async findOne(id) {
        return await this.macrosService.findOne(+id);
    }
    async update(id, updateMacroDto) {
        return await this.macrosService.update(+id, updateMacroDto);
    }
    async remove(id) {
        return await this.macrosService.remove(+id);
    }
};
exports.MacrosController = MacrosController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_macro_dto_1.CreateMacroDto]),
    __metadata("design:returntype", Promise)
], MacrosController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MacrosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MacrosController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_macro_dto_1.UpdateMacroDto]),
    __metadata("design:returntype", Promise)
], MacrosController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MacrosController.prototype, "remove", null);
exports.MacrosController = MacrosController = __decorate([
    (0, common_1.Controller)('api/macros'),
    __metadata("design:paramtypes", [macros_service_1.MacrosService])
], MacrosController);
//# sourceMappingURL=macros.controller.js.map