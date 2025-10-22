# Claude Code Project Context

## Project Overview
This is an interactive study guide application for ZCAS University's Innovation & Entrepreneurship course. The application is built with Next.js and React, featuring a modern, accessible interface for students to study course materials and take quizzes.

## Tech Stack
- **Framework**: Next.js 14+ with React 18+
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Language**: JavaScript (with JSDoc type annotations)
- **Accessibility**: Web Speech API for text-to-speech

## Project Structure
```
/Users/jamesnjovu/Documents/Projects/ZCAS/enter-study-guide/
├── app/
│   └── page.tsx                 # Main application entry point
├── components/                  # Reusable UI components
│   ├── ContentView.jsx         # Topic content display with auto-start speech
│   ├── ErrorBoundary.jsx       # Error handling component
│   ├── Header.jsx              # Application header
│   ├── HomeView.jsx            # Unit selection view with settings access
│   ├── LoadingSpinner.jsx      # Loading state component
│   ├── PastExamView.jsx        # Past exam questions with pagination
│   ├── QuizCard.jsx            # Quiz entry card
│   ├── QuizQuestion.jsx        # Individual quiz question
│   ├── QuizView.jsx            # Quiz interface with one-at-a-time questions
│   ├── SettingsView.jsx        # Dedicated settings page for speech configuration
│   ├── SpeechControls.jsx      # Simplified text-to-speech controls
│   ├── TopicCard.jsx           # Topic selection card
│   ├── TopicsView.jsx          # Topics listing
│   └── UnitCard.jsx            # Unit selection card
├── context/
│   └── StudyGuideContext.jsx   # Global state management
├── data/
│   ├── pastExamQuestions.js    # Past exam questions with model answers
│   └── studyData.js            # Course content and quiz data
├── hooks/
│   ├── useStudyGuide.js        # Navigation and state logic with settings support
│   └── useTextToSpeech.js      # Enhanced speech synthesis with auto-start & persistence
├── types/
│   └── index.js                # JSDoc type definitions
└── CLAUDE.md                   # This file
```

## Key Features

### 1. Study Content Management
- **Multi-unit course structure**: Units contain topics with structured content
- **Progressive navigation**: Previous/Next topic buttons with smart disabled states
- **Responsive design**: Works on desktop and mobile devices

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

### 4. Enhanced Text-to-Speech System
- **Auto-start functionality**: Configurable automatic speech when landing on pages
- **Smart auto-advance**: Automatically moves to next page/topic when speech finishes
- **Progress visualization**: Real-time progress bar with percentage and current text
- **Comprehensive settings**: Dedicated settings page for full customization
- **Voice customization**: Speed, pitch, voice selection with persistent preferences
- **Local storage**: All settings automatically saved and restored
- **Cross-platform support**: Works across study topics, past exams, and quizzes

### 5. Accessibility Features
- **Full content reading**: Complete audio experience for all content types
- **Keyboard navigation**: Proper focus management and keyboard shortcuts
- **Screen reader friendly**: Semantic HTML and ARIA labels
- **High contrast**: Optimized color schemes for visibility

### 6. Modern Architecture
- **Component-based**: Modular, reusable components following single responsibility principle
- **Custom hooks**: Separated business logic from UI components
- **Context API**: Centralized state management without prop drilling
- **Error boundaries**: Graceful error handling and recovery

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
- Use React Context for global state
- Custom hooks for business logic
- Immutable state updates
- Proper cleanup in useEffect

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
- **Development**: `npm run dev` or `yarn dev`
- **Production Build**: `npm run build` or `yarn build`
- **Linting**: `npm run lint` or `yarn lint`
- **Type Checking**: Use IDE TypeScript support with JSDoc

## Testing Strategy
- Component testing with proper mock data
- Accessibility testing with screen readers
- Cross-browser compatibility testing
- Mobile responsiveness testing
- Speech API functionality testing

## Recent Enhancements (Latest Updates)

### ✅ Completed Features
- **Dedicated Settings Page**: Comprehensive configuration center for all speech and behavior settings
- **Auto-Start Speech**: Configurable automatic speech playback when navigating to new content
- **Enhanced Text-to-Speech**: Progress bars, auto-advance, and persistent settings via localStorage
- **Past Exam Questions**: Complete paginated exam system with model answers and sectioned navigation
- **One-at-a-time Quiz**: Improved quiz interface with single-question display and progress tracking
- **Settings Persistence**: All user preferences automatically saved and restored across sessions

### 📋 Current Features Status
- ✅ **Voice Customization**: Speed, pitch, voice selection with real-time updates
- ✅ **Auto-Advance**: Smart progression through topics and exam pages
- ✅ **Progress Visualization**: Real-time progress bars with percentage and current text display
- ✅ **Cross-Platform Audio**: Consistent speech functionality across all views
- ✅ **Responsive Design**: Mobile and desktop optimized interface
- ✅ **Accessibility**: WCAG compliant with keyboard navigation and screen reader support

## Future Enhancements
- **Study Progress Tracking**: Bookmark system and completion tracking
- **User Accounts**: Cloud-based progress persistence and cross-device sync
- **Additional Quiz Types**: Drag-and-drop, matching, and fill-in-the-blank questions
- **Offline Functionality**: Service workers for offline study capability
- **Analytics Dashboard**: Learning insights and performance tracking
- **Multi-language Support**: Interface and content localization
- **Dark Mode Theme**: System-aware theme switching
- **Study Reminders**: Notification system for scheduled study sessions

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