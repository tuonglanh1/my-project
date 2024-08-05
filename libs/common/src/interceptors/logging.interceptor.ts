import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ClientProxy } from '@nestjs/microservices';
import { QUEUES, SYNC_COMMAND } from '@app/shared';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    @Inject(QUEUES.TELEGRAM)
    private readonly telegramClient: ClientProxy,
  ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { statusCode } = context.switchToHttp().getResponse();
    const logger = new Logger('HTTP');
    const req = context.switchToHttp().getRequest();
    return next.handle().pipe(
      tap((data) => {
        if (statusCode == HttpStatus.OK || statusCode == HttpStatus.CREATED) {
        } else {
          logger.error({
            data,
          });
        }

        try {
          if (req.headers.date) {
            const interval = Date.now() - Number(req.headers.date);
            logger.log(
              `Response->After... ${interval}ms (request_id:${
                req.headers.request_id
              } | ${req.method + ':' + req.originalUrl}) `,
            );
            if (interval >= 30000) {
              this.telegramClient.emit(
                { cmd: SYNC_COMMAND.SEND_TELEGRAM_SYSTEM },
                {
                  modelName: 'HTTP',
                  text: `Response->Slow->${interval}ms-> ${JSON.stringify({
                    route: req.originalUrl,
                    // body: req.body,
                    params: req.params,
                    query: req.query,
                  })}`,
                },
              );
            }
          }
        } catch (ex) {
          logger.error(ex);
        }
      }),
    );
  }
}
