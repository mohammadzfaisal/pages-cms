export default function DebugEnv() {
  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>Environment Variable Debug</h1>
      <p><strong>GITHUB_APP_NAME:</strong> {process.env.GITHUB_APP_NAME || 'NOT SET'}</p>
      <p><strong>Expected URL:</strong> https://github.com/apps/{process.env.GITHUB_APP_NAME}/installations/new</p>
      <p><strong>NODE_ENV:</strong> {process.env.NODE_ENV}</p>
    </div>
  );
}
