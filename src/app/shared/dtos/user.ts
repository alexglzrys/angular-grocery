export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: 'customer' | 'admin';
}

export interface CreateUserDTO extends Omit<User, 'id'> { }
