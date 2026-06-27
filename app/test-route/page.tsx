import { db } from "@/lib/db"

export const dynamic = 'force-dynamic'

function maskConnectionString(str: string | undefined): string {
  if (!str) return 'undefined'
  return str.replace(/([^:]+:\/\/)[^@]+(@.+)/, '$1********$2')
}

export default async function TestRoutePage() {
  const envKeys = {
    NODE_ENV: process.env.NODE_ENV,
    PRISMA_CLIENT_ENGINE_TYPE: process.env.PRISMA_CLIENT_ENGINE_TYPE,
    DATABASE_URL_EXISTS: !!process.env.DATABASE_URL,
    DATABASE_URL_LENGTH: process.env.DATABASE_URL?.length || 0,
    DATABASE_URL_FULL: process.env.DATABASE_URL || 'undefined',
    DIRECT_URL_EXISTS: !!process.env.DIRECT_URL,
    DIRECT_URL_LENGTH: process.env.DIRECT_URL?.length || 0,
    DIRECT_URL_FULL: process.env.DIRECT_URL || 'undefined',
  }

  let dbResult = ''
  let dbError: any = null

  try {
    const startTime = Date.now()
    const admin = await db.admin.findFirst()
    dbResult = `Connection successful! Admin user username: ${admin?.username ?? 'None'} (Took ${Date.now() - startTime}ms)`
  } catch (err: any) {
    dbError = {
      name: err.name,
      message: err.message,
      code: err.code,
      meta: err.meta,
      clientVersion: err.clientVersion,
      stack: err.stack,
    }
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'monospace', backgroundColor: '#1a1a1a', color: '#fff', minHeight: '100vh' }}>
      <h1>Backend Diagnostics Dashboard</h1>
      
      <h2>1. Environment Variables</h2>
      <pre style={{ backgroundColor: '#333', padding: '1rem', borderRadius: '4px', overflowX: 'auto' }}>
        {JSON.stringify(envKeys, null, 2)}
      </pre>

      <h2>2. Database Query Test</h2>
      {dbError ? (
        <div>
          <h3 style={{ color: '#ff6b6b' }}>❌ Database Connection Failed</h3>
          <pre style={{ backgroundColor: '#2d1818', padding: '1rem', border: '1px solid #ff6b6b', borderRadius: '4px', overflowX: 'auto', whiteSpace: 'pre-wrap' }}>
            {JSON.stringify(dbError, null, 2)}
          </pre>
        </div>
      ) : (
        <div>
          <h3 style={{ color: '#51cf66' }}>✅ Database Connection Success</h3>
          <pre style={{ backgroundColor: '#1b2d1f', padding: '1rem', border: '1px solid #51cf66', borderRadius: '4px' }}>
            {dbResult}
          </pre>
        </div>
      )}
    </div>
  )
}
