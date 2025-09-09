import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Cadastro, CadastroSchema } from './cadastro.schema';
import { CadastroService } from './cadastro.service';
import { CadastroController } from './cadastro.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cadastro.name, schema: CadastroSchema }])
  ],
  controllers: [CadastroController],
  providers: [CadastroService],
})
export class CadastroModule {}
