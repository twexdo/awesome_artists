import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findOne(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user; // Return the full user object
    }
    return null;
  }

  async login(user: User) {
    const { password, ...result } = user; // Exclude the password
    const payload = { email: result.email, sub: result.id };
    return {
      access_token: this.jwtService.sign(payload),
      user: result, // Optionally include the user data without password
    };
  }
}
