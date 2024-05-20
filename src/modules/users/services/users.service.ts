import { BadRequestException, Body, Delete, Injectable, InternalServerErrorException, NotFoundException, Param, Post } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserRole } from '../entities/user.entity';
import { Model } from 'mongoose';
import { ErrorService } from 'src/libs/errors/error.service';
import { UpdateUserDto } from '../dto/update-user.dto';
/* import { UpdateUserDto } from './dto/update-user.dto'; */

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name)
  private readonly userModel: Model<User>,
    private readonly errorService: ErrorService

  ) { }
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    try {
      return this.userModel.create(createUserDto);
    } catch (error) {
      this.errorService.createError(error)
    }

  }

  async findOneByEmail(email: string): Promise<User> {
    try {
      const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
    } catch (error) {
      this.errorService.createError(error) 
    }
    
  }

  async findAll(): Promise<User[]> {
    try {
      return this.userModel.find().exec();
    } catch (error) {
      this.errorService.createError(error)  
    }
    
  }
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
    if (!updatedUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return updatedUser;
  }

  async updateRole(id: string, role: string, user: User) {
    if (!Object.values(UserRole).includes(role as UserRole)) {
      throw new InternalServerErrorException(`Role ${role} is not valid`);
    }

    const userUpdate: User = await this.userModel.findById(id);
    if (!userUpdate) {
      throw new BadRequestException('The user does not exist.');
    }

    if (userUpdate.role === role) {
      throw new BadRequestException('The user currently has this role');
    }

    try {
      await this.userModel.findByIdAndUpdate(id, { role, updatedBy: id }, { new: true });
      const res: User = await this.userModel.findById(id);
      return {
        message: 'Success',
        data: res,
      };
    } catch (error) {
      this.errorService.createError(error);
  
    }
  }

  async remove(id: string): Promise<User> {
    try {
      const user = await this.userModel.findByIdAndDelete(id).exec();
      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      return user;
    } catch (error) {
      this.errorService.createError(error);
      throw new InternalServerErrorException('Failed to delete user');
    }
  }

}
