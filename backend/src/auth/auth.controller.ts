import { Controller, Post, Body, UnauthorizedException, Get, UseGuards,Request  } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService,private usersService: UsersService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login a user' })
  @ApiResponse({ status: 200, description: 'User logged in successfully.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.authService.login(user);
  }

  @Post('logout')
  @ApiOperation({ summary: 'Logout a user' })
  @ApiResponse({ status: 200, description: 'User logged out successfully.' })
  async logout() {
    // Invalidate token or perform necessary cleanup if required
    return { message: 'User logged out successfully.' };
  }


  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User registered successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request - Invalid data.' })
  async register(@Body() registerDto: RegisterDto) {
    const newUser = await this.usersService.create(registerDto); // Assuming create method in UsersService handles user creation
    return (await this.authService.login(newUser)); // You might want to return the created user or a success message
  }
  
  @Get('profile')
  @UseGuards(JwtAuthGuard) // Protect the route with the JWT Auth Guard
  async getProfile(@Request() req) {
    const user = await this.usersService.findOneById(req.user.userId)
    if (!user) {
      throw new UnauthorizedException();
    }
    return (await this.authService.login(user)).user
  }

}


