import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class Project1625694122883 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    await queryRunner.createTable(
      new Table({
        name: 'projects',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'name',
            type: 'varchar'
          },
          {
            name: 'client_id',
            type: 'uuid'
          },
          {
            name: 'status',
            type: 'varchar'
          },
          {
            name: 'logo',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'description',
            type: 'text'
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()'
          }
        ],
        foreignKeys: [
          {
            name: 'projects_client',
            columnNames: ['client_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'clients',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('projects')
    await queryRunner.query('DROP EXTENSION "uuid-ossp"')
  }
}
