import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3"
import crypto from "crypto"
import { PrismaClient } from "../lib/generated/prisma/client"

const dbUrl = process.env.DATABASE_URL || "file:./prisma/dev.db"
const adapter = new PrismaBetterSqlite3({ url: dbUrl })
const prisma = new PrismaClient({ adapter })

function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex")
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex")
  return `${salt}:${hash}`
}

async function main() {
  const existingAdmin = await prisma.admin.findUnique({
    where: { username: "admin" },
  })

  if (!existingAdmin) {
    const password = "adminpassword123"
    const hashedPassword = hashPassword(password)
    await prisma.admin.create({
      data: {
        username: "admin",
        passwordHash: hashedPassword,
      },
    })
    console.log("Default admin user created!")
    console.log("Username: admin")
    console.log(`Password: ${password}`)
  } else {
    console.log("Admin user already exists.")
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
