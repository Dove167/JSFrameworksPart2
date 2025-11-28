# Lab 4 Screenshot Checklist

## Required Screenshots for Submission

### Authentication Flow
- [ ] **01-login-page.png** - Login page at http://localhost:3000/login
- [ ] **02-after-login.png** - After successful authentication
- [ ] **10-logout-process.png** - Logout functionality

### Dashboard & Projects
- [ ] **03-dashboard-logged-in.png** - Dashboard at http://localhost:3000/dashboard with user email
- [ ] **04-projects-page-edit-controls.png** - Projects page at http://localhost:3000/projects with edit/delete buttons visible

### Project Management
- [ ] **05-edit-page-before.png** - Edit page (http://localhost:3000/projects/[uuid]/edit) before changes
- [ ] **06-edit-page-after.png** - Edit page after updating fields
- [ ] **07-delete-confirmation.png** - Delete functionality confirmation

### Database/API Verification
- [ ] **08-project-creation-success.png** - Successful project creation
- [ ] **09-project-update-success.png** - Successful project updates

## Quick Testing URLs
1. **Home:** http://localhost:3000/
2. **Login:** http://localhost:3000/login
3. **Dashboard:** http://localhost:3000/dashboard (requires auth)
4. **Projects:** http://localhost:3000/projects (requires auth)
5. **New Project:** http://localhost:3000/projects/new (requires auth)
6. **Edit Project:** http://localhost:3000/projects/[uuid]/edit (requires auth)

## Expected Behaviors
- Unauthenticated users should be redirected to login
- Authenticated users should see dashboard with email
- Projects page should show edit/delete buttons when logged in
- Edit forms should be pre-filled with existing data
- CRUD operations should work and persist to database

## Server Status
✅ Development server running at http://localhost:3000
✅ Auth0 credentials configured
✅ Database connected (Neon)

## Notes
- Save all screenshots in `lab4-documentation/` folder
- Use the exact filenames provided
- Ensure all functionality is working before capturing screenshots