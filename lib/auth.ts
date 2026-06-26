import crypto from "crypto"
import { cookies } from "next/headers"

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex")
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex")
  return `${salt}:${hash}`
}

export function verifyPassword(password: string, storedHash: string): boolean {
  const [salt, hash] = storedHash.split(":")
  const verifyHash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex")
  return hash === verifyHash
}

export async function setAdminSession() {
  try {
    const cookieStore = await cookies()
    cookieStore.set("admin_session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    })
  } catch (error) {
    console.error("Failed to set cookies:", error)
  }
}

export async function isAdminAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies()
    return cookieStore.get("admin_session")?.value === "authenticated"
  } catch (error) {
    console.error("Failed to read cookies:", error)
    return false
  }
}

export async function logoutAdmin() {
  try {
    const cookieStore = await cookies()
    cookieStore.delete("admin_session")
  } catch (error) {
    console.error("Failed to clear cookies:", error)
  }
}
