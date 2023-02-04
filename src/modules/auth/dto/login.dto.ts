import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @MinLength(8)
  @IsNotEmpty()
  readonly password: string;
}
