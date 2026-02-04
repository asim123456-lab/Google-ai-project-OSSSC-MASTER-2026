export enum Subject {
  GeneralStudies = 'General Studies',
  Mathematics = 'Mathematics',
  English = 'English Language',
  Odia = 'Odia Language',
  Computer = 'Computer Knowledge',
  LogicalReasoning = 'Logical Reasoning'
}

export interface Question {
  id: string | number;
  question: string;
  options: string[];
  correctAnswer: number; // Index
  explanation: string;
  subject: Subject;
  isAiGenerated?: boolean;
}

export type QuizMode = 'Preliminary' | 'Main' | 'Subject';

export interface TestResult {
  id: string;
  date: string;
  score: number;
  totalQuestions: number;
  correctCount: number;
  wrongCount: number;
  mode: QuizMode;
  subject?: Subject;
  // History Features
  questions: Question[]; 
  userAnswers: { [key: number]: number }; // Map index -> option index
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
}

export interface SyllabusTopic {
  id: string;
  title: string;
  content: string; // HTML or Markdown text
  isDownloaded?: boolean;
}

export interface SubjectModule {
  id: Subject;
  icon: string;
  color: string;
  topics: SyllabusTopic[];
}

export interface NewsUpdate {
  id: number;
  title: string;
  date: string;
  link: string;
  isNew: boolean;
}