/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable @typescript-eslint/ban-types */
import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { signToken } from 'src/utils/jwt/jwt';

import { CreateUserInput, LoginUserInput } from './dto/create-user.input';
import { User, UserDocument } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {}

    async createUser(createUserInput: CreateUserInput): Promise<User | Object> {
        const { email, name } = createUserInput;
        const password = createUserInput.password;

        const existUser = await this.userModel.findOne({ email });

        if (existUser && existUser.name === name) {
            return new BadRequestException('이미 해당 유저가 존재합니다.');
        }

        const salt = await bcrypt.genSalt();
        createUserInput.password = await bcrypt.hash(password, salt);

        const newUser = await this.userModel.create(createUserInput);
        const user = newUser.save();
        return user;
    }

    async login(loginUserInput: LoginUserInput): Promise<String | Object> {
        const { email, password } = loginUserInput;

        const user = await this.userModel.findOne({ email });

        if (!user) {
            return new BadRequestException(
                '이메일에 해당하는 유저가 존재하지않습니다.',
            );
        } else if (await bcrypt.compare(password, user.password)) {
            const email = user.email;
            const token = await signToken({ email });

            return token;
        }
        return new UnauthorizedException('비밀번호를 다시 확인해주세요.');
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find();
    }
}
