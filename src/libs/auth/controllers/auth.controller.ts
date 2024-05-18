import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { registerDto } from '../dto/register.dto';
import { loginDto } from '../dto/login.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AtGuard } from '../guards/at.guard';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiOperation({ summary: 'Register user' })
    @ApiCreatedResponse({ description: 'Success' })
    @ApiNotFoundResponse({ description: 'Not Found' })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    @ApiInternalServerErrorResponse({ description: 'Server Error' })
    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() signUpDto: registerDto) {
      const token = await this.authService.register(signUpDto);
      return { access_token: token.access_token };
    }

  @ApiOperation({ summary: 'Authenticate user' })
  @ApiCreatedResponse({ description: 'Success' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Server Error' })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async logIn(@Body() userLogInDto: loginDto) {
    const token = await this.authService.login(userLogInDto);

    return { access_token: token.access_token };
  }

  @Post('check')
  @UseGuards(AtGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  async check() {
    return true;
  }
}
