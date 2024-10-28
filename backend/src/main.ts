import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { Logger } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

dotenv.config({path:".env",debug:true}); 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  app.enableCors({
    origin: 'http://localhost:3000', // Your frontend URL
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  });
  const config = new DocumentBuilder()
    .setTitle('Portfolio API')
    .setDescription('API documentation for the portfolio management app')
    .setVersion('1.0')
    .addBearerAuth() 
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
  const serverAddress = app.getHttpServer().address();
  const ip = serverAddress.address === '::' ? 'localhost' : serverAddress.address; // Handle IPv6
  const portNumber = serverAddress.port;

  // Log the server information
  const logger = new Logger('Bootstrap');
  logger.log(`Server is running on: http://${ip}:${portNumber}`);
}
bootstrap();
