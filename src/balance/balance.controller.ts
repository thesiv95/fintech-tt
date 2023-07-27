import { Controller, Get } from '@nestjs/common';
import { BalanceService } from './balance.service';

@Controller('balance')
export class BalanceController {
  constructor(private balanceService: BalanceService) {}

  @Get()
  async getBalanceHandler() {
    return this.balanceService.getBalanceHandler();
  }
}
