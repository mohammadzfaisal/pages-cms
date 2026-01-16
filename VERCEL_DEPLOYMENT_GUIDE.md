# Deploy Pages CMS to Vercel - Complete Guide

This guide will walk you through deploying your Pages CMS to Vercel in ~30 minutes.

## Prerequisites Checklist

- [ ] GitHub account
- [ ] Vercel account (sign up at https://vercel.com)
- [ ] Your GitHub repository: https://github.com/mohammadzfaisal/pages-cms

---

## Step 1: Set Up Supabase Database (5 minutes)

### 1.1 Create Supabase Project

1. Go to https://supabase.com
2. Click "Start your project" → Sign up/Login with GitHub
3. Click "New Project"
   - **Name**: `pages-cms-db` (or your preferred name)
   - **Database Password**: Generate a strong password (save it!)
   - **Region**: Choose closest to your users
   - **Plan**: Free tier is sufficient to start
4. Click "Create new project" (takes ~2 minutes to provision)

### 1.2 Get Database Connection String

**Method 1: Using the Connect Button (Recommended)**

1. Go to your **Supabase project dashboard** (main page)
2. Click the **"Connect"** button at the top of the page
3. Look for **"Transaction Pooler"** section
4. Copy the connection string (it looks like):
   ```
   postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-region.pooler.supabase.com:6543/postgres
   ```
5. **Replace `[YOUR-PASSWORD]`** with your actual database password from step 1.1
6. **Save this** - you'll need it for `DATABASE_URL`

**Method 2: Via Project Settings**

1. Go to **Project Settings** (gear icon in bottom left)
2. Click **Database** in the left sidebar
3. Scroll to the **Connection string** section
4. Look for **"Transaction Pooler"** or **"Connection pooling"** (not "Direct connection")
5. Copy the connection string with port **6543**

> **Critical**: You MUST use the **Transaction Pooler** URL (port 6543) for Vercel deployment. The direct connection (port 5432) will cause connection limit issues on serverless platforms.

**How to identify the correct connection string:**
- ✅ Port **6543** (transaction pooler)
- ✅ Contains `.pooler.supabase.com` in hostname
- ❌ Port 5432 is the direct connection (don't use this)

---

## Step 2: Create Resend Account (5 minutes)

Resend handles authentication emails for Pages CMS.

### 2.1 Sign Up for Resend

1. Go to https://resend.com
2. Click "Start Building" → Sign up
3. Verify your email address

### 2.2 Verify Your Domain (Recommended for Production)

**Option A: Use Your Own Domain**
1. In Resend dashboard, click **Domains** → **Add Domain**
2. Enter your domain (e.g., `yourdomain.com`)
3. Add the DNS records shown (MX, TXT, CNAME)
4. Wait for verification (usually 5-10 minutes)
5. Use email like: `noreply@yourdomain.com`

**Option B: Use Resend's Testing Domain (Development)**
1. For testing, you can use `onboarding@resend.dev`
2. **Limitation**: Can only send to your verified email
3. Good for initial setup, but verify domain for production

### 2.3 Get API Key

1. Go to **API Keys** in Resend dashboard
2. Click "Create API Key"
   - **Name**: `pages-cms-production`
   - **Permission**: Full access
3. Copy the API key (starts with `re_`)
4. **Save this** - you'll need it for `RESEND_API_KEY`

### 2.4 Prepare Email Address

Format: `Name <email@domain.com>`

Examples:
- `Pages CMS <noreply@yourdomain.com>` (your domain)
- `Pages CMS <onboarding@resend.dev>` (testing only)

**Save this** - you'll need it for `RESEND_FROM_EMAIL`

---

## Step 3: Create GitHub App (10 minutes)

### 3.1 Start GitHub App Creation

1. Go to https://github.com/settings/apps
2. Click "New GitHub App"

### 3.2 Basic Information

- **GitHub App name**: `Pages CMS Production`
- **Homepage URL**: `https://pagescms.org`

### 3.3 Identifying and Authorizing Users

- **Callback URL**: `https://PLACEHOLDER.vercel.app/api/auth/github`
  - We'll update this after Vercel deployment
  - For now, use a placeholder
- **Expire user authorization tokens**: ❌ No
- **Request user authorization (OAuth) during installation**: ✅ Yes
- **Enable Device Flow**: ❌ No

### 3.4 Post Installation

- **Setup URL (optional)**: Leave empty
- **Redirect on update**: ❌ No

### 3.5 Webhook

- **Active**: ✅ Yes
- **Webhook URL**: `https://PLACEHOLDER.vercel.app/api/webhook/github`
  - We'll update this after Vercel deployment
- **Webhook Secret**: Generate one:
  ```bash
  openssl rand -base64 32
  ```
  Or use: https://www.random.org/strings/

  **Save this secret!** You'll need it for `GITHUB_APP_WEBHOOK_SECRET`

### 3.6 Permissions

**Repository permissions:**
- **Administration**: Read & write
- **Contents**: Read & write
- **Metadata**: Read-only (automatically selected)

**Organization permissions:** (leave all as "No access")

**Account permissions:** (leave all as "No access")

### 3.7 Subscribe to Events

Select these events:
- ✅ **Installation target**
- ✅ **Repository**
- ✅ **Push**
- ✅ **Delete**

### 3.8 Where Can This Be Installed?

- Select: **Any account**

### 3.9 Create the App

1. Click "Create GitHub App"
2. You'll be redirected to your app's settings page

### 3.10 Collect Required Information

After creation, gather these values:

**From the main settings page:**
- **App ID** (top of page) → Save for `GITHUB_APP_ID`
- **Client ID** (OAuth credentials section) → Save for `GITHUB_APP_CLIENT_ID`

**Generate Client Secret:**
1. In OAuth credentials section, click "Generate a new client secret"
2. Copy the secret → Save for `GITHUB_APP_CLIENT_SECRET`

**Download Private Key:**
1. Scroll to "Private keys" section
2. Click "Generate a private key"
3. A `.pem` file will download
4. Open it in a text editor and copy the entire contents → Save for `GITHUB_APP_PRIVATE_KEY`

**Get App Machine Name:**
1. Look at the URL of your app settings page:
   ```
   https://github.com/settings/apps/pages-cms-production
   ```
2. The last part is your app name → Save for `GITHUB_APP_NAME`
   (e.g., `pages-cms-production`)

---

## Step 4: Generate Security Keys (2 minutes)

### 4.1 Generate CRYPTO_KEY

This encrypts GitHub tokens in your database.

**On Mac/Linux:**
```bash
openssl rand -base64 32
```

**On Windows (PowerShell):**
```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

**Or use online:** https://generate-random.org/api-key-generator?count=1&length=32&type=mixed-numbers-symbols&prefix=

**Save this** → You'll need it for `CRYPTO_KEY`

### 4.2 Generate CRON_SECRET

This secures your cron endpoint.

Use the same method as above to generate another random string.

**Save this** → You'll need it for `CRON_SECRET`

---

## Step 5: Deploy to Vercel (5 minutes)

### 5.1 Prepare Environment Variables

Create a text file with all your environment variables ready to paste:

```bash
# Database
DATABASE_URL=postgresql://postgres.xxxxx:[PASSWORD]@aws-0-us-west-1.pooler.supabase.com:6543/postgres

# Security Keys
CRYPTO_KEY=your-generated-crypto-key
CRON_SECRET=your-generated-cron-secret

# GitHub App
GITHUB_APP_ID=123456
GITHUB_APP_NAME=pages-cms-production
GITHUB_APP_CLIENT_ID=Iv1.abc123def456
GITHUB_APP_CLIENT_SECRET=ghp_abc123def456...
GITHUB_APP_WEBHOOK_SECRET=your-webhook-secret
GITHUB_APP_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEA...
(entire PEM key content)
...
-----END RSA PRIVATE KEY-----"

# Email (Resend)
RESEND_API_KEY=re_abc123def456
RESEND_FROM_EMAIL=Pages CMS <noreply@yourdomain.com>

# Optional
# FILE_CACHE_TTL=1440
# PERMISSION_CACHE_TTL=60
```

> **Important**: For `GITHUB_APP_PRIVATE_KEY`, include the entire PEM content with line breaks, wrapped in quotes.

### 5.2 Deploy to Vercel

**Option A: Deploy via Vercel Dashboard (Recommended)**

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your GitHub account and find `pages-cms` repository
4. Click "Import"
5. **Configure Project:**
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build` (default is fine)
   - **Output Directory**: `.next` (default is fine)
   - **Install Command**: `npm install` (default is fine)

6. **Add Environment Variables:**
   - Click "Environment Variables"
   - Add each variable from your prepared list:
     - Name: `DATABASE_URL`
     - Value: `postgresql://...`
     - Environment: Production, Preview, Development (check all)
   - Repeat for all variables

7. Click "Deploy"
8. Wait ~2-3 minutes for deployment

**Option B: Deploy via Vercel CLI**

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? (select your account)
# - Link to existing project? No
# - What's your project's name? pages-cms
# - In which directory is your code? ./
# - Want to override settings? No

# Deploy to production
vercel --prod
```

### 5.3 Get Your Vercel URL

After deployment completes, you'll get a URL like:
```
https://pages-cms-abc123.vercel.app
```

**Save this URL!** You'll need it for the next step.

---

## Step 6: Update GitHub App URLs (2 minutes)

Now that you have your Vercel URL, update your GitHub App:

1. Go to https://github.com/settings/apps
2. Click on your app (e.g., "Pages CMS Production")
3. Update these fields:

   **Callback URL:**
   ```
   https://your-vercel-url.vercel.app/api/auth/github
   ```

   **Webhook URL:**
   ```
   https://your-vercel-url.vercel.app/api/webhook/github
   ```

4. Scroll to bottom and click "Save changes"

---

## Step 7: Install GitHub App (2 minutes)

1. In your GitHub App settings, click "Install App" (left sidebar)
2. Click "Install" next to your account/organization
3. Choose installation location:
   - **All repositories** (if you trust it), or
   - **Only select repositories** (recommended)
     - Select the repositories you want to manage with Pages CMS
4. Click "Install"

---

## Step 8: Set Up Vercel Cron (1 minute)

The `vercel.json` in your project already has cron configured:

```json
{
  "crons": [{
    "path": "/api/cron",
    "schedule": "0 * * * *"
  }]
}
```

This runs automatically on Vercel. No additional setup needed! ✅

To verify:
1. Go to your Vercel project dashboard
2. Click "Settings" → "Cron Jobs"
3. You should see the cron job listed

---

## Step 9: Test Your Deployment (5 minutes)

### 9.1 Visit Your App

1. Go to your Vercel URL: `https://your-vercel-url.vercel.app`
2. You should see the Pages CMS login page

### 9.2 Sign In with GitHub

1. Click "Sign in with GitHub"
2. Authorize the application
3. You should be redirected to your dashboard

### 9.3 Test Email Authentication

1. Try adding a collaborator or any feature that sends emails
2. Check that emails arrive via Resend

### 9.4 Test Repository Access

1. Click "Add Site" or connect a repository
2. Select one of your installed repositories
3. Verify you can see and edit content

### 9.5 Check Webhook

1. Make a commit to one of your connected repositories
2. Verify the webhook is triggered (check Vercel logs)
3. In GitHub App settings → Advanced → Recent Deliveries
   - You should see successful webhook deliveries

---

## Step 10: Add Custom Domain (Optional)

### 10.1 Add Domain in Vercel

1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Enter your domain (e.g., `cms.yourdomain.com`)
4. Click "Add"

### 10.2 Configure DNS

Vercel will show you DNS records to add:

**For subdomain (e.g., cms.yourdomain.com):**
```
Type: CNAME
Name: cms
Value: cname.vercel-dns.com
```

**For root domain (e.g., yourdomain.com):**
```
Type: A
Name: @
Value: 76.76.21.21
```

### 10.3 Update GitHub App

If using custom domain, update GitHub App URLs again:
- Callback URL: `https://cms.yourdomain.com/api/auth/github`
- Webhook URL: `https://cms.yourdomain.com/api/webhook/github`

---

## Troubleshooting

### Database Connection Issues

**Error:** "Unable to connect to database"

**Solution:**
1. Verify you're using the **Transaction pooler** URL (port 6543)
2. Check password is correct in connection string
3. Test connection in Supabase SQL Editor

### GitHub Authentication Failing

**Error:** "OAuth error" or redirect issues

**Solution:**
1. Verify Callback URL exactly matches: `https://your-url/api/auth/github`
2. Check `GITHUB_APP_CLIENT_ID` and `GITHUB_APP_CLIENT_SECRET` are correct
3. Ensure "Request user authorization during installation" is enabled

### Webhook Not Working

**Error:** Webhook deliveries failing in GitHub

**Solution:**
1. Check webhook URL is correct
2. Verify `GITHUB_APP_WEBHOOK_SECRET` matches
3. Check Vercel logs for errors
4. Test webhook manually in GitHub App settings

### Email Not Sending

**Error:** "Failed to send email"

**Solution:**
1. Verify domain is verified in Resend
2. Check `RESEND_API_KEY` is correct
3. Ensure `RESEND_FROM_EMAIL` format is correct: `Name <email@domain.com>`
4. For testing, use `onboarding@resend.dev` as from email

### Build Failing

**Error:** Build errors on Vercel

**Solution:**
1. Check environment variables are set correctly
2. Verify `DATABASE_URL` is accessible from Vercel
3. Check Vercel build logs for specific errors
4. Try running `npm run build` locally to reproduce

### Private Key Issues

**Error:** "Invalid private key" or authentication issues

**Solution:**
1. Ensure entire PEM key is copied including:
   ```
   -----BEGIN RSA PRIVATE KEY-----
   (all content)
   -----END RSA PRIVATE KEY-----
   ```
2. In Vercel, wrap the key in double quotes
3. Make sure there are no extra spaces or characters

---

## Production Checklist

Before going live, verify:

- [ ] Custom domain added and DNS configured
- [ ] Domain verified in Resend for email
- [ ] GitHub App installed on required repositories
- [ ] All environment variables set correctly
- [ ] Database backups enabled in Supabase
- [ ] Cron job running (check Vercel logs)
- [ ] Authentication tested and working
- [ ] Webhook deliveries successful
- [ ] Email sending works
- [ ] Test creating/editing content
- [ ] Test with collaborators

---

## Monitoring & Maintenance

### View Logs

**Vercel Logs:**
1. Go to your project in Vercel
2. Click "Logs" tab
3. Filter by function (e.g., `/api/webhook/github`)

**GitHub Webhook Logs:**
1. Go to your GitHub App settings
2. Click "Advanced" → "Recent Deliveries"
3. Check delivery status and responses

### Database Management

**Supabase:**
1. Monitor usage in Supabase dashboard
2. Set up database backups (automatic in free tier)
3. Check connection pooling stats

### Update Pages CMS

When updates are available:

```bash
# Sync your fork with upstream
git remote add upstream https://github.com/pages-cms/pages-cms.git
git fetch upstream
git merge upstream/main
git push origin main

# Vercel auto-deploys on push
```

---

## Cost Estimate

| Service | Free Tier | Paid |
|---------|-----------|------|
| **Vercel** | 100GB bandwidth/month | $20/month (Pro) |
| **Supabase** | 500MB database, 2GB bandwidth | $25/month (Pro) |
| **Resend** | 3,000 emails/month | $20/month (10k emails) |
| **Total Free** | Sufficient for most use cases | - |
| **Total Paid** | - | ~$65/month (if needed) |

Most small-to-medium sites stay within free tiers!

---

## Next Steps

1. **Configure your first site** in Pages CMS
2. **Invite collaborators** to manage content
3. **Set up collections** based on your content structure
4. **Customize settings** per repository

---

## Support & Resources

- **Documentation**: https://pagescms.org/docs
- **Discord Community**: https://pagescms.org/chat
- **GitHub Issues**: https://github.com/pages-cms/pages-cms/issues
- **Vercel Support**: https://vercel.com/support
- **Supabase Support**: https://supabase.com/support

---

## Security Best Practices

1. **Rotate secrets** periodically (every 90 days):
   - `CRYPTO_KEY`
   - `GITHUB_APP_WEBHOOK_SECRET`
   - `CRON_SECRET`

2. **Monitor access**:
   - Review GitHub App installations regularly
   - Check webhook delivery logs for suspicious activity
   - Monitor Vercel logs for unusual patterns

3. **Database security**:
   - Enable row-level security in Supabase
   - Use strong passwords
   - Limit database access to Vercel IP ranges (if possible)

4. **Backup strategy**:
   - Enable automatic backups in Supabase
   - Export configuration periodically
   - Document your setup

---

🎉 **Congratulations!** Your Pages CMS is now deployed on Vercel and ready to use!
