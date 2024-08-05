import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Inject,
  Logger,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Response } from 'express';
import { AxiosError } from 'axios';
import { I18nService } from 'nestjs-i18n';
import { ClientProxy } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { QUEUES, SYNC_COMMAND } from '@app/shared';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('AllExceptionFilter');
  constructor(
    private i18n: I18nService,
    @Inject(QUEUES.TELEGRAM)
    private readonly telegramClient: ClientProxy,
    private jwtService: JwtService,
  ) {}

  async catch(exception: HttpException | Error | any, host: ArgumentsHost) {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response: Response = ctx.getResponse();
    exception.path = ctx.getRequest()?.url;
    const headers = ctx.getRequest()?.headers;
    // const request_id = headers?.request_id;
    let message = ctx.getResponse() as {
      key: string;
      args: Record<string, any>;
    };
    if (message.key) {
      message = await this.i18n.translate(message.key, {
        lang: ctx.getRequest().i18nLang,
        args: message.args,
      });
      const statusCode = exception.getStatus();
      response
        .status(statusCode)
        .json({ statusCode: statusCode, message: message });

      try {
        if (statusCode > 404) {
          const responseBodyTele = {
            path: ctx.getRequest()?.url,
            statusCode: statusCode,
            message: message,
            request_id: headers['request_id'],
            user_agent: headers['user-agent'],
            host: headers['host'],
            phone: this.getPhoneAuth(headers['authorization']),
          };
          this.telegramClient.emit(
            { cmd: SYNC_COMMAND.SEND_TELEGRAM_SYSTEM },
            {
              modelName: 'AllExceptionFilter',
              text: JSON.stringify(responseBodyTele),
            },
          );
        }
      } catch {}
    } else {
      this.handleResponse(response, exception, headers);
    }
  }

  private async handleResponse(
    response: Response,
    exception: HttpException | Error | any,
    headers: any,
  ) {
    let responseBody: any = { message: 'Internal server error' };
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Lỗi không xác định. Vui lòng liên hệ Quản trị hỗ trợ.';
    if (exception instanceof HttpException) {
      responseBody = exception.getResponse();
      statusCode = exception.getStatus();
      if (Array.isArray(responseBody) || typeof responseBody === 'string') {
        responseBody = {
          statusCode: statusCode,
          message: responseBody,
        };
      } else {
        if (statusCode == 403 && responseBody.message) {
          responseBody.message = await this.i18n.translate(
            'errors.STATUS_CODE.' + statusCode,
          );
        }
      }
    } else if (exception.isAxiosError) {
      const e: AxiosError = exception;
      statusCode = e.response?.status;
      message = await this.i18n.translate('errors.STATUS_CODE.' + statusCode);
      responseBody = {
        statusCode: e.response?.status,
        message: message,
      };
    } else if (exception instanceof Error) {
      responseBody = {
        statusCode: statusCode,
        // message: exception.stack,
        message: exception.message ? exception.message : exception.stack,
      };
    } else if (exception.error) {
      const error = exception.error;
      statusCode = error?.status ? error?.status : statusCode;
      responseBody = {
        statusCode,
        message: error.message ? error.message : exception.stack,
      };
    } else if (exception.message) {
      const error = exception.error;
      statusCode = error?.status ? error?.status : statusCode;
      responseBody = {
        status: exception.status,
        message: exception.message,
      };
    }
    responseBody.request_id = headers['request_id'];
    try {
      if (statusCode >= 400) {
        const responseBodyTele = {
          ...responseBody,
          path: exception.path,
          user_agent: headers['user-agent'],
          host: headers['host'],
          phone: this.getPhoneAuth(headers['authorization']),
        };
        this.telegramClient.emit(
          { cmd: SYNC_COMMAND.SEND_TELEGRAM_SYSTEM },
          {
            modelName: 'AllExceptionFilter',
            text: JSON.stringify(responseBodyTele),
          },
        );
      }
    } catch {}
    if (statusCode >= 500) {
      this.logger.error(responseBody);
    } else if (statusCode >= 400) {
      this.logger.warn(responseBody);
    } else {
      this.logger.log(responseBody);
    }
    if (!responseBody.message) {
      statusCode = HttpStatus.BAD_REQUEST;
      responseBody = {
        statusCode,
        message: 'Lỗi không xác định. Vui lòng liên hệ Quản trị hỗ trợ.',
      };
    }
    response.status(statusCode).json(responseBody);
  }

  getPhoneAuth(authorization) {
    try {
      if (!authorization) return '';
      const payload: any = this.jwtService.decode(
        authorization.replace('Bearer ', ''),
      );
      return payload?.preferred_username;
    } catch (error) {
      this.logger.error(error);
    }
  }
}
