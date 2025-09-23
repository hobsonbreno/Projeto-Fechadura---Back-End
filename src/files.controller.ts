import { Controller, Get, Res } from '@nestjs/common';
import type { Response } from 'express';
import * as path from 'path';

@Controller('files')
export class FilesController {
  @Get('encodings')
  getEncodings(@Res() res: Response) {
    const filePath = path.join(__dirname, '..', 'encodings.pickle'); // ajusta se necessário
    res.sendFile(filePath, (err) => {
      if (err) {
        res.status(404).send('Arquivo não encontrado');
      }
    });
  }
}
