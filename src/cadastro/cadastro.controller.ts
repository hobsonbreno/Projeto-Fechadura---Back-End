import { Controller, Post, UploadedFiles, UseInterceptors, Body, Get, Param, Put, Delete, NotFoundException, Query } from '@nestjs/common';
import { ApiTags, ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { CadastroService } from './cadastro.service';
import { diskStorage } from 'multer';
import { extname } from 'path';

@ApiTags('Cadastro')
@Controller('cadastro')
export class CadastroController {
  constructor(private readonly cadastroService: CadastroService) {}

  @Post()
  @ApiOperation({ summary: 'Cadastrar novo aluno com documento e fotos' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'João da Silva' },
        registration: { type: 'string', example: '20231234' },
        financialStatus: { type: 'string', example: 'Em dia' },
        file: { type: 'string', format: 'binary', description: 'Documento do aluno' },
        photo1: { type: 'string', format: 'binary', description: 'Foto 1' },
        photo2: { type: 'string', format: 'binary', description: 'Foto 2' },
        photo3: { type: 'string', format: 'binary', description: 'Foto 3' },
        photo4: { type: 'string', format: 'binary', description: 'Foto 4' },
        photo5: { type: 'string', format: 'binary', description: 'Foto 5' },
        photo6: { type: 'string', format: 'binary', description: 'Foto 6' },
        photo7: { type: 'string', format: 'binary', description: 'Foto 7' },
        photo8: { type: 'string', format: 'binary', description: 'Foto 8' },
        photo9: { type: 'string', format: 'binary', description: 'Foto 9' },
        photo10: { type: 'string', format: 'binary', description: 'Foto 10' },
      },
      required: ['name', 'registration', 'financialStatus']
    }
  })
  @UseInterceptors(AnyFilesInterceptor({
    storage: diskStorage({
      destination: (req, file, cb) => {
        let nome = 'aluno';
        try {
          if (req.body && req.body.name) {
            nome = req.body.name
              .normalize('NFD').replace(/[^\w\s-]/g, '')
              .replace(/\s+/g, '_');
          }
        } catch {}
        const dir = `./uploads/${nome}`;
        const fs = require('fs');
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
      },
      filename: (req, file, cb) => {
        let nome = 'aluno';
        try {
          if (req.body && req.body.name) {
            nome = req.body.name
              .normalize('NFD').replace(/[^\w\s-]/g, '')
              .replace(/\s+/g, '_');
          }
        } catch {}
        const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `${nome}_${unique}${extname(file.originalname)}`);
      }
    })
  }))
  async cadastrarAluno(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: any
  ) {
    files = Array.isArray(files) ? files : [];
    if (!body || !body.name || !body.registration || !body.financialStatus) {
      return { error: 'Campos obrigatórios não enviados', body, files };
    }
    // Aqui você pode salvar no banco, processar arquivos, etc.
    return { message: 'Cadastro recebido', body, files };
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os cadastros' })
  async listarCadastros() {
    return this.cadastroService.listarCadastros();
  }

  @Get('matricula/:registration')
  @ApiOperation({ summary: 'Buscar cadastro pela matrícula' })
  @ApiParam({ name: 'registration', type: 'string', example: '20231234' })
  async buscarPorMatricula(@Param('registration') registration: string) {
    return this.cadastroService.buscarPorMatricula(registration);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar cadastro pelo ID' })
  @ApiParam({ name: 'id', type: 'string' })
  async buscarCadastro(@Param('id') id: string) {
    const cadastro = await this.cadastroService.buscarCadastro(id);
    if (!cadastro) throw new NotFoundException('Cadastro não encontrado');
    return cadastro;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar cadastro pelo ID' })
  @ApiParam({ name: 'id', type: 'string' })
  async atualizarCadastro(@Param('id') id: string, @Body() body: any) {
    const cadastro = await this.cadastroService.atualizarCadastro(id, body);
    if (!cadastro) throw new NotFoundException('Cadastro não encontrado');
    return cadastro;
  }

  @Put('matricula/:registration')
  @ApiOperation({ summary: 'Atualizar cadastro pela matrícula' })
  @ApiParam({ name: 'registration', type: 'string', example: '20231234' })
  async atualizarPorMatricula(@Param('registration') registration: string, @Body() body: any) {
    const cadastro = await this.cadastroService.atualizarPorMatricula(registration, body);
    if (!cadastro) throw new NotFoundException('Cadastro não encontrado');
    return cadastro;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover cadastro pelo ID' })
  @ApiParam({ name: 'id', type: 'string' })
  async removerCadastro(@Param('id') id: string) {
    const cadastro = await this.cadastroService.removerCadastro(id);
    if (!cadastro) throw new NotFoundException('Cadastro não encontrado');
    return { message: 'Cadastro removido', cadastro };
  }

  @Delete('matricula/:registration')
  @ApiOperation({ summary: 'Remover cadastro pela matrícula' })
  @ApiParam({ name: 'registration', type: 'string', example: '20231234' })
  async removerPorMatricula(@Param('registration') registration: string) {
    const cadastro = await this.cadastroService.removerPorMatricula(registration);
    if (!cadastro) throw new NotFoundException('Cadastro não encontrado');
    return { message: 'Cadastro removido', cadastro };
  }
}
