import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: 'User email address', default: "testuser@example.com" })
  email: string;

  @ApiProperty({ description: 'User password', default: "testpassword"})
  password: string;
}
