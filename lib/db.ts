import { PrismaClient } from "./generated/prisma/client"

const globalForPrisma = global as unknown as { prisma: PrismaClient }

let dbInstance: PrismaClient

if (globalForPrisma.prisma) {
  dbInstance = globalForPrisma.prisma
} else {
  dbInstance = new PrismaClient()
  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = dbInstance
  }
}

export const db = dbInstance

