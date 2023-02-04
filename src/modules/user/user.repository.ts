import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './entity/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserRepository {
  constructor(@InjectModel('User') private readonly repository: Model<UserDocument>) {}

  async create(user: CreateUserDto): Promise<User> {
    return this.repository.create(user);
  }

  async findAll(): Promise<User[]> {
    return this.repository.find();
  }

  async getOne(id: string): Promise<User> {
    return this.repository.findById(id);
  }

  async getByEmail(email: string): Promise<User> {
    return this.repository.findOne({ email });
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    return await this.repository.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<User> {
    return this.repository.findByIdAndRemove(id, { new: true });
  }
}
