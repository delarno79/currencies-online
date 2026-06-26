export default function TestRoutePage() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Test Route is Online!</h1>
      <p>This is a purely static test page to verify routing on Hostinger.</p>
      <p>Time: {new Date().toISOString()}</p>
    </div>
  )
}
