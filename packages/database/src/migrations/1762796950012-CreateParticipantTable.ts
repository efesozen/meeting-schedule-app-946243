import { type MigrationInterface, type QueryRunner, Table, TableIndex, TableForeignKey } from 'typeorm';

export class CreateParticipantTable implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'participants',
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
            name: 'meeting_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['invited', 'accepted', 'declined'],
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
      'participants',
      new TableForeignKey({
        name: 'fk_participants_user_id',
        columnNames: ['user_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      })
    );

    await queryRunner.createForeignKey(
      'participants',
      new TableForeignKey({
        name: 'fk_participants_meeting_id',
        columnNames: ['meeting_id'],
        referencedTableName: 'meetings',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      })
    );

    await queryRunner.createIndex(
      'participants',
      new TableIndex({
        name: 'idx_participants_user_id',
        columnNames: ['user_id'],
      })
    );

    await queryRunner.createIndex(
      'participants',
      new TableIndex({
        name: 'idx_participants_user_id',
        columnNames: ['user_id'],
      })
    );

    await queryRunner.createIndex(
      'participants',
      new TableIndex({
        name: 'idx_participants_meeting_id',
        columnNames: ['meeting_id'],
      })
    );

    await queryRunner.createIndex(
      'participants',
      new TableIndex({
        name: 'idx_participants_meeting_id',
        columnNames: ['meeting_id'],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('participants', 'idx_participants_user_id');
    await queryRunner.dropIndex('participants', 'idx_participants_meeting_id');
    await queryRunner.dropForeignKey('participants', 'fk_participants_user_id');
    await queryRunner.dropForeignKey('participants', 'fk_participants_meeting_id');
    await queryRunner.dropTable('participants');
  }
}
