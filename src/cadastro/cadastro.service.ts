import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cadastro } from './cadastro.schema';
@Injectable()
export class CadastroService {
  constructor(@InjectModel(Cadastro.name) private cadastroModel: Model<Cadastro>) {}

  async criarCadastro(data: Partial<Cadastro>) {
    const cadastro = new this.cadastroModel(data);
    return cadastro.save();
  }

  async listarCadastros() {
    return this.cadastroModel.find().exec();
  }

  async buscarCadastro(id: string) {
    return this.cadastroModel.findById(id).exec();
  }

  async atualizarCadastro(id: string, data: Partial<Cadastro>) {
    return this.cadastroModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async removerCadastro(id: string) {
    return this.cadastroModel.findByIdAndDelete(id).exec();
  }
}
