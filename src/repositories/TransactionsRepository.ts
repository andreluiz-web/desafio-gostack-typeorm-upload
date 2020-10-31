import { EntityRepository, Repository } from 'typeorm';
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactionRepo = await this.find();

    const { income, outcome } = transactionRepo.reduce(
      (acc: Balance, transactions: Transaction) => {
        if (transactions.type === 'income') {
          acc.income += transactions.value;
        }
        if (transactions.type === 'outcome') {
          acc.outcome += transactions.value;
        }

        return acc;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    const total = income - outcome;

    return {
      income,
      outcome,
      total,
    };
  }
}

export default TransactionsRepository;
