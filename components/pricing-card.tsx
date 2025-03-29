import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

interface PricingFeature {
  text: string
}

interface PricingCardProps {
  title: string
  description: string
  price: string
  features: PricingFeature[]
}

export function PricingCard({ title, description, price, features }: PricingCardProps) {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="rounded-lg bg-gray-50 p-4">
          <p className="text-sm text-gray-600">
            Get everything you need to kickstart your project with a high-quality design solution.
          </p>
        </div>
        <ul className="space-y-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <Check className="h-5 w-5 text-green-500" />
              <span className="text-sm">{feature.text}</span>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between pt-4">
          <div className="text-2xl font-bold">{price}</div>
          <Button className="bg-gray-800 hover:bg-gray-700">Get Started Today</Button>
        </div>
      </CardContent>
    </Card>
  )
}

