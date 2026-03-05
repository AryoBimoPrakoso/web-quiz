"use client";

import { useQuiz } from "@/context/quizContext";
import { useEffect } from "react";
import { Question } from "@/types/Questions";

export default function QuizInitializer({
  questions,
}: {
  questions: Question[];
}) {
  const { setQuestions } = useQuiz();
  useEffect(() => {
    setQuestions(questions);
  }, [questions, setQuestions]);
  return null;
}
