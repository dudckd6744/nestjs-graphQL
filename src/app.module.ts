import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
import { join } from 'path/posix';

import { User, UserSchema } from './user/user.entity';
import { UserModule } from './user/user.module';
import { AuthTokenMiddleware } from './utils/jwt/auth.token.middleware';

config();

@Module({
    imports: [
        GraphQLModule.forRoot({
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        }),
        // TODO: monogoose 6 버전 이상부터는 connet 시 추가 옵션 설정을 안해줘되된다.
        // https://stackoverflow.com/questions/68958221/mongoparseerror-options-usecreateindex-usefindandmodify-are-not-supported/68962378#68962378
        MongooseModule.forRoot(`${process.env.MONGO_DB}`),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        UserModule,
    ],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthTokenMiddleware)
            .forRoutes({ path: '*', method: RequestMethod.ALL });
    }
}
