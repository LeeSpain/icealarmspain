
import { personalQuestions } from './personal';
import { addressQuestions } from './address';
import { contactQuestions } from './contact';
import { healthQuestions } from './health';
import { medicationQuestions } from './medications';
import { doctorQuestions } from './doctor';
import { additionalQuestions } from './additional';
import { Question } from '../types';

// Combine all questions into a single array
export const questions: Question[] = [
  personalQuestions,
  ...addressQuestions,
  ...contactQuestions,
  ...healthQuestions,
  medicationQuestions,
  doctorQuestions,
  additionalQuestions
];
