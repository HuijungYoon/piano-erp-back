import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateSmssDto } from './dto/create-smss.dto';
import { UpdateSmssDto } from './dto/update-smss.dto';
import axios from 'axios';
import * as CryptoJS from 'crypto-js';
import { InjectRepository } from '@nestjs/typeorm';
import { Students } from 'src/entities/Students';
import { In, Repository } from 'typeorm';
import { SMSs } from 'src/entities/SMSs';
@Injectable()
export class SmssService {
  constructor(
    @InjectRepository(Students)
    private studentsRepository: Repository<Students>,
    @InjectRepository(SMSs)
    private smssRepository: Repository<SMSs>,
  ) {}

  private readonly uri = 'ncp:sms:kr:264435441348:atn';
  private readonly accessKey = 'jOlA1TzZeaxfiRSdHSKO'; // access key id (from portal or Sub Account)
  private readonly secretKey = 'NHBTQYWA0ZvjkfRb5Gbm09MR9Jvb0ZU216nJTByH'; // secret key (from portal or Sub Account)
  private readonly url = `https://sens.apigw.ntruss.com/sms/v2/services/${this.uri}/messages`;

  private makeSignature(): string {
    const date = Date.now().toString();
    const method = 'POST';
    const space = ' ';
    const newLine = '\n';
    const url2 = `/sms/v2/services/${this.uri}/messages`;
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

  async sendSMS(to: string[], content: string): Promise<any> {
    const students = await this.studentsRepository.find({
      where: {
        tel: In(to),
      },
      relations: ['lessons'],
    });

    console.log('students', students[0].lessons);

    const date = Date.now().toString();
    const signature = this.makeSignature();

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
    } catch (error) {
      if (error.response) {
        console.error(error.response.data);
        console.error(error.response.status);
        console.error(error.response.headers);
      }
      console.error(error.config);
      throw new InternalServerErrorException();
    }
  }

  create(createSmssDto: CreateSmssDto) {
    return 'This action adds a new smss';
  }

  findAll() {
    return `This action returns all smss`;
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
