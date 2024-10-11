export declare interface createBookInterface {
  name: string;
  author: string;
  count: number;
  cost: number;
  image?: Express.Multer.File;
}

export declare interface createBookInterfaceResponse {
  message: string;
  statusCode: number;
}
