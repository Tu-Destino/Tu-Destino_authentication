import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import dbConfig from './libs/persistance/db-config';
import { ConfigModule } from '@nestjs/config';
import { PersistenceModule } from './libs/persistance/persistance.module';
import { AuthModule } from './libs/auth/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [dbConfig],
      isGlobal: true,
    }),
    PersistenceModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
