import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { FirstMiddleware } from './middlewares/first/first.middleware';
import { logger } from './middlewares/logger.middleware';
import { HelmetMiddleware } from '@nest-middlewares/helmet';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as process from 'node:process';
import { UsersModule } from './users/users.module';
import { ValidationObjectIdMiddleware } from './middlewares/validation-object-id/validation-object-id.middleware';

@Module({
  imports: [
    TodoModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(FirstMiddleware)
      .forRoutes(
        {
          path: 'todo*',
          method: 0,
        },
        {
          path: 'todo*',
          method: 3,
        },
      )
      .apply(logger)
      .forRoutes() //for all routes
      .apply(HelmetMiddleware)
      .forRoutes()
      .apply(ValidationObjectIdMiddleware)
      .forRoutes(
        {
          path: 'users/:id',
          method: 0,
        },
        {
          path: 'users/:id',
          method: 4,
        },
      ); // for default functionalities this middleware adds a set of headers to the request for security
  }
}
