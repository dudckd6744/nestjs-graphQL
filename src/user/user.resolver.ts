/* eslint-disable @typescript-eslint/ban-types */
import { UsePipes, ValidationPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateUserInput, LoginUserInput } from './dto/create-user.input';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver((of) => User)
export class UserResolver {
    constructor(private usersService: UserService) {}

    @Mutation((returns) => User)
    createUser(
        @Args('createUserInput') createUserInput: CreateUserInput,
    ): Promise<User | Object> {
        return this.usersService.createUser(createUserInput);
    }

    @Mutation(() => String)
    loginUser(
        @Args('loginUserInput') loginUserInput: LoginUserInput,
    ): Promise<String | Object> {
        const token = this.usersService.login(loginUserInput);
        return token;
    }

    @Query((returns) => [User])
    users(): Promise<User[]> {
        return this.usersService.findAll();
    }
}
