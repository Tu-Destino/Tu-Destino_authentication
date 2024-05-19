import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Request, UseGuards } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { UserRole } from '../entities/user.entity';
import { Roles } from 'src/libs/decorators/roles.decorator';
import { AtGuard } from 'src/libs/auth/guards/at.guard';


@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(AtGuard) 
export class UsersController {
  constructor(private readonly usersService: UsersService) { }


  @Roles()
  @ApiOperation({ summary: 'Create user' })
  @ApiCreatedResponse({ description: 'Success' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Server Error' })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }


  
 
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({ description: 'Success' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Server Error' })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }



  

  @Roles(UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Update user role' })
  @ApiOkResponse({ description: 'Success' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Server Error' })
  @ApiParam({ name: 'id', description: 'uuid user' })
  @ApiQuery({ name: 'role', description: 'role to update' })
  @Patch(':id/role')
  updateRole(
    @Param('id') id: string,
    @Query('role') role: string,
    @Request() req,
  ) {
    return this.usersService.updateRole(id, role, req.user);
  }

}
