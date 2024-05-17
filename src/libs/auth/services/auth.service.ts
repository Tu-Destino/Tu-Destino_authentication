
import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/modules/users/services/users.service';
import { registerDto } from '../dto/register.dto';


import { loginDto } from '../dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { HashService } from 'src/libs/utils/services/hash.service';
import { JwtPayload, Tokens } from '../types';
import { ErrorService } from 'src/libs/errors/error.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly hashService: HashService,
    private readonly errorService: ErrorService
  ) { }
  async register({ username, email, password, role }: registerDto) {
    try {
      const hashedPassword = await this.hashService.hash(password);
      const user = await this.usersService.create({
        email: email,
        username: username,
        password: hashedPassword,
        role: role,
      });

      return await this.getTokens({
        role: user.role,
      });


    } catch (error) {
      this.errorService.createError(error)
    }
  }


  async login(userLogInDto: loginDto) {
    const user = await this.usersService.findOneByEmail(userLogInDto.email);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isPasswordValid = await this.hashService.compare(
      userLogInDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new BadRequestException('Incorrect password');
    }

    return await this.getTokens({
      role: user.role,
    });
  }
  async getTokens(jwtPayload: JwtPayload): Promise<Tokens> {
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
      throw new Error('JWT_SECRET is not set');
    }
    const accessTokenOptions = {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '1d',
    };

    const accessToken = await this.signToken(
      jwtPayload,
      secretKey,
      accessTokenOptions,
    );

    return { access_token: accessToken };
  }


  async signToken(payload: JwtPayload, secretKey: string, options: any) {
    return await this.jwtService.signAsync(payload, {
      secret: secretKey,
      ...options,
    });
  }

}
