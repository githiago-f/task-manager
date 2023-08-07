import { hash, compare } from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class Encryption {
    hash(password: string): Promise<string> {
        return hash(password, 10);
    }
    compare(password: string, hashedPassword: string): Promise<boolean> {
        return compare(password, hashedPassword);
    }
}
