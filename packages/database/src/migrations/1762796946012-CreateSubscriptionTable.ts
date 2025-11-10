import { type MigrationInterface, type QueryRunner, Table, TableIndex, TableForeignKey } from 'typeorm';

export class CreateSubscriptionTable implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'subscriptions',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'user_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'plan',
            type: 'enum',
            enum: ['free', 'basic', 'premium'],
            isNullable: false,
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['active', 'inactive', 'cancelled'],
            isNullable: false,
          },
          {
            name: 'start_date',
            type: 'timestamp with time zone',
            isNullable: false,
          },
          {
            name: 'end_date',
            type: 'timestamp with time zone',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'deleted_at',
            type: 'timestamp with time zone',
            isNullable: true,
          }
        ],
      }),
      true
    );


    await queryRunner.createForeignKey(
      'subscriptions',
      new TableForeignKey({
        name: 'fk_subscriptions_user_id',
        columnNames: ['user_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      })
    );

    await queryRunner.createIndex(
      'subscriptions',
      new TableIndex({
        name: 'idx_subscriptions_user_id',
        columnNames: ['user_id'],
      })
    );

    await queryRunner.createIndex(
      'subscriptions',
      new TableIndex({
        name: 'idx_subscriptions_user_id',
        columnNames: ['user_id'],
      })
    );

    await queryRunner.createIndex(
      'subscriptions',
      new TableIndex({
        name: 'idx_subscriptions_status',
        columnNames: ['status'],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('subscriptions', 'idx_subscriptions_user_id');
    await queryRunner.dropIndex('subscriptions', 'idx_subscriptions_status');
    await queryRunner.dropForeignKey('subscriptions', 'fk_subscriptions_user_id');
    await queryRunner.dropTable('subscriptions');
  }
}
