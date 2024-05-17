import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UsersModule } from 'src/modules/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { UtilsModule } from '../utils/utils.module';
import { ErrorModule } from '../errors/error.module';


@Module({
  imports:[
    ErrorModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '15m' },
    }),
    UtilsModule,
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
