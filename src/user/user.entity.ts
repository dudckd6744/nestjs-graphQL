import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
@ObjectType()
export class User {
    @Field()
    _id: string;

    @Field()
    @IsString()
    @Prop({ required: true })
    name: string;

    @Field()
    @IsNotEmpty({ message: '이메일이 비어있습니다.' })
    @IsEmail({}, { message: '이메일 형식으로 입력해주세요!' })
    @Matches(
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
        {
            message: '이메일 형식에 맞게 입력해 주셔야됩니다.',
        },
    )
    @Prop({ required: true, unique: true })
    email: string;

    @Field()
    @IsNotEmpty({ message: '비밀번호가 비어있습니다.' })
    @IsString()
    @Matches(
        /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/,
        {
            message:
                '최소 8자 ~ 16자 이내에 영문과 숫자 특수문자가 가 포함되어 있지않습니다.',
        },
    )
    @Prop({ default: null })
    password: string;

    @Field({ nullable: true })
    @Prop({ default: null })
    profile: string;

    @Field({ nullable: true })
    @Prop({ default: null })
    deletedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
