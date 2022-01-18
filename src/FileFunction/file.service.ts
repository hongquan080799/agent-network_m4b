import { Injectable } from '@nestjs/common';
const libre = require('libreoffice-convert');
const nodeHtmlToImage = require('node-html-to-image');
libre.convertAsync = require('util').promisify(libre.convert);

@Injectable()
export class FileService {
  async docxToPdf(file: any): Promise<any> {
    const pdfBuf = await libre.convertAsync(file, 'pdf', undefined);
    return pdfBuf;
  }
  async htmlToImage(file: any): Promise<any> {
    const images = await nodeHtmlToImage({
      html: file,
    });
    return images;
  }
}
