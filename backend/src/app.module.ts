import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { PrismaService } from './prisma.service';
import { ProjectsModule } from './projects/projects.module';
import { ProjectsController } from './projects/projects.controller';
import { PassportModule } from '@nestjs/passport';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    AuthModule, 
    ProjectsModule, 
    PassportModule.register({ defaultStrategy: 'jwt' }), 
    MulterModule.register({
      dest:"./uploaded"
    })
  ], // Ensure AuthModule is imported here
  controllers: [AppController],
  providers: [AppService, PrismaService], // Don't include strategies or guards here
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*'); // Log all routes
  }
}