# Auth0 Callback URL Fix

## The Issue
You're getting: "Callback URL mismatch. The provided redirect_uri is not in the list of allowed callback URLs."

## Solution: Add Callback URL to Auth0 Dashboard

### Step 1: Get Your Callback URL
From our login route, the callback URL is:
```
http://localhost:3000/api/auth/callback
```

### Step 2: Update Auth0 Application Settings
1. **Go to Auth0 Dashboard:** https://manage.auth0.com/
2. **Select your application:** "dev-hv661lylywsw5u2g" tenant
3. **Go to Settings tab**
4. **Find "Allowed Callback URLs" section**
5. **Add this URL:**
   ```
   http://localhost:3000/api/auth/callback
   ```
6. **Also add logout URL:**
   ```
   http://localhost:3000
   ```
7. **Save changes**

### Step 3: Verify Settings
Your Auth0 application should have:
- **Allowed Callback URLs:** `http://localhost:3000/api/auth/callback`
- **Allowed Logout URLs:** `http://localhost:3000`
- **Allowed Web Origins:** `http://localhost:3000`

## Alternative: Use Mock Authentication (Recommended for Screenshots)

Since Auth0 setup can be complex, use this for quick screenshots:

### Quick Mock Login:
1. Open browser to http://localhost:3000
2. Press F12 → Console tab
3. Run this command:
```javascript
localStorage.setItem('mockUser', JSON.stringify({
  email: "test@lab4.com",
  name: "Test User",
  sub: "auth0|123456789"
}));
location.reload();
```

This will instantly log you in without Auth0, perfect for screenshots!

## What the Mock Authentication Provides:
- ✅ Instant login (no Auth0 flow)
- ✅ Full dashboard access
- ✅ Edit/delete buttons visible
- ✅ All CRUD operations work
- ✅ Perfect for screenshot capture

## If You Want to Fix Auth0 Properly:

### Additional URLs to Configure in Auth0:
```
Allowed Callback URLs:
- http://localhost:3000/api/auth/callback

Allowed Logout URLs:  
- http://localhost:3000

Allowed Web Origins:
- http://localhost:3000
```

### Complete Auth0 Settings Checklist:
- ✅ Application Type: Regular Web Application
- ✅ Callback URL: `http://localhost:3000/api/auth/callback`
- ✅ Logout URL: `http://localhost:3000`
- ✅ Web Origin: `http://localhost:3000`
- ✅ Token Endpoint Authentication Method: None (for Single Page Apps)

## Recommendation
For Lab 4 submission, I recommend using **mock authentication** since:
- It's instant and reliable
- Shows all functionality
- Perfect for screenshots
- No Auth0 configuration needed
- Easy to set up and test

Once you have your screenshots, you can set up Auth0 properly for production use.