import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { v4 as uuidv4 } from 'uuid';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectsService } from './projects.service';

@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  // Create a new project with file upload
  @Post('/create')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploaded', // Save files to the 'uploaded' folder
        filename: (req: any, file, callback) => {
          const projectId = uuidv4(); // Generate a temporary ID until the project is created
          const filename = `${projectId}${extname(file.originalname)}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async create(
    @Request() req,
    @UploadedFile() file: Express.Multer.File,
    @Body() createProjectDto: CreateProjectDto,
  ): Promise<any> {
    const imageUrl = `http://localhost:3001/projects/image?name=${file.filename}`; // Generate the image URL
    const project = await this.projectsService.create(
      req.user.userId,
      createProjectDto,
      file?.filename,
      imageUrl,
    );
    return project;
  }

  // Update a project by ID with optional new file
  @Post('/update/:id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploaded', // Save files to the 'uploaded' folder
        filename: (req: any, file, callback) => {
          const projectId = uuidv4(); // Generate a temporary ID until the project is created
          const filename = `${projectId}${extname(file.originalname)}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async update(
    @Request() req,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateProjectDto: UpdateProjectDto,
    @Param('id') id: number,
  ): Promise<CreateProjectDto> {
    const imageUrl = file
      ? `http://localhost:3001/projects/image?name=${file.filename}`
      : updateProjectDto.imageUrl; // Generate the new image URL
    return this.projectsService.update(
      req.user.userId,
      +id,
      updateProjectDto,
      file?.filename,
      imageUrl,
    );
  }

  @Get('/image')
  async getImage(@Res() res: Response, @Query('name') name: string) {
    console.log('Stef', name);
    res.sendFile(name, { root: './uploaded', });
  }

  // Get all projects for a user
  @Get()
  async findAll(@Request() req): Promise<CreateProjectDto[]> {
    return this.projectsService.findAll(req.user.userId);
  }

  // Get a single project by ID
  @Get('/get/:id')
  async findOne(
    @Request() req,
    @Param('id') id: number,
  ): Promise<CreateProjectDto> {
    return this.projectsService.findOne(req.user.userId, +id);
  }

  // Delete a project by ID
  @Delete('/delete/:id')
  async remove(@Request() req, @Param('id') id: number): Promise<void> {
    return this.projectsService.remove(req.user.userId, +id);
  }
}
