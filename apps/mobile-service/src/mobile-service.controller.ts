import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { MobileServiceService } from './mobile-service.service';

@Controller('orders')
export class MobileServiceController {
  constructor(private readonly mobileServiceService: MobileServiceService) {}

  @Get()
  getHello(): string {
    return this.mobileServiceService.getHello();
  }

  @Post()
  async createOrder(@Body() request: any, @Req() req: any) {
    console.log('request:::', request);
    return this.mobileServiceService.createOrder(
      request,
      req.cookies?.Authentication,
    );
  }
}
