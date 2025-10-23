# Claude Code Project Context

## Project Overview
This is an interactive study guide application for ZCAS University's Innovation & Entrepreneurship course. The application is built with Next.js and React, featuring a modern, accessible interface for students to study course materials and take quizzes.

## Tech Stack
- **Framework**: Next.js 15.5.6 with React 18+
- **State Management**: Redux-like architecture with React Context API and useReducer
- **Styling**: Tailwind CSS with conditional dark mode theming
- **Icons**: Lucide React
- **Language**: JavaScript (with JSDoc type annotations)
- **Accessibility**: Web Speech API for text-to-speech
- **Storage**: LocalStorage with debounced persistence

## Project Structure
```
/Users/jamesnjovu/Documents/Projects/ZCAS/enter-study-guide/
├── app/
│   └── page.tsx                 # Main application entry point
├── components/                  # Reusable UI components
│   ├── ContentView.jsx         # Topic content display with Next Unit navigation
│   ├── ErrorBoundary.jsx       # Error handling component with theme consistency
│   ├── FloatingProgressBar.jsx # Floating seekable progress bar with drag support
│   ├── Header.jsx              # Application header
│   ├── HomeView.jsx            # Unit selection view with settings access
│   ├── InitialLoader.jsx       # SSR hydration loader with theme support
│   ├── LoadingSpinner.jsx      # Loading state component
│   ├── OfflineIndicator.jsx    # Network status indicator
│   ├── PastExamView.jsx        # Past exam questions with pagination
│   ├── ProgressView.jsx        # User progress tracking and statistics
│   ├── QuizCard.jsx            # Quiz entry card
│   ├── QuizQuestion.jsx        # Individual quiz question
│   ├── QuizView.jsx            # Quiz interface with one-at-a-time questions
│   ├── SettingsView.jsx        # Dedicated settings page for speech configuration
│   ├── SpeechControls.jsx      # Simplified text-to-speech controls
│   ├── TopicCard.jsx           # Topic selection card with consistent theming
│   ├── TopicsView.jsx          # Topics listing
│   └── UnitCard.jsx            # Unit selection card with consistent theming
├── store/                       # Global state management (Redux-like architecture)
│   ├── AppProvider.jsx         # Context provider with actions and computed values
│   ├── actions.js              # Action creators for all state mutations
│   ├── index.js                # Store exports and re-exports
│   ├── reducer.js              # Main reducer with theme, study, progress, offline state
│   ├── storage.js              # LocalStorage persistence with debouncing
│   └── types.js                # TypeScript-style type definitions with JSDoc
├── data/
│   ├── pastExamQuestions.js    # Past exam questions with model answers
│   └── studyData.js            # Course content and quiz data
├── hooks/
│   ├── useStudyGuide.js        # Legacy navigation logic (superseded by global store)
│   └── useTextToSpeech.js      # Enhanced speech synthesis with seeking and user intent tracking
├── types/
│   └── index.js                # JSDoc type definitions
└── CLAUDE.md                   # This file
```

## Key Features

### 1. Study Content Management
- **Multi-unit course structure**: Units contain topics with structured content
- **Progressive navigation**: Previous/Next topic buttons with smart disabled states
- **Next Unit navigation**: Seamless progression from last topic to next unit's first topic
- **Auto-advance functionality**: Automatically progresses through content when speech completes
- **Responsive design**: Works on desktop and mobile devices with adaptive layouts

### 2. Quiz System
- **One-at-a-time questions**: Single question display with navigation
- **Interactive quizzes**: Multiple choice questions for each unit
- **Real-time feedback**: Visual indicators for correct/incorrect answers
- **Score calculation**: Percentage-based scoring with detailed results
- **Question-by-question review**: Shows correct answers after submission
- **Progress tracking**: Visual progress indicators with color-coded dots

### 3. Past Exam Questions
- **Paginated exam system**: Sequential navigation through exam pages
- **Multiple exam papers**: December 2022, October 2023, June 2025 papers
- **Sectioned structure**: Exam info → section info → individual questions
- **Model answers**: Comprehensive solutions with show/hide functionality
- **Essay-style questions**: Full question text with detailed model answers

### 4. Advanced Text-to-Speech System
- **Floating progress bar**: Draggable, seekable progress bar with play/pause/stop controls
- **Text chunking and seeking**: Sentence-based navigation with precise seeking capability
- **User intention tracking**: Smart pause/stop behavior that respects user actions over auto-start
- **Auto-start functionality**: Configurable automatic speech when landing on pages
- **Smart auto-advance**: Automatically moves to next page/topic when speech finishes
- **Progress visualization**: Real-time progress bar with percentage and current text display
- **Comprehensive settings**: Dedicated settings page for full customization
- **Voice customization**: Speed, pitch, voice selection with persistent preferences
- **Local storage persistence**: All settings automatically saved and restored across sessions
- **Cross-platform support**: Consistent functionality across all views and content types

### 5. Accessibility Features
- **Full content reading**: Complete audio experience for all content types
- **Keyboard navigation**: Proper focus management and keyboard shortcuts
- **Screen reader friendly**: Semantic HTML and ARIA labels
- **High contrast**: Optimized color schemes for visibility

### 6. Modern Architecture
- **Redux-like state management**: Centralized store with actions, reducers, and computed values
- **Component-based design**: Modular, reusable components following single responsibility principle
- **Custom hooks**: Separated business logic from UI components with enhanced text-to-speech capabilities
- **Global Context API**: Comprehensive state management without prop drilling
- **Theme system**: Consistent dark/light mode with SSR hydration support
- **Error boundaries**: Graceful error handling and recovery with theme consistency
- **Progress tracking**: User activity monitoring with reading time and completion tracking
- **Offline support**: Network status detection and offline state management

## Development Guidelines

### Code Standards
- Use functional components with hooks
- Follow JSDoc conventions for type annotations
- Implement proper error boundaries
- Maintain responsive design patterns
- Ensure accessibility compliance

### Component Design
- Single responsibility principle
- Props validation with clear interfaces
- Reusable and composable components
- Consistent naming conventions
- Clean separation of concerns

### State Management
- **Global store pattern**: Redux-like architecture with useReducer and Context API
- **Action-based mutations**: All state changes go through dispatched actions
- **Computed values**: Derived state using useCallback for performance optimization
- **Auto-persistence**: Debounced localStorage saving with state hydration on app init
- **Custom hooks for business logic**: Separated concerns with reusable hook patterns
- **Immutable state updates**: Proper reducer patterns with spread operators
- **Proper cleanup in useEffect**: Memory leak prevention and listener cleanup

## Application Navigation

### Main Views
- **Home**: Unit selection with Past Exam Questions and Settings access
- **Study Topics**: Course content organized by units with progressive navigation
- **Quiz**: One-question-at-a-time interface with progress tracking
- **Past Exams**: Paginated exam papers with sectioned content structure
- **Settings**: Comprehensive text-to-speech and behavior configuration

### Settings Configuration
- **Voice Settings**: Voice selection, speech speed (0.5x-2.0x), pitch (0.5-2.0)
- **Auto-Start**: Configurable automatic speech when navigating to content
- **Auto-Advance**: Smart progression to next topic/page when speech completes
- **Progress Bar**: Toggle visual progress tracking during speech
- **Persistent Storage**: All preferences automatically saved to localStorage

## Course Content Structure

### Study Topics (9 Units)
1. **Creativity, Invention and Innovation**
   - Introduction to Entrepreneurship
   - Habits to Avoid
   - Definitions and Types of Innovation
   - Sources of Innovation

2. **Factors Affecting Innovation**
   - Economic and Non-Economic Factors
   - Porter's Diamond Model
   - Building the Diamond
   - Clusters and Innovation
   - Innovation Environment Assets

3. **Impact of Network Structures on Innovation**
   - Introduction to Networks
   - Characteristics of Innovation Networks
   - Advantages of Networks
   - Practical Examples

4. **Technology and Human Resources Management Impact on Innovation**
   - HR Management for Innovation
   - Financial Motivation
   - Organizational Culture
   - Technology Tips for Entrepreneurs
   - Operational Methods

### Past Exam Questions
- **December 2022**: Final semester examination with compulsory Section A + 3 from Section B
- **October 2023**: Mid-semester test with comprehensive coverage
- **June 2025**: Final examination with updated contemporary examples
- **Structure**: Each exam includes exam info, sectioned questions, and detailed model answers

## Build Commands
- **Development**: `npm run dev` - Start development server with hot reload
- **Production Build**: `npm run build` - Build optimized static files for production
- **Production Start**: `npm run start` - Start production server (after build)
- **Deploy**: `npm run deploy` - Build and deploy to GitHub Pages
- **Export**: `npm run export` - Generate static export for hosting

## Production Deployment
The application is production-ready and optimized for static hosting:

- **Bundle Size**: 45.1kB main bundle, 147kB total first load JS
- **Export Type**: Static site generation (SSG) for optimal performance
- **Hosting**: Compatible with GitHub Pages, Netlify, Vercel, and other static hosts
- **Performance**: Optimized chunks, lazy loading, and efficient re-renders
- **Browser Support**: Modern browsers with progressive enhancement
- **PWA Ready**: ✅ Complete PWA with service worker, offline support, and install prompts

## Progressive Web App (PWA) Features
- **🔄 Service Worker**: Automatic caching and offline functionality
- **📱 Installable**: Native app-like experience on mobile and desktop
- **🌐 Offline Support**: Works without internet connection for cached content
- **🔔 Install Prompts**: Smart prompts for users to install the app
- **⚡ Fast Loading**: Cached resources for instant loading
- **📋 Web App Manifest**: Proper PWA metadata and app configuration

## Testing Strategy
- Component testing with proper mock data
- Accessibility testing with screen readers
- Cross-browser compatibility testing
- Mobile responsiveness testing
- Speech API functionality testing

## Recent Enhancements (Latest Updates)

### ✅ Latest Completed Features (December 2024)
- **🎯 Next Unit Navigation**: Smart button that appears on last topic to navigate directly to next unit's first topic
- **🎮 Floating Seekable Progress Bar**: Draggable progress bar with play/pause/stop controls and click/drag seeking
- **🧠 User Intention Tracking**: Advanced pause/stop behavior that respects user actions over auto-start preferences
- **📊 Global State Management**: Redux-like architecture with centralized actions, reducers, and computed values
- **🎨 Consistent Theme System**: Unified dark/light mode across all components with SSR hydration support
- **💾 Enhanced Persistence**: Debounced auto-save with state hydration and cross-session continuity
- **🚀 Production Ready**: Optimized build with debug logs removed, 45.1kB main bundle, fully deployable
- **📱 PWA Support**: Complete Progressive Web App with service worker, offline support, and installable experience

### ✅ Previously Completed Features
- **Dedicated Settings Page**: Comprehensive configuration center for all speech and behavior settings
- **Auto-Start Speech**: Configurable automatic speech playback when navigating to new content
- **Enhanced Text-to-Speech**: Progress bars, auto-advance, and persistent settings via localStorage
- **Past Exam Questions**: Complete paginated exam system with model answers and sectioned navigation
- **One-at-a-time Quiz**: Improved quiz interface with single-question display and progress tracking
- **Progress Tracking**: User activity monitoring with reading time and completion statistics

### 🔧 Technical Architecture Improvements
- ✅ **Redux-like State Management**: Centralized store with actions, reducers, and computed values
- ✅ **Text Chunking System**: Sentence-based text parsing for precise seeking and progress tracking
- ✅ **Multi-flag User Intent System**: Sophisticated tracking of user pause/stop vs auto-advance preferences
- ✅ **SSR-Safe Theme Hydration**: Prevents hydration mismatches with proper mounted state handling
- ✅ **Debounced Persistence**: Optimized localStorage writes with automatic state recovery
- ✅ **Component Theme Consistency**: Unified conditional styling across all UI components

## Technical Implementation Details

### Global State Management Architecture
The application uses a Redux-like pattern implemented with React's Context API and useReducer:

**File Structure:**
- `store/AppProvider.jsx` - Context provider with actions and computed values
- `store/reducer.js` - Main reducer handling theme, study, progress, and offline state
- `store/actions.js` - Action creators for all state mutations
- `store/storage.js` - LocalStorage persistence with debouncing
- `store/types.js` - JSDoc type definitions

**Key Features:**
- **Centralized Actions**: All state mutations go through dispatched actions
- **Computed Values**: Derived state using useCallback for performance optimization
- **Auto-Persistence**: Debounced localStorage saving with 500ms delay
- **State Hydration**: Automatic state restoration on app initialization
- **Theme Management**: SSR-safe theme switching with hydration support

### Text-to-Speech System Architecture
Advanced speech synthesis with seeking, user intention tracking, and progress visualization:

**Core Components:**
- `hooks/useTextToSpeech.js` - Main speech synthesis logic with user intention tracking
- `components/FloatingProgressBar.jsx` - Draggable seekable progress bar
- `components/SpeechControls.jsx` - Simplified speech controls

**Key Features:**
- **Text Chunking**: Sentence-based parsing for precise seeking capability
- **User Intention Tracking**: Multiple flags (`userStoppedPlayback`, `userPausedForAutoStart`) 
- **Seeking Support**: Click/drag progress bar with sentence-level navigation
- **Auto-Advance Integration**: Smart progression that respects user pause/stop actions
- **Settings Persistence**: Voice, speed, pitch, and behavior preferences saved to localStorage

### Navigation System
Smart navigation with unit-to-unit progression and context-aware button display:

**Navigation Logic:**
- `store/reducer.js:205-225` - Next unit navigation reducer logic
- `components/ContentView.jsx:230-240` - Conditional Next Unit button rendering
- `store/AppProvider.jsx:263-280` - Computed navigation state (hasNextUnit, getNextUnit)

**Features:**
- **Conditional Display**: "Next Unit" button only appears on last topic when next unit exists
- **Responsive Text**: Button text adapts to screen size (mobile: "Unit X", desktop: "Next Unit: Title")
- **Seamless Transitions**: Direct navigation to first topic of next unit
- **Auto-Advance Compatible**: Works with speech auto-advance functionality

### Theme System Implementation
Consistent theming across all components with SSR hydration support:

**Theme Architecture:**
- **Conditional Styling**: All components use `isDark` flag for consistent theme application
- **SSR-Safe Hydration**: `mounted` flag prevents hydration mismatches
- **Component Consistency**: Standardized theme application across UnitCard, TopicCard, etc.
- **DOM Integration**: Theme classes applied to document root for Tailwind dark: modifiers

## Future Enhancements
- **Enhanced Progress Analytics**: Detailed learning insights and performance tracking
- **User Accounts**: Cloud-based progress persistence and cross-device sync
- **Additional Quiz Types**: Drag-and-drop, matching, and fill-in-the-blank questions
- **Offline Functionality**: Service workers for offline study capability
- **Multi-language Support**: Interface and content localization
- **Study Reminders**: Notification system for scheduled study sessions
- **Collaborative Features**: Study groups and progress sharing
- **AI-Powered Recommendations**: Personalized study path suggestions

## Accessibility Compliance
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader optimization
- High contrast ratios
- Text-to-speech integration
- Focus management
- Semantic HTML structure

## Browser Support
- Chrome/Edge 80+
- Firefox 75+
- Safari 13+
- Mobile browsers (iOS Safari, Chrome Mobile)
- Progressive enhancement for older browsers

## Known Dependencies
- React 18+
- Next.js 14+
- Tailwind CSS 3+
- Lucide React (icons)
- Web Speech API (for text-to-speech)

## Performance Considerations
- Code splitting by route
- Lazy loading for large content
- Optimized images and assets
- Minimal bundle size
- Efficient re-renders with React patterns