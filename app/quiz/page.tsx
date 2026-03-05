import LogoutBtn from "@/components/LogoutBtn"
import QuestionCard from "@/components/QuestionCard";
import QuizInitializer from "@/components/QuizInitializer"
import { getQuestion } from "@/lib/questions"


export default async function QuizApp() {
  const questions = await getQuestion();
  return (
    <main className="h-full flex flexk-col justify-center items-center p-4">
      <QuizInitializer questions={questions}/>
      Ini halaman quiz
      <QuestionCard/>
      <LogoutBtn/>
    </main>
  )
}
