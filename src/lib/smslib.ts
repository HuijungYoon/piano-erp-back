import { Inject, Injectable } from '@nestjs/common';

const axios = require('axios');
const CryptoJS = require('crypto-js');

axios.defaults.withCredentials = true;

const uri = 'ncp:sms:kr:264435441348:atn';
const date = Date.now().toString();
const accessKey = process.env.SMS_KEY; // access key id (from portal or Sub Account)
const url = `https://sens.apigw.ntruss.com/sms/v2/services/${uri}/messages`;

function makeSignature() {
  const method = 'POST';
  const space = ' ';
  const newLine = '\n';
  const url2 = `/sms/v2/services/${uri}/messages`;
  const secretKey = 'NHBTQYWA0ZvjkfRb5Gbm09MR9Jvb0ZU216nJTByH'; // secret key (from portal or Sub Account)
  const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
  hmac.update(method);
  hmac.update(space);
  hmac.update(url2);
  hmac.update(newLine);
  hmac.update(date);
  hmac.update(newLine);
  hmac.update(accessKey);
  const hash = hmac.finalize();
  const signature = hash.toString(CryptoJS.enc.Base64);
  return signature;
}

function naversmsAPI() {
  return axios({
    method: 'POST',
    url: url,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'x-ncp-apigw-timestamp': date,
      'x-ncp-iam-access-key': accessKey,
      'x-ncp-apigw-signature-v2': makeSignature(),
    },
    data: {
      type: 'SMS',
      contentType: 'COMM',
      countryCode: '82',
      from: '01074345723',
      content: '되는건가',
      messages: [
        {
          to: '01074345723',
        },
      ],
    },
  })
    .then((response) => response.data)
    .catch(function (error) {
      // console.log(error);
      if (error.response) {
        // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
      // throw new InternalServerErrorException();
      console.log(error.config);
    });

  // return axios
  //   .post(
  //     url,
  //     {
  //       type: "SMS",
  //       countryCode: "82",
  //       from: "01074345723",
  //       // 원하는 메세지 내용
  //       content: `가격 예약을 신청해주셔서 감사합니다.`,
  //       messages: [
  //         // 신청자의 전화번호
  //         { to: "01074345723" },
  //       ],
  //     },

  //     { headers }
  //   )
  //   .then((response) => response.data)
  //   .catch(function (error) {
  //     // console.log(error);
  //     if (error.response) {
  //       // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
  //       console.log(error.response.data);
  //       console.log(error.response.status);
  //       console.log(error.response.headers);
  //     }
  //     // throw new InternalServerErrorException();
  //     console.log(error.config);
  //   });
}

module.exports = {
  naversmsAPI: naversmsAPI,
  makeSignature: makeSignature,
};
