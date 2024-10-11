export declare interface UploadFileInterfaceRequest {
  file: Express.Multer.File;
  destination: string;
}

export declare interface UploadFileInterfaceResponse {
  message: string;
  imageUrl: string;
}
