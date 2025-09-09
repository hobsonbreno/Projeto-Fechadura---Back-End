import { Controller, Post, UploadedFiles, UseInterceptors, Body, Get, Param, Put, Delete, NotFoundException } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { CadastroService } from './cadastro.service';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('cadastro')
export class CadastroController {
  constructor(private readonly cadastroService: CadastroService) {}

  @Post()
  @UseInterceptors(AnyFilesInterceptor({
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, unique + extname(file.originalname));
      }
    })
  }))
  async cadastrarAluno(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: any
  ) {
    files = Array.isArray(files) ? files : [];
    // Retornar todos os dados recebidos para debug e integração
    if (!body || !body.name || !body.registration || !body.financialStatus) {
      return { error: 'Campos obrigatórios não enviados', body, files };
    }
    // Aqui você pode salvar no banco, processar arquivos, etc.
    return { message: 'Cadastro recebido', body, files };
  }

  @Get()
  async listarCadastros() {
    return this.cadastroService.listarCadastros();
  }

  @Get(':id')
  async buscarCadastro(@Param('id') id: string) {
    const cadastro = await this.cadastroService.buscarCadastro(id);
    if (!cadastro) throw new NotFoundException('Cadastro não encontrado');
    return cadastro;
  }

  @Put(':id')
  async atualizarCadastro(@Param('id') id: string, @Body() body: any) {
    const cadastro = await this.cadastroService.atualizarCadastro(id, body);
    if (!cadastro) throw new NotFoundException('Cadastro não encontrado');
    return cadastro;
  }

  @Delete(':id')
  async removerCadastro(@Param('id') id: string) {
    const cadastro = await this.cadastroService.removerCadastro(id);
    if (!cadastro) throw new NotFoundException('Cadastro não encontrado');
    return { message: 'Cadastro removido', cadastro };
  }
}
