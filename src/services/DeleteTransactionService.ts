import { getCustomRepository } from 'typeorm';
import TransactionsRepository from '../repositories/TransactionsRepository';
import AppError from '../errors/AppError';
import Transaction from '../models/Transaction';

class DeleteTransactionService {
  public async execute(id: string): Promise<Transaction> {
    const transactionRepo = getCustomRepository(TransactionsRepository);

    const findedId = await transactionRepo.findOne(id);

    if (findedId === undefined) {
      throw new AppError('transaction ID does not exists');
    }

    const deletedTransaction = await transactionRepo.remove(findedId);

    return deletedTransaction;
  }
}

export default DeleteTransactionService;
