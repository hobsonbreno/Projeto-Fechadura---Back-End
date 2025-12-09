import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './students/students.module';
import { RaspberryModule } from './raspberry/raspberry.module';
import { CadastroModule } from './cadastro/cadastro.module';
import { MongooseModule } from '@nestjs/mongoose';
import { FilesController } from './files.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://admin:senha123@mongo:27017/meubanco?authSource=admin'),
    StudentsModule,
    RaspberryModule,
    CadastroModule
  ],
  controllers: [AppController, FilesController],
  providers: [AppService],
})
export class AppModule {}
