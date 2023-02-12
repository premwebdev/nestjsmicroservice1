import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@app/common';
import { OrdersService } from './orders.service';
import { CreateOrderRequest } from './dto/create-order-request';
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createOrder(@Body() request: CreateOrderRequest, @Req() req: any) {
    return this.ordersService.createOrder(request, req.cookies?.Authentication);
  }

  @Get()
  async getOrder() {
    return this.ordersService.getOrder();
  }
}
