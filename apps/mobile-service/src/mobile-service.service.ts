import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class MobileServiceService {
  constructor(
    // private readonly ordersRepository: OrdersRepository,
    @Inject('BILLING') private billingClient: ClientProxy,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async createOrder(request: any, authentication: string) {
    // const session = await this.ordersRepository.startTransaction();
    try {
      // const order = await this.ordersRepository.create(request, { session });
      await lastValueFrom(
        this.billingClient.emit('order_created', {
          request,
          Authentication: authentication,
        }),
      );
      // await session.commitTransaction();
      // return order;
    } catch (err) {
      // await session.abortTransaction();
      throw err;
    }
  }
}
