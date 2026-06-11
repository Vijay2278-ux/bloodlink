"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, CheckCircle, XCircle, Lightbulb } from "lucide-react"

interface WordScrambleGameProps {
  onBack: () => void
}

interface ScrambleWord {
  word: string
  scrambled: string
  hint: string
  category: string
}

export function WordScrambleGame({ onBack }: WordScrambleGameProps) {
  const [currentWord, setCurrentWord] = useState<ScrambleWord | null>(null)
  const [userAnswer, setUserAnswer] = useState("")
  const [score, setScore] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [showHint, setShowHint] = useState(false)

  const words: ScrambleWord[] = [
    {
      word: "PHOTOSYNTHESIS",
      scrambled: "HPOTOSYNTHESIS",
      hint: "Process by which plants make food using sunlight",
      category: "Biology",
    },
    {
      word: "GRAVITY",
      scrambled: "VITYRAG",
      hint: "Force that pulls objects toward Earth",
      category: "Physics",
    },
    {
      word: "MOLECULE",
      scrambled: "CELUMEOL",
      hint: "Smallest unit of a chemical compound",
      category: "Chemistry",
    },
    {
      word: "TRIANGLE",
      scrambled: "GLETRAIN",
      hint: "Shape with three sides and three angles",
      category: "Mathematics",
    },
    {
      word: "ELECTRON",
      scrambled: "TRONELEC",
      hint: "Negatively charged particle in an atom",
      category: "Chemistry",
    },
    {
      word: "FRACTION",
      scrambled: "TIONFARC",
      hint: "Part of a whole number",
      category: "Mathematics",
    },
  ]

  const scrambleWord = (word: string): string => {
    const letters = word.split("")
    for (let i = letters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[letters[i], letters[j]] = [letters[j], letters[i]]
    }
    return letters.join("")
  }

  const generateNewWord = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)]
    const newScrambled = scrambleWord(randomWord.word)
    setCurrentWord({
      ...randomWord,
      scrambled: newScrambled,
    })
    setUserAnswer("")
    setShowResult(false)
    setShowHint(false)
  }

  useEffect(() => {
    generateNewWord()
  }, [])

  const handleSubmit = () => {
    if (!currentWord || userAnswer === "") return

    const correct = userAnswer.toUpperCase() === currentWord.word.toUpperCase()
    setIsCorrect(correct)
    setShowResult(true)
    setAttempts(attempts + 1)

    if (correct) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    generateNewWord()
  }

  if (!currentWord) return null

  return (
    <div className="min-h-screen p-4 pt-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-primary">Word Scramble</h1>
            <p className="text-muted-foreground">Unscramble the scientific terms</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">{score}</div>
            <div className="text-sm text-muted-foreground">Score</div>
          </div>
        </div>

        {/* Game Card */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-center flex-1">Unscramble this word:</CardTitle>
              <Button variant="outline" size="sm" onClick={() => setShowHint(!showHint)}>
                <Lightbulb className="h-4 w-4 mr-2" />
                Hint
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Category Badge */}
            <div className="text-center mb-4">
              <span className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-medium">
                {currentWord.category}
              </span>
            </div>

            {/* Scrambled Word Display */}
            <div className="text-center mb-8">
              <div className="text-4xl font-bold text-primary tracking-wider mb-4 font-mono">
                {currentWord.scrambled}
              </div>
              <div className="text-sm text-muted-foreground">({currentWord.word.length} letters)</div>
            </div>

            {/* Hint */}
            {showHint && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 text-yellow-700">
                  <Lightbulb className="h-4 w-4" />
                  <span className="font-medium">Hint:</span>
                </div>
                <p className="text-yellow-600 mt-1">{currentWord.hint}</p>
              </div>
            )}

            {/* Input Section */}
            {!showResult && (
              <div className="flex gap-4 justify-center items-end">
                <div>
                  <label className="block text-sm font-medium mb-2">Your answer:</label>
                  <Input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    className="w-64 text-center text-xl uppercase"
                    placeholder="Enter the word..."
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
                    {isCorrect ? "Correct!" : `Incorrect! The word was "${currentWord.word}"`}
                  </span>
                </div>
                <p className="text-muted-foreground mb-6">{currentWord.hint}</p>
                <Button onClick={handleNext} size="lg" className="animate-pulse-glow">
                  Next Word
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
