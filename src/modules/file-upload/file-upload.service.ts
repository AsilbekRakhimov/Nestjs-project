import path from 'path';
import * as fs from 'fs/promises';
import {
    RemoveFileRequest,
  RemoveFileResponse,
  UploadFileInterfaceRequest,
  UploadFileInterfaceResponse,
} from './interfaces';
import { existsSync } from 'fs';

export class FileUploadService {
  constructor() {}

  async uploadFile(
    payload: UploadFileInterfaceRequest,
  ): Promise<UploadFileInterfaceResponse> {
    const extname = path.extname(payload.file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileName = payload.file.fieldname + '-' + uniqueSuffix + extname;

    const fullFilePath = path.join(
      __dirname,
      '../../../',
      payload.destination,
      fileName,
    );

    const isFileExists = existsSync(
      path.join(__dirname, '../../../', payload.destination),
    );

    if (!isFileExists) {
      fs.mkdir(path.join(__dirname, '../../../', payload.destination));
    }

    await fs.writeFile(fullFilePath, payload.file.buffer);

    const imageUrl = `${payload.destination}/${fileName}`;

    return {
      imageUrl,
      message: 'Succesfully created',
    };
  }

  async removeFile(payload: RemoveFileRequest) : Promise<RemoveFileResponse> {
    const filePath = path.join(__dirname, "../../../", payload.fileName)

    const isFileExists = existsSync(filePath) 

    if (isFileExists) {
        await fs.unlink(filePath)
    }

    return {
        message:"File is removed"
    }
  }
}
