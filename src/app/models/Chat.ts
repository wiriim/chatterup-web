import { Message } from "./Message";
import { User } from "./User";

export type Chat = {
    id: number;
    name: string;
    messages:  Message[];
    users: User[];
}