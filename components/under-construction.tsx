import { Construction } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface UnderConstructionProps {
  title: string
  description?: string
}

export function UnderConstruction({ title, description }: UnderConstructionProps) {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col items-center justify-center p-8 text-center">
          <Construction className="w-16 h-16 text-cyan-500 mb-4" />
          <h2 className="text-2xl font-bold text-teal-800 mb-2">{title}</h2>
                      <p className="text-slate-600 mb-4">{description || "This page is currently under construction."}</p>
            <p className="text-sm text-slate-600">Please check back later for updates.</p>
        </CardContent>
      </Card>
    </div>
  )
}
