"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, CheckCircle, XCircle, RotateCcw } from "lucide-react"
import { SAMPLE_QUESTIONS, TOPICS_BY_SUBJECT } from "@/lib/education-data"
import type { Subject, Question } from "@/lib/education-data"
import type { UserProfile } from "@/app/page"

interface QuizViewProps {
  subject: Subject
  userProfile: UserProfile
  onBack: () => void
}

interface QuizResult {
  questionId: string
  selectedAnswer: number
  isCorrect: boolean
}

export function QuizView({ subject, userProfile, onBack }: QuizViewProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [quizResults, setQuizResults] = useState<QuizResult[]>([])
  const [quizCompleted, setQuizCompleted] = useState(false)

  console.log("[v0] QuizView - Subject:", subject.id, "Class:", userProfile.classLevel)

  // Get relevant questions for this subject and class level
  const subjectTopics = TOPICS_BY_SUBJECT[subject.id]?.[userProfile.classLevel] || []
  const topicIds = subjectTopics.map((topic) => topic.id)
  const relevantQuestions = SAMPLE_QUESTIONS.filter((q) => topicIds.includes(q.topicId))

  console.log("[v0] QuizView - Subject topics:", subjectTopics.length)
  console.log("[v0] QuizView - Topic IDs:", topicIds)
  console.log("[v0] QuizView - Relevant questions:", relevantQuestions.length)
  console.log("[v0] QuizView - All sample questions:", SAMPLE_QUESTIONS.length)

  // Generate additional questions if we don't have enough
  const generateQuestions = (): Question[] => {
    const baseQuestions = [...relevantQuestions]

    // Add some generic questions based on subject
    if (subject.id === "math") {
      baseQuestions.push(
        {
          id: "math-generic-1",
          question: "What is 15% of 200?",
          options: ["25", "30", "35", "40"],
          correctAnswer: 1,
          explanation: "15% of 200 = (15/100) × 200 = 30",
          topicId: "percentages",
          difficulty: "easy",
        },
        {
          id: "math-generic-2",
          question: "If x + 5 = 12, what is the value of x?",
          options: ["5", "6", "7", "8"],
          correctAnswer: 2,
          explanation: "x + 5 = 12, so x = 12 - 5 = 7",
          topicId: "algebra-basics",
          difficulty: "easy",
        },
      )
    } else if (subject.id === "science") {
      baseQuestions.push(
        {
          id: "science-generic-1",
          question: "What happens to water when it freezes?",
          options: ["It becomes gas", "It becomes solid", "It becomes plasma", "It disappears"],
          correctAnswer: 1,
          explanation: "When water freezes, it changes from liquid to solid state (ice).",
          topicId: "matter-states",
          difficulty: "easy",
        },
        {
          id: "science-generic-2",
          question: "Which part of the plant makes food?",
          options: ["Roots", "Stem", "Leaves", "Flowers"],
          correctAnswer: 2,
          explanation: "Leaves contain chlorophyll and perform photosynthesis to make food for the plant.",
          topicId: "plant-life",
          difficulty: "easy",
        },
      )
    } else if (subject.id === "physics") {
      baseQuestions.push({
        id: "physics-generic-1",
        question: "What is the unit of force?",
        options: ["Joule", "Newton", "Watt", "Pascal"],
        correctAnswer: 1,
        explanation: "The SI unit of force is Newton (N), named after Sir Isaac Newton.",
        topicId: "motion-laws",
        difficulty: "easy",
      })
    }

    return baseQuestions.slice(0, 5) // Limit to 5 questions
  }

  const questions = generateQuestions()
  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer
    const result: QuizResult = {
      questionId: currentQuestion.id,
      selectedAnswer,
      isCorrect,
    }

    setQuizResults([...quizResults, result])
    setShowResult(true)
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      setQuizCompleted(true)
    }
  }

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setQuizResults([])
    setQuizCompleted(false)
  }

  const correctAnswers = quizResults.filter((r) => r.isCorrect).length
  const scorePercentage = Math.round((correctAnswers / questions.length) * 100)

  const getOptionClasses = (index: number) => {
    const isSelected = selectedAnswer === index
    const isCorrect = currentQuestion.correctAnswer === index
    const isWrongSelection = showResult && isSelected && !isCorrect

    if (showResult && isCorrect) {
      return "border-emerald-500 bg-emerald-50 text-emerald-900 hover:bg-emerald-50"
    }

    if (isWrongSelection) {
      return "border-rose-500 bg-rose-50 text-rose-900 hover:bg-rose-50"
    }

    if (isSelected) {
      return "border-primary bg-primary/12 text-primary ring-2 ring-primary/30 hover:bg-primary/16"
    }

    return "border-border bg-white text-slate-700 hover:bg-slate-50"
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen p-4 pt-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" size="icon" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-3xl font-bold text-primary">Quiz - {subject.name}</h1>
          </div>

          <Card className="text-center p-12">
            <CardContent>
              <div className="text-6xl mb-4">🚧</div>
              <h3 className="text-xl font-semibold mb-2">Quiz Coming Soon</h3>
              <p className="text-muted-foreground">
                Questions for {subject.name} in Class {userProfile.classLevel} are being prepared!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (quizCompleted) {
    return (
      <div className="min-h-screen p-4 pt-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" size="icon" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-3xl font-bold text-primary">Quiz Results</h1>
          </div>

          <Card className="text-center p-12">
            <CardContent className="font-serif">
              <div className="text-6xl mb-4">{scorePercentage >= 80 ? "🏆" : scorePercentage >= 60 ? "🎉" : "📚"}</div>
              <h2 className="text-3xl font-bold mb-4">
                {scorePercentage >= 80 ? "Excellent!" : scorePercentage >= 60 ? "Good Job!" : "Keep Learning!"}
              </h2>
              <div className="text-6xl font-bold text-primary mb-4 rounded-2xl border-dashed border-foreground">{scorePercentage}%</div>
              <p className="text-xl mb-6">
                You got {correctAnswers} out of {questions.length} questions correct!
              </p>

              <div className="flex gap-4 justify-center">
                <Button onClick={handleRestartQuiz} className="flex items-center gap-2">
                  <RotateCcw className="h-4 w-4" />
                  Try Again
                </Button>
                <Button variant="outline" onClick={onBack}>
                  Back to Topics
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 pt-20 font-serif">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button className="rounded-2xl border-foreground" variant="outline" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-primary">See What You've Learnt</h1>
            <p className="text-muted-foreground">{subject.name} Quiz</p>
          </div>
          <Badge variant="secondary">
            Question {currentQuestionIndex + 1} of {questions.length}
          </Badge>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <Progress value={progress} className="h-3" />
        </div>

        {/* Question Card */}
        <Card className="mb-8 rounded-2xl shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl">{currentQuestion.question}</CardTitle>
            <Badge variant="outline" className="w-fit">
              {currentQuestion.difficulty}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <Button
                  key={index}
                  type="button"
                  variant="outline"
                  className={`w-full justify-start gap-4 p-4 h-auto rounded-[1.75rem] border-2 text-left shadow-sm transition-all ${getOptionClasses(index)}`}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-current/20 bg-white/80 font-bold">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="flex-1 whitespace-normal">{option}</span>
                  {selectedAnswer === index && !showResult ? (
                    <span className="text-xs font-semibold uppercase tracking-wide">Selected</span>
                  ) : null}
                  {showResult && currentQuestion.correctAnswer === index ? (
                    <CheckCircle className="h-5 w-5 shrink-0 text-emerald-600" />
                  ) : null}
                  {showResult && selectedAnswer === index && currentQuestion.correctAnswer !== index ? (
                    <XCircle className="h-5 w-5 shrink-0 text-rose-600" />
                  ) : null}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Result Display */}
        {showResult && (
          <Card
            className={`mb-8 ${currentQuestion.correctAnswer === selectedAnswer ? "border-green-500" : "border-red-500"}`}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                {currentQuestion.correctAnswer === selectedAnswer ? (
                  <CheckCircle className="h-6 w-6 text-green-500" />
                ) : (
                  <XCircle className="h-6 w-6 text-red-500" />
                )}
                <span className="text-lg font-semibold">
                  {currentQuestion.correctAnswer === selectedAnswer ? "Correct!" : "Incorrect"}
                </span>
              </div>
              <p className="text-muted-foreground">{currentQuestion.explanation}</p>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center">
          {!showResult ? (
            <Button
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null}
              size="lg"
              className="animate-pulse-glow"
            >
              Submit Answer
            </Button>
          ) : (
            <Button onClick={handleNextQuestion} size="lg" className="animate-pulse-glow">
              {currentQuestionIndex < questions.length - 1 ? "Next Question" : "View Results"}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
