import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"

interface CabCardProps {
  type: string
  description: string
  imageSrc: string
}

export default function CabCard({ type, description, imageSrc }: CabCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative h-48">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 z-10 bg-white/80 hover:bg-white/90 rounded-full h-8 w-8"
        >
          <Heart className="h-4 w-4" />
          <span className="sr-only">Add to favorites</span>
        </Button>
        <Image src={imageSrc || "/placeholder.svg"} alt={type} fill className="object-cover" />
      </div>
      <CardContent className="p-4">
        <h3 className="text-xl font-bold mb-1">{type}</h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <Button className="w-full bg-blue-600 hover:bg-blue-700">Book Now</Button>
      </CardContent>
    </Card>
  )
}

