export interface Question {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  options: string[];
  correct_answer: string;
  incorrect_answers: string[];
}