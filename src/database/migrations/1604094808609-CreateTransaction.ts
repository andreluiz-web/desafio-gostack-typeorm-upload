import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateTransaction1604094808609
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'transactions',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            generationStrategy: 'uuid',
            default: 'generate_uuid_v4()',
          },
          {
            name: 'title',
            type: 'string',
          },
          {
            name: 'type',
            type: 'string',
          },
          {
            name: 'value',
            type: 'number',
          },
          {
            name: 'category_id',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('transactions');
  }
}
