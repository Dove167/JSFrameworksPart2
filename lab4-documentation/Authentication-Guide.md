# Authentication Guide for Lab 4 Screenshots

## Current Status
Your application has Auth0 configured with:
- **Auth0 Tenant:** https://dev-hv661lylywsw5u2g.us.auth0.com
- **Client ID:** wcuxoEvliq4nmrQYExmq4JXJy6p6W3eP
- **Base URL:** http://localhost:3000

## Authentication Options

### Option 1: Auth0 Development Account (Recommended)
You need to create a test user in your Auth0 tenant:

1. **Visit Auth0 Dashboard:**
   - Go to https://manage.auth0.com/
   - Log in with your Auth0 account
   - Select your development tenant: "dev-hv661lylywsw5u2g"

2. **Create Test User:**
   - Go to User Management > Users
   - Click "Create User"
   - Use any email/password combination (e.g., test@example.com / Test123456!)
   - This will be your login credentials for screenshots

### Option 2: Social Login (If Configured)
If GitHub social connection is enabled in Auth0:
- Click "Log in with GitHub" on the login page
- Use your GitHub credentials
- Your GitHub email will be displayed on the dashboard

### Option 3: Temporary Bypass (For Testing)
If authentication is blocking your screenshots, you can:

1. **Check middleware.ts** - temporarily comment out authentication checks
2. **Mock authentication** - add a test user session
3. **Direct navigation** - access protected routes directly for screenshots

## Quick Setup Steps

### For Immediate Screenshots:
1. Create a test user in Auth0 dashboard
2. Use those credentials to log in
3. Capture all required screenshots
4. Document the authentication flow

### Auth0 User Creation:
```
Email: test@lab4.com
Password: Lab4Test123!
```

## Current Authentication Implementation Issue

The current code shows placeholder implementations:
- `/api/auth/[auth0]/route.js` returns placeholder responses
- `/src/lib/auth0.js` has basic implementations
- Login button points to `/api/auth/login` but route isn't fully implemented

## Recommended Next Steps

### Option A: Complete Auth0 Implementation
1. Install proper Auth0 Next.js SDK
2. Implement proper login/logout handlers
3. Set up session management
4. Test with created user account

### Option B: Mock Authentication (For Screenshots)
1. Modify middleware to bypass auth for testing
2. Add mock user session
3. Proceed with screenshot capture
4. Restore authentication later

### Option C: Use Auth0 Dashboard Directly
1. Create test user as described above
2. Test login flow manually
3. Capture screenshots during testing
4. Document any issues found

## For Lab 4 Submission

**Recommended approach:**
1. Create test user in Auth0 dashboard
2. Use those credentials for login screenshots
3. Capture all required functionality screenshots
4. Document the authentication flow used

## Troubleshooting

### If Login Page Shows Errors:
- Check Auth0 tenant is active
- Verify CLIENT_ID and CLIENT_SECRET are correct
- Ensure callback URLs are configured for localhost:3000

### If Authentication Doesn't Work:
- The current implementation appears incomplete
- Consider using Option B (mock authentication) for screenshots
- Document this in your lab submission

### For Quick Testing:
You can temporarily modify the app to bypass authentication:
1. Comment out auth checks in middleware
2. Add mock user data
3. Proceed with screenshot capture
4. Restore authentication afterward

## Expected Behavior After Login

Once authentication is working:
- Login redirects to `/dashboard`
- Dashboard shows user email
- Projects page shows Edit/Delete buttons
- All CRUD operations work with authenticated user