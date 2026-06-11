"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, BookOpen, Lightbulb } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"
import type { Topic } from "@/lib/education-data"

interface TopicViewProps {
  topic: Topic
  onBack: () => void
}

export function TopicView({ topic, onBack }: TopicViewProps) {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen p-4 pt-20">
      <div className="max-w-4xl mx-auto font-serif rounded-2xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 text-foreground bg-background rounded-4xl shadow-xl" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-primary">{topic.title}</h1>
            <p className="text-muted-foreground">{topic.description}</p>
            <Badge variant="secondary" className="mt-2">
              Class {topic.classLevel}
            </Badge>
          </div>
        </div>

        {topic.id === "cellular-biology" && (
          <Card className="mb-8 rounded-4xl shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">🔬 Cell Structure Diagram</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <Image
                  src="/images/cellular-biology.jpg"
                  alt="Detailed cross-section of a cell showing nucleus, mitochondria, endoplasmic reticulum, and other organelles"
                  width={600}
                  height={600}
                  className="rounded-lg shadow-lg border border-primary/20"
                  priority
                />
              </div>
              <p className="text-center text-sm text-muted-foreground mt-4">
                A detailed view of cellular components including nucleus (center), mitochondria (brown), endoplasmic
                reticulum (yellow), and cell membrane (outer boundary)
              </p>
            </CardContent>
          </Card>
        )}

        {topic.id === "forces-motion" && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">⚡ Forces and Motion Demonstration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <Image
                  src="/images/forces-motion.jpg"
                  alt="Educational demonstration showing wooden blocks, blue ball, and red toy car with arrows indicating force and motion direction"
                  width={600}
                  height={600}
                  className="rounded-lg shadow-lg border border-primary/20"
                  priority
                />
              </div>
              <p className="text-center text-sm text-muted-foreground mt-4">
                Visual demonstration of Newton's laws using everyday objects - blocks at rest, ball in motion, and
                applied force on a toy car
              </p>
            </CardContent>
          </Card>
        )}

        {topic.id === "rock-cycle" && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">🌋 Rock Cycle Diagram</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <Image
                  src="/images/rock-cycle.jpg"
                  alt="Comprehensive rock cycle diagram showing volcanic activity, igneous rocks, sedimentary layers, metamorphic processes, and transformation arrows"
                  width={600}
                  height={600}
                  className="rounded-lg shadow-lg border border-primary/20"
                  priority
                />
              </div>
              <p className="text-center text-sm text-muted-foreground mt-4">
                Complete rock cycle showing igneous formation from magma, sedimentary layering, metamorphic
                transformation, and continuous geological processes
              </p>
            </CardContent>
          </Card>
        )}

        {topic.id === "rational-numbers" && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">🔢 Rational Numbers Examples</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <Image
                  src="/images/rational-numbers.jpg"
                  alt="Educational blackboard showing rational number conversions between fractions, decimals, and different forms with mathematical examples"
                  width={600}
                  height={600}
                  className="rounded-lg shadow-lg border border-primary/20"
                  priority
                />
              </div>
              <p className="text-center text-sm text-muted-foreground mt-4">
                Visual examples of rational numbers showing conversions between fractions (1/2, 3/4), decimals (0.5,
                0.75), and different mathematical representations
              </p>
            </CardContent>
          </Card>
        )}

        {/* Notes Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              {t("quickReviewNotes")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed text-foreground">{topic.notes}</p>
            </div>
          </CardContent>
        </Card>

        {/* Key Points Section */}
        <Card className="mb-8 rounded-4xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              {t("keyPointsToRemember")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
                <h4 className="font-semibold text-primary mb-2">{t("quickTip")}</h4>
                <p className="text-sm">
                  {t("practiceTip", { topic: topic.title })}
                </p>
              </div>
              <div className="bg-secondary/10 p-4 rounded-lg border border-secondary/20">
                <h4 className="font-semibold text-secondary mb-2">{t("focusArea")}</h4>
                <p className="text-sm">{t("focusAreaBody")}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <Button size="lg" className="animate-pulse-glow">
            {t("takePracticeQuiz")}
          </Button>
          <Button variant="outline" size="lg">
            {t("viewRelatedTopics")}
          </Button>
        </div>
      </div>
    </div>
  )
}
