import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileService } from './file.service';
import * as fs from 'fs';
import * as M4BUtils from '../utils/M4BUtils';
import { FileInterceptor } from '@nestjs/platform-express';
const libre = require('libreoffice-convert');
libre.convertAsync = require('util').promisify(libre.convert);

@Controller('api/file')
export class FileController {
  constructor(private readonly fileService: FileService) {}
  @Post('/docxToPdf')
  @UseInterceptors(FileInterceptor('file'))
  async convertDocxToPdf(@UploadedFile() file: Express.Multer.File) {
    const result = await this.fileService.docxToPdf(file.buffer);
    return M4BUtils.createDefaulResponse(null, 201, {
      contentType: file.mimetype,
      contentTypeOutput: 'application/pdf',
      fileSize: file.size,
      base64String: result.toString('base64'),
    });
  }

  @Post('/htmlToPdf')
  @UseInterceptors(FileInterceptor('file'))
  async convertHtmlToImage(
    @UploadedFile() file: Express.Multer.File,
    @Body('width') width: number,
    @Body('height') height: number,
  ) {
    let fileString = file.buffer.toString('utf-8');
    fileString = fileString.replace('${width}', width.toString() + 'px');
    fileString = fileString.replace('${height}', height.toString() + 'px');
    const result = await this.fileService.htmlToImage(fileString);
    return M4BUtils.createDefaulResponse(null, 201, {
      contentType: file.mimetype,
      contentTypeOutput: 'image/png',
      fileSize: file.size,
      base64String: result.toString('base64'),
    });
  }
}
