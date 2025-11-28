# Lab 4 Screenshot Capture Guide

## Prerequisites
- Development server is running at http://localhost:3000
- Auth0 credentials are configured
- Neon database is connected

## Screenshot Capture Instructions

### 1. Authentication Flow Screenshots

#### 1.1 Login Page Screenshot
**URL:** http://localhost:3000/login
**Instructions:**
1. Open browser and navigate to http://localhost:3000/login
2. You should see the Auth0 login interface
3. Take a screenshot showing the login page
4. **Save as:** `01-login-page.png`

#### 1.2 Complete Login Process
**Instructions:**
1. Use Auth0 credentials (configured in .env)
2. Complete the authentication process
3. You should be redirected to the dashboard
4. **Save as:** `02-after-login.png`

### 2. Dashboard While Logged In

#### 2.1 Dashboard Page
**URL:** http://localhost:3000/dashboard
**Instructions:**
1. Navigate to http://localhost:3000/dashboard
2. Should show dashboard with user email displayed
3. Verify authentication is working
4. **Save as:** `03-dashboard-logged-in.png`

### 3. Project List with Edit/Delete Controls

#### 3.1 Projects Page
**URL:** http://localhost:3000/projects
**Instructions:**
1. Navigate to http://localhost:3000/projects
2. Ensure edit/delete buttons are visible on project cards
3. Take screenshot showing projects page with visible controls
4. **Save as:** `04-projects-page-edit-controls.png`

### 4. Project Edit Page - Before/After

#### 4.1 Edit Page (Before Changes)
**URL Pattern:** http://localhost:3000/projects/[uuid]/edit
**Instructions:**
1. Click on an existing project's "Edit" button
2. Screenshot the pre-filled edit form with existing data
3. **Save as:** `05-edit-page-before.png`

#### 4.2 Edit Page (After Changes)
**Instructions:**
1. Update some fields in the edit form
2. Take screenshot showing the updated form
3. **Save as:** `06-edit-page-after.png`

#### 4.3 Delete Functionality
**Instructions:**
1. Test the delete functionality
2. Capture confirmation dialog
3. **Save as:** `07-delete-confirmation.png`

### 5. Database/API Verification Screenshots

#### 5.1 Project Creation Success
**URL:** http://localhost:3000/projects/new
**Instructions:**
1. Navigate to create new project page
2. Fill out the form and submit
3. Screenshot showing successful project creation
4. **Save as:** `08-project-creation-success.png`

#### 5.2 Project Updates Success
**Instructions:**
1. Go to an existing project's edit page
2. Make changes and save
3. Screenshot showing successful updates
4. **Save as:** `09-project-update-success.png`

### 6. Additional Verification

#### 6.1 Logout Functionality
**Instructions:**
1. Click the logout button
2. Screenshot showing logout process
3. **Save as:** `10-logout-process.png`

## Important Notes

1. **Screenshot Quality:** Ensure all screenshots are clear and readable
2. **File Organization:** Save all screenshots in the `lab4-documentation` folder
3. **Naming Convention:** Use the provided naming convention for easy identification
4. **Authentication:** Make sure to complete the full authentication flow
5. **Data Persistence:** Verify that changes are reflected in the database

## Testing Checklist

- [ ] Login page is accessible and displays correctly
- [ ] Authentication redirects to dashboard properly
- [ ] Dashboard shows logged-in user information
- [ ] Projects page shows edit/delete buttons when authenticated
- [ ] Edit functionality works with pre-filled forms
- [ ] Update functionality persists changes
- [ ] Delete functionality shows confirmation
- [ ] Logout functionality works properly
- [ ] All screenshots are saved in correct format

## Expected URLs to Test

- http://localhost:3000/ (home page)
- http://localhost:3000/login (authentication)
- http://localhost:3000/dashboard (authenticated dashboard)
- http://localhost:3000/projects (project list)
- http://localhost:3000/projects/new (create project)
- http://localhost:3000/projects/[uuid]/edit (edit project)

## Configuration Verification

- Auth0 is configured with proper credentials
- Database connection is working
- Middleware is protecting authenticated routes
- API endpoints are responding correctly