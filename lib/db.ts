import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3"
import { PrismaClient } from "./generated/prisma/client"

const globalForPrisma = global as unknown as { prisma: PrismaClient }

let dbInstance: PrismaClient

if (globalForPrisma.prisma) {
  dbInstance = globalForPrisma.prisma
} else {
  const dbUrl = process.env.DATABASE_URL || "file:./prisma/dev.db"
  const adapter = new PrismaBetterSqlite3({ url: dbUrl })
  dbInstance = new PrismaClient({ adapter })
  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = dbInstance
  }
}

export const db = dbInstance
