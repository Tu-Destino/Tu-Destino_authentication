import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
  } from '@nestjs/common';
  
  @Injectable()
  export class ErrorService {
    createError(error: any) {
      if (error.name === 'MongoServerError' && error.code === 11000) {
        throw new BadRequestException(`The ${Object.keys(error.keyValue)} exist`);
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }