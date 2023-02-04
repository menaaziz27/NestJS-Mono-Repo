import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { RegisterDto } from 'src/modules/auth/dto/register.dto';
import { Hash } from 'src/utils/Hash';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entity/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create(user: RegisterDto): Promise<User> {
    const userExists = await this.userRepository.getByEmail(user.email);

    if (userExists) {
      throw new HttpException('User with provided email already created.', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = Hash.make(user.password);

    user = { ...user, password: hashedPassword };

    return await this.userRepository.create(user);
  }

  async update(id, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = Hash.make(updateUserDto.password);
    }

    const updatedUser = await this.userRepository.update(id, updateUserDto);

    if (!updatedUser) {
      throw new HttpException('User is not exist', HttpStatus.NOT_FOUND);
    }

    return updatedUser;
  }

  async getOne(id: string): Promise<User> {
    const user = await this.userRepository.getOne(id);

    if (!user) {
      throw new NotFoundException(`User with id: ${id} not found`);
    }

    return user;
  }

  async getByEmail(email: string): Promise<User> {
    const user = await this.userRepository.getByEmail(email);

    if (!user) {
      throw new NotFoundException(`User with email "${email}" not found.`);
    }

    return user;
  }

  async delete(id: string): Promise<User> {
    const user = await this.userRepository.delete(id);

    if (!user) {
      throw new NotFoundException(`User with id "${id}" not found.`);
    }

    return user;
  }
}
