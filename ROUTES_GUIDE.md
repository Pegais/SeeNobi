# SeeNobi Platform - UI Routes Guide

This document lists all available routes in the application for easy navigation and testing.

## Quick Start

1. Navigate to `client/` directory
2. Run `npm install`
3. Run `npm start`
4. The app will open at http://localhost:3000

## All Available Routes

### Public Routes (No Authentication Required)

#### Home & Landing
- **`/`** - Home page with platform overview, features, and statistics
  - Features showcase
  - Platform statistics
  - Call-to-action buttons

#### Authentication
- **`/login`** - Login page
  - Email and password form
  - Mock login (stores user in localStorage)
  
- **`/register`** - Registration page
  - User type selection (Citizen, Government Official, Private Player)
  - Email, phone, password fields
  - Mock registration

#### Issues (Public View)
- **`/issues`** - List all issues
  - Filter by status and category
  - Grid view of all issues
  - Shows verification badges
  
- **`/issues/:id`** - Issue detail page
  - Full issue information
  - Images
  - Verification status
  - Notes from officials
  - Area weighting information
  - Link to rate official

### Citizen Routes

#### Dashboard
- **`/citizen/dashboard`** - Citizen dashboard
  - Trust score and civic sense score display
  - Statistics (total issues, resolved)
  - List of citizen's submitted issues
  - Issue status badges

#### Profile
- **`/citizen/profile`** - Citizen profile
  - Display name (anonymous)
  - Trust score and civic sense score
  - ITR verification status
  - Addresses with geotagging

#### Issue Submission
- **`/citizen/submit-issue`** - Submit new issue
  - Title, description, category
  - Geotagging (latitude/longitude)
  - Image upload
  - Form validation

### Government Official Routes

#### Dashboard
- **`/official/dashboard`** - Official dashboard
  - Official name and department
  - Trust score and civic sense score
  - Assigned issues count
  - Resolved issues count
  - Filterable list of assigned issues
  - Status badges

#### Profile
- **`/official/profile/:id`** - Official public profile
  - Official name and department (PUBLIC)
  - Trust score, civic sense score, average rating
  - Verification status
  - Performance statistics
  - Recent ratings from citizens
  - Links to rate and view poll

### Private Player Routes

#### Dashboard
- **`/private-player/dashboard`** - Private player dashboard
  - Company name
  - Trust score and civic sense score
  - Related issues count
  - Reputation status
  - Filterable list of related issues

#### Profile
- **`/private-player/profile/:id`** - Private player public profile
  - Company name (PUBLIC, optional)
  - Trust score, civic sense score, average rating
  - Verification status
  - Business information
  - Ratings from citizens
  - Links to rate and view poll

### Rating System

- **`/rating/government_official/:entityId`** - Rate a government official
  - Rating criteria: Response time, Resolution quality, Communication, Accountability, Overall performance
  - Issue-based rating (if issueId in query params)
  - Direct interaction checkbox
  - Trust score > 4 requirement notice
  
- **`/rating/private_player/:entityId`** - Rate a private player
  - Rating criteria: Grievance resolution, Service quality, Compliance, Transparency, Community contribution, Overall reliability
  - Issue-based rating (if issueId in query params)
  - Direct interaction checkbox

### Polling System

- **`/polling/government_official/:entityId`** - Verification poll for official
  - Poll results display
  - Vote on verification status
  - Vote on in-service status
  - Weighted voting information
  
- **`/polling/private_player/:entityId`** - Verification poll for private player
  - Poll results display
  - Vote on verification status
  - Weighted voting information

### Verification

- **`/verification`** - Submit verification request
  - User type selection
  - Government Official: Employee ID, official email, ID card upload
  - Private Player: Company name, registration, GST, license, PAN, documents upload
  - Citizen: Info message (verified through phone/email/ID)

### Analytics

- **`/analytics`** - Platform analytics dashboard
  - Total users, issues, resolved issues
  - Resolution rate
  - Average trust score and civic sense score
  - Issues by category (bar chart)
  - Issues by status (status cards)

## Mock Data

All routes use mock data from `client/src/data/mockData.js`:
- 3 mock issues
- 3 mock users (citizen, official, private player)
- 1 mock rating
- 1 mock poll
- Mock analytics data

## Testing Flow

### As a Citizen:
1. Start at `/` (Home)
2. Go to `/register` and register as Citizen
3. Navigate to `/citizen/dashboard`
4. Click "Submit New Issue" → `/citizen/submit-issue`
5. View issues at `/issues`
6. Click an issue → `/issues/issue-001`
7. Rate the official → `/rating/government_official/official-001?issueId=issue-001`
8. View profile → `/citizen/profile`

### As a Government Official:
1. Register as Government Official at `/register`
2. Navigate to `/official/dashboard`
3. View assigned issues
4. Click issue to view details
5. View public profile → `/official/profile/official-001`
6. Check verification poll → `/polling/government_official/official-001`

### As a Private Player:
1. Register as Private Player at `/register`
2. Navigate to `/private-player/dashboard`
3. View related issues
4. View public profile → `/private-player/profile/private-001`
5. Check verification poll → `/polling/private_player/private-001`

### General Navigation:
1. View all issues → `/issues`
2. Filter and browse issues
3. View analytics → `/analytics`
4. Submit verification → `/verification`

## Key Features to Test

1. **Area-Based Weighting**: Check issue detail pages for priority multiplier
2. **Verification Badges**: See verification reasons on verified issues
3. **Rating System**: Test rating forms for both officials and private players
4. **Polling System**: View poll results and cast votes
5. **Anonymous Display**: Citizens show as "Citizen_12345"
6. **Public Display**: Officials show real name and department
7. **Trust & Civic Sense Scores**: Displayed throughout the app
8. **Status Tracking**: Issues show status badges and workflow

## Notes

- All authentication is mocked (localStorage)
- All data is from mockData.js
- No backend connection required
- All routes are functional for UI testing
- Forms submit with alerts (mock behavior)

## Next Steps

After reviewing the UI:
1. Decide on any UI/UX changes
2. Confirm data structures match requirements
3. Proceed with backend implementation
4. Connect frontend to backend APIs

