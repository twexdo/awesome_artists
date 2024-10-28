import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ProjectsService {
    constructor(private prisma: PrismaService) {}

    // Get all projects for a user
    async findAll(userId: number): Promise<CreateProjectDto[]> {
        return this.prisma.project.findMany({
            where: {
                userId: userId
            },
            orderBy:{
                updatedAt:"desc"
            }
        });
    }

    // Create a new project with file handling
    async create(userId: number, createProjectDto: CreateProjectDto, filename: string, imageUrl: string): Promise<CreateProjectDto> {
        return this.prisma.project.create({
            data: {
                ...createProjectDto,
                userId: userId,
                imageUrl: imageUrl // Save the generated image URL in the project
            }
        });
    }

    // Get a single project by ID
    async findOne(userId: number, id: number): Promise<CreateProjectDto> {
        const project = await this.prisma.project.findFirst({
            where: { id: id, userId: userId }
        });
        if (!project) {
            throw new NotFoundException(`Project with ID ${id} not found for this user!`);
        }
        return project;
    }

    // Update a project by ID with file handling
    async update(userId: number, projectId: number, updateProjectDto: UpdateProjectDto, filename?: string, imageUrl?: string): Promise<CreateProjectDto> {
        const project = await this.findOne(userId, projectId);
        
        const updatedProject = await this.prisma.project.update({
            where: { id: projectId },
            data: {
                title:updateProjectDto.title,
                description:updateProjectDto.description,
                status:updateProjectDto.status,
                imageUrl: imageUrl || project.imageUrl // Replace the image URL only if a new file is provided
            }
        });

        // If a new file is provided, delete the old one
        if (filename && project.imageUrl !== imageUrl) {
            const oldFilePath = path.join(__dirname, '..', '..', 'uploaded', project.imageUrl.split('/').pop());
            if (fs.existsSync(oldFilePath)) {
                fs.unlinkSync(oldFilePath); // Delete the old file
            }
        }

        return updatedProject;
    }

    // Delete a project by ID with file deletion
    async remove(userId: number, id: number): Promise<void> {
        const project = await this.findOne(userId, id); // Reuse existing method

        // Delete the associated file
        const filePath = path.join(__dirname, '..', '..', 'uploaded', project.imageUrl.split('/').pop());
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath); // Delete the file
        }

        await this.prisma.project.delete({
            where: { id: id }
        });
    }
}
