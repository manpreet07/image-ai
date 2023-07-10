import { Get, Injectable, Post } from '@nestjs/common';
import vision, { ImageAnnotatorClient } from '@google-cloud/vision';
import { Storage } from '@google-cloud/storage';
import { v4 as uuidV4 } from 'uuid';

const keyFilename = process.env.GOOGLE_APPLICATION_CREDENTIALS;

@Injectable()
export class ImageService {
  async uploadImage(file: Express.Multer.File) {
    return await this.detectTextFromImage(file);
  }
  async detectTextFromImage(file: Express.Multer.File) {
    const client = new ImageAnnotatorClient();
    const [result] = await client.documentTextDetection(file.buffer);

    const extractedData = {
      image: {
        filename: file.originalname,
        width: result.fullTextAnnotation?.pages[0].width,
        height: result.fullTextAnnotation?.pages[0].height,
      },
      text: result.textAnnotations.map((annotation) => ({
        description: annotation.description,
        boundingBox: annotation.boundingPoly?.vertices,
      })),
    };

    return { data: extractedData };
  }

  async uploadFileToBucket() {}
}
