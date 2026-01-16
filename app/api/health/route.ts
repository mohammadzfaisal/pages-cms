export async function GET() {
  return Response.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    env: {
      hasDatabase: !!process.env.DATABASE_URL,
      hasCryptoKey: !!process.env.CRYPTO_KEY,
      hasGithubAppName: !!process.env.GITHUB_APP_NAME,
      githubAppName: process.env.GITHUB_APP_NAME || 'NOT_SET',
      nodeEnv: process.env.NODE_ENV
    }
  });
}
