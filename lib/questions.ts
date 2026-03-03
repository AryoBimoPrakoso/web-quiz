import he from "he";
import { Question } from "@/types/Questions";

function shufffle<T>(array: T[]): T[] {
  const copy = [...array];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export async function getQuestion(): Promise<Question[]> {
  const res = await fetch(
    "https://opentdb.com/api.php?amount=10&category=12&difficulty=easy&type=multiple",
    { cache: "no-store" },
  );
  if (!res.ok) throw new Error("Failed fetching question");

  const data = await res.json();

  const questions: Question[] = data.results.map((q: any) => {
    const correct_answer = he.decode(q.correct_answer);
    const incorrect_answers = q.incorrect_answers.map((a: string) =>
      he.decode(a),
    );

    const options = shufffle([correct_answer, ...incorrect_answers]);
    const correctIndex = options.indexOf(correct_answer);

    return {
      type: q.type,
      difficulty: q.difficulty,
      category: q.category,
      question: he.decode(q.question),
      options,
      correctIndex,
    };
  });

  return questions
}
