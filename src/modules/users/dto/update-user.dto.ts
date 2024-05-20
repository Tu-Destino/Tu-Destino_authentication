
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
    @ApiProperty()
    @IsOptional()
    @IsString()
    username: string;

    @ApiProperty()
    @IsEmail()
    email: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string;

}
