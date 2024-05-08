import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    Length,
    Matches,
    IsNumber
} from 'class-validator';
import { Document } from 'mongoose';


@Schema({ timestamps: true })
export class User extends Document {
    @IsNumber()
    @Prop({
        primary:true,
        generated:true
    })
    id: number;

    @IsOptional()
    @IsString()
    @Length(3, 50)
    @Prop({ required: true })
    username?: string;

    @IsEmail()
    @Transform(({ value }) => value.toLowerCase())
    @Prop({
        required: true,
        unique: true,
        nullable:false
    })
    email: string;


    @IsNotEmpty()
    @IsString()
    @Length(8, 128)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
        message: 'password too weak',
    })
    @Prop({
        required: true,
        nullable:false
    })
    password: string;

    @Prop({
        default: 'user'
    })
    role: string;

}

export const UserSchema = SchemaFactory.createForClass(User);
