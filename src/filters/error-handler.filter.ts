import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class ExceptionHandlerFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const requestTime = new Date().toISOString();

    if (exception instanceof HttpException) {
      return response.status(exception.getStatus()).send({
        requestTime,
        name: exception.name,
        message: exception.message,
        url: request.url,
        statusCode: exception.getStatus(),
      });
    }

    return response.status(500).send({
      requestTime,
      name: exception?.name,
      message: exception.message || 'Interval error',
      url: request.url,
      statusCode: 500,
    });
  }
}
