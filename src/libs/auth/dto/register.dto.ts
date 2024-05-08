import { Transform } from 'class-transformer';
import { IsString, IsEmail,MinLength} from 'class-validator';
export class registerDto {
    @Transform(({value})=> value.trim())
    @IsString()
    @MinLength(1)
    username:string;

    @IsEmail()
    email:string;

    @Transform(({value})=> value.trim())
    @IsString()
    @MinLength(6)
    password:string;

    @IsString()
    role?:string;    
}