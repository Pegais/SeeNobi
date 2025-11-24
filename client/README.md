# SeeNobi Client

React frontend application for the SeeNobi civic engagement platform.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Add the logo image:
   - Place your SeeNobi logo image at `client/public/seenobi-logo.png`
   - The logo should be a PNG file with transparent background

3. Start development server:
```bash
npm start
```

The app will open at http://localhost:3000

## Logo Setup

The application uses the SeeNobi logo image. Make sure to:
1. Place the logo file at `client/public/seenobi-logo.png`
2. The logo will automatically scale for different sizes (small, medium, large)
3. The logo is responsive and adapts to all viewport sizes

## Responsive Design

The application uses a **mobile-first approach** with the following breakpoints:

- **Mobile**: Base styles (< 768px)
- **Tablet**: 768px and up
- **Desktop**: 1024px and up
- **Large Desktop**: 1440px and up

All components are optimized for:
- Touch-friendly interactions
- Readable font sizes
- Proper spacing and padding
- Efficient layouts

## Available Routes

See `ROUTES_GUIDE.md` for complete route documentation.

## Features

- Responsive design (mobile-first)
- Gamified scoring system
- LinkedIn-style feed layout
- Achievement badges
- Real-time updates ready
- All routes functional with mock data

## Technology

- React 18
- React Router 6
- Create React App
- CSS3 with mobile-first media queries
