import { getCustomRepository, getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Category from '../models/Category';
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
    const categoryRepo = getRepository(Category);

    // verifica se a categoria ja existe
    let findedCategory = await categoryRepo.findOne({
      where: {
        title: category,
      },
    });

    if (!findedCategory) {
      findedCategory = categoryRepo.create({
        title: category,
      });

      await categoryRepo.save(findedCategory);
    }

    const { total } = await transactionRepo.getBalance();

    if (type === 'outcome' && total < value) {
      throw new AppError('You do not enought value in your balance');
    }

    const transaction = transactionRepo.create({
      title,
      value,
      type,
      category: findedCategory,
    });

    await transactionRepo.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
