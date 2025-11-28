# 🥷 SeeNobi - Decentralized Civic Engagement Platform

> **"See Nobi" - A platform where citizens become the eyes and voice of their communities, ensuring accountability and transparency in governance.**

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 🌟 What is SeeNobi?

**SeeNobi** is a revolutionary decentralized civic engagement platform that empowers citizens to report local issues, hold government officials and private contractors accountable, and build a transparent, trust-based ecosystem for civic participation. 

The platform uses **geotagging**, **trust scoring**, **civic sense metrics**, and **citizen-driven verification** to ensure that local voices are heard and prioritized, creating a more responsive and accountable governance system.

---

## 🎯 Why SeeNobi Matters in Today's World

### The Problem

In today's world, citizens face numerous challenges when trying to engage with their local governments:

- **Lack of Transparency**: Citizens have no visibility into how their grievances are being handled
- **No Accountability**: Officials and contractors face no consequences for poor performance
- **Location Bias**: Issues from outside areas often get ignored, while local problems remain unresolved
- **Trust Deficit**: No system to verify the credibility of reports or the performance of officials
- **No Incentives**: Good civic behavior and responsible governance go unrecognized
- **Centralized Control**: Traditional systems have single points of failure and lack citizen participation

### The Solution

SeeNobi addresses these challenges by:

✅ **Decentralized Verification**: No super admin - citizens verify officials and reports through weighted polling  
✅ **Location-Based Prioritization**: Local residents have more say in their area's issues  
✅ **Trust & Civic Sense Scoring**: Gamified system that rewards good behavior and accurate reporting  
✅ **Public Accountability**: Officials and contractors are publicly rated based on real performance  
✅ **Transparent Workflow**: Every report, verification, and rating is visible to the community  
✅ **Citizen-Driven Governance**: The platform is built for citizens, by citizens  

---

## 🚀 Key Features

### 📍 **Geotagged Issue Reporting**
- Report local issues with precise GPS coordinates
- Automatic location detection with accuracy indicators
- Map-based location selection or address input
- Document verification for address accuracy
- Location-based post prioritization in feed

### 🎮 **Gamified Scoring System**

#### **Trust Score (1-10)**
- **Level 1-3**: Basic verification (phone, email, ID)
- **Level 4-6**: Active engagement (reports submitted)
- **Level 7-10**: Verified correct reports (official verification)

#### **Civic Sense Score (0-100)**
- Local engagement (25% weight)
- Thoughtful sharing (20% weight)
- Proper communication (15% weight)
- Logic & emotional balance (15% weight)
- Environment-friendly actions (10% weight)
- Constructive engagement (10% weight)
- Tax compliance (5% weight)

### 🏅 **Achievement Badges**
- Verified reports badge
- Tax compliance badge
- Community leader badge
- Local hero badge
- Master trust badge

### 👥 **Three User Types**

#### **1. Citizens**
- Anonymous reporting (privacy-first)
- Trust and civic sense scoring
- Rate officials and private players
- Participate in verification polls
- ITR verification for additional weightage

#### **2. Government Officials**
- Public profile (name and department visible)
- Verify and resolve citizen reports
- Track performance metrics
- Public reputation ratings
- Citizen polling for verification

#### **3. Private Players (Contractors/Companies)**
- Company verification via documents
- Respond to grievances
- Public reputation management
- Performance tracking
- Citizen polling for legitimacy

### ⭐ **Rating System**
- Issue-based ratings for officials/contractors
- General reputation scores
- Area-weighted ratings (locals have more weight)
- Abuse prevention (one rating per citizen per issue)
- Trust score requirement (>4) to rate

### 🗳️ **Citizen Polling**
- Verify government officials (employee ID + email + polling)
- Verify private players (documents + polling)
- Weighted by citizen trust scores and area belonging
- Transparent aggregation of results

### 📱 **Social Media-Style Feed**
- Instagram/LinkedIn-style post feed
- Location-based sorting (local issues first)
- Like/dislike reactions (YouTube-style)
- Independent scrolling sections
- Real-time updates ready

### 🎨 **Modern UI/UX**
- Dark mode and warm white light mode
- Mobile-first responsive design
- Smooth animations and transitions
- Intuitive navigation
- Accessible design

---

## 🏗️ Architecture Overview

### **Technology Stack**

**Frontend:**
- React 18.2.0
- React Router 6
- Leaflet (OpenStreetMap integration)
- CSS3 with CSS Variables (theming)
- LocalStorage (caching)

**Backend (Planned):**
- Node.js (Express) - Microservices architecture
- MongoDB (data storage)
- Redis (caching, WebSocket sessions)
- AWS S3 (media storage)
- WebSocket (Socket.io) - Real-time updates

### **Core Principles**

1. **No Super Admin**: Citizen-driven verification and governance
2. **Area-Based Weighting**: "Those belonging to that area will have more say"
3. **Transparency**: All actions are visible and auditable
4. **Privacy**: Citizens remain anonymous at frontend, verified at backend
5. **Trust-Based**: Higher trust scores = more influence
6. **Performance-Focused**: Ratings based on real work, not personality

---

## 📋 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd seeNobi
   ```

2. **Install dependencies**
   ```bash
   cd client
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

### First Steps

1. **Explore the Home Feed**: See location-based issue posts
2. **Register/Login**: Create an account (mock authentication)
3. **Submit an Issue**: Report a local problem with geotagging
4. **Verify Address**: Use map selection or address input with document upload
5. **View Dashboard**: Check your trust score and civic sense score
6. **Rate Officials**: Provide feedback on performance (trust score >4 required)

---

## 🎯 Core Tasks & Workflows

### **For Citizens**

1. **Report Issues**
   - Submit local problems with geotagging
   - Upload images and descriptions
   - Track issue status and resolution

2. **Build Trust**
   - Verify identity (phone, email, ID)
   - Submit accurate reports
   - Get reports verified by officials
   - Maintain good civic sense score

3. **Participate in Governance**
   - Rate officials and contractors
   - Vote in verification polls
   - Verify ITR for additional weightage

### **For Government Officials**

1. **Verify Identity**
   - Upload employee ID
   - Verify official email domain
   - Pass citizen polling verification

2. **Manage Issues**
   - View assigned issues
   - Update status (Under Review → In Progress → Resolved)
   - Add notes and updates
   - Mark reports as verified

3. **Build Reputation**
   - Respond quickly to issues
   - Resolve problems effectively
   - Maintain high performance ratings
   - Earn public recognition

### **For Private Players**

1. **Verify Business**
   - Upload company documents (CIN/GST/License/PAN)
   - Pass citizen polling verification
   - Build business reputation

2. **Respond to Grievances**
   - Address issues filed against company
   - Maintain service quality
   - Build market trust

---

## 📊 Scoring & Verification

### **Trust Score Calculation**

```
Level 1-3: Basic Verification
├── Phone verification: +1
├── Email verification: +1
└── Government ID upload: +1

Level 4-6: Active Engagement
├── First report: +1
├── 5 reports: +1
└── 10 reports: +1

Level 7-10: Verified Reports
├── 1 verified report: +1 (→ 7)
├── 3 verified reports: +1 (→ 8)
├── 5 verified reports: +1 (→ 9)
└── 10 verified reports: +1 (→ 10)
```

### **Civic Sense Score Factors**

- **Local Engagement** (25%): Reports in your area get more points
- **Thoughtful Sharing** (20%): Detailed descriptions, evidence, suggestions
- **Proper Communication** (15%): No profanity, blaming, or shaming
- **Logic & Balance** (15%): Fact-based, emotionally balanced
- **Environment Friendly** (10%): Eco-conscious reporting
- **Constructive Engagement** (10%): Follow-ups, resolutions
- **Tax Compliance** (5%): ITR verification bonus

### **Area-Based Weighting**

- **Local Residents**: 2.0x multiplier (highest priority)
- **Adjacent Areas**: 1.5x multiplier (medium priority)
- **Outside Areas**: 1.0x multiplier (standard priority)
- **Direct Interaction**: +1.2x multiplier (additional weight)

---

## 🔐 Security & Privacy

- **PII Encryption**: Personal information encrypted at rest
- **Anonymous Frontend**: Citizens remain anonymous in UI
- **Verified Backend**: Identity verified but not exposed
- **JWT Authentication**: Secure token-based auth
- **Document Verification**: Address verification via government documents
- **Abuse Prevention**: One rating per citizen per issue, trust score gates

---

## 📱 Available Routes

### **Public Routes**
- `/` - Home feed with location-based posts
- `/login` - User authentication
- `/register` - New user registration
- `/issues` - Browse all issues
- `/issues/:id` - Issue detail page

### **Citizen Routes**
- `/citizen/dashboard` - Personal dashboard
- `/citizen/profile` - Profile management
- `/citizen/submit-issue` - Report new issue
- `/citizen/verify-address` - Address verification (map/address input)

### **Official Routes**
- `/official/dashboard` - Official dashboard
- `/official/profile/:id` - Public official profile

### **Private Player Routes**
- `/private-player/dashboard` - Company dashboard
- `/private-player/profile/:id` - Public company profile

### **Rating & Polling**
- `/rating/:entityType/:entityId` - Rate officials/contractors
- `/polling/:entityType/:entityId` - Participate in verification polls

---

## 🎨 Theming

SeeNobi supports two themes:

- **Dark Mode**: Modern dark theme (default)
- **Warm White Light Mode**: Eye-friendly light theme

Toggle between themes using the theme switcher in the navigation bar.

---

## 🚧 Current Status

### ✅ **Implemented**
- Frontend UI/UX (React)
- Social media-style feed
- Location-based post sorting
- Map integration (Leaflet)
- Address verification (map + address input)
- Trust & civic sense score display
- Like/dislike reactions
- Theme switching (dark/light)
- Responsive design (mobile-first)
- Mock data and authentication

### 🚧 **In Progress / Planned**
- Backend microservices architecture
- Real-time WebSocket updates
- Document upload to S3
- Full authentication system
- Database integration
- Analytics dashboard
- Notification system

---

## 🤝 Contributing

SeeNobi is built for the community, by the community. Contributions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- OpenStreetMap for map tiles
- Leaflet for map integration
- React community for excellent tools
- All citizens working towards better governance

---

## 📞 Contact & Support

For questions, suggestions, or support:
- Open an issue on GitHub
- Contact the development team

---

## 🌍 Vision

**SeeNobi envisions a world where:**
- Every citizen's voice matters
- Local problems get local priority
- Officials are accountable to their communities
- Trust and transparency drive civic engagement
- Good governance is recognized and rewarded

---

**Built with ❤️ for better governance and civic engagement**

*"See Nobi" - See the problems, be the solution.*

