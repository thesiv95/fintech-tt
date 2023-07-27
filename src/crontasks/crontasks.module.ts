import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrontasksService } from './crontasks.service';
import { Transaction } from 'src/dbEntities/Transaction';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction])],
  providers: [CrontasksService],
})
export class CrontasksModule {}
