import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/database/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user-dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  findAll() {
    return this.userRepository.find();
  }

  findActiveUsers() {
    return this.userRepository.find({ active: true });
  }

  async findById(id: number | string) {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new NotFoundException('The requested user is not found');
    }

    return user;
  }

  async findByUsername(username: string) {
    const user = await this.userRepository.findOne({ username });

    if (!user) {
      throw new NotFoundException('The requested user is not found');
    }

    return user;
  }

  /**
   * Generate users
   * for ((i = 0; i < 10; i++)); do \ 
   * curl -X POST localhost:8081/users \
   *  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJpY2hhcmRkbyIsImlhdCI6MTU4ODE3ODIxNCwiZXhwIjoxNTg4MjY0NjE0fQ.YStXH2e01gVRp75S-eEE-aTF297-pgiCvBmi2zUI2wA" \
   *  -H "Content-Type: application/json" \
   *  -d '{ "username": "RichardDo'"$i"'", "password": "123456", "age": 20, "name": "Richard Do '"$i"'" }'; \
   * done
   * @param createUserDto 
   */  
  create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);

    return this.userRepository.save(user);
  }

  update(id: number | string, updateUserDto: CreateUserDto) {
    this.userRepository.update(id, updateUserDto);

    return this.findById(id);
  }

  async delete(id: number | string) {
    const user = await this.findById(id);

    this.userRepository.delete(id);

    return user;
  }
}
