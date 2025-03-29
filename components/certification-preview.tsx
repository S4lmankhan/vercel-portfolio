"use client"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Calendar, Award, X } from "lucide-react"

interface CertificationPreviewProps {
  certification: {
    id: string
    title: string
    provider: string
    date: string
    image: string
    credentialId: string
    skills: string[]
  }
  open: boolean
  onClose: () => void
}

export function CertificationPreview({ certification, open, onClose }: CertificationPreviewProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-gray-800/95 backdrop-blur-md border-gray-700 max-w-3xl">
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4 text-gray-400 hover:text-white" />
          <span className="sr-only">Close</span>
        </DialogClose>

        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            {certification.title}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-6">
          <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-6">
            <Image
              src={certification.image || "/placeholder.svg"}
              alt={certification.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-purple-400">
                <Award className="h-5 w-5 mr-2" />
                <span>{certification.provider}</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Calendar className="h-5 w-5 mr-2" />
                <span>{certification.date}</span>
              </div>
            </div>

            <div>
              <h3 className="text-white font-medium mb-2">Credential ID</h3>
              <p className="text-gray-300 font-mono bg-gray-900/50 p-2 rounded">{certification.credentialId}</p>
            </div>

            <div>
              <h3 className="text-white font-medium mb-2">Skills Covered</h3>
              <div className="flex flex-wrap gap-2">
                {certification.skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="bg-purple-900/30 text-purple-300 hover:bg-purple-900/50"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

