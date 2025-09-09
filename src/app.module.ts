
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './students/students.module';
import { RaspberryModule } from './raspberry/raspberry.module';
import { CadastroModule } from './cadastro/cadastro.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nome-do-seu-banco'),
    StudentsModule,
    RaspberryModule,
    CadastroModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
