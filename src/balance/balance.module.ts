import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from 'src/dbEntities/Transaction';
import { BalanceService } from './balance.service';
import { BalanceController } from './balance.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction])],
  providers: [BalanceService],
  controllers: [BalanceController],
})
export class BalanceModule {}
