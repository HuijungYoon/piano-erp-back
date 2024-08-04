export declare class SMSs {
    id: number;
    name: string;
    tel: string;
    content: string;
    smstype: 'SMS' | 'LMS';
    status: 'success' | 'fail';
    sendtime: Date;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
