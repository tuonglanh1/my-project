import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as chalk from 'chalk';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: Request, res: Response, next: () => void): any {
    try {
      const { method, originalUrl, httpVersion, ip, body, params, query } = req;
      const { statusCode, statusMessage } = res;
      req.headers.date = Date.now().toString();
      if (!req.headers.request_id) {
        req.headers.request_id = Math.floor(
          1000000 + Math.random() * 9000000,
        ).toString();
      }
      this.logger.log(
        `Request->Before... 0ms (request_id:${req.headers.request_id} | ${
          method + ':' + originalUrl
        }) `,
      );
      const message =
        `${chalk.white('|')} ${chalk.cyan(httpVersion)} ${chalk.white(
          '|',
        )} ${chalk.cyan(ip)} ` +
        `${method} ${originalUrl} ${statusCode} ${statusMessage ?? ''}` +
        // `[${chalk.white('route:', req.originalUrl)}]` +
        `[${chalk.white('body:', JSON.stringify(body))}]` +
        `[${chalk.white('params:', JSON.stringify(params))}]` +
        `[${chalk.white('query:', JSON.stringify(query))}]`;

      if (statusCode >= 500) {
        this.logger.error(message);
      } else if (statusCode >= 400) {
        this.logger.warn(message);
      } else {
        this.logger.log(message);
      }
    } catch (ex) {
      this.logger.error(ex);
    }
    next();
  }
}
