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
const smslib_1 = require("../lib/smslib");
const Lessons_1 = require("../entities/Lessons");
let SmssService = class SmssService {
    constructor(studentsRepository, smssRepository, lessonsRepository) {
        this.studentsRepository = studentsRepository;
        this.smssRepository = smssRepository;
        this.lessonsRepository = lessonsRepository;
        this.serviceId = process.env.SMS_SERVICE_ID;
        this.accessKey = process.env.SMS_ACCESS_KEY_ID;
        this.secretKey = process.env.SMS_SECRETKEY;
        this.url = `https://sens.apigw.ntruss.com/sms/v2/services/${this.serviceId}/messages`;
    }
    makeSignature(method) {
        const date = Date.now().toString();
        const space = ' ';
        const newLine = '\n';
        const url2 = `/sms/v2/services/${this.serviceId}/messages`;
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
    makeSignature2(method, requestId, date) {
        const space = ' ';
        const newLine = '\n';
        const url2 = `/sms/v2/services/${this.serviceId}/messages?requestId=${requestId}`;
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
    async checkSmsStatus(requestId) {
        const date = Date.now().toString();
        const method = 'GET';
        const signature = this.makeSignature2(method, requestId, date);
        try {
            const response = await (0, axios_1.default)({
                method: 'GET',
                url: this.url,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'x-ncp-apigw-timestamp': date,
                    'x-ncp-iam-access-key': this.accessKey,
                    'x-ncp-apigw-signature-v2': signature,
                },
                params: {
                    requestId,
                },
            });
            return response.data;
        }
        catch (error) {
            console.error('Error checking SMS status:', error.response.data);
            throw new common_1.InternalServerErrorException();
        }
    }
    async sendMsg(type, name, to, content) {
        const date = Date.now().toString();
        const signature = this.makeSignature('POST');
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
                    type: (0, smslib_1.isOver118Bytes)(content) ? 'LMS' : 'SMS',
                    contentType: 'COMM',
                    countryCode: '82',
                    from: process.env.SMS_PHONE,
                    content: content,
                    messages: [type === 'test' ? { to: process.env.SMS_PHONE } : { to }],
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
            this.smssRepository.save({
                name,
                tel: to,
                content,
                senddate: new Date(),
                smstype: (0, smslib_1.isOver118Bytes)(content) ? 'LMS' : 'SMS',
                status: 'fail',
                sendtime: new Date(),
            });
            throw new common_1.InternalServerErrorException();
        }
    }
    replacePlaceholders(content, newStudent) {
        const placeholders = content.match(/\[\[.*?\]\]/g);
        if (placeholders) {
            placeholders.forEach((placeholder) => {
                const key = placeholder.replace(/\[\[|\]\]/g, '');
                const value = newStudent[key];
                console.log(value);
                content = content.replace(placeholder, value ? String(value) : '');
            });
        }
        return content;
    }
    extractProperties(student, lesson) {
        const { name, paymentdue, progress, age, tutionfee, tel, address } = student;
        if (lesson) {
            const { teacher, lessontime, lessondate } = lesson;
            return {
                name,
                paymentdue,
                progress,
                age,
                tutionfee,
                tel,
                address,
                teacher,
                lessontime,
                lessondate,
            };
        }
        return {
            name,
            paymentdue,
            progress,
            age,
            tutionfee,
            tel,
            address,
        };
    }
    async sendSMS(sendSmssDTo) {
        var _a, _b;
        const students = await this.studentsRepository.find({
            where: {
                tel: (0, typeorm_2.In)(sendSmssDTo.to),
            },
            relations: ['lessons'],
        });
        let newstudents = [];
        let testTel = process.env.SMS_PHONE;
        if (sendSmssDTo.type === 'test') {
            this.sendMsg('test', '테스트발송', testTel, sendSmssDTo.content).then((res) => {
                this.checkSmsStatus(res.requestId).then((res) => {
                    var _a, _b;
                    if (((_a = res.messages[0]) === null || _a === void 0 ? void 0 : _a.statusName) === 'fail' ||
                        ((_b = res.messages[0]) === null || _b === void 0 ? void 0 : _b.statusName)) {
                        this.smssRepository.save({
                            name: '테스트발송',
                            tel: testTel,
                            content: sendSmssDTo.content,
                            senddate: new Date(),
                            smstype: (0, smslib_1.isOver118Bytes)(sendSmssDTo.content) ? 'LMS' : 'SMS',
                            status: 'fail',
                            sendtime: new Date(),
                        });
                    }
                    else {
                        this.smssRepository.save({
                            name: '테스트발송',
                            tel: testTel,
                            content: sendSmssDTo.content,
                            senddate: new Date(),
                            smstype: (0, smslib_1.isOver118Bytes)(sendSmssDTo.content) ? 'LMS' : 'SMS',
                            status: 'success',
                            sendtime: new Date(),
                        });
                    }
                });
            });
            return;
        }
        if (sendSmssDTo.type === 'all') {
            let allStudents = await this.studentsRepository
                .createQueryBuilder('student')
                .where('student.closeday IS NULL')
                .leftJoinAndSelect('student.lessons', 'lesson')
                .getMany();
            for (const student of allStudents) {
                if (student.lessons) {
                    student.lessons = student.lessons
                        .sort((a, b) => new Date(b.lessondate).getTime() -
                        new Date(a.lessondate).getTime())
                        .slice(0, 1);
                    const newstudents = this.extractProperties(student, student.lessons[0]);
                    const replaceContent = this.replacePlaceholders(sendSmssDTo.content, newstudents);
                    try {
                        const res = await this.sendMsg('all', newstudents.name, newstudents.tel, replaceContent);
                        const statusResponse = await this.checkSmsStatus(res.requestId);
                        const messageStatus = ((_a = statusResponse.messages[0]) === null || _a === void 0 ? void 0 : _a.statusName) || 'unknown';
                        await this.smssRepository.save({
                            name: newstudents.name,
                            tel: newstudents.tel,
                            content: replaceContent,
                            senddate: new Date(),
                            smstype: (0, smslib_1.isOver118Bytes)(replaceContent) ? 'LMS' : 'SMS',
                            status: messageStatus === 'fail' ? 'fail' : 'success',
                            sendtime: new Date(),
                        });
                    }
                    catch (error) {
                        console.error(`Failed to send message to ${newstudents.tel}:`, error);
                    }
                }
            }
        }
        if (sendSmssDTo.type === 'group') {
            for (const student of students) {
                if (student.lessons) {
                    student.lessons = student.lessons
                        .sort((a, b) => new Date(b.lessondate).getTime() -
                        new Date(a.lessondate).getTime())
                        .slice(0, 1);
                    const newstudents = this.extractProperties(student, student.lessons[0]);
                    const replaceContent = this.replacePlaceholders(sendSmssDTo.content, newstudents);
                    try {
                        const res = await this.sendMsg('all', newstudents.name, newstudents.tel, replaceContent);
                        const statusResponse = await this.checkSmsStatus(res.requestId);
                        const messageStatus = ((_b = statusResponse.messages[0]) === null || _b === void 0 ? void 0 : _b.statusName) || 'unknown';
                        await this.smssRepository.save({
                            name: newstudents.name,
                            tel: newstudents.tel,
                            content: replaceContent,
                            senddate: new Date(),
                            smstype: (0, smslib_1.isOver118Bytes)(replaceContent) ? 'LMS' : 'SMS',
                            status: messageStatus === 'fail' ? 'fail' : 'success',
                            sendtime: new Date(),
                        });
                    }
                    catch (error) {
                        console.error(`Failed to send message to ${newstudents.tel}:`, error);
                    }
                }
            }
        }
        if (sendSmssDTo.type === 'personal') {
            students.forEach((student) => {
                if (student.lessons) {
                    student.lessons = student.lessons
                        .sort((a, b) => new Date(b.lessondate).getTime() -
                        new Date(a.lessondate).getTime())
                        .slice(0, 1);
                    newstudents = this.extractProperties(student, student.lessons[0]);
                    const replaceContent = this.replacePlaceholders(sendSmssDTo.content, newstudents);
                    this.sendMsg('personal', newstudents.name, newstudents.tel, replaceContent).then((res) => {
                        this.checkSmsStatus(res.requestId).then((res) => {
                            var _a, _b;
                            if (((_a = res.messages[0]) === null || _a === void 0 ? void 0 : _a.statusName) === 'fail' ||
                                ((_b = res.messages[0]) === null || _b === void 0 ? void 0 : _b.statusName)) {
                                this.smssRepository.save({
                                    name: newstudents.name,
                                    tel: newstudents.tel,
                                    content: replaceContent,
                                    senddate: new Date(),
                                    smstype: (0, smslib_1.isOver118Bytes)(replaceContent) ? 'LMS' : 'SMS',
                                    status: 'fail',
                                    sendtime: new Date(),
                                });
                            }
                            else {
                                this.smssRepository.save({
                                    name: newstudents.name,
                                    tel: newstudents.tel,
                                    content: replaceContent,
                                    senddate: new Date(),
                                    smstype: (0, smslib_1.isOver118Bytes)(replaceContent) ? 'LMS' : 'SMS',
                                    status: 'success',
                                    sendtime: new Date(),
                                });
                            }
                        });
                    });
                }
                else {
                    newstudents = this.extractProperties(student);
                    const replaceContent = this.replacePlaceholders(sendSmssDTo.content, newstudents);
                    this.sendMsg('personal', newstudents.name, newstudents.tel, replaceContent);
                }
            });
        }
    }
    create(createSmssDto) {
        return 'This action adds a new smss';
    }
    async findAll() {
        const smss = await this.smssRepository.find({
            order: {
                id: 'DESC',
            },
        });
        return smss;
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
    __param(2, (0, typeorm_1.InjectRepository)(Lessons_1.Lessons)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], SmssService);
//# sourceMappingURL=smss.service.js.map