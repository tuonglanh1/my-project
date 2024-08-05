import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
    UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { Cryptography } from '../utils';
@Injectable()
export class APIExternalInterceptor implements NestInterceptor {
    constructor(private readonly cryptography: Cryptography) {}
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        this.validateClientKey(request);
        return next.handle().pipe((data) => data);
    }

    validateClientKey(request: Request) {
        const clientPublicKey = request.headers?.['x-client-key'] as string;

        if (
            !clientPublicKey ||
            !this.cryptography.isPublicKeyMatching(clientPublicKey)
        ) {
            throw new UnauthorizedException();
        }
    }
}
