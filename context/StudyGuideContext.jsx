import { createContext, useContext } from 'react';
import { useStudyGuide, useQuiz } from '../hooks/useStudyGuide';
import { studyData } from '../data/studyData';

const StudyGuideContext = createContext();

export const useStudyGuideContext = () => {
  const context = useContext(StudyGuideContext);
  if (!context) {
    throw new Error('useStudyGuideContext must be used within a StudyGuideProvider');
  }
  return context;
};

export const StudyGuideProvider = ({ children }) => {
  const studyGuideState = useStudyGuide();
  const quizState = useQuiz();

  const value = {
    ...studyGuideState,
    ...quizState,
    studyData,
  };

  return (
    <StudyGuideContext.Provider value={value}>
      {children}
    </StudyGuideContext.Provider>
  );
};