import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateSmssDto } from './dto/create-smss.dto';
import { UpdateSmssDto } from './dto/update-smss.dto';
import axios, { all } from 'axios';
import * as CryptoJS from 'crypto-js';
import { InjectRepository } from '@nestjs/typeorm';
import { Students } from 'src/entities/Students';
import { In, Repository } from 'typeorm';
import { SMSs } from 'src/entities/SMSs';
import { SendSmssDto } from './dto/send-smss.dto';
import { isOver118Bytes } from '../lib/smslib';
import { Lessons } from 'src/entities/Lessons';

type newStudentProps = {
  name: string;
  paymentdue: string;
  progress: string;
  age: number;
  tutionfee: number;
  tel: string;
  address: string;
  lessontime: string;
  lessondate: Date;
};
@Injectable()
export class SmssService {
  constructor(
    @InjectRepository(Students)
    private studentsRepository: Repository<Students>,
    @InjectRepository(SMSs)
    private smssRepository: Repository<SMSs>,
    @InjectRepository(Lessons)
    private lessonsRepository: Repository<Lessons>,
  ) {}

  //민지쌤꺼
  private readonly serviceId = process.env.SMS_SERVICE_ID;
  private readonly accessKey = process.env.SMS_ACCESS_KEY_ID; // access key id (from portal or Sub Account)
  private readonly secretKey = process.env.SMS_SECRETKEY; // secret key (from portal or Sub Account)

  // private readonly serviceId = 'ncp:sms:kr:264435441348:atn';
  // private readonly accessKey = 'jOlA1TzZeaxfiRSdHSKO'; // access key id (from portal or Sub Account)
  // private readonly secretKey = 'NHBTQYWA0ZvjkfRb5Gbm09MR9Jvb0ZU216nJTByH'; // secret key (from portal or Sub Account)
  private readonly url = `https://sens.apigw.ntruss.com/sms/v2/services/${this.serviceId}/messages`;

  private makeSignature(method: string): string {
    const date = Date.now().toString();
    const space = ' ';
    const newLine = '\n';
    const url2 = `/sms/v2/services/${this.serviceId}/messages`;
    const hmac = CryptoJS.algo.HMAC.create(
      CryptoJS.algo.SHA256,
      this.secretKey,
    );
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

  private makeSignature2(
    method: string,
    requestId: string,
    date: string,
  ): string {
    const space = ' ';
    const newLine = '\n';
    const url2 = `/sms/v2/services/${this.serviceId}/messages?requestId=${requestId}`;

    const hmac = CryptoJS.algo.HMAC.create(
      CryptoJS.algo.SHA256,
      this.secretKey,
    );
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

  async checkSmsStatus(requestId: string) {
    const date = Date.now().toString();
    const method = 'GET';
    const signature = this.makeSignature2(method, requestId, date);
    try {
      const response = await axios({
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
    } catch (error) {
      console.error('Error checking SMS status:', error.response.data);
      throw new InternalServerErrorException();
    }
  }

  private async sendMsg(
    type: 'test' | 'all' | 'personal' | 'group',
    name: string,
    to: string,
    content: string,
  ) {
    const date = Date.now().toString();
    const signature = this.makeSignature('POST');

    try {
      const response = await axios({
        method: 'POST',
        url: this.url,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'x-ncp-apigw-timestamp': date,
          'x-ncp-iam-access-key': this.accessKey,
          'x-ncp-apigw-signature-v2': signature,
        },
        data: {
          type: isOver118Bytes(content) ? 'LMS' : 'SMS',
          contentType: 'COMM',
          countryCode: '82',
          from: process.env.SMS_PHONE,
          content: content,
          messages: [type === 'test' ? { to: process.env.SMS_PHONE } : { to }],
        },
      });

      return response.data;
    } catch (error) {
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
        smstype: isOver118Bytes(content) ? 'LMS' : 'SMS',
        status: 'fail',
        sendtime: new Date(),
      });
      throw new InternalServerErrorException();
    }
  }

  replacePlaceholders(
    content: string,
    newStudent: newStudentProps | any,
  ): string {
    const placeholders = content.match(/\[\[.*?\]\]/g);

    if (placeholders) {
      placeholders.forEach((placeholder) => {
        const key = placeholder.replace(/\[\[|\]\]/g, '');
        const value = newStudent[key as keyof newStudentProps];
        console.log(value);
        content = content.replace(placeholder, value ? String(value) : '');
      });
    }

    return content;
  }

  // 학생과 레슨 데이터를 합쳐서 문자를 보내기 위한 데이터를 추출하는 함수
  extractProperties(student: Students, lesson?: Lessons) {
    const { name, paymentdue, progress, age, tutionfee, tel, address } =
      student;

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

  async sendSMS(sendSmssDTo: SendSmssDto): Promise<any> {
    const students = await this.studentsRepository.find({
      where: {
        tel: In(sendSmssDTo.to),
      },
      relations: ['lessons'],
    });
    let newstudents: any = [];
    let testTel = process.env.SMS_PHONE;
    //테스트발송
    if (sendSmssDTo.type === 'test') {
      this.sendMsg('test', '테스트발송', testTel, sendSmssDTo.content).then(
        (res) => {
          this.checkSmsStatus(res.requestId).then((res) => {
            if (
              res.messages[0]?.statusName === 'fail' ||
              res.messages[0]?.statusName
            ) {
              this.smssRepository.save({
                name: '테스트발송',
                tel: testTel,
                content: sendSmssDTo.content,
                senddate: new Date(),
                smstype: isOver118Bytes(sendSmssDTo.content) ? 'LMS' : 'SMS',
                status: 'fail',
                sendtime: new Date(),
              });
            } else {
              this.smssRepository.save({
                name: '테스트발송',
                tel: testTel,
                content: sendSmssDTo.content,
                senddate: new Date(),
                smstype: isOver118Bytes(sendSmssDTo.content) ? 'LMS' : 'SMS',
                status: 'success',
                sendtime: new Date(),
              });
            }
          });
        },
      );
      return;
    }

    //전체 발송
    if (sendSmssDTo.type === 'all') {
      let allStudents = await this.studentsRepository
        .createQueryBuilder('student')
        .where('student.closeday IS NULL')
        .leftJoinAndSelect('student.lessons', 'lesson')
        .getMany();

      // 전화번호가 11자리가 아닌 학생들은 제외
      // allStudents = allStudents.filter((student) => student.tel.length === 11);

      for (const student of allStudents) {
        if (student.lessons) {
          student.lessons = student.lessons
            .sort(
              (a, b) =>
                new Date(b.lessondate).getTime() -
                new Date(a.lessondate).getTime(),
            )
            .slice(0, 1);
          const newstudents = this.extractProperties(
            student,
            student.lessons[0],
          );
          const replaceContent = this.replacePlaceholders(
            sendSmssDTo.content,
            newstudents,
          );

          try {
            const res = await this.sendMsg(
              'all',
              newstudents.name,
              newstudents.tel,
              replaceContent,
            );

            const statusResponse = await this.checkSmsStatus(res.requestId);
            const messageStatus =
              statusResponse.messages[0]?.statusName || 'unknown';

            await this.smssRepository.save({
              name: newstudents.name,
              tel: newstudents.tel,
              content: replaceContent,
              senddate: new Date(),
              smstype: isOver118Bytes(replaceContent) ? 'LMS' : 'SMS',
              status: messageStatus === 'fail' ? 'fail' : 'success',
              sendtime: new Date(),
            });
          } catch (error) {
            console.error(
              `Failed to send message to ${newstudents.tel}:`,
              error,
            );
          }
        }
      }
    }

    //선택발송
    if (sendSmssDTo.type === 'group') {
      for (const student of students) {
        if (student.lessons) {
          student.lessons = student.lessons
            .sort(
              (a, b) =>
                new Date(b.lessondate).getTime() -
                new Date(a.lessondate).getTime(),
            )
            .slice(0, 1);
          const newstudents = this.extractProperties(
            student,
            student.lessons[0],
          );
          const replaceContent = this.replacePlaceholders(
            sendSmssDTo.content,
            newstudents,
          );

          try {
            const res = await this.sendMsg(
              'all',
              newstudents.name,
              newstudents.tel,
              replaceContent,
            );

            const statusResponse = await this.checkSmsStatus(res.requestId);
            const messageStatus =
              statusResponse.messages[0]?.statusName || 'unknown';

            await this.smssRepository.save({
              name: newstudents.name,
              tel: newstudents.tel,
              content: replaceContent,
              senddate: new Date(),
              smstype: isOver118Bytes(replaceContent) ? 'LMS' : 'SMS',
              status: messageStatus === 'fail' ? 'fail' : 'success',
              sendtime: new Date(),
            });
          } catch (error) {
            console.error(
              `Failed to send message to ${newstudents.tel}:`,
              error,
            );
          }
        }
      }
    }

    if (sendSmssDTo.type === 'personal') {
      // 최신 레슨을 가져오는 로직
      students.forEach((student) => {
        //lessons페이지에서
        if (student.lessons) {
          student.lessons = student.lessons
            .sort(
              (a, b) =>
                new Date(b.lessondate).getTime() -
                new Date(a.lessondate).getTime(),
            )
            .slice(0, 1);
          newstudents = this.extractProperties(student, student.lessons[0]);
          const replaceContent = this.replacePlaceholders(
            sendSmssDTo.content,
            newstudents,
          );
          this.sendMsg(
            'personal',
            newstudents.name,
            newstudents.tel,
            replaceContent,
          ).then((res) => {
            this.checkSmsStatus(res.requestId).then((res) => {
              if (
                res.messages[0]?.statusName === 'fail' ||
                res.messages[0]?.statusName
              ) {
                this.smssRepository.save({
                  name: newstudents.name,
                  tel: newstudents.tel,
                  content: replaceContent,
                  senddate: new Date(),
                  smstype: isOver118Bytes(replaceContent) ? 'LMS' : 'SMS',
                  status: 'fail',
                  sendtime: new Date(),
                });
              } else {
                this.smssRepository.save({
                  name: newstudents.name,
                  tel: newstudents.tel,
                  content: replaceContent,
                  senddate: new Date(),
                  smstype: isOver118Bytes(replaceContent) ? 'LMS' : 'SMS',
                  status: 'success',
                  sendtime: new Date(),
                });
              }
            });
          });
        } else {
          //studnetlist페이지에서
          newstudents = this.extractProperties(student);
          const replaceContent = this.replacePlaceholders(
            sendSmssDTo.content,
            newstudents,
          );
          this.sendMsg(
            'personal',
            newstudents.name,
            newstudents.tel,
            replaceContent,
          );
        }
      });
    }
  }

  create(createSmssDto: CreateSmssDto) {
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

  findOne(id: number) {
    return `This action returns a #${id} smss`;
  }

  update(id: number, updateSmssDto: UpdateSmssDto) {
    return `This action updates a #${id} smss`;
  }

  remove(id: number) {
    return `This action removes a #${id} smss`;
  }
}
