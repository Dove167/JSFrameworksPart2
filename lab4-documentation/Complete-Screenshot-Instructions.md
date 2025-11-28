# Lab 4 Complete Screenshot Instructions

## Overview
Your development server is running at http://localhost:3000 with:
- ✅ Auth0 authentication configured
- ✅ Neon database connected with 7 sample projects
- ✅ Full CRUD functionality implemented

## Sample Projects Available for Testing
The database contains these projects you can edit/delete:
1. **Conway's Game of Life** (React/TypeScript)
2. **Github Contribution Calendar** (JavaScript/API)
3. **Wordle App Replica** (JavaScript/HTML/CSS)
4. **Project Four** (Template)
5. **Project Five** (Template)
6. **Project Six** (Template)
7. **Project Seven** (Template)

## Required Screenshots (in order)

### 1. Authentication Flow
1. **01-login-page.png**
   - Navigate to: http://localhost:3000/login
   - Screenshot the Auth0 login interface

2. **02-after-login.png**
   - Complete login process using Auth0 credentials
   - Screenshot after successful authentication

### 2. Dashboard & Project Management
3. **03-dashboard-logged-in.png**
   - Navigate to: http://localhost:3000/dashboard
   - Should show user email and dashboard content

4. **04-projects-page-edit-controls.png**
   - Navigate to: http://localhost:3000/projects
   - Screenshot showing projects with visible Edit/Delete buttons

### 3. Edit Functionality (Before/After)
5. **05-edit-page-before.png**
   - Click "Edit" on any project card
   - Navigate to: http://localhost:3000/projects/[uuid]/edit
   - Screenshot pre-filled form with existing data

6. **06-edit-page-after.png**
   - Make changes to project fields
   - Screenshot the form with updated values

### 4. Delete Functionality
7. **07-delete-confirmation.png**
   - Click "Delete" button on a project
   - Screenshot the confirmation dialog

### 5. Project Creation & Updates
8. **08-project-creation-success.png**
   - Navigate to: http://localhost:3000/projects/new
   - Create a new project
   - Screenshot success confirmation

9. **09-project-update-success.png**
   - Edit an existing project
   - Save changes
   - Screenshot successful update

### 6. Logout
10. **10-logout-process.png**
    - Click logout button
    - Screenshot logout process

## Quick Testing Steps

### Pre-Screenshot Testing
1. Open browser to http://localhost:3000/
2. Verify server is running (should see home page)
3. Navigate to http://localhost:3000/login
4. Complete authentication with Auth0
5. Verify redirect to dashboard

### For Edit Screenshots
- Use any of the sample projects (preferably Conway's Game of Life or GitHub Contribution Calendar)
- Edit button should be visible on each project card
- Edit form should be pre-filled with existing data
- Update title, description, or keywords to show "after" state

### For Delete Screenshots
- Use "Project Seven" or any template project for deletion testing
- Delete confirmation should appear
- Project should be removed from list

## Troubleshooting

### If Authentication Fails
- Check .env file has correct Auth0 credentials
- Ensure Auth0 application is configured for localhost:3000
- Verify AUTH0_BASE_URL matches your local URL

### If Database Issues
- Check NEON_DB_URL in .env
- Verify Neon database is active
- Database should auto-seed with 7 projects on first run

### If Edit/Delete Buttons Missing
- Ensure you're logged in (authentication required)
- Buttons should only appear for authenticated users
- Check browser console for any errors

## Expected Behavior Verification

### Authentication Flow
- Unauthenticated users → redirected to login
- After login → redirected to dashboard
- User email displayed on dashboard

### Project Management
- Edit/Delete buttons visible when authenticated
- Edit form pre-filled with existing project data
- Changes persist after save
- Delete removes project from database

### UI/UX
- Clean, professional interface
- Proper error handling
- Loading states where appropriate
- Responsive design

## File Organization
Save all screenshots in `lab4-documentation/` folder with exact filenames:
- 01-login-page.png
- 02-after-login.png
- 03-dashboard-logged-in.png
- 04-projects-page-edit-controls.png
- 05-edit-page-before.png
- 06-edit-page-after.png
- 07-delete-confirmation.png
- 08-project-creation-success.png
- 09-project-update-success.png
- 10-logout-process.png

## Submission Checklist
- [ ] All 10 screenshots captured
- [ ] Screenshots clearly show functionality
- [ ] Authentication flow documented
- [ ] CRUD operations demonstrated
- [ ] Files saved in correct location
- [ ] Screenshots are high quality and readable