export declare class SendSmssDto {
    type: 'test' | 'all' | 'group' | 'personal';
    to: string[];
    content: string;
}
