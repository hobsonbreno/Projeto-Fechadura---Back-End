

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('certs/192.168.1.71-key.pem'),
    cert: fs.readFileSync('certs/192.168.1.71.pem'),
  };

  const app = await NestFactory.create<NestExpressApplication>(AppModule, { httpsOptions });

  app.enableCors();

  // Expor a pasta uploads como estática
  app.useStaticAssets(join(__dirname, '..', 'uploads'), { prefix: '/uploads/' });

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
  console.log('🖼️  Imagens disponíveis em https://192.168.1.71:3001/uploads/NOME_DO_ALUNO/NOME_DA_IMAGEM');
}
bootstrap();

