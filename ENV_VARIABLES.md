# Required Environment Variables

This document lists all the environment variables required for your Payload CMS deployment on Digital Ocean.

## Required Variables

### `PAYLOAD_SECRET`
- **Description**: Secret key used by Payload CMS for encryption and security
- **How to generate**: Run `openssl rand -base64 32` in your terminal
- **Example**: `aBc123XyZ789...` (64 character base64 string)
- **Required**: Yes
- **Scope**: Both build and runtime

### `DATABASE_URI`
- **Description**: PostgreSQL connection string
- **Format**: `postgresql://username:password@host:port/database`
- **Example**: `postgresql://payloadcms:password123@db.example.com:25060/payloadcms?sslmode=require`
- **Required**: Yes
- **Scope**: Both build and runtime
- **Note**: If using Digital Ocean managed database, you can find this in the database connection details

### `NODE_ENV`
- **Description**: Node.js environment
- **Value**: `production`
- **Required**: Yes (for production)
- **Scope**: Both build and runtime

### `PORT`
- **Description**: Port the application listens on
- **Value**: `3000` (default)
- **Required**: No (defaults to 3000)
- **Scope**: Runtime only

## Optional Variables

### `NODE_OPTIONS`
- **Description**: Node.js runtime options
- **Build time**: `--no-deprecation --max-old-space-size=8000`
- **Runtime**: `--no-deprecation`
- **Required**: No
- **Note**: Helps with build memory and suppresses deprecation warnings

## Setting Variables in Digital Ocean

1. Go to your App Platform app
2. Navigate to **Settings** → **App-Level Environment Variables**
3. Click **Edit** or **Add Variable**
4. For secrets (`PAYLOAD_SECRET`, `DATABASE_URI`), select **Encrypted** or **Secret** type
5. Enter the variable name and value
6. Save and redeploy if needed

## Local Development

For local development, create a `.env` file in the project root with:

```env
PAYLOAD_SECRET=it5g4qO4XyY539zvyMRVrlu5sEFZLDOcRLMu2oMAAp0=
DATABASE_URI=postgresql://user:password@localhost:5432/payloadcms
NODE_ENV=development
PORT=3000
```

**Note**: Never commit your `.env` file to version control. It's already in `.gitignore`.

