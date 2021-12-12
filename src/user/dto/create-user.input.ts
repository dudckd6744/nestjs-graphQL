import { Field, InputType, ObjectType } from '@nestjs/graphql';

import { User } from '../user.entity';

@InputType()
export class CreateUserInput extends User {
    @Field()
    name: string;

    @Field()
    email: string;

    @Field()
    password: string;

    @Field({ nullable: true })
    phone: string;

    @Field({ nullable: true })
    profile: string;
}

@InputType()
export class LoginUserInput extends User {
    @Field()
    email: string;

    @Field()
    password: string;
}

@ObjectType()
export class Token {
    @Field()
    token: string;
}
