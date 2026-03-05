"use client";
import { useQuiz } from "@/context/quizContext";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { MoonLoader } from "react-spinners";

export default function QuestionCard() {
  const {
    questions,
    currentIndex,
    answerQuestion,
    nextQuestion,
    prevQuestion,
    answers,
    clearAnswer,
  } = useQuiz();
  const q = questions[currentIndex];
  if (!q) return <MoonLoader />;
  const currentAnswer = answers[currentIndex] || "";
  return (
    <main className="p-14 border w-full max-w-2xl flex flex-col gap-4 rounded-xl shadow-lg border-white/20">
      <p>
        Question {currentIndex + 1} of {questions.length}
      </p>
      <h2 className="text-xl font-semibold">{q.question}</h2>

      <div className="flex flex-col gap-3 mt-4">
        {q.options.map((op, i) => (
          <label
            key={i}
            className={`flex items-center gap-3 p-3 border rounded-md cursor-pointer hover:bg-black/70 ${currentAnswer === op ? "border-blue-500 bg-black/70" : "border-gray-200"}`}
          >
            <input
              type="radio"
              className="w-4 h-4"
              name="quiz-option"
              checked={currentAnswer === op}
              onChange={() => answerQuestion(op)}
            />
            {op}
          </label>
        ))}
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={prevQuestion}
          disabled={currentIndex === 0}
          className="flex items-center gap-2 px-4 py-2 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
        >
          <ArrowLeft size={18} /> Prev
        </button>
        {currentAnswer && (
            <button onClick={clearAnswer} className="text-red-500 underline">
                Clear Option
            </button>
        )}
        <button
          onClick={nextQuestion}
          className="flex items-center gap-2 px-4 py-2 disabled:opacity-30 cursor-pointer"
        >
          {currentIndex === questions.length - 1 ? "Finish" : "Next"}
          {currentIndex === questions.length - 1 ? <Check/> : <ArrowRight/> }
        </button>
      </div>
    </main>
  );
}
