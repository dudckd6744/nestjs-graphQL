import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from './user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
    imports: [
        // User.name 을 붙이는이유
        // TODO: https://stackoverflow.com/questions/65674334/what-is-cat-name-in-nestjs-mongoose-docs
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ],
    providers: [UserService, UserResolver],
})
export class UserModule {}
