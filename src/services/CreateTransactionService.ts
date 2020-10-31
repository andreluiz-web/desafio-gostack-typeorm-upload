import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Transaction from '../models/Transaction';
import TransactionRepository from '../repositories/TransactionsRepository';

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: RequestDTO): Promise<Transaction> {
    const transactionRepo = getCustomRepository(TransactionRepository);

    const { total } = await transactionRepo.getBalance();

    if (type === 'outcome' && total < value) {
      throw new AppError('You do not enought value in your balance');
    }

    const transaction = transactionRepo.create({
      title,
      value,
      type,
      category,
    });

    await transactionRepo.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
