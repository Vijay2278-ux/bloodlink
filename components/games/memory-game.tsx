"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, RotateCcw } from "lucide-react"

interface MemoryGameProps {
  onBack: () => void
}

interface MemoryCard {
  id: number
  content: string
  isFlipped: boolean
  isMatched: boolean
}

export function MemoryGame({ onBack }: MemoryGameProps) {
  const [cards, setCards] = useState<MemoryCard[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [matches, setMatches] = useState(0)
  const [gameCompleted, setGameCompleted] = useState(false)

  const cardPairs = ["🔬", "⚛️", "🧪", "🧬", "🔭", "⚡", "🌡️", "🧲"]

  const initializeGame = () => {
    const gameCards = [...cardPairs, ...cardPairs]
      .sort(() => Math.random() - 0.5)
      .map((content, index) => ({
        id: index,
        content,
        isFlipped: false,
        isMatched: false,
      }))

    setCards(gameCards)
    setFlippedCards([])
    setMoves(0)
    setMatches(0)
    setGameCompleted(false)
  }

  useEffect(() => {
    initializeGame()
  }, [])

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards
      const firstCard = cards[first]
      const secondCard = cards[second]

      if (firstCard.content === secondCard.content) {
        // Match found
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) => (card.id === first || card.id === second ? { ...card, isMatched: true } : card)),
          )
          setMatches(matches + 1)
          setFlippedCards([])

          if (matches + 1 === cardPairs.length) {
            setGameCompleted(true)
          }
        }, 1000)
      } else {
        // No match
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) => (card.id === first || card.id === second ? { ...card, isFlipped: false } : card)),
          )
          setFlippedCards([])
        }, 1000)
      }
      setMoves(moves + 1)
    }
  }, [flippedCards, cards, matches])

  const handleCardClick = (cardId: number) => {
    if (flippedCards.length === 2) return
    if (cards[cardId].isFlipped || cards[cardId].isMatched) return

    setCards((prev) => prev.map((card) => (card.id === cardId ? { ...card, isFlipped: true } : card)))
    setFlippedCards([...flippedCards, cardId])
  }

  return (
    <div className="min-h-screen p-4 pt-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-primary">Memory Game</h1>
            <p className="text-muted-foreground">Match the science symbols!</p>
          </div>
          <div className="flex gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{moves}</div>
              <div className="text-sm text-muted-foreground">Moves</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{matches}</div>
              <div className="text-sm text-muted-foreground">Matches</div>
            </div>
          </div>
        </div>

        {/* Game Completed */}
        {gameCompleted && (
          <Card className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-green-700 mb-2">Congratulations!</h2>
              <p className="text-green-600 mb-4">You completed the game in {moves} moves!</p>
              <Button onClick={initializeGame} className="flex items-center gap-2">
                <RotateCcw className="h-4 w-4" />
                Play Again
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Game Grid */}
        <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
          {cards.map((card) => (
            <Card
              key={card.id}
              className={`aspect-square cursor-pointer transition-all duration-300 ${
                card.isFlipped || card.isMatched ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
              } ${card.isMatched ? "opacity-75" : ""}`}
              onClick={() => handleCardClick(card.id)}
            >
              <CardContent className="p-0 h-full flex items-center justify-center">
                <div className="text-4xl">{card.isFlipped || card.isMatched ? card.content : "❓"}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Instructions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg">How to Play</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>Click on cards to flip them over</li>
              <li>Try to find matching pairs of science symbols</li>
              <li>Match all pairs to win the game</li>
              <li>Try to complete it in as few moves as possible!</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
