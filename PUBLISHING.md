# Publishing Guide

This package uses **npm Trusted Publishers** for secure publishing without managing long-lived tokens.

## Prerequisites

npm Trusted Publishers requires npm CLI version 11.5.1 or later. If you're publishing manually, ensure you have the latest npm version:

```bash
npm install -g npm@latest
npm --version  # Should be 11.5.1 or higher
```

## First-Time Publishing (Required Before Trusted Publishers Setup)

Since the package doesn't exist on npm yet, you need to publish it manually for the first time:

### Step 1: Initial Manual Publish

```bash
# Login to npm (you'll need your npm account credentials)
npm login

# Build and test the package
npm run build
npm test

# Publish the initial version (1.0.0)
npm publish --access public

# Push any changes
git push --follow-tags
```

After this initial publish, the package will exist on npm and you can configure Trusted Publishers.

## One-Time Setup (After Initial Publish)

### 1. Configure npm Trusted Publisher

Once the package exists on npm, configure the Trusted Publisher:

1. Go to https://www.npmjs.com/package/brother-smooth-print-uri/access
2. Scroll to the **"Trusted Publisher"** section
3. Click **"Add trusted publisher"**
4. Select **"GitHub Actions"** as the provider
5. Fill in the required details:
   - **GitHub organization or username**: `lajtmaN`
   - **Repository name**: `brother-smooth-print-uri`
   - **Workflow filename**: `publish-npm.yml`
   - **Environment name**: (leave empty)

6. Click **"Add"** to save

> **Note**: This only needs to be done once per package. The Trusted Publisher configuration allows this specific GitHub Actions workflow to publish to npm without needing an NPM_TOKEN secret.

### 2. Verify Workflow Permissions

The workflow is already configured with the required permissions:
- `id-token: write` - Required for OIDC authentication
- `contents: write` - Required to push version bumps and tags

No additional GitHub secrets or tokens are needed!

## How to Publish (After Setup)

Once the Trusted Publisher is configured on npm, all future publishing is simple:

1. Go to the **Actions** tab in the GitHub repository
2. Select the **"Publish to npm"** workflow
3. Click **"Run workflow"**
4. Select the release type:
   - **patch** - Bug fixes (1.0.0 → 1.0.1)
   - **minor** - New features (1.0.0 → 1.1.0)
   - **major** - Breaking changes (1.0.0 → 2.0.0)
5. Click **"Run workflow"**

The workflow will automatically:
- Build and test the package
- Bump the version in package.json
- Publish to npm with provenance
- Create and push a git tag

## How It Works

npm Trusted Publishers uses OpenID Connect (OIDC) to authenticate GitHub Actions:
- No long-lived tokens to manage or rotate
- npm verifies the workflow identity automatically
- Enhanced security with cryptographic proof
- Provenance information is automatically included

## Troubleshooting

### "Package not found" or "Access denied"

Make sure you've completed the Trusted Publisher setup on npm (step 1 above).

### "id-token permission required"

The workflow already has `id-token: write` permission configured. This should not be an issue.

### Manual Publishing

If you need to publish manually (not recommended):

```bash
npm login
npm version patch  # or minor/major
npm publish --provenance --access public
git push --follow-tags
```

## Learn More

- [npm Trusted Publishers Documentation](https://docs.npmjs.com/trusted-publishers)
- [GitHub Actions OIDC](https://docs.github.com/en/actions/security-for-github-actions/security-hardening-your-deployments/about-security-hardening-with-openid-connect)
