import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*', // Puedes restringir a tu IP móvil si lo deseas
  });

  const config = new DocumentBuilder()
    .setTitle('API Clínica SaludConecta')
    .setDescription('Documentación ética y simbólica de endpoints clínicos')
    .setVersion('1.0')
    .addTag('Pacientes')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Introduce tu token clínico para acceder a endpoints protegidos',
      },
      'access-token', // Este nombre se usará en los controladores
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
