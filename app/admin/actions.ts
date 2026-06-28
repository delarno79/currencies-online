"use server"

import { revalidatePath, revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import {
  hashPassword,
  logoutAdmin,
  setAdminSession,
  verifyPassword,
} from "@/lib/auth"
import { db } from "@/lib/db"

// --- Authentication ---
export async function loginAdminAction(prevState: any, formData: FormData) {
  const username = formData.get("username") as string
  const password = formData.get("password") as string

  if (!username || !password) {
    return { error: "Username and password are required" }
  }

  try {
    const admin = await db.admin.findUnique({
      where: { username },
    })

    if (!admin || !verifyPassword(password, admin.passwordHash)) {
      return { error: "Invalid username or password" }
    }

    await setAdminSession()
  } catch (error) {
    console.error("Login error:", error)
    return { error: "Something went wrong. Please try again." }
  }

  redirect("/admin")
}

export async function logoutAdminAction() {
  await logoutAdmin()
  redirect("/admin")
}

// --- Blogs CRUD ---
export async function createBlogAction(formData: FormData) {
  const title = formData.get("title") as string
  const slug = formData.get("slug") as string
  const summary = formData.get("summary") as string
  const content = formData.get("content") as string
  const categoryId = parseInt(formData.get("categoryId") as string)
  const published = formData.get("published") === "true"

  if (!title || !slug || !summary || !content || isNaN(categoryId)) {
    throw new Error("Missing required fields")
  }

  await db.blogPost.create({
    data: { title, slug, summary, content, categoryId, published },
  })

  revalidatePath("/admin/blogs")
  revalidatePath("/blog")
  redirect("/admin/blogs")
}

export async function updateBlogAction(formData: FormData) {
  const id = parseInt(formData.get("id") as string)
  const title = formData.get("title") as string
  const slug = formData.get("slug") as string
  const summary = formData.get("summary") as string
  const content = formData.get("content") as string
  const categoryId = parseInt(formData.get("categoryId") as string)
  const published = formData.get("published") === "true"

  if (
    isNaN(id) ||
    !title ||
    !slug ||
    !summary ||
    !content ||
    isNaN(categoryId)
  ) {
    throw new Error("Missing required fields")
  }

  await db.blogPost.update({
    where: { id },
    data: { title, slug, summary, content, categoryId, published },
  })

  revalidatePath("/admin/blogs")
  revalidatePath("/blog")
  redirect("/admin/blogs")
}

export async function deleteBlogAction(id: number) {
  await db.blogPost.delete({
    where: { id },
  })
  revalidatePath("/admin/blogs")
  revalidatePath("/blog")
}

// --- Categories CRUD ---
export async function createCategoryAction(formData: FormData) {
  const name = formData.get("name") as string
  const slug = formData.get("slug") as string

  if (!name || !slug) {
    throw new Error("Missing name or slug")
  }

  await db.category.create({
    data: { name, slug },
  })

  revalidatePath("/admin/categories")
  redirect("/admin/categories")
}

export async function updateCategoryAction(formData: FormData) {
  const id = parseInt(formData.get("id") as string)
  const name = formData.get("name") as string
  const slug = formData.get("slug") as string

  if (isNaN(id) || !name || !slug) {
    throw new Error("Missing name or slug")
  }

  await db.category.update({
    where: { id },
    data: { name, slug },
  })

  revalidatePath("/admin/categories")
  redirect("/admin/categories")
}

export async function deleteCategoryAction(id: number) {
  await db.category.delete({
    where: { id },
  })
  revalidatePath("/admin/categories")
}

// --- Cities CRUD ---
export async function createCityAction(formData: FormData) {
  const name = formData.get("name") as string
  const slug = formData.get("slug") as string
  const state = formData.get("state") as string
  const country = formData.get("country") as string
  const countryCode = formData.get("countryCode") as string
  const population = formData.get("population")
    ? parseInt(formData.get("population") as string)
    : null
  const latitude = formData.get("latitude")
    ? parseFloat(formData.get("latitude") as string)
    : null
  const longitude = formData.get("longitude")
    ? parseFloat(formData.get("longitude") as string)
    : null
  const timezone = formData.get("timezone") as string

  if (!name || !slug || !country || !countryCode) {
    throw new Error("Missing required fields")
  }

  await db.city.create({
    data: {
      name,
      slug,
      state,
      country,
      countryCode,
      population,
      latitude,
      longitude,
      timezone,
    },
  })

  revalidatePath("/admin/cities")
  redirect("/admin/cities")
}

export async function updateCityAction(formData: FormData) {
  const id = parseInt(formData.get("id") as string)
  const name = formData.get("name") as string
  const slug = formData.get("slug") as string
  const state = formData.get("state") as string
  const country = formData.get("country") as string
  const countryCode = formData.get("countryCode") as string
  const population = formData.get("population")
    ? parseInt(formData.get("population") as string)
    : null
  const latitude = formData.get("latitude")
    ? parseFloat(formData.get("latitude") as string)
    : null
  const longitude = formData.get("longitude")
    ? parseFloat(formData.get("longitude") as string)
    : null
  const timezone = formData.get("timezone") as string

  if (isNaN(id) || !name || !slug || !country || !countryCode) {
    throw new Error("Missing required fields")
  }

  await db.city.update({
    where: { id },
    data: {
      name,
      slug,
      state,
      country,
      countryCode,
      population,
      latitude,
      longitude,
      timezone,
    },
  })

  revalidatePath("/admin/cities")
  redirect("/admin/cities")
}

export async function deleteCityAction(id: number) {
  await db.city.delete({
    where: { id },
  })
  revalidatePath("/admin/cities")
}

// --- Currencies CRUD ---
export async function createCurrencyAction(formData: FormData) {
  const code = formData.get("code") as string
  const name = formData.get("name") as string
  const symbol = formData.get("symbol") as string

  if (!code || !name) {
    throw new Error("Missing required fields")
  }

  await db.currency.create({
    data: { code, name, symbol },
  })

  revalidatePath("/admin/currencies")
  redirect("/admin/currencies")
}

export async function updateCurrencyAction(formData: FormData) {
  const id = parseInt(formData.get("id") as string)
  const code = formData.get("code") as string
  const name = formData.get("name") as string
  const symbol = formData.get("symbol") as string

  if (isNaN(id) || !code || !name) {
    throw new Error("Missing required fields")
  }

  await db.currency.update({
    where: { id },
    data: { code, name, symbol },
  })

  revalidatePath("/admin/currencies")
}

export async function deleteCurrencyAction(id: number) {
  await db.currency.delete({
    where: { id },
  })
  revalidatePath("/admin/currencies")
}

// --- Settings Actions ---
export async function updateAdminCredentialsAction(
  prevState: any,
  formData: FormData
) {
  const newUsername = formData.get("username") as string
  const currentPassword = formData.get("currentPassword") as string
  const newPassword = formData.get("newPassword") as string

  if (!newUsername) {
    return { error: "Username is required" }
  }

  try {
    const admin = await db.admin.findFirst()
    if (!admin) {
      return { error: "No admin account found to update" }
    }

    if (newPassword) {
      if (!currentPassword) {
        return { error: "Current password is required to change password" }
      }
      if (!verifyPassword(currentPassword, admin.passwordHash)) {
        return { error: "Incorrect current password" }
      }
    }

    const dataToUpdate: any = { username: newUsername }
    if (newPassword) {
      dataToUpdate.passwordHash = hashPassword(newPassword)
    }

    await db.admin.update({
      where: { id: admin.id },
      data: dataToUpdate,
    })

    return { success: "Credentials updated successfully!" }
  } catch (error: any) {
    console.error("Failed to update credentials:", error)
    if (error?.code === "P2002") {
      return { error: "Username is already taken" }
    }
    return { error: "Something went wrong. Please try again." }
  }
}

export async function updateSystemSettingsAction(
  prevState: any,
  formData: FormData
) {
  const heroTitle = formData.get("heroTitle") as string
  const heroSubtitle = formData.get("heroSubtitle") as string
  const popularCurrencies = formData.get("popularCurrencies") as string
  const popularPairs = formData.get("popularPairs") as string
  const popularPairsStandard = formData.get("popularPairsStandard") as string
  const popularPairsTitle = formData.get("popularPairsTitle") as string
  const popularPairsSubtitle = formData.get("popularPairsSubtitle") as string
  const popularPairsGlobalTitle = formData.get(
    "popularPairsGlobalTitle"
  ) as string
  const popularPairsGlobalSubtitle = formData.get(
    "popularPairsGlobalSubtitle"
  ) as string
  const adsenseClientId = formData.get("adsenseClientId") as string
  const adsenseEnabled =
    formData.get("adsenseEnabled") === "true" ? "true" : "false"
  const adsenseGlobalCode = formData.get("adsenseGlobalCode") as string

  // Load new text customization fields
  const card1Title = formData.get("card1Title") as string
  const card1Desc = formData.get("card1Desc") as string
  const card1Btn = formData.get("card1Btn") as string
  const card1Href = formData.get("card1Href") as string

  const card2Title = formData.get("card2Title") as string
  const card2Desc = formData.get("card2Desc") as string
  const card2Btn = formData.get("card2Btn") as string
  const card2Href = formData.get("card2Href") as string

  const card3Title = formData.get("card3Title") as string
  const card3Desc = formData.get("card3Desc") as string
  const card3Btn = formData.get("card3Btn") as string
  const card3Href = formData.get("card3Href") as string

  const card4Title = formData.get("card4Title") as string
  const card4Desc = formData.get("card4Desc") as string
  const card4Btn = formData.get("card4Btn") as string
  const card4Href = formData.get("card4Href") as string

  const directoryTitle = formData.get("directoryTitle") as string
  const directorySubtitle = formData.get("directorySubtitle") as string

  const popcurrencyTitle = formData.get("popcurrencyTitle") as string
  const popcurrencySubtitle = formData.get("popcurrencySubtitle") as string

  const liveRatesTitle = formData.get("liveRatesTitle") as string
  const liveRatesSubtitle = formData.get("liveRatesSubtitle") as string

  const factsTitle = formData.get("factsTitle") as string
  const factsSubtitle = formData.get("factsSubtitle") as string
  const factsContent = formData.get("factsContent") as string

  const mistakesTitle = formData.get("mistakesTitle") as string
  const mistakesSubtitle = formData.get("mistakesSubtitle") as string
  const mistakesContent = formData.get("mistakesContent") as string

  const regionsTitle = formData.get("regionsTitle") as string
  const regionsSubtitle = formData.get("regionsSubtitle") as string

  try {
    const settings = [
      { key: "hero_title", value: heroTitle || "" },
      { key: "hero_subtitle", value: heroSubtitle || "" },
      { key: "popular_currencies", value: popularCurrencies || "" },
      { key: "popular_pairs", value: popularPairs || "" },
      { key: "popular_pairs_standard", value: popularPairsStandard || "" },
      { key: "popular_pairs_title", value: popularPairsTitle || "" },
      { key: "popular_pairs_subtitle", value: popularPairsSubtitle || "" },
      {
        key: "popular_pairs_global_title",
        value: popularPairsGlobalTitle || "",
      },
      {
        key: "popular_pairs_global_subtitle",
        value: popularPairsGlobalSubtitle || "",
      },
      { key: "adsense_client_id", value: adsenseClientId || "" },
      { key: "adsense_enabled", value: adsenseEnabled },
      { key: "adsense_global_code", value: adsenseGlobalCode || "" },
      { key: "card_1_title", value: card1Title || "" },
      { key: "card_1_desc", value: card1Desc || "" },
      { key: "card_1_btn", value: card1Btn || "" },
      { key: "card_1_href", value: card1Href || "" },
      { key: "card_2_title", value: card2Title || "" },
      { key: "card_2_desc", value: card2Desc || "" },
      { key: "card_2_btn", value: card2Btn || "" },
      { key: "card_2_href", value: card2Href || "" },
      { key: "card_3_title", value: card3Title || "" },
      { key: "card_3_desc", value: card3Desc || "" },
      { key: "card_3_btn", value: card3Btn || "" },
      { key: "card_3_href", value: card3Href || "" },
      { key: "card_4_title", value: card4Title || "" },
      { key: "card_4_desc", value: card4Desc || "" },
      { key: "card_4_btn", value: card4Btn || "" },
      { key: "card_4_href", value: card4Href || "" },
      { key: "directory_title", value: directoryTitle || "" },
      { key: "directory_subtitle", value: directorySubtitle || "" },
      { key: "popcurrency_title", value: popcurrencyTitle || "" },
      { key: "popcurrency_subtitle", value: popcurrencySubtitle || "" },
      { key: "live_rates_title", value: liveRatesTitle || "" },
      { key: "live_rates_subtitle", value: liveRatesSubtitle || "" },
      { key: "facts_title", value: factsTitle || "" },
      { key: "facts_subtitle", value: factsSubtitle || "" },
      { key: "facts_content", value: factsContent || "" },
      { key: "mistakes_title", value: mistakesTitle || "" },
      { key: "mistakes_subtitle", value: mistakesSubtitle || "" },
      { key: "mistakes_content", value: mistakesContent || "" },
      { key: "regions_title", value: regionsTitle || "" },
      { key: "regions_subtitle", value: regionsSubtitle || "" },
    ]

    for (const setting of settings) {
      await db.systemSetting.upsert({
        where: { key: setting.key },
        update: { value: setting.value },
        create: { key: setting.key, value: setting.value },
      })
    }

    revalidateTag("system-settings", "max")
    revalidatePath("/")
    revalidatePath("/admin/settings")
    return { success: "Settings updated successfully!" }
  } catch (error) {
    console.error("Failed to update system settings:", error)
    return { error: "Something went wrong. Please try again." }
  }
}
