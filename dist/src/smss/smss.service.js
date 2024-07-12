"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmssService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = __importDefault(require("axios"));
const CryptoJS = __importStar(require("crypto-js"));
const typeorm_1 = require("@nestjs/typeorm");
const Students_1 = require("../entities/Students");
const typeorm_2 = require("typeorm");
const SMSs_1 = require("../entities/SMSs");
let SmssService = class SmssService {
    constructor(studentsRepository, smssRepository) {
        this.studentsRepository = studentsRepository;
        this.smssRepository = smssRepository;
        this.uri = 'ncp:sms:kr:264435441348:atn';
        this.accessKey = 'jOlA1TzZeaxfiRSdHSKO';
        this.secretKey = 'NHBTQYWA0ZvjkfRb5Gbm09MR9Jvb0ZU216nJTByH';
        this.url = `https://sens.apigw.ntruss.com/sms/v2/services/${this.uri}/messages`;
    }
    makeSignature() {
        const date = Date.now().toString();
        const method = 'POST';
        const space = ' ';
        const newLine = '\n';
        const url2 = `/sms/v2/services/${this.uri}/messages`;
        const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, this.secretKey);
        hmac.update(method);
        hmac.update(space);
        hmac.update(url2);
        hmac.update(newLine);
        hmac.update(date);
        hmac.update(newLine);
        hmac.update(this.accessKey);
        const hash = hmac.finalize();
        const signature = hash.toString(CryptoJS.enc.Base64);
        return signature;
    }
    async sendSMS(to, content) {
        const students = await this.studentsRepository.find({
            where: {
                tel: (0, typeorm_2.In)(to),
            },
            relations: ['lessons'],
        });
        console.log('students', students[0].lessons);
        const date = Date.now().toString();
        const signature = this.makeSignature();
        try {
            const response = await (0, axios_1.default)({
                method: 'POST',
                url: this.url,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'x-ncp-apigw-timestamp': date,
                    'x-ncp-iam-access-key': this.accessKey,
                    'x-ncp-apigw-signature-v2': signature,
                },
                data: {
                    type: 'SMS',
                    contentType: 'COMM',
                    countryCode: '82',
                    from: '01074345723',
                    content,
                    messages: [
                        {
                            to,
                        },
                    ],
                },
            });
            return response.data;
        }
        catch (error) {
            if (error.response) {
                console.error(error.response.data);
                console.error(error.response.status);
                console.error(error.response.headers);
            }
            console.error(error.config);
            throw new common_1.InternalServerErrorException();
        }
    }
    create(createSmssDto) {
        return 'This action adds a new smss';
    }
    findAll() {
        return `This action returns all smss`;
    }
    findOne(id) {
        return `This action returns a #${id} smss`;
    }
    update(id, updateSmssDto) {
        return `This action updates a #${id} smss`;
    }
    remove(id) {
        return `This action removes a #${id} smss`;
    }
};
exports.SmssService = SmssService;
exports.SmssService = SmssService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Students_1.Students)),
    __param(1, (0, typeorm_1.InjectRepository)(SMSs_1.SMSs)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], SmssService);
//# sourceMappingURL=smss.service.js.map