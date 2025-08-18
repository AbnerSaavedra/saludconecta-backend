import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', // o especifica tu IP móvil si quieres restringir
  });

  const config = new DocumentBuilder()
    .setTitle('API Clínica SaludConecta')
    .setDescription('Documentación ética y simbólica de endpoints clínicos')
    .setVersion('1.0')
    .addTag('Pacientes')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
