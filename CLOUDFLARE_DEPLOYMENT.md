# Deploying Pages CMS to Cloudflare Pages

## ⚠️ Important: Compatibility Notice

Pages CMS is built with Next.js App Router and requires Node.js runtime features. Deploying to Cloudflare Pages requires significant modifications due to:

1. **Runtime Differences**: Cloudflare uses V8 isolates (Edge runtime), not full Node.js
2. **Database Constraints**: PostgreSQL connections need adaptation for edge environment
3. **API Routes**: Some routes use Node.js-specific APIs that need refactoring

## Recommended Alternative: Use Cloudflare Workers for Remix/Astro Adapter

Since Pages CMS requires full Node.js runtime, consider these better alternatives:

### Best Options (Easier & More Compatible):

1. **Vercel** (Recommended) - Zero configuration, fully compatible
2. **Railway** - Great for Node.js apps, includes database
3. **Fly.io** - Full VM support, easy deployment
4. **Render** - Simple setup with PostgreSQL included

---

## If You Still Want Cloudflare: Hybrid Approach

Deploy the database layer separately and use Cloudflare for static assets only.

### Architecture:
- **Cloudflare Pages**: Host static files and client-side assets
- **Cloudflare Workers**: Handle API routes (with modifications)
- **Cloudflare D1 or External PostgreSQL**: Database
- **Cloudflare Cron Triggers**: Scheduled tasks

---

## Step-by-Step: Cloudflare Pages Deployment (Advanced)

### Prerequisites:
- Cloudflare account
- Wrangler CLI installed: `npm install -g wrangler`
- Understanding of Next.js edge runtime limitations

### 1. Install Cloudflare Next.js Adapter

```bash
npm install --save-dev @cloudflare/next-on-pages
npm install --save-dev vercel
```

### 2. Modify next.config.mjs

```javascript
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Required for Cloudflare Pages
  output: 'export', // or 'standalone' with adapter
  images: {
    unoptimized: true, // Cloudflare Images API needed for optimization
  },
};

export default withBundleAnalyzer(nextConfig);
```

### 3. Create wrangler.toml

```toml
name = "pages-cms"
compatibility_date = "2024-01-15"
pages_build_output_dir = ".vercel/output/static"

[env.production]
vars = { NODE_ENV = "production" }

# Database binding (if using D1)
[[d1_databases]]
binding = "DB"
database_name = "pages-cms-db"
database_id = "your-database-id"

# Cron triggers
[triggers]
crons = ["0 * * * *"]  # Every hour
```

### 4. Adapt Database for D1 (Alternative to PostgreSQL)

**Challenge**: Pages CMS uses Drizzle ORM with PostgreSQL. You'll need to:

1. **Option A**: Use Cloudflare D1 (SQLite-based)
   - Requires changing database schema and queries
   - Modify `db/schema.ts` for SQLite compatibility
   - Change `DATABASE_URL` handling

2. **Option B**: Use external PostgreSQL (Supabase, Neon)
   - Keep existing setup
   - Use Hyperdrive for connection pooling
   - Higher latency from edge

### 5. Modify API Routes for Edge Runtime

Add to each API route that's compatible:

```typescript
export const runtime = 'edge';
```

**Routes that need modification:**
- `/app/api/cron/route.ts` - Remove VACUUM (SQLite specific)
- All routes using Node.js crypto - Use Web Crypto API
- Database connections - Use Cloudflare D1 or Hyperdrive

### 6. Environment Variables in Cloudflare

```bash
# Add secrets via Wrangler
wrangler secret put CRYPTO_KEY
wrangler secret put GITHUB_APP_PRIVATE_KEY
wrangler secret put GITHUB_APP_CLIENT_SECRET
wrangler secret put GITHUB_APP_WEBHOOK_SECRET
wrangler secret put RESEND_API_KEY
wrangler secret put CRON_SECRET

# Add regular variables
wrangler pages secret put GITHUB_APP_ID
wrangler pages secret put GITHUB_APP_NAME
wrangler pages secret put GITHUB_APP_CLIENT_ID
wrangler pages secret put RESEND_FROM_EMAIL
wrangler pages secret put DATABASE_URL
```

### 7. Build and Deploy

```bash
# Build with Cloudflare adapter
npx @cloudflare/next-on-pages

# Deploy to Cloudflare Pages
wrangler pages deploy .vercel/output/static
```

---

## Database Setup Options

### Option A: Cloudflare D1 (Recommended for Cloudflare)

```bash
# Create D1 database
wrangler d1 create pages-cms-db

# Run migrations (need to convert from PostgreSQL)
wrangler d1 migrations create pages-cms-db initial-schema
wrangler d1 migrations apply pages-cms-db
```

**Required Changes:**
- Convert PostgreSQL migrations to SQLite
- Update Drizzle schema for SQLite
- Remove PostgreSQL-specific features (VACUUM, etc.)

### Option B: External PostgreSQL with Hyperdrive

```bash
# Create Hyperdrive config
wrangler hyperdrive create pages-cms-postgres \
  --connection-string="postgresql://user:password@host:5432/dbname"
```

Update `wrangler.toml`:
```toml
[[hyperdrive]]
binding = "HYPERDRIVE"
id = "your-hyperdrive-id"
```

---

## Cron Jobs on Cloudflare

Create `functions/scheduled.ts`:

```typescript
export const onRequest: PagesFunction = async (context) => {
  const cron = context.env.CRON_SECRET;

  // Call your cron endpoint
  const response = await fetch(`${context.env.BASE_URL}/api/cron`, {
    headers: {
      'Authorization': `Bearer ${cron}`
    }
  });

  return response;
};
```

---

## GitHub Webhook Configuration

Update your GitHub App webhook URL:
```
https://your-cloudflare-pages.pages.dev/api/webhook/github
```

---

## Known Issues & Limitations

### 1. **Cold Starts**
- Edge functions may have cold start delays
- Database connections need proper pooling

### 2. **Database VACUUM**
- Remove from cron job (not supported in D1/Edge)
- Use Cloudflare's automatic optimization

### 3. **File Size Limits**
- Cloudflare Workers: 1MB per request
- May affect large media uploads

### 4. **Runtime Compatibility**
- Not all Node.js modules work in edge runtime
- Some npm packages need alternatives

---

## Testing Locally

```bash
# Run with Cloudflare compatibility
npm run build
npx wrangler pages dev .vercel/output/static
```

---

## Estimated Effort

**Time Required**: 8-16 hours of development
**Complexity**: Advanced (requires significant code modifications)

### Tasks:
- [ ] Convert database schema to SQLite (if using D1)
- [ ] Modify API routes for edge runtime
- [ ] Replace Node.js APIs with Web APIs
- [ ] Configure Cloudflare bindings
- [ ] Test all authentication flows
- [ ] Test GitHub webhook handling
- [ ] Set up cron triggers
- [ ] Configure environment variables

---

## Easier Alternative: Cloudflare with Docker

Deploy Pages CMS as a **Docker container** on Cloudflare's container platform (when available) or use:

### **Railway + Cloudflare CDN**
1. Deploy Pages CMS to Railway (1-click)
2. Use Cloudflare as CDN in front
3. Get Cloudflare's edge caching benefits
4. Keep full Node.js compatibility

```bash
# Deploy to Railway
railway login
railway init
railway up

# Add Cloudflare CDN
# Point your Cloudflare DNS to Railway URL
# Enable proxy (orange cloud)
```

This gives you:
- ✅ Full Node.js support
- ✅ Cloudflare's global CDN
- ✅ DDoS protection
- ✅ Zero code changes needed

---

## My Recommendation

**Don't deploy directly to Cloudflare Pages for this project.** Instead:

1. **Best Option**: Deploy to **Vercel** (official Next.js platform, zero config)
2. **Second Best**: Deploy to **Railway** + use Cloudflare as CDN
3. **Third Option**: Deploy to **Fly.io** with full Node.js support

Cloudflare Pages is excellent for:
- Static sites (Hugo, Jekyll, Astro)
- Edge-first applications
- Simple Next.js apps

But Pages CMS needs:
- Full Node.js runtime
- PostgreSQL with complex queries
- Long-running processes
- Traditional server-side features

Would you like me to help you set up deployment on any of these alternative platforms instead?
