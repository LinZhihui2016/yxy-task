import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './interceptor/responseInterceptor';
import { ResExceptionFilter } from './filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swaggerOptions = new DocumentBuilder()
    .setTitle('nest-starter api document')
    .setDescription('nest starter project api document')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('api2/doc', app, document);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new ResExceptionFilter());
  await app.listen(3000);
}

bootstrap();
