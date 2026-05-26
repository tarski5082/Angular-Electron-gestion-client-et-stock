import path from 'node:path';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient,Client,Adresse } from '../generated/prisma/client';

const dbPath = path.join(__dirname, '..', '..', 'dev.db');
const adapter = new PrismaBetterSqlite3({ url: 'file:' + dbPath });
export const prisma = new PrismaClient({adapter});
    

