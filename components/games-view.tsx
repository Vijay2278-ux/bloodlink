"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Gamepad2, Trophy } from "lucide-react"
import { SAMPLE_GAMES } from "@/lib/education-data"
import type { Subject, Game } from "@/lib/education-data"
import { NumberPatternGame } from "@/components/games/number-pattern-game"
import { MemoryGame } from "@/components/games/memory-game"
import { WordScrambleGame } from "@/components/games/word-scramble-game"

interface GamesViewProps {
  subject: Subject
  onBack: () => void
}

export function GamesView({ subject, onBack }: GamesViewProps) {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null)

  console.log("[v0] GamesView - Subject:", subject.id)
  console.log("[v0] GamesView - All sample games:", SAMPLE_GAMES.length)

  // Get games for this subject
  const subjectGames = SAMPLE_GAMES.filter((game) => game.subjectId === subject.id || !game.subjectId)

  console.log("[v0] GamesView - Subject games:", subjectGames.length)

  // Add more games based on subject
  const generateGames = (): Game[] => {
    const baseGames = [...subjectGames]

    if (subject.id === "math") {
      baseGames.push(
        {
          id: "math-calculator",
          title: "Quick Math Challenge",
          description: "Solve arithmetic problems as fast as you can!",
          type: "quiz",
          difficulty: "medium",
          subjectId: "math",
        },
        {
          id: "geometry-shapes",
          title: "Shape Matcher",
          description: "Match shapes with their properties",
          type: "memory",
          difficulty: "easy",
          subjectId: "math",
        },
      )
    } else if (subject.id === "science") {
      baseGames.push(
        {
          id: "periodic-table",
          title: "Element Explorer",
          description: "Learn the periodic table through fun games",
          type: "memory",
          difficulty: "hard",
          subjectId: "science",
        },
        {
          id: "body-systems",
          title: "Human Body Puzzle",
          description: "Put together the human body systems",
          type: "puzzle",
          difficulty: "medium",
          subjectId: "science",
        },
      )
    }

    return baseGames
  }

  const games = generateGames()

  const renderGame = () => {
    if (!selectedGame) return null

    switch (selectedGame.type) {
      case "puzzle":
        return <NumberPatternGame onBack={() => setSelectedGame(null)} />
      case "memory":
        return <MemoryGame onBack={() => setSelectedGame(null)} />
      case "word":
        return <WordScrambleGame onBack={() => setSelectedGame(null)} />
      default:
        return <NumberPatternGame onBack={() => setSelectedGame(null)} />
    }
  }

  if (selectedGame) {
    return renderGame()
  }

  return (
    <div className="min-h-screen p-4 pt-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button className="rounded-2xl border-foreground" variant="outline" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-4">
            <div className="text-4xl">🎮</div>
            <div>
              <h1 className="text-3xl font-bold text-primary">Time to Play!</h1>
              <p className="text-muted-foreground">Learn through fun games and puzzles</p>
            </div>
          </div>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <Card
              key={game.id}
              className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 hover:border-primary/50 animate-bounce-gentle rounded-4xl shadow-xl border-foreground border-dashed"
              onClick={() => setSelectedGame(game)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="text-3xl mb-2">
                      {game.type === "puzzle" && "🧩"}
                      {game.type === "memory" && "🧠"}
                      {game.type === "quiz" && "❓"}
                      {game.type === "word" && "📝"}
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">{game.title}</CardTitle>
                  </div>
                  <Badge
                    variant={
                      game.difficulty === "easy"
                        ? "secondary"
                        : game.difficulty === "medium"
                          ? "default"
                          : "destructive"
                    }
                  >
                    {game.difficulty}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{game.description}</p>
                <Button size="sm" className="w-full group-hover:animate-pulse-glow">
                  <Gamepad2 className="h-4 w-4 mr-2" />
                  Play Game
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Achievement Section */}
        <div className="mt-16">
          <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
            <CardContent className="p-8 text-center">
              <Trophy className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-yellow-700 mb-2">Achievements</h2>
              <p className="text-yellow-600 mb-4">Complete games to unlock badges and rewards!</p>
              <div className="flex justify-center gap-4">
                <Badge variant="outline" className="text-yellow-700 border-yellow-300">
                  🏆 Game Master
                </Badge>
                <Badge variant="outline" className="text-yellow-700 border-yellow-300">
                  🧠 Puzzle Solver
                </Badge>
                <Badge variant="outline" className="text-yellow-700 border-yellow-300">
                  ⚡ Speed Learner
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
