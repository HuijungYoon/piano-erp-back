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
exports.SmssController = void 0;
const common_1 = require("@nestjs/common");
const smss_service_1 = require("./smss.service");
const create_smss_dto_1 = require("./dto/create-smss.dto");
const update_smss_dto_1 = require("./dto/update-smss.dto");
let SmssController = class SmssController {
    constructor(smssService) {
        this.smssService = smssService;
    }
    async sendSMS(to, content) {
        return await this.smssService.sendSMS(to, content);
    }
    create(createSmssDto) {
        return this.smssService.create(createSmssDto);
    }
    findAll() {
        return this.smssService.findAll();
    }
    findOne(id) {
        return this.smssService.findOne(+id);
    }
    update(id, updateSmssDto) {
        return this.smssService.update(+id, updateSmssDto);
    }
    remove(id) {
        return this.smssService.remove(+id);
    }
};
exports.SmssController = SmssController;
__decorate([
    (0, common_1.Post)('send'),
    __param(0, (0, common_1.Body)('to')),
    __param(1, (0, common_1.Body)('content')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, String]),
    __metadata("design:returntype", Promise)
], SmssController.prototype, "sendSMS", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_smss_dto_1.CreateSmssDto]),
    __metadata("design:returntype", void 0)
], SmssController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SmssController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SmssController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_smss_dto_1.UpdateSmssDto]),
    __metadata("design:returntype", void 0)
], SmssController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SmssController.prototype, "remove", null);
exports.SmssController = SmssController = __decorate([
    (0, common_1.Controller)('api/smss'),
    __metadata("design:paramtypes", [smss_service_1.SmssService])
], SmssController);
//# sourceMappingURL=smss.controller.js.map