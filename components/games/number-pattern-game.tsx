"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react"

interface NumberPatternGameProps {
  onBack: () => void
}

interface Pattern {
  sequence: number[]
  answer: number
  rule: string
}

export function NumberPatternGame({ onBack }: NumberPatternGameProps) {
  const [currentPattern, setCurrentPattern] = useState<Pattern | null>(null)
  const [userAnswer, setUserAnswer] = useState("")
  const [score, setScore] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  const patterns: Pattern[] = [
    { sequence: [2, 4, 6, 8], answer: 10, rule: "Add 2 each time" },
    { sequence: [1, 3, 5, 7], answer: 9, rule: "Add 2 each time (odd numbers)" },
    { sequence: [5, 10, 15, 20], answer: 25, rule: "Add 5 each time" },
    { sequence: [1, 4, 7, 10], answer: 13, rule: "Add 3 each time" },
    { sequence: [2, 6, 18, 54], answer: 162, rule: "Multiply by 3 each time" },
    { sequence: [100, 90, 80, 70], answer: 60, rule: "Subtract 10 each time" },
  ]

  const generateNewPattern = () => {
    const randomPattern = patterns[Math.floor(Math.random() * patterns.length)]
    setCurrentPattern(randomPattern)
    setUserAnswer("")
    setShowResult(false)
  }

  useEffect(() => {
    generateNewPattern()
  }, [])

  const handleSubmit = () => {
    if (!currentPattern || userAnswer === "") return

    const userNum = Number.parseInt(userAnswer)
    const correct = userNum === currentPattern.answer
    setIsCorrect(correct)
    setShowResult(true)
    setAttempts(attempts + 1)

    if (correct) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    generateNewPattern()
  }

  if (!currentPattern) return null

  return (
    <div className="min-h-screen p-4 pt-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-primary">Number Pattern Puzzle</h1>
            <p className="text-muted-foreground">Find the missing number in the sequence</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">{score}</div>
            <div className="text-sm text-muted-foreground">Score</div>
          </div>
        </div>

        {/* Game Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-center">What comes next?</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Pattern Display */}
            <div className="flex items-center justify-center gap-4 mb-8">
              {currentPattern.sequence.map((num, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-16 h-16 bg-primary text-primary-foreground rounded-lg flex items-center justify-center text-xl font-bold">
                    {num}
                  </div>
                  {index < currentPattern.sequence.length - 1 && (
                    <div className="mx-2 text-2xl text-muted-foreground">→</div>
                  )}
                </div>
              ))}
              <div className="mx-2 text-2xl text-muted-foreground">→</div>
              <div className="w-16 h-16 bg-muted border-2 border-dashed border-primary rounded-lg flex items-center justify-center text-2xl font-bold text-primary">
                ?
              </div>
            </div>

            {/* Input Section */}
            {!showResult && (
              <div className="flex gap-4 justify-center items-end">
                <div>
                  <label className="block text-sm font-medium mb-2">Your answer:</label>
                  <Input
                    type="number"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    className="w-32 text-center text-xl"
                    placeholder="?"
                    autoFocus
                  />
                </div>
                <Button onClick={handleSubmit} disabled={userAnswer === ""} className="animate-pulse-glow">
                  Submit
                </Button>
              </div>
            )}

            {/* Result Display */}
            {showResult && (
              <div className="text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  {isCorrect ? (
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  ) : (
                    <XCircle className="h-8 w-8 text-red-500" />
                  )}
                  <span className="text-2xl font-bold">
                    {isCorrect ? "Correct!" : `Incorrect! The answer was ${currentPattern.answer}`}
                  </span>
                </div>
                <p className="text-muted-foreground mb-6">Pattern rule: {currentPattern.rule}</p>
                <Button onClick={handleNext} size="lg" className="animate-pulse-glow">
                  Next Pattern
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{score}</div>
              <div className="text-sm text-muted-foreground">Correct</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{attempts}</div>
              <div className="text-sm text-muted-foreground">Attempts</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">
                {attempts > 0 ? Math.round((score / attempts) * 100) : 0}%
              </div>
              <div className="text-sm text-muted-foreground">Accuracy</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
