import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { cors } from 'cors';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('v1/api', { exclude: ['/'] });
  app.enableCors()

  const port = process.env.PORT || 4000;

  const config = new DocumentBuilder()
    .setTitle('TuDestino authentication - v1')
    .setDescription(
      'Implementation of authentication and authorization.',
    )
    .setVersion('1.0')
    .addTag('Swagger')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);



  await app.listen(port);
  console.log(` Application is running on: http: //localhost:${port}/v1/api`);
}
bootstrap();