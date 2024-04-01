import {
  Injectable,
  Logger,
  NestMiddleware,
  RawBodyRequest,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger: Logger;
  constructor() {
    this.logger = new Logger('HTTP');
  }
  use(req: RawBodyRequest<Request>, res: Response, next: NextFunction) {
    const body = req.rawBody ? req.rawBody.toString() : '';
    this.logger.log(`Method: ${req.method} URL: ${req.url} Header: ${JSON.stringify(req.headers)} Body:${body} Status: ${res.statusCode}`);
    next();
  }
}
