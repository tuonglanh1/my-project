import { Controller, Get } from '@nestjs/common';
import { ReportServiceService } from './report-service.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { RmqService } from '@app/common/rabbit/rabbit.service';

@Controller()
export class ReportServiceController {
  constructor(
    private readonly reportServiceService: ReportServiceService,
    private readonly rmqService: RmqService,
  ) {}

  @Get()
  getHello(): string {
    return this.reportServiceService.getHello();
  }

  @EventPattern('order_created')
  // @UseGuards(JwtAuthGuard)
  async handleOrderCreated(@Payload() data: any, @Ctx() context: RmqContext) {
    console.log('data:::', data);
    // console.log('context:::', context);
    // this.billingService.bill(data);
    this.rmqService.ack(context);
  }
}
