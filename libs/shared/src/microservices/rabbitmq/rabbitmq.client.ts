import { stringify } from '@app/shared/utils';
import { Logger } from '@nestjs/common';
import {
    ClientProxy,
    ClientProxyFactory,
    RmqOptions,
} from '@nestjs/microservices';

export class RmqClientProxy {
    private readonly logger = new Logger(RmqClientProxy.name);
    private client: ClientProxy;
    constructor(options: RmqOptions) {
        this.client = ClientProxyFactory.create(options);
    }

    async sendData<T = any, K = any>(
        pattern: { cmd: string },
        payload: T
    ): Promise<K> {
        this.logger.log('*********** sendData ***********');
        this.logger.log('PATTERN::', stringify(pattern));
        this.logger.debug('PAYLOAD::', stringify(payload));
        return new Promise((resolve, reject) => {
            let result;
            this.client.send(pattern, payload).subscribe({
                next: (value) => {
                    result = value;
                },
                error: (error) => reject(error),
                complete: () => {
                    return resolve(result);
                },
            });
        });
    }

    publishData<T = any>(pattern: string, payload?: T): void {
        this.logger.log('*********** publishDataToQueue ***********');
        this.logger.log('PATTERN::', stringify(pattern));
        this.logger.debug('PAYLOAD::', stringify(payload));
        this.client.emit<void, T>(pattern, payload);
    }
}
