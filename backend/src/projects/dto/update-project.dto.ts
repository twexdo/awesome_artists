import { IsInt, IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateProjectDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsUrl()
  clientLink?: string; // URL validation handled here

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsInt()
  userId?: number; // Optional for updates
}