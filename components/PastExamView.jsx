import { useState, useMemo, useEffect } from 'react';
import { BookOpen, Calendar, Clock, FileText, ChevronLeft, ChevronRight, Volume2, Eye, EyeOff, Info } from 'lucide-react';
import { useTextToSpeech } from '../hooks/useTextToSpeech';
import { useApp, useThemeColors } from '../store';
import SpeechControls from './SpeechControls';

const PastExamView = ({ 
  pastExamQuestions, 
  onBackToHome 
}) => {
  const [selectedExam, setSelectedExam] = useState(null);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [showModelAnswers, setShowModelAnswers] = useState(false);
  
  const { theme: { isDark } } = useApp();
  const colors = useThemeColors(isDark);

  // Helper function to render text with line breaks
  const renderTextWithLineBreaks = (text) => {
    if (!text) return null;
    return text.split('\n').map((line, index, array) => (
      <span key={index}>
        {line}
        {index < array.length - 1 && <br />}
      </span>
    ));
  };

  const {
    isSupported,
    isSpeaking,
    isPaused,
    voices,
    selectedVoice,
    rate,
    pitch,
    progress,
    currentText,
    autoAdvance,
    showProgressBar,
    autoStart,
    setSelectedVoice,
    setRate,
    setPitch,
    setAutoAdvance,
    setShowProgressBar,
    setAutoStart,
    speak,
    pause,
    resume,
    stop,
  } = useTextToSpeech();

  // Create a flat array of pages: [examInfo, section1, question1, question2, ..., section2, question3, ...]
  const examPages = useMemo(() => {
    if (!selectedExam) return [];
    
    const pages = [];
    
    // First page: Exam Info
    pages.push({
      type: 'examInfo',
      content: selectedExam.examInfo,
      exam: selectedExam
    });

    // Add sections and their questions
    selectedExam.sections.forEach((section) => {
      // Section intro page
      pages.push({
        type: 'sectionInfo',
        content: section,
        sectionId: section.id
      });

      // Add each question in the section
      section.questions.forEach((question) => {
        pages.push({
          type: 'question',
          content: question,
          sectionId: section.id,
          sectionTitle: section.title
        });
      });
    });

    return pages;
  }, [selectedExam]);

  const handleExamSelect = (exam) => {
    setSelectedExam(exam);
    setCurrentPageIndex(0);
    setShowModelAnswers(false);
  };

  const handleBackToExamList = () => {
    setSelectedExam(null);
    setCurrentPageIndex(0);
    setShowModelAnswers(false);
  };

  const handleNextPage = () => {
    if (currentPageIndex < examPages.length - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
      setShowModelAnswers(false);
    }
  };

  const handleAutoAdvance = () => {
    if (currentPageIndex < examPages.length - 1) {
      const nextIndex = currentPageIndex + 1;
      setCurrentPageIndex(nextIndex);
      setShowModelAnswers(false);
      
      // Auto-start reading the next page after a brief pause
      setTimeout(() => {
        const nextPage = examPages[nextIndex];
        if (nextPage) {
          const textToSpeak = getPageText(nextPage);
          speak(textToSpeak, handleAutoAdvance);
        }
      }, 1000);
    }
  };

  const getPageText = (page) => {
    if (page.type === 'examInfo') {
      return `${page.content.title}. ${page.content.courseName}. Instructions: ${page.content.instructions.join('. ')}`;
    } else if (page.type === 'sectionInfo') {
      return `${page.content.title}. ${page.content.instructions}`;
    } else {
      // Build question text
      let text = '';
      
      if (page.content.context) {
        text += `Context: ${page.content.context}. `;
      }
      
      // Add main question
      if (page.content.question) {
        text += `Question: ${page.content.question}. `;
      } else if (page.content.totalMarks) {
        text += `This question has multiple parts. `;
      }
      
      // Add parts if they exist
      if (page.content.parts) {
        page.content.parts.forEach((part, idx) => {
          const partLabel = String.fromCharCode(97 + idx); // a, b, c, etc.
          text += `Part ${partLabel}: ${part.question}. `;
          
          // Add model answer if it exists
          if (part.modelAnswer) {
            text += `Model Answer: `;
            if (Array.isArray(part.modelAnswer)) {
              text += part.modelAnswer.join('. ') + '. ';
            } else {
              // Clean up newlines for speech
              const cleanAnswer = part.modelAnswer.replace(/\n/g, '. ');
              text += cleanAnswer + '. ';
            }
          }
        });
      } else if (page.content.modelAnswer) {
        // Single question with model answer
        text += `Model Answer: `;
        if (Array.isArray(page.content.modelAnswer)) {
          text += page.content.modelAnswer.join('. ') + '. ';
        } else {
          // Clean up newlines for speech
          const cleanAnswer = page.content.modelAnswer.replace(/\n/g, '. ');
          text += cleanAnswer + '. ';
        }
      }
      
      return text || 'This question has multiple parts';
    }
  };

  const handlePreviousPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
      setShowModelAnswers(false);
    }
  };


  const currentPage = examPages[currentPageIndex];
  const isFirstPage = currentPageIndex === 0;
  const isLastPage = currentPageIndex === examPages.length - 1;

  // Auto-start speech when page changes if enabled
  useEffect(() => {
    if (autoStart && currentPage) {
      // Delay to ensure component is fully rendered
      const timer = setTimeout(() => {
        const textToSpeak = getPageText(currentPage);
        speak(textToSpeak, autoAdvance ? handleAutoAdvance : null);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [currentPage, autoStart, autoAdvance, handleAutoAdvance, speak, getPageText]);

  // Exam List View
  if (!selectedExam) {
    return (
      <div>
        <button
          onClick={onBackToHome}
          className={`mb-4 px-4 py-3 rounded-lg shadow hover:shadow-md transition font-semibold min-h-[44px] touch-manipulation ${colors.get('button.secondary')}`}
        >
          <ChevronLeft className="inline mr-2" size={16} />
          Back to Home
        </button>
        
        <div className={`rounded-lg shadow-lg p-4 md:p-8 ${colors.backgroundPrimary} text-white`}>
          <div className="text-center mb-6 md:mb-8">
            <BookOpen size={48} className="mx-auto mb-3 md:mb-4 text-indigo-600 md:w-16 md:h-16" />
            <h2 className={`text-2xl md:text-3xl font-bold mb-2 ${colors.primary}`}>Past Exam Questions</h2>
            <p className={`text-sm md:text-base ${colors.secondary}`}>Study previous exam papers with model answers</p>
          </div>

          <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {pastExamQuestions.map((exam) => (
              <div
                key={exam.id}
                onClick={() => handleExamSelect(exam)}
                className={`p-4 md:p-6 rounded-lg border-2 cursor-pointer transition group min-h-[180px] md:min-h-[200px] touch-manipulation ${colors.get('gradient.card')} ${colors.get('examCard.border')} ${colors.get('gradient.cardHover')}`}
              >
                <div className="flex items-center mb-3 md:mb-4">
                  <Calendar className={`mr-2 md:mr-3 ${colors.get('examCard.yearIcon')}`} size={20} />
                  <span className={`text-sm font-semibold ${colors.get('examCard.year')}`}>{exam.year}</span>
                </div>
                
                <h3 className={`text-lg md:text-xl font-bold mb-2 transition ${colors.get('examCard.title')}`}>
                  {exam.examInfo.courseName}
                </h3>
                
                <div className="space-y-2 mb-3 md:mb-4">
                  <div className={`flex items-center ${colors.secondary}`}>
                    <Clock className="mr-2" size={14} />
                    <span className="text-xs md:text-sm">{exam.examInfo.duration}</span>
                  </div>
                  <div className={`flex items-center ${colors.secondary}`}>
                    <FileText className="mr-2" size={14} />
                    <span className="text-xs md:text-sm">{exam.sections.length} sections</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-auto">
                  <span className={`text-xs md:text-sm ${colors.get('examCard.actionText')}`}>
                    <span className="hidden sm:inline">Click to start</span>
                    <span className="sm:hidden">Start</span>
                  </span>
                  <ChevronRight className={`transition ${colors.get('examCard.chevron')}`} size={18} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Paginated Exam View
  return (
    <div>
      <button
        onClick={handleBackToExamList}
        className={`mb-4 px-4 py-3 rounded-lg shadow hover:shadow-md transition font-semibold min-h-[44px] touch-manipulation ${isDark ? 'bg-gray-800 text-indigo-400 hover:bg-gray-700' : 'bg-white text-indigo-600'}`}
      >
        <ChevronLeft className="inline mr-2" size={16} />
        Back to Past Exams
      </button>
      
      <div className={`rounded-lg shadow-lg p-4 md:p-8 ${isDark ? 'bg-gray-800 text-white' : 'bg-white'}`}>
        {/* Progress Header */}
        <div className="mb-4 md:mb-6">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
            <div>
              <h2 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-indigo-300' : 'text-indigo-900'}`}>
                {selectedExam.examInfo.courseName}
              </h2>
              <p className={`mt-1 md:mt-2 text-sm md:text-base ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Page {currentPageIndex + 1} of {examPages.length}
              </p>
              <div className="flex gap-2 mt-2 flex-wrap justify-center lg:justify-start">
                {examPages.map((page, idx) => {
                  let dotColor = 'bg-gray-300';
                  if (idx === currentPageIndex) {
                    dotColor = 'bg-indigo-600';
                  } else if (page.type === 'examInfo') {
                    dotColor = 'bg-blue-400';
                  } else if (page.type === 'sectionInfo') {
                    dotColor = 'bg-purple-400';
                  } else if (page.type === 'question') {
                    dotColor = 'bg-green-400';
                  }

                  return (
                    <div
                      key={idx}
                      className={`w-4 h-4 md:w-3 md:h-3 rounded-full ${dotColor}`}
                      title={`${page.type === 'examInfo' ? 'Exam Info' : 
                              page.type === 'sectionInfo' ? `Section ${page.sectionId}` :
                              `Question ${page.content.id}`}`}
                    />
                  );
                })}
              </div>
            </div>
            
            {/* Speech Controls */}
            <div className="relative w-full lg:w-auto lg:flex-shrink-0">
              <SpeechControls
                isSupported={isSupported}
                isSpeaking={isSpeaking}
                isPaused={isPaused}
                onSpeak={() => {
                  const textToSpeak = getPageText(currentPage);
                  speak(textToSpeak, autoAdvance ? handleAutoAdvance : null);
                }}
                onPause={pause}
                onResume={resume}
                onStop={stop}
                voices={voices}
                selectedVoice={selectedVoice}
                onVoiceChange={setSelectedVoice}
                rate={rate}
                onRateChange={setRate}
                pitch={pitch}
                onPitchChange={setPitch}
                autoAdvance={autoAdvance}
                onAutoAdvanceChange={setAutoAdvance}
                showProgressBar={showProgressBar}
                onShowProgressBarChange={setShowProgressBar}
                className="flex-shrink-0"
              />
            </div>
          </div>
          
          {/* Speech Progress Bar */}
          {showProgressBar && (isSpeaking || progress > 0) && (
            <div className={`mt-4 p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                  {isSpeaking ? 'Reading...' : 'Speech Complete'}
                </span>
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {Math.round(progress)}%
                </span>
              </div>
              <div className={`w-full rounded-full h-2 ${isDark ? 'bg-gray-600' : 'bg-gray-200'}`}>
                <div 
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              {currentText && (
                <p className={`text-xs mt-2 line-clamp-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {currentText.length > 100 ? `${currentText.substring(0, 100)}...` : currentText}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Page Content */}
        <div className="min-h-[300px] md:min-h-96">
          {/* Exam Info Page */}
          {currentPage.type === 'examInfo' && (
            <div className="space-y-4 md:space-y-6">
              <div className={`text-center p-4 md:p-8 rounded-lg text-white ${
                isDark 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-700' 
                  : 'bg-gradient-to-r from-indigo-500 to-purple-600'
              }`}>
                <Info size={48} className="mx-auto mb-3 md:mb-4 md:w-16 md:h-16" />
                <h3 className="text-xl md:text-2xl font-bold mb-2">{currentPage.content.title}</h3>
                <h4 className="text-lg md:text-xl mb-3 md:mb-4">{currentPage.content.courseName}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p><strong>Date:</strong> {currentPage.content.date}</p>
                    <p><strong>Duration:</strong> {currentPage.content.duration}</p>
                  </div>
                  <div>
                    <p><strong>Course Code:</strong> {currentPage.content.courseCode}</p>
                    <p><strong>Total Marks:</strong> 100</p>
                  </div>
                </div>
              </div>

              <div className={`p-6 rounded-lg border-l-4 ${
                isDark 
                  ? 'bg-yellow-900 bg-opacity-30 border-yellow-500 text-yellow-100' 
                  : 'bg-yellow-50 border-yellow-400'
              }`}>
                <h4 className={`font-bold mb-4 flex items-center ${
                  isDark ? 'text-yellow-200' : 'text-gray-800'
                }`}>
                  <FileText className="mr-2" size={20} />
                  Exam Instructions:
                </h4>
                <ul className={`list-disc list-inside space-y-2 ${
                  isDark ? 'text-yellow-100' : 'text-gray-700'
                }`}>
                  {currentPage.content.instructions.map((instruction, idx) => (
                    <li key={idx}>{instruction}</li>
                  ))}
                </ul>
              </div>

              <div className={`text-center p-4 rounded-lg ${
                isDark ? 'bg-blue-900 bg-opacity-30' : 'bg-blue-50'
              }`}>
                <p className={`font-medium ${
                  isDark ? 'text-blue-200' : 'text-blue-800'
                }`}>
                  Click "Next" to start viewing the exam sections and questions
                </p>
              </div>
            </div>
          )}

          {/* Section Info Page */}
          {currentPage.type === 'sectionInfo' && (
            <div className="space-y-6">
              <div className={`text-center p-8 rounded-lg text-white ${
                isDark 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-700' 
                  : 'bg-gradient-to-r from-purple-500 to-pink-600'
              }`}>
                <FileText size={64} className="mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">{currentPage.content.title}</h3>
                <p className="text-lg">{currentPage.content.instructions}</p>
                <div className="mt-4">
                  <span className={`px-4 py-2 rounded-full text-sm ${isDark ? 'bg-gray-700 bg-opacity-70' : 'bg-white bg-opacity-20'}`}>
                    {currentPage.content.marks} marks total
                  </span>
                </div>
              </div>

              <div className={`p-6 rounded-lg border-l-4 ${
                isDark 
                  ? 'bg-purple-900 bg-opacity-30 border-purple-500' 
                  : 'bg-purple-50 border-purple-400'
              }`}>
                <h4 className={`font-bold mb-3 ${
                  isDark ? 'text-purple-200' : 'text-gray-800'
                }`}>Section Overview:</h4>
                <div className={`grid grid-cols-2 gap-4 ${
                  isDark ? 'text-purple-100' : 'text-gray-700'
                }`}>
                  <div>
                    <p><strong>Questions:</strong> {currentPage.content.questions.length}</p>
                    <p><strong>Total Marks:</strong> {currentPage.content.marks}</p>
                  </div>
                  <div>
                    <p><strong>Section:</strong> {currentPage.content.id}</p>
                    <p><strong>Instructions:</strong> {currentPage.content.instructions}</p>
                  </div>
                </div>
              </div>

              <div className={`text-center p-4 rounded-lg ${
                isDark ? 'bg-indigo-900 bg-opacity-30' : 'bg-indigo-50'
              }`}>
                <p className={`font-medium ${
                  isDark ? 'text-indigo-200' : 'text-indigo-800'
                }`}>
                  Click "Next" to view the questions in this section
                </p>
              </div>
            </div>
          )}

          {/* Question Page */}
          {currentPage.type === 'question' && (
            <div className="space-y-8">
              {/* Question Header */}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className={`text-2xl font-bold ${
                    isDark ? 'text-indigo-300' : 'text-indigo-900'
                  }`}>
                    {currentPage.sectionTitle} - Question {currentPage.content.id}
                  </h3>
                  <p className={`mt-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>{currentPage.content.totalMarks} marks</p>
                </div>
                
                {/* Speech Controls */}
                <button
                  onClick={() => {
                    const textToSpeak = currentPage.content.context 
                      ? `Context: ${currentPage.content.context}. Question: ${currentPage.content.question || 'This question has multiple parts'}`
                      : currentPage.content.question || 'This question has multiple parts';
                    speak(textToSpeak); // No auto-advance for individual button
                  }}
                  className={`p-2 rounded transition ${
                    isDark 
                      ? 'text-blue-400 hover:bg-gray-700' 
                      : 'text-blue-600 hover:bg-blue-100'
                  }`}
                  title="Read question aloud"
                >
                  <Volume2 size={20} />
                </button>
              </div>

              {/* Case Study/Context */}
              {currentPage.content.context && (
                <div className={`p-6 rounded-lg border-l-4 ${
                  isDark 
                    ? 'bg-yellow-900 bg-opacity-30 border-yellow-500' 
                    : 'bg-yellow-50 border-yellow-400'
                }`}>
                  <h4 className={`font-bold mb-3 ${
                    isDark ? 'text-yellow-200' : 'text-gray-800'
                  }`}>Case Study/Context:</h4>
                  <p className={`leading-relaxed ${
                    isDark ? 'text-yellow-100' : 'text-gray-700'
                  }`}>{currentPage.content.context}</p>
                </div>
              )}

              {/* Main Question */}
              {currentPage.content.question && (
                <div className="space-y-4">
                  <div className={`p-6 rounded-lg border-l-4 ${
                    isDark 
                      ? 'bg-blue-900 bg-opacity-30 border-blue-500' 
                      : 'bg-blue-50 border-blue-400'
                  }`}>
                    <p className={`font-medium text-lg leading-relaxed ${
                      isDark ? 'text-blue-100' : 'text-gray-800'
                    }`}>{currentPage.content.question}</p>
                  </div>
                  
                  {/* Show Answer Toggle for main question */}
                  <div className="text-center">
                    <button
                      onClick={() => setShowModelAnswers(!showModelAnswers)}
                      className={`inline-flex items-center px-6 py-3 rounded-lg font-semibold transition shadow-sm ${
                        showModelAnswers 
                          ? 'bg-green-500 text-white hover:bg-green-600' 
                          : 'bg-indigo-500 text-white hover:bg-indigo-600'
                      }`}
                    >
                      {showModelAnswers ? <EyeOff className="mr-2" size={18} /> : <Eye className="mr-2" size={18} />}
                      <span className="hidden sm:inline">{showModelAnswers ? 'Hide Model Answer' : 'Show Model Answer'}</span>
                      <span className="sm:hidden">{showModelAnswers ? 'Hide Answer' : 'Show Answer'}</span>
                    </button>
                  </div>

                  {/* Single Question Model Answer */}
                  {!currentPage.content.parts && showModelAnswers && currentPage.content.modelAnswer && (
                    <div className={`p-6 rounded-lg border ${
                      isDark 
                        ? 'bg-green-900 bg-opacity-30 border-green-600' 
                        : 'bg-green-50 border-green-200'
                    }`}>
                      <h5 className={`font-semibold mb-4 flex items-center ${
                        isDark ? 'text-green-300' : 'text-green-800'
                      }`}>
                        <FileText className="mr-2" size={20} />
                        Model Answer:
                      </h5>
                      <div className={`leading-relaxed ${
                        isDark ? 'text-green-200' : 'text-green-700'
                      }`}>
                        {Array.isArray(currentPage.content.modelAnswer) ? (
                          <ul className="list-disc list-inside space-y-2">
                            {currentPage.content.modelAnswer.map((answer, ansIdx) => (
                              <li key={ansIdx} className="leading-relaxed">{renderTextWithLineBreaks(answer)}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="leading-relaxed">{renderTextWithLineBreaks(currentPage.content.modelAnswer)}</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Question Parts */}
              {currentPage.content.parts && (
                <div className="space-y-6">
                  {/* Show Answer Toggle for multi-part question */}
                  <div className="text-center">
                    <button
                      onClick={() => setShowModelAnswers(!showModelAnswers)}
                      className={`inline-flex items-center px-6 py-3 rounded-lg font-semibold transition shadow-sm ${
                        showModelAnswers 
                          ? 'bg-green-500 text-white hover:bg-green-600' 
                          : 'bg-indigo-500 text-white hover:bg-indigo-600'
                      }`}
                    >
                      {showModelAnswers ? <EyeOff className="mr-2" size={18} /> : <Eye className="mr-2" size={18} />}
                      <span className="hidden sm:inline">{showModelAnswers ? 'Hide Model Answers' : 'Show Model Answers'}</span>
                      <span className="sm:hidden">{showModelAnswers ? 'Hide Answers' : 'Show Answers'}</span>
                    </button>
                  </div>

                  {currentPage.content.parts.map((part, idx) => (
                    <div key={part.part || idx} className={`rounded-lg p-6 shadow-sm ${isDark ? 'bg-gray-700 border border-gray-600' : 'bg-white border border-gray-200'}`}>
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <h4 className={`text-lg font-semibold ${
                            isDark ? 'text-gray-200' : 'text-gray-800'
                          }`}>
                            Part {part.part || idx + 1}
                          </h4>
                          <button
                            onClick={() => speak(`Part ${part.part || idx + 1}. ${part.question}`)} // No auto-advance for individual parts
                            className={`p-1 rounded transition ${
                              isDark 
                                ? 'text-blue-400 hover:bg-gray-600' 
                                : 'text-blue-600 hover:bg-blue-100'
                            }`}
                            title="Read part aloud"
                          >
                            <Volume2 size={16} />
                          </button>
                        </div>
                        <span className="text-sm text-indigo-600 font-semibold bg-indigo-100 px-3 py-1 rounded-full">
                          {part.marks} marks
                        </span>
                      </div>
                      
                      <div className={`mb-6 p-4 rounded-lg border-l-4 ${
                        isDark 
                          ? 'bg-gray-600 border-gray-500' 
                          : 'bg-gray-50 border-gray-400'
                      }`}>
                        <p className={`leading-relaxed text-base ${
                          isDark ? 'text-gray-100' : 'text-gray-800'
                        }`}>{part.question}</p>
                      </div>
                      
                      {/* Model Answer for each part */}
                      {showModelAnswers && part.modelAnswer && (
                        <div className={`p-5 rounded-lg border ${
                          isDark 
                            ? 'bg-green-900 bg-opacity-30 border-green-600' 
                            : 'bg-green-50 border-green-200'
                        }`}>
                          <h5 className={`font-semibold mb-3 flex items-center ${
                            isDark ? 'text-green-300' : 'text-green-800'
                          }`}>
                            <FileText className="mr-2" size={16} />
                            Model Answer:
                          </h5>
                          <div className={`leading-relaxed ${
                            isDark ? 'text-green-200' : 'text-green-700'
                          }`}>
                            {Array.isArray(part.modelAnswer) ? (
                              <ul className="list-disc list-inside space-y-2">
                                {part.modelAnswer.map((answer, ansIdx) => (
                                  <li key={ansIdx} className="leading-relaxed">{renderTextWithLineBreaks(answer)}</li>
                                ))}
                              </ul>
                            ) : (
                              <p className="leading-relaxed">{renderTextWithLineBreaks(part.modelAnswer)}</p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Navigation Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 md:mt-8 gap-4 sm:gap-0">
          <button
            onClick={handlePreviousPage}
            disabled={isFirstPage}
            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition disabled:cursor-not-allowed min-h-[44px] touch-manipulation w-full sm:w-auto ${
              isDark 
                ? 'bg-gray-700 text-gray-200 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400'
            }`}
          >
            <ChevronLeft size={20} />
            <span className="hidden sm:inline">Previous</span>
          </button>

          <div className="text-center order-first sm:order-none">
            <span className={`text-xs md:text-sm ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {currentPage.type === 'examInfo' ? 'Exam Information' :
               currentPage.type === 'sectionInfo' ? `Section ${currentPage.sectionId} Info` :
               `Question ${currentPage.content.id}`}
            </span>
          </div>

          <div className="flex gap-2 md:gap-3 w-full sm:w-auto">
            {!isLastPage ? (
              <button
                onClick={handleNextPage}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition min-h-[44px] touch-manipulation w-full sm:w-auto ${
                  isDark 
                    ? 'bg-indigo-900 bg-opacity-50 text-indigo-300 hover:bg-indigo-800 hover:bg-opacity-60' 
                    : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                }`}
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight size={20} />
              </button>
            ) : (
              <button
                onClick={handleBackToExamList}
                className={`px-4 md:px-6 py-3 rounded-lg font-bold transition text-white min-h-[44px] touch-manipulation w-full sm:w-auto text-sm md:text-base ${
                  isDark 
                    ? 'bg-green-700 hover:bg-green-600' 
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                Back to Exams
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PastExamView;