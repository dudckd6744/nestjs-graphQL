/* eslint-disable @typescript-eslint/ban-types */
import { UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard_renewal } from 'src/utils/jwt/auth.guard';
import { ReqUser } from 'src/utils/jwt/user.decorater';

import { CreateUserInput, LoginUserInput } from './dto/create-user.input';
import { User, UserSchema } from './user.entity';
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

    // @UseGuards(AuthGuard_renewal)
    @Query((returns) => [User])
    users(@ReqUser() user: User): Promise<User[]> {
        console.log(user);
        return this.usersService.findAll();
    }
}
