"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import type { UserProfile } from "@/app/page"
import { useLanguage } from "@/lib/language-context"
interface OnboardingFlowProps {
  onComplete: (profile: UserProfile) => void
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    classLevel: "",
    name: "",
    age: "",
    reason: "",
  })

  const { t } = useLanguage()

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    } else {
      // Complete onboarding
      onComplete({
        name: formData.name,
        age: Number.parseInt(formData.age),
        classLevel: Number.parseInt(formData.classLevel),
        reason: formData.reason,
        completedOnboarding: true,
      })
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.classLevel !== ""
      case 2:
        return formData.name.trim() !== ""
      case 3:
        return formData.age !== "" && Number.parseInt(formData.age) > 0
      case 4:
        return formData.reason.trim() !== ""
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-serif">
      <div className="w-full max-w-2xl rounded-[2rem] border border-border/70 bg-card/45 p-5 shadow-[0_24px_80px_-32px_rgba(15,23,42,0.45)] backdrop-blur-sm">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-2xl font-bold text-primary">{t("letsGetStarted")}</h1>
            <span className="text-sm text-muted-foreground">
              Step {currentStep} of {totalSteps}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="animate-bounce-gentle rounded-[1.75rem] border-border/80 bg-card/95 shadow-[0_24px_60px_-30px_rgba(29,78,216,0.35)]">
          <CardHeader className="text-center">
            <div className="text-6xl mb-4">
              {currentStep === 1 && "🎓"}
              {currentStep === 2 && "👋"}
              {currentStep === 3 && "🎂"}
              {currentStep === 4 && "💭"}
            </div>
            <CardTitle className="text-2xl shadow rounded-2xl">
              {currentStep === 1 && t("selectYourClass")}
              {currentStep === 2 && t("whatsYourName")}
              {currentStep === 3 && t("howOldAreYou")}
              {currentStep === 4 && t("whyDoYouWantToLearn")}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && t("chooseClassHint")}
              {currentStep === 2 && t("nameHint")}
              {currentStep === 3 && t("ageHint")}
              {currentStep === 4 && t("reasonHint")}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Step 1: Class Selection */}
            {currentStep === 1 && (
              <RadioGroup
                value={formData.classLevel}
                onValueChange={(value) => setFormData({ ...formData, classLevel: value })}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                {[6, 7, 8, 9, 10, 11, 12].map((classNum) => (
                  <div key={classNum} className="flex items-center space-x-2 rounded-2xl shadow-none">
                    <RadioGroupItem value={classNum.toString()} id={`class-${classNum}`} />
                            <Label
                      htmlFor={`class-${classNum}`}
                      className="flex-1 p-4 border cursor-pointer hover:bg-accent transition-colors text-center font-medium rounded-2xl border-foreground shadow-xl"
                    >
                      {t("class")} {classNum}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}

            {/* Step 2: Name Input */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <Label htmlFor="name" className="text-lg font-medium">
                  {t("enterYourName")}
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder={t("enterYourName")}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="text-lg p-6 rounded-4xl"
                  autoFocus
                />
              </div>
            )}

            {/* Step 3: Age Input */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <Label htmlFor="age" className="text-lg font-medium">
                  {t("enterYourAge")}
                </Label>
                <Input
                  id="age"
                  type="number"
                  placeholder={t("enterYourAge")}
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="text-lg p-6 rounded-2xl"
                  min="5"
                  max="25"
                  autoFocus
                />
              </div>
            )}

            {/* Step 4: Reason */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <Label htmlFor="reason" className="text-lg font-medium rounded-2xl">
                  {t("whyDoYouWantToLearn")}
                </Label>
                <Textarea
                  id="reason"
                  placeholder={t("enterReasonPlaceholder")}
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  className="min-h-32 text-lg p-4 rounded-2xl"
                  autoFocus
                />
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 rounded-4xl border-foreground">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="px-8 bg-transparent"
              >
                {t("back")}
              </Button>
              <Button onClick={handleNext} disabled={!isStepValid()} className="px-8 animate-pulse-glow rounded-2xl border-card-foreground">
                {currentStep === totalSteps ? t("startLearning") : t("next")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
