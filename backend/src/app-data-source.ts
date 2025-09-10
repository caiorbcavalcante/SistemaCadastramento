import 'reflect-metadata'
import { DataSource } from 'typeorm'
import dotenv from 'dotenv'

dotenv.config()

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.PGHOST,
  port: process.env.PGPORT ? parseInt(process.env.PGPORT) : 5432,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD as string,
  database: process.env.PGDATABASE,
  ssl: process.env.PGHOST?.includes('neon') ? { rejectUnauthorized: false } : false,
  synchronize: true, // cria as tabelas automaticamente (apenas para dev)
  logging: true,
  entities: [__dirname + '/entities/*.ts'], // suas entidades
  migrations: [__dirname + '/migrations/*.ts'],
})
