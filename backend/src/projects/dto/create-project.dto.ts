import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
    @IsOptional()
    @IsNumber()
    id: number;


    @ApiProperty({ 
        description: 'The title of the project', 
        default: 'New Project' // Default title in Swagger
    })
    @IsNotEmpty()
    @IsString()
    title: string = 'New Project';

    @ApiProperty({ 
        description: 'A brief description of the project', 
        default: 'Description of the new project' // Default description in Swagger
    })
    @IsOptional()
    @IsString()
    description?: string = 'Description of the new project';

    @ApiProperty({ 
        description: 'A link to the client', 
        default: 'http://example.com' // Default client link in Swagger
    })
    @IsOptional()
    @IsString()
    clientLink?: string = 'http://example.com';

    @ApiProperty({ 
        description: 'The status of the project', 
        default: 'visible' // Default status in Swagger
    })
    @IsOptional()
    @IsString()
    status?: string = 'visible';

    @ApiProperty({ 
        description: 'URL for the project image', 
        default: 'http://example.com/default-image.png' // Default image URL in Swagger
    })
    @IsOptional()
    @IsString()
    imageUrl?: string = 'http://example.com/default-image.png';
    
}
