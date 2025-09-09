
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('certs/192.168.1.71-key.pem'),
    cert: fs.readFileSync('certs/192.168.1.71.pem'),
  };

  const app = await NestFactory.create(AppModule, { httpsOptions });

  app.enableCors();

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('API Students')
    .setDescription('Documentação da API de Students')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
  console.log('✅ HTTPS ativo em https://192.168.1.71:3001');
  console.log('📚 Swagger disponível em https://192.168.1.71:3001/api');
}
bootstrap();

