import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from 'src/dbEntities/Transaction';

@Injectable()
export class BalanceService {
  constructor(
    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>,
  ) {}

  convertTo10xFrom16x(number16x: string) {
    return parseInt(number16x, 16);
  }

  async getBalanceHandler() {
    const extract = await this.transactionsRepository.find({
      take: 100, // limit
      order: {
        // sort
        id: 'desc',
      },
    });

    const extractMapped = extract.map((item) => {
      return {
        address: item.from,
        value: this.convertTo10xFrom16x(item.value),
      };
    });

    extractMapped.sort((a, b) => b.value - a.value);

    return { address: extractMapped[0].address };
  }
}
