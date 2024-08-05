import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class Cryptography {
    constructor(private readonly configService: ConfigService) {}

    public genRandomString(length): string {
        return crypto
            .randomBytes(Math.ceil(+length / 2))
            .toString('hex')
            .slice(0, length);
    }

    public encodeBase64(str) {
        return Buffer.from(str, 'utf8').toString('base64');
    }

    public decodeBase64(buffer) {
        return Buffer.from(buffer, 'base64').toString('utf8');
    }

    private getStringValue(data) {
        if (typeof data === 'number' || data instanceof Number) {
            return data.toString();
        }

        if (!Buffer.isBuffer(data) && typeof data !== 'string') {
            throw new TypeError(
                'Data for password or salt must be a string or a buffer'
            );
        }

        return data;
    }

    public saltHashString(password) {
        const salt = this.genRandomString(32);
        return this.sha512(this.getStringValue(password), salt);
    }

    public desaltHashString(password, salt): string {
        const hash = crypto.createHmac(
            'sha512',
            this.getStringValue(this.decodeBase64(salt))
        );
        hash.update(this.getStringValue(password));
        return this.encodeBase64(hash.digest('hex'));
    }

    public sha512(str, _secretKey) {
        const hash = crypto.createHmac(
            'sha512',
            this.getStringValue(_secretKey)
        );
        hash.update(this.getStringValue(str));
        const hashedData = hash.digest('hex');

        return {
            secretKey: this.encodeBase64(_secretKey),
            hashedData: this.encodeBase64(hashedData),
        };
    }

    public isPublicKeyMatching(
        publicKey: string,
        configPrivateKey = 'MERCHANT_CLIENT_PRIVATE_KEY',
        configSecretKey = 'MERCHANT_CLIENT_SECRET_KEY'
    ): boolean {
        const privateKey = this.configService.get<string>(configPrivateKey);
        const secretKey = this.configService.get<string>(configSecretKey);
        const hashedPublicKey = this.desaltHashString(publicKey, privateKey);

        if (hashedPublicKey === secretKey) return true;
        return false;
    }
}
