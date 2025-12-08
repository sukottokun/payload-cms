# Digital Ocean Deployment Guide

This guide will help you deploy your Payload CMS application to Digital Ocean App Platform.

## Prerequisites

1. A Digital Ocean account
2. A GitHub repository with your code
3. A PostgreSQL database (can be created via Digital Ocean)

## Step 1: Prepare Your Repository

1. Make sure your code is pushed to GitHub
2. Update the `.do/app.yaml` file with your GitHub repository details:
   - Replace `YOUR_GITHUB_USERNAME/YOUR_REPO_NAME` with your actual repository path

## Step 2: Create a PostgreSQL Database

### Option A: Using Digital Ocean Managed Database (Recommended)

1. Go to your Digital Ocean dashboard
2. Navigate to **Databases** → **Create Database**
3. Choose **PostgreSQL** (version 15 or higher)
4. Select a region close to your app
5. Choose a plan (Basic plan is fine to start)
6. Create a database name (e.g., `payloadcms`)
7. Note the connection details (host, port, database name, username, password)

### Option B: Using App Platform Database Component

The `.do/app.yaml` file includes a database configuration that will create a managed PostgreSQL database automatically when you deploy.

## Step 3: Generate Required Secrets

1. Generate a `PAYLOAD_SECRET`:
   ```bash
   openssl rand -base64 32
   ```
   Save this value - you'll need it for the deployment.

## Step 4: Deploy via Digital Ocean App Platform

### Method 1: Using the App Spec File (Recommended)

1. Go to Digital Ocean dashboard → **App Platform**
2. Click **Create App**
3. Select **GitHub** as your source
4. Choose your repository
5. Digital Ocean will detect the `.do/app.yaml` file
6. Review the configuration and click **Next**

### Method 2: Manual Configuration

If you prefer to configure manually:

1. Go to Digital Ocean dashboard → **App Platform**
2. Click **Create App**
3. Connect your GitHub repository
4. Configure the build settings:
   - **Build Command**: `pnpm install && pnpm run build`
   - **Run Command**: `pnpm start`
   - **Environment**: Node.js
   - **Node Version**: 20.x or higher
5. Add environment variables:
   - `NODE_ENV`: `production`
   - `PORT`: `3000`
   - `DATABASE_URI`: Your PostgreSQL connection string
   - `PAYLOAD_SECRET`: The secret you generated in Step 3
   - `NODE_OPTIONS`: `--no-deprecation`

## Step 5: Configure Environment Variables

In the App Platform settings:

1. Go to **Settings** → **App-Level Environment Variables**
2. Add the following variables:
   - `DATABASE_URI`: Your PostgreSQL connection string
     - Format: `postgresql://user:password@host:port/database`
     - You can find this in your database settings
   - `PAYLOAD_SECRET`: The secret you generated
   - `NODE_ENV`: `production`
   - `PORT`: `3000`

## Step 6: Configure Database Connection

If you're using a managed database:

1. In your App Platform app settings, go to **Components**
2. If you added a database component, it should be listed
3. The connection string will be automatically available as `DATABASE_URI`
4. If using an external database, add the connection string manually

## Step 7: Deploy

1. Review all settings
2. Click **Create Resources** or **Deploy**
3. Wait for the build and deployment to complete
4. Your app will be available at the provided URL

## Step 8: Create Your First Admin User

1. Visit your deployed app URL
2. Navigate to `/admin`
3. Follow the on-screen instructions to create your first admin user

## Post-Deployment

### Health Checks

The app includes health check configuration. Monitor your app in the Digital Ocean dashboard to ensure it's running properly.

### Scaling

You can scale your app by:
1. Going to **Settings** → **App Spec**
2. Adjusting `instance_count` and `instance_size_slug`
3. Redeploying

### Custom Domain

1. Go to **Settings** → **Domains**
2. Add your custom domain
3. Follow the DNS configuration instructions

### Media Storage

By default, media files are stored locally. For production, consider:
- Using Digital Ocean Spaces (S3-compatible storage)
- Configuring Payload to use cloud storage
- See [Payload Storage Documentation](https://payloadcms.com/docs/upload/overview)

## Troubleshooting

### Build Failures

- Check the build logs in the Digital Ocean dashboard
- Ensure Node.js version is 20.x or higher
- Verify all environment variables are set correctly

### Database Connection Issues

- Verify the `DATABASE_URI` is correct
- Check that your database allows connections from App Platform
- Ensure the database is in the same region as your app

### App Not Starting

- Check the runtime logs
- Verify `PAYLOAD_SECRET` is set
- Ensure `DATABASE_URI` is correct and accessible

## Additional Resources

- [Digital Ocean App Platform Documentation](https://docs.digitalocean.com/products/app-platform/)
- [Payload CMS Documentation](https://payloadcms.com/docs)
- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)

