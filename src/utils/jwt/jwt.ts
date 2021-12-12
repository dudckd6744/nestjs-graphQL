/* eslint-disable @typescript-eslint/ban-types */
import { config } from 'dotenv';
import * as jwt from 'jsonwebtoken';

config();

const jwtSecret = process.env.JWT_SECRET;

export async function signToken(
    payload: Object,
    options: jwt.SignOptions = {},
): Promise<string> {
    const { expiresIn } = options;

    const token = jwt.sign(payload, jwtSecret, {
        expiresIn: expiresIn ?? '7d',
    });

    return token;
}

export async function verifyToken(token: string): Promise<any> {
    return new Promise((res, rej) =>
        jwt.verify(token, jwtSecret, (err, decoded) => {
            if (err) rej(err);
            res(decoded);
        }),
    );
}
