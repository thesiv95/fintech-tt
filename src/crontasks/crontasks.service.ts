import axios from 'axios';
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import TransactionType from 'src/types/Transaction.type';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from 'src/dbEntities/Transaction';

@Injectable()
export class CrontasksService {
  constructor(
    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>,
  ) {}

  private readonly logger = new Logger(CrontasksService.name);

  currentBlock = 17582999;

  convertTo16xFrom10x(number10x: number) {
    return number10x.toString(16);
  }

  convertTo10xFrom16x(number16x: string) {
    return parseInt(number16x, 16);
  }

  async doAPIRequest(blockNumber: number): Promise<TransactionType[]> {
    const block16x = this.convertTo16xFrom10x(blockNumber);
    const baseURL = `https://api.etherscan.io/api?module=proxy&action=eth_getBlockByNumber&tag=0x${block16x}&boolean=true`;
    const response = await axios.get(baseURL);
    const transactions: TransactionType[] = response.data.result.transactions;
    return transactions;
  }

  @Cron('*/1 * * * *')
  async handleCron() {
    this.currentBlock += 1;
    this.logger.debug(`current block: ${this.currentBlock}`);
    const transactionsList = await this.doAPIRequest(this.currentBlock);
    await this.transactionsRepository.insert(transactionsList);
    this.logger.debug('DB insert ok');
  }
}
