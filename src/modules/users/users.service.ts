import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@/entities/users';
import { Injectable } from '@nestjs/common';
import { Optional } from '@/common/interfaces/ITypes';
import { Repository } from 'typeorm';
import { CreateUserDto, LoginDto } from './dto/users.dto';
import * as bcrypt from 'bcrypt';
import { comparePassword, hashPassword } from '@/utils/password';
import { UserNotFoundException } from '@/common/exceptions/user.exception';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findByEmail(email: string) {
    const user = await this.userRepository.findOneBy({
      email,
    });
    return user;
  }

  async create(userData: CreateUserDto): Promise<any> {
    const { email, password } = userData;

    const user = new UserEntity();

    user.email = email;
    try {
      user.salt = await bcrypt.genSalt();
      user.password = await hashPassword(password, user.salt);
      await user.save();
      return user.id;
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string): Promise<Optional<UserEntity>> {
    const user = await this.userRepository.findOneBy({
      id,
    });
    if (!user) {
      //
    }
    return user;
  }

  async validateUserPassword(loginData: LoginDto): Promise<string | null> {
    const { email, password } = loginData;
    const user = await this.userRepository.findOneBy({ email });

    if (user && (await comparePassword(password, user.password))) {
      return user.id;
    }
    return null;
  }
}
