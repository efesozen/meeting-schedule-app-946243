import { type MigrationInterface, type QueryRunner, Table, TableIndex, TableForeignKey } from 'typeorm';

export class CreateMeetingTable implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'meetings',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'title',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'start_time',
            type: 'timestamp with time zone',
            isNullable: false,
          },
          {
            name: 'end_time',
            type: 'timestamp with time zone',
            isNullable: false,
          },
          {
            name: 'creator_id',
            type: 'uuid',
            isNullable: false,
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
      'meetings',
      new TableForeignKey({
        name: 'fk_meetings_creator_id',
        columnNames: ['creator_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      })
    );

    await queryRunner.createIndex(
      'meetings',
      new TableIndex({
        name: 'idx_meetings_start_time',
        columnNames: ['start_time'],
      })
    );

    await queryRunner.createIndex(
      'meetings',
      new TableIndex({
        name: 'idx_meetings_end_time',
        columnNames: ['end_time'],
      })
    );

    await queryRunner.createIndex(
      'meetings',
      new TableIndex({
        name: 'idx_meetings_creator_id',
        columnNames: ['creator_id'],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('meetings', 'idx_meetings_start_time');
    await queryRunner.dropIndex('meetings', 'idx_meetings_end_time');
    await queryRunner.dropIndex('meetings', 'idx_meetings_creator_id');
    await queryRunner.dropForeignKey('meetings', 'fk_meetings_creator_id');
    await queryRunner.dropTable('meetings');
  }
}
