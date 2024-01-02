export interface User {
    id?: number;
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    createdTime: Date;
}

export interface UserFromDB {
    id: number;
    first_name: string;
    last_name: string;
    password: string;
    email: string;
    created_time: Date;
}