import { createClient } from "@supabase/supabase-js"
import { PrismaClient } from "./generated/prisma/client"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || ""
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_PUBLISHABLE_KEY || ""

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false
  },
  global: {
    fetch: (url, options) => {
      return fetch(url, {
        ...options,
        cache: "no-store",
        next: { revalidate: 0 }
      })
    }
  }
})

function mapRow(row: any) {
  if (!row) return row
  const mapped = { ...row }
  if (mapped.createdAt) mapped.createdAt = new Date(mapped.createdAt)
  if (mapped.updatedAt) mapped.updatedAt = new Date(mapped.updatedAt)
  if (mapped.category) mapped.category = mapRow(mapped.category)
  return mapped
}

async function genericFindMany(tableName: string, args?: any) {
  let selectFields = '*'
  if (tableName === 'BlogPost' && args?.include?.category) {
    selectFields = '*, category:Category(*)'
  } else if (args?.select) {
    selectFields = Object.keys(args.select).join(',')
  }

  let query = supabase.from(tableName).select(selectFields)
  
  if (args?.where) {
    for (const [key, val] of Object.entries(args.where)) {
      if (val !== undefined && val !== null) {
        if (typeof val === 'object' && val !== null) {
          for (const [op, opVal] of Object.entries(val)) {
            if (op === 'in') {
              query = query.in(key, opVal as any[])
            } else if (op === 'gte') {
              query = query.gte(key, opVal)
            } else if (op === 'lte') {
              query = query.lte(key, opVal)
            } else if (op === 'equals') {
              query = query.eq(key, opVal)
            }
          }
        } else {
          query = query.eq(key, val)
        }
      }
    }
  }
  
  if (args?.orderBy) {
    if (Array.isArray(args.orderBy)) {
      for (const orderItem of args.orderBy) {
        for (const [key, val] of Object.entries(orderItem)) {
          query = query.order(key, { ascending: val === 'asc' })
        }
      }
    } else {
      for (const [key, val] of Object.entries(args.orderBy)) {
        query = query.order(key, { ascending: val === 'asc' })
      }
    }
  }
  
  if (args?.take !== undefined) {
    const skip = args.skip || 0
    query = query.range(skip, skip + args.take - 1)
  }
  
  const { data, error } = await query
  if (error) throw error
  return (data || []).map(mapRow)
}

async function genericCount(tableName: string, args?: any) {
  let query = supabase.from(tableName).select('*', { count: 'exact', head: true })
  if (args?.where) {
    for (const [key, val] of Object.entries(args.where)) {
      if (val !== undefined && val !== null) {
        query = query.eq(key, val)
      }
    }
  }
  const { count, error } = await query
  if (error) throw error
  return count || 0
}

async function genericFindUnique(tableName: string, args: any) {
  const key = Object.keys(args.where)[0]
  const val = args.where[key]
  
  let selectFields = '*'
  if (tableName === 'BlogPost' && args?.include?.category) {
    selectFields = '*, category:Category(*)'
  }

  const { data, error } = await supabase.from(tableName).select(selectFields).eq(key, val).maybeSingle()
  if (error) throw error
  return mapRow(data)
}

async function genericFindFirst(tableName: string, args?: any) {
  let query = supabase.from(tableName).select('*')
  if (args?.where) {
    for (const [key, val] of Object.entries(args.where)) {
      query = query.eq(key, val)
    }
  }
  const { data, error } = await query.limit(1).maybeSingle()
  if (error) throw error
  return mapRow(data)
}

async function genericCreate(tableName: string, args: any) {
  const { data, error } = await supabase.from(tableName).insert(args.data).select().single()
  if (error) throw error
  return mapRow(data)
}

async function genericUpdate(tableName: string, args: any) {
  const key = Object.keys(args.where)[0]
  const val = args.where[key]
  const { data, error } = await supabase.from(tableName).update(args.data).eq(key, val).select().single()
  if (error) throw error
  return mapRow(data)
}

async function genericDelete(tableName: string, args: any) {
  const key = Object.keys(args.where)[0]
  const val = args.where[key]
  const { data, error } = await supabase.from(tableName).delete().eq(key, val).select().single()
  if (error) throw error
  return mapRow(data)
}

async function genericUpsert(tableName: string, args: any) {
  const key = Object.keys(args.where)[0]
  const val = args.where[key]
  
  // Check if exists
  const { data: existing } = await supabase.from(tableName).select('*').eq(key, val).maybeSingle()
  
  if (existing) {
    const { data, error } = await supabase.from(tableName).update(args.update).eq(key, val).select().single()
    if (error) throw error
    return mapRow(data)
  } else {
    const { data, error } = await supabase.from(tableName).insert(args.create).select().single()
    if (error) throw error
    return mapRow(data)
  }
}

const createModelMock = (tableName: string) => ({
  findMany: (args?: any) => genericFindMany(tableName, args),
  findUnique: (args: any) => genericFindUnique(tableName, args),
  findFirst: (args?: any) => genericFindFirst(tableName, args),
  count: (args?: any) => genericCount(tableName, args),
  create: (args: any) => genericCreate(tableName, args),
  update: (args: any) => genericUpdate(tableName, args),
  delete: (args: any) => genericDelete(tableName, args),
  upsert: (args: any) => genericUpsert(tableName, args),
})

export const db = {
  admin: createModelMock("Admin"),
  systemSetting: createModelMock("SystemSetting"),
  city: createModelMock("City"),
  currency: createModelMock("Currency"),
  blogPost: createModelMock("BlogPost"),
  category: createModelMock("Category"),
  exchangeRate: createModelMock("ExchangeRate"),
  cityCurrencyPage: createModelMock("CityCurrencyPage"),
} as unknown as PrismaClient
