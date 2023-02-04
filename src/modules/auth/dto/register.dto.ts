import { IsArray, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { Role } from 'src/modules/user/enums/role.enums';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @MinLength(8)
  readonly password: string;

  @IsOptional()
  @IsArray()
  @IsEnum(Role, { each: true })
  readonly roles?: Role[];
}
