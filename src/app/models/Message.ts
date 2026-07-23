import { User } from "./User";

export type Message = {
    id: number;
    content: string;
    date: Date;
    user: User;
}