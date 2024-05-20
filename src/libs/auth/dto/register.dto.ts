import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsEmail,MinLength} from 'class-validator';
export class registerDto {
    @ApiProperty()
    @Transform(({value})=> value.trim())
    @IsString()
    @MinLength(1)
    username?:string;

    @ApiProperty()
    @IsEmail()
    email:string;

    @ApiProperty()
    @Transform(({value})=> value.trim())
    @IsString()
    @MinLength(6)
    password:string;

    @ApiProperty()
    @IsString()
    role?:string;    
}