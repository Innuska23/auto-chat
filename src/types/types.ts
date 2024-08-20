export type Chat = {
    _id?: string;
    firstName: string;
    lastName: string;
    messages?: { senderId: string; text: string }[];
};