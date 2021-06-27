import { createConnection } from 'typeorm'

createConnection().then(res => console.log('Database up'))
