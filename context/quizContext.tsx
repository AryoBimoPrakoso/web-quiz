"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { Question } from "@/types/Questions";

type QuizState = {
  questions: Question[];
  currentIndex: number;
  answers: Record<number, string>;
  setQuestions: (q: Question[]) => void;
  answerQuestion: (answer: string) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  clearAnswer: () => void;
};

const QuizContext = createContext<QuizState | null>(null);

export function QuizProvider({ children }: { children: ReactNode }) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const answerQuestion = (answer: string) => {
    setAnswers((prev) => ({ ...prev, [currentIndex]: answer }));
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length) setCurrentIndex((i) => i + 1);
  };

  const prevQuestion = () => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  };

  const clearAnswer = () => {
    setAnswers((prev) => {
      const newAnswers = { ...prev };
      delete newAnswers[currentIndex];
      return newAnswers;
    });
  };


  return (
    <QuizContext.Provider
        value={{
            questions,
            currentIndex,
            answers,
            setQuestions,
            answerQuestion,
            nextQuestion,
            prevQuestion,
            clearAnswer
        }}
    >
        {children}
    </QuizContext.Provider>
  )
}

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) throw new Error("QuizProvider missing");
  return context;
};
