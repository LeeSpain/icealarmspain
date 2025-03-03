import React, { createContext, useContext, useState, ReactNode } from 'react';
import { MultiEntry } from './types';
import { questions } from './questions';

// Define the shape of our context
interface QuestionnaireContextType {
  answers: { [key: string]: any };
  setAnswers: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>;
  multiEntries: { [sectionId: string]: MultiEntry[] };
  setMultiEntries: React.Dispatch<React.SetStateAction<{ [sectionId: string]: MultiEntry[] }>>;
  currentQuestionIndex: number;
  setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
  progress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  createEmptyEntry: (sectionId: string) => MultiEntry;
  handleAddEntry: (sectionId: string) => void;
  handleRemoveEntry: (sectionId: string, entryId: string) => void;
  handleAnswerChange: (questionId: string, subQuestionId: string, value: string | boolean) => void;
  handleMultiEntryChange: (sectionId: string, entryId: string, subQuestionId: string, value: string) => void;
}

// Create the context with default values
const QuestionnaireContext = createContext<QuestionnaireContextType | undefined>(undefined);

// Create a hook to use the context
export const useQuestionnaire = () => {
  const context = useContext(QuestionnaireContext);
  if (!context) {
    throw new Error('useQuestionnaire must be used within a QuestionnaireProvider');
  }
  return context;
};

// Props for the provider component
interface QuestionnaireProviderProps {
  children: ReactNode;
}

// Provider component
export const QuestionnaireProvider: React.FC<QuestionnaireProviderProps> = ({ children }) => {
  const [answers, setAnswers] = useState<{ [key: string]: any }>({});
  const [multiEntries, setMultiEntries] = useState<{ [sectionId: string]: MultiEntry[] }>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // Initialize multi-entries for sections that allow multiple entries
  React.useEffect(() => {
    const initialMultiEntries: { [sectionId: string]: MultiEntry[] } = {};
    
    questions.forEach(question => {
      if (question.allowMultiple) {
        initialMultiEntries[question.id] = [createEmptyEntry(question.id)];
      }
    });
    
    setMultiEntries(initialMultiEntries);
  }, []);

  // Create an empty entry with a unique ID for multi-entry sections
  const createEmptyEntry = (sectionId: string): MultiEntry => {
    const entry: MultiEntry = { _id: `${sectionId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}` };
    
    questions.find(q => q.id === sectionId)?.subQuestions.forEach(subQ => {
      entry[subQ.id] = '';
    });
    
    return entry;
  };

  // Handle adding a new entry for multi-entry sections
  const handleAddEntry = (sectionId: string) => {
    setMultiEntries(prev => ({
      ...prev,
      [sectionId]: [...(prev[sectionId] || []), createEmptyEntry(sectionId)]
    }));
  };

  // Handle removing an entry from multi-entry sections
  const handleRemoveEntry = (sectionId: string, entryId: string) => {
    setMultiEntries(prev => ({
      ...prev,
      [sectionId]: prev[sectionId].filter(entry => entry._id !== entryId)
    }));
  };

  // Handle answer change for regular questions
  const handleAnswerChange = (
    questionId: string,
    subQuestionId: string,
    value: string | boolean
  ) => {
    setAnswers(prev => ({
      ...prev,
      [`${questionId}_${subQuestionId}`]: value
    }));
  };

  // Handle answer change for multi-entry questions
  const handleMultiEntryChange = (
    sectionId: string,
    entryId: string,
    subQuestionId: string,
    value: string
  ) => {
    setMultiEntries(prev => ({
      ...prev,
      [sectionId]: prev[sectionId].map(entry => 
        entry._id === entryId ? { ...entry, [subQuestionId]: value } : entry
      )
    }));
  };

  // Update progress whenever the current question index changes
  React.useEffect(() => {
    setProgress(((currentQuestionIndex + 1) / questions.length) * 100);
  }, [currentQuestionIndex]);

  const value = {
    answers,
    setAnswers,
    multiEntries,
    setMultiEntries,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    progress,
    setProgress,
    createEmptyEntry,
    handleAddEntry,
    handleRemoveEntry,
    handleAnswerChange,
    handleMultiEntryChange,
  };

  return (
    <QuestionnaireContext.Provider value={value}>
      {children}
    </QuestionnaireContext.Provider>
  );
};
