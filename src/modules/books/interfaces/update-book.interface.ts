export declare interface updateBookInterface {
  name?: string;
  author?: string;
  count?: number;
  cost?: number;
  image?: Express.Multer.File;
}

export declare interface updateBookInterfaceResponse {
  message: string;
  statusCode: number;
}
