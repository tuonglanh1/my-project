import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Cryptography } from '../utils';

@Injectable()
export class PgmsInterceptor implements NestInterceptor {
    constructor(private readonly cryptography: Cryptography) {}
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();

        this.validateClientKey(request);
        const now = Date.now();
        return next
            .handle()
            .pipe(tap(() => console.log(`After... ${Date.now() - now}ms`)));
    }

    validateClientKey(request: Request) {
        const clientPublicKey = request.headers?.['x-client-key'] as string;

        if (
            !clientPublicKey ||
            !this.cryptography.isPublicKeyMatching(
                clientPublicKey,
                'PGMS_CLIENT_PRIVATE_KEY',
                'PGMS_CLIENT_SECRET_KEY'
            )
        ) {
            throw new UnauthorizedException();
        }
    }
}
