"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, BookOpen, Brain, Gamepad2 } from "lucide-react"
import { TOPICS_BY_SUBJECT } from "@/lib/education-data"
import type { Subject, Topic } from "@/lib/education-data"
import type { UserProfile } from "@/app/page"
import { TopicView } from "@/components/topic-view"
import { QuizView } from "@/components/quiz-view"
import { GamesView } from "@/components/games-view"
import { useLanguage } from "@/lib/language-context"

interface SubjectViewProps {
  subject: Subject
  userProfile: UserProfile
  onBack: () => void
}

type ViewMode = "topics" | "quiz" | "games"

export function SubjectView({ subject, userProfile, onBack }: SubjectViewProps) {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null)
  const [viewMode, setViewMode] = useState<ViewMode>("topics")

  const { t } = useLanguage()

  // Get topics for this subject and class level
  const subjectTopics = TOPICS_BY_SUBJECT[subject.id]?.[userProfile.classLevel] || []

  if (selectedTopic) {
    return <TopicView topic={selectedTopic} onBack={() => setSelectedTopic(null)} />
  }

  if (viewMode === "quiz") {
    return <QuizView subject={subject} userProfile={userProfile} onBack={() => setViewMode("topics")} />
  }

  if (viewMode === "games") {
    return <GamesView subject={subject} onBack={() => setViewMode("topics")} />
  }

  return (
    <div className="min-h-screen p-4 pt-20">
      <div className="max-w-6xl mx-auto font-serif">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button className="border-popover-foreground border-double rounded-2xl" variant="outline" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 rounded-2xl" />
          </Button>
          <div className="flex items-center gap-4">
            <div className="text-4xl">{subject.icon}</div>
            <div>
              <h1 className="text-3xl font-bold text-primary">{subject.name}</h1>
              <p className="text-muted-foreground">{subject.description}</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-8">
          <Button
            variant={viewMode === "topics" ? "default" : "outline"}
            onClick={() => setViewMode("topics")}
            className="flex items-center gap-2"
          >
            <BookOpen className="h-4 w-4" />
            {t("topicsNotes")}
          </Button>
          <Button
            variant={viewMode === "quiz" ? "default" : "outline"}
            onClick={() => setViewMode("quiz")}
            className="flex items-center gap-2"
          >
            <Brain className="h-4 w-4" />
            {t("seeWhatYouveLearnt")}
          </Button>
          <Button
            variant={viewMode === "games" ? "default" : "outline"}
            onClick={() => setViewMode("games")}
            className="flex items-center gap-2"
          >
            <Gamepad2 className="h-4 w-4" />
            {t("timeToPlay")}
          </Button>
        </div>

        {/* Topics Grid */}
        {viewMode === "topics" && (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Topics for Class {userProfile.classLevel}</h2>
              <p className="text-muted-foreground">{t("clickAnyTopic")}</p>
            </div>

            {subjectTopics.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {subjectTopics.map((topic, index) => (
                  <Card
                    key={topic.id}
                    className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 hover:border-primary/50 rounded-2xl border-dashed border-card-foreground"
                    onClick={() => setSelectedTopic(topic)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg group-hover:text-primary transition-colors">
                            {topic.title}
                          </CardTitle>
                          <CardDescription className="mt-2">{topic.description}</CardDescription>
                        </div>
                        <Badge variant="secondary" className="ml-2">
                          {index + 1}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-muted-foreground mb-4 line-clamp-3">{topic.notes}</div>
                      <Button size="sm" className="w-full group-hover:animate-pulse-glow">
                        Read Notes
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="text-center p-12">
                <CardContent>
                  <div className="text-6xl mb-4">📚</div>
                  <h3 className="text-xl font-semibold mb-2">No Topics Available</h3>
                  <p className="text-muted-foreground">
                    Topics for {subject.name} in Class {userProfile.classLevel} are coming soon!
                  </p>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  )
}
