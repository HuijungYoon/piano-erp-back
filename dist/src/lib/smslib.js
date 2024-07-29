"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOver118Bytes = void 0;
const axios = require('axios');
const CryptoJS = require('crypto-js');
axios.defaults.withCredentials = true;
const uri = 'ncp:sms:kr:264435441348:atn';
const date = Date.now().toString();
const accessKey = process.env.SMS_KEY;
const url = `https://sens.apigw.ntruss.com/sms/v2/services/${uri}/messages`;
function makeSignature() {
    const method = 'POST';
    const space = ' ';
    const newLine = '\n';
    const url2 = `/sms/v2/services/${uri}/messages`;
    const secretKey = 'NHBTQYWA0ZvjkfRb5Gbm09MR9Jvb0ZU216nJTByH';
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
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        }
        console.log(error.config);
    });
}
function getByteLength(s) {
    let byteLength = 0;
    for (let i = 0; i < s.length; i++) {
        const code = s.charCodeAt(i);
        if (code <= 0x7f) {
            byteLength += 1;
        }
        else if (code <= 0x7ff) {
            byteLength += 2;
        }
        else if (code >= 0x800 && code <= 0xffff) {
            byteLength += 3;
        }
        else {
            byteLength += 4;
        }
    }
    return byteLength;
}
function isOver118Bytes(message) {
    console.log('getByteLength(message) ', getByteLength(message));
    return getByteLength(message) >= 118;
}
exports.isOver118Bytes = isOver118Bytes;
module.exports = {
    naversmsAPI: naversmsAPI,
    makeSignature: makeSignature,
    getByteLength: getByteLength,
    isOver118Bytes: isOver118Bytes,
};
//# sourceMappingURL=smslib.js.map