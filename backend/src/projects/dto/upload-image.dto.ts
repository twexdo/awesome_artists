// src/uploads/dto/upload-image.dto.ts
import { IsNotEmpty } from 'class-validator';

export class UploadImageDto {
  @IsNotEmpty()
  readonly file: any; // Adjust type as necessary (e.g., `Express.Multer.File`)
}