import { QuizSection } from '@/modules/quiz-taking'
import { GeneralQuizzesSection, QuizzesByModulesSection, useCurrentQuizState } from '@/modules/quizzes-list'
import { QuizzesProgress } from '@/modules/quizzes-progress'
import { Content, SideBar } from '@/ui'

export default function Quizzes() {
  const [currentQuiz, setCurrentQuiz] = useCurrentQuizState()

  return (
    <>
      <Content>
        <QuizSection
          key={currentQuiz.id}
          id={currentQuiz.id}
          name={currentQuiz.name}
        />

        <GeneralQuizzesSection
          currentQuiz={currentQuiz}
          setCurrentQuiz={setCurrentQuiz}
        />

        <QuizzesByModulesSection
          currentQuiz={currentQuiz}
          setCurrentQuiz={setCurrentQuiz}
        />
      </Content>

      <SideBar>
        <QuizzesProgress />
      </SideBar>
    </>
  )
}
