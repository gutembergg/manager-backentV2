import { Connection, createConnection, getConnectionOptions } from 'typeorm'

export default async (): Promise<Connection | void> => {
  const defaultOptions = await getConnectionOptions()

  return createConnection(
    Object.assign(defaultOptions, {
      database:
        process.env.NODE_ENV === 'test'
          ? 'manager_test'
          : defaultOptions.database
    })
  ).then(() => console.log('Database Up!!'))

  /* if (process.env.NODE_ENV === 'test') {
    return createConnection({
      type: 'sqlite',
      database: './src/database/database.tests.sqlite',
      migrations: ['./src/database/migrations/*.ts'],
      entities: ['./src/models/*.ts'],
      cli: {
        migrationsDir: './src/database/migrations'
      }
    })
  } else {
    return createConnection(defaultOptions)
      .then(res => console.log('Database Up!!!'))
      .catch(() => 'a')
  } */
}
