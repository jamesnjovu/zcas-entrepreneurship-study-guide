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
│   ├── ContentView.jsx         # Topic content display
│   ├── ErrorBoundary.jsx       # Error handling component
│   ├── Header.jsx              # Application header
│   ├── HomeView.jsx            # Unit selection view
│   ├── LoadingSpinner.jsx      # Loading state component
│   ├── QuizCard.jsx            # Quiz entry card
│   ├── QuizQuestion.jsx        # Individual quiz question
│   ├── QuizView.jsx            # Quiz interface
│   ├── SpeechControls.jsx      # Text-to-speech controls
│   ├── TopicCard.jsx           # Topic selection card
│   ├── TopicsView.jsx          # Topics listing
│   └── UnitCard.jsx            # Unit selection card
├── context/
│   └── StudyGuideContext.jsx   # Global state management
├── data/
│   └── studyData.js            # Course content and quiz data
├── hooks/
│   ├── useStudyGuide.js        # Navigation and state logic
│   └── useTextToSpeech.js      # Speech synthesis functionality
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
- **Interactive quizzes**: Multiple choice questions for each unit
- **Real-time feedback**: Visual indicators for correct/incorrect answers
- **Score calculation**: Percentage-based scoring with detailed results
- **Question-by-question review**: Shows correct answers after submission

### 3. Accessibility Features
- **Text-to-speech**: Full content and quiz question reading
- **Voice customization**: Speed, pitch, and voice selection
- **Keyboard navigation**: Proper focus management
- **Screen reader friendly**: Semantic HTML and ARIA labels

### 4. Modern Architecture
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

## Course Content Structure

### Units Covered
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

## Future Enhancements
- Progress tracking and bookmarks
- User accounts and progress persistence
- Additional quiz types (drag-and-drop, matching)
- Offline functionality with service workers
- Analytics and learning insights
- Multi-language support
- Dark mode theme

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