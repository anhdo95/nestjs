import { Catch, HttpException, ExceptionFilter, ArgumentsHost, HttpStatus } from "@nestjs/common";
import { Response, Request } from "express";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const req = ctx.getRequest<Request>()
    const res = ctx.getResponse<Response>()

    const status = exception instanceof HttpException 
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR

    const exceptionRes = exception.getResponse && exception.getResponse()

    res
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: req.url,
        message: exception.message,
        errors: exceptionRes && (exceptionRes as any).message
      })
  }
}