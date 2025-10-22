import { useState, useMemo, useEffect } from 'react';
import { BookOpen, Calendar, Clock, FileText, ChevronLeft, ChevronRight, Volume2, Eye, EyeOff, Info } from 'lucide-react';
import { useTextToSpeech } from '../hooks/useTextToSpeech';
import SpeechControls from './SpeechControls';

const PastExamView = ({ 
  pastExamQuestions, 
  onBackToHome 
}) => {
  const [selectedExam, setSelectedExam] = useState(null);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [showModelAnswers, setShowModelAnswers] = useState(false);

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
    } else if (page.content.context) {
      return `Context: ${page.content.context}. Question: ${page.content.question || 'This question has multiple parts'}`;
    } else {
      return page.content.question || 'This question has multiple parts';
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
          className="mb-4 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition text-indigo-600 font-semibold"
        >
          <ChevronLeft className="inline mr-2" size={16} />
          Back to Home
        </button>
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <BookOpen size={64} className="mx-auto mb-4 text-indigo-600" />
            <h2 className="text-3xl font-bold text-indigo-900 mb-2">Past Exam Questions</h2>
            <p className="text-gray-600">Study previous exam papers with model answers</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pastExamQuestions.map((exam) => (
              <div
                key={exam.id}
                onClick={() => handleExamSelect(exam)}
                className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg border-2 border-indigo-100 hover:border-indigo-300 cursor-pointer transition group"
              >
                <div className="flex items-center mb-4">
                  <Calendar className="text-indigo-600 mr-3" size={24} />
                  <span className="text-sm text-indigo-600 font-semibold">{exam.year}</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition">
                  {exam.examInfo.courseName}
                </h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <Clock className="mr-2" size={16} />
                    <span className="text-sm">{exam.examInfo.duration}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FileText className="mr-2" size={16} />
                    <span className="text-sm">{exam.sections.length} sections</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    Click to start
                  </span>
                  <ChevronRight className="text-indigo-400 group-hover:text-indigo-600 transition" size={20} />
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
        className="mb-4 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition text-indigo-600 font-semibold"
      >
        <ChevronLeft className="inline mr-2" size={16} />
        Back to Past Exams
      </button>
      
      <div className="bg-white rounded-lg shadow-lg p-8">
        {/* Progress Header */}
        <div className="mb-6">
          <div className="flex justify-between items-start gap-4">
            <div>
              <h2 className="text-3xl font-bold text-indigo-900">
                {selectedExam.examInfo.courseName}
              </h2>
              <p className="text-gray-600 mt-2">
                Page {currentPageIndex + 1} of {examPages.length}
              </p>
              <div className="flex gap-2 mt-2 flex-wrap">
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
                      className={`w-3 h-3 rounded-full ${dotColor}`}
                      title={`${page.type === 'examInfo' ? 'Exam Info' : 
                              page.type === 'sectionInfo' ? `Section ${page.sectionId}` :
                              `Question ${page.content.id}`}`}
                    />
                  );
                })}
              </div>
            </div>
            
            {/* Speech Controls */}
            <div className="relative">
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
            <div className="mt-4 bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  {isSpeaking ? 'Reading...' : 'Speech Complete'}
                </span>
                <span className="text-sm text-gray-500">
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              {currentText && (
                <p className="text-xs text-gray-600 mt-2 line-clamp-2">
                  {currentText.length > 100 ? `${currentText.substring(0, 100)}...` : currentText}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Page Content */}
        <div className="min-h-96">
          {/* Exam Info Page */}
          {currentPage.type === 'examInfo' && (
            <div className="space-y-6">
              <div className="text-center p-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg text-white">
                <Info size={64} className="mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">{currentPage.content.title}</h3>
                <h4 className="text-xl mb-4">{currentPage.content.courseName}</h4>
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

              <div className="p-6 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                <h4 className="font-bold text-gray-800 mb-4 flex items-center">
                  <FileText className="mr-2" size={20} />
                  Exam Instructions:
                </h4>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {currentPage.content.instructions.map((instruction, idx) => (
                    <li key={idx}>{instruction}</li>
                  ))}
                </ul>
              </div>

              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-blue-800 font-medium">
                  Click "Next" to start viewing the exam sections and questions
                </p>
              </div>
            </div>
          )}

          {/* Section Info Page */}
          {currentPage.type === 'sectionInfo' && (
            <div className="space-y-6">
              <div className="text-center p-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg text-white">
                <FileText size={64} className="mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">{currentPage.content.title}</h3>
                <p className="text-lg">{currentPage.content.instructions}</p>
                <div className="mt-4">
                  <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm">
                    {currentPage.content.marks} marks total
                  </span>
                </div>
              </div>

              <div className="p-6 bg-purple-50 rounded-lg border-l-4 border-purple-400">
                <h4 className="font-bold text-gray-800 mb-3">Section Overview:</h4>
                <div className="grid grid-cols-2 gap-4 text-gray-700">
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

              <div className="text-center p-4 bg-indigo-50 rounded-lg">
                <p className="text-indigo-800 font-medium">
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
                  <h3 className="text-2xl font-bold text-indigo-900">
                    {currentPage.sectionTitle} - Question {currentPage.content.id}
                  </h3>
                  <p className="text-gray-600 mt-2">{currentPage.content.totalMarks} marks</p>
                </div>
                
                {/* Speech Controls */}
                <button
                  onClick={() => {
                    const textToSpeak = currentPage.content.context 
                      ? `Context: ${currentPage.content.context}. Question: ${currentPage.content.question || 'This question has multiple parts'}`
                      : currentPage.content.question || 'This question has multiple parts';
                    speak(textToSpeak); // No auto-advance for individual button
                  }}
                  className="p-2 text-blue-600 hover:bg-blue-100 rounded transition"
                  title="Read question aloud"
                >
                  <Volume2 size={20} />
                </button>
              </div>

              {/* Case Study/Context */}
              {currentPage.content.context && (
                <div className="p-6 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                  <h4 className="font-bold text-gray-800 mb-3">Case Study/Context:</h4>
                  <p className="text-gray-700 leading-relaxed">{currentPage.content.context}</p>
                </div>
              )}

              {/* Main Question */}
              {currentPage.content.question && (
                <div className="space-y-4">
                  <div className="p-6 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                    <p className="text-gray-800 font-medium text-lg leading-relaxed">{currentPage.content.question}</p>
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
                      {showModelAnswers ? 'Hide Model Answer' : 'Show Model Answer'}
                    </button>
                  </div>

                  {/* Single Question Model Answer */}
                  {!currentPage.content.parts && showModelAnswers && currentPage.content.modelAnswer && (
                    <div className="p-6 bg-green-50 rounded-lg border border-green-200">
                      <h5 className="font-semibold text-green-800 mb-4 flex items-center">
                        <FileText className="mr-2" size={20} />
                        Model Answer:
                      </h5>
                      <div className="text-green-700 leading-relaxed">
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
                      {showModelAnswers ? 'Hide Model Answers' : 'Show Model Answers'}
                    </button>
                  </div>

                  {currentPage.content.parts.map((part, idx) => (
                    <div key={part.part || idx} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <h4 className="text-lg font-semibold text-gray-800">
                            Part {part.part || idx + 1}
                          </h4>
                          <button
                            onClick={() => speak(`Part ${part.part || idx + 1}. ${part.question}`)} // No auto-advance for individual parts
                            className="p-1 text-blue-600 hover:bg-blue-100 rounded transition"
                            title="Read part aloud"
                          >
                            <Volume2 size={16} />
                          </button>
                        </div>
                        <span className="text-sm text-indigo-600 font-semibold bg-indigo-100 px-3 py-1 rounded-full">
                          {part.marks} marks
                        </span>
                      </div>
                      
                      <div className="mb-6 p-4 bg-gray-50 rounded-lg border-l-4 border-gray-400">
                        <p className="text-gray-800 leading-relaxed text-base">{part.question}</p>
                      </div>
                      
                      {/* Model Answer for each part */}
                      {showModelAnswers && part.modelAnswer && (
                        <div className="p-5 bg-green-50 rounded-lg border border-green-200">
                          <h5 className="font-semibold text-green-800 mb-3 flex items-center">
                            <FileText className="mr-2" size={16} />
                            Model Answer:
                          </h5>
                          <div className="text-green-700 leading-relaxed">
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
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={handlePreviousPage}
            disabled={isFirstPage}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={20} />
            Previous
          </button>

          <div className="text-center">
            <span className="text-sm text-gray-600">
              {currentPage.type === 'examInfo' ? 'Exam Information' :
               currentPage.type === 'sectionInfo' ? `Section ${currentPage.sectionId} Info` :
               `Question ${currentPage.content.id}`}
            </span>
          </div>

          <div className="flex gap-3">
            {!isLastPage ? (
              <button
                onClick={handleNextPage}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg font-semibold hover:bg-indigo-200 transition"
              >
                Next
                <ChevronRight size={20} />
              </button>
            ) : (
              <button
                onClick={handleBackToExamList}
                className="px-6 py-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition"
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