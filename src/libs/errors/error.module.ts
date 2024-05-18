import { Module } from '@nestjs/common';
import { ErrorService } from './error.service';

@Module({
  controllers: [],
  providers: [ErrorService],
  exports: [ErrorService],
})
export class ErrorModule {}