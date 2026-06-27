import { PrismaClient } from "./generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import pg from "pg"

// Trigger auto-deployment rebuild comment
const globalForPrisma = global as unknown as { prisma: PrismaClient }

let dbInstance: PrismaClient

if (globalForPrisma.prisma) {
  dbInstance = globalForPrisma.prisma
} else {
  let connectionString = process.env.DATABASE_URL
  if (connectionString && (connectionString.startsWith('"') || connectionString.startsWith("'"))) {
    connectionString = connectionString.slice(1, -1)
  }
  
  const pool = new pg.Pool({ connectionString })
  const adapter = new PrismaPg(pool)
  dbInstance = new PrismaClient({ adapter } as any)

  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = dbInstance
  }
}

export const db = dbInstance

