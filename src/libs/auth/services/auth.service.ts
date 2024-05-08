import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/modules/users/services/users.service';
import { registerDto } from '../dto/register.dto';

import * as bcryptjs from 'bcryptjs';
import { loginDto } from '../dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) { }
    async register({username, email, password }: registerDto) {
        try {
            const user = await this.usersService.findOneByEmail(email)
            if (user) {
                throw new BadRequestException('User already exists')
            }
            return await this.usersService.create({
                username,
                email,
                password: await bcryptjs.hash(password, 10)
            });


        } catch (error) {
            throw new NotFoundException('error when registering')
        }
    }


    async login({ email, password }: loginDto) {
       try {
        const user = await this.usersService.findOneByEmail(email)
        if (!user) {
            throw new UnauthorizedException('email is wrong or password is incorrect')
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password)

        if (!isPasswordValid) {
            throw new UnauthorizedException('email is wrong or password is incorrect')
        }
        const payload = { email: user.email }
        const token = await this.jwtService.signAsync(payload)
        return {
            token,
            email,
        };
       } catch (error) {
        throw new NotFoundException('error when logging in')
       }
        
    }
}
