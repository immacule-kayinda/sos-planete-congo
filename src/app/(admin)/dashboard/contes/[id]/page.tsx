import { ConteForm } from "@/components/conte-form"
import { Card } from "@/components/ui/card"
import { notFound } from "next/navigation"

// Mock function to get conte by ID - in a real app, this would fetch from your database
async function getConteById(id: string) {
  // Mock data
  const contes = {
    "1": {
      id: "1",
      moduleId: "1",
      text: "Once upon a time, there was a kingdom of numbers...",
      audioUrl: "https://example.com/audio1.mp3",
      imagesUrls: [
        "https://example.com/image1.jpg",
        "https://example.com/image2.jpg",
        "https://example.com/image3.jpg",
      ],
    },
    "2": {
      id: "2",
      moduleId: "2",
      text: "Dans un petit village français...",
      audioUrl: "https://example.com/audio2.mp3",
      imagesUrls: [
        "https://example.com/image4.jpg",
        "https://example.com/image5.jpg",
        "https://example.com/image6.jpg",
        "https://example.com/image7.jpg",
        "https://example.com/image8.jpg",
      ],
    },
    "4": {
      id: "4",
      moduleId: "4",
      text: "Long ago, in the heart of Africa...",
      audioUrl: "https://example.com/audio3.mp3",
      imagesUrls: [
        "https://example.com/image9.jpg",
        "https://example.com/image10.jpg",
        "https://example.com/image11.jpg",
        "https://example.com/image12.jpg",
        "https://example.com/image13.jpg",
        "https://example.com/image14.jpg",
        "https://example.com/image15.jpg",
        "https://example.com/image16.jpg",
      ],
    },
  }

  return contes[id] || null
}

export default async function EditContePage({ params }: { params: { id: string } }) {
  const conte = await getConteById(params.id)

  if (!conte) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Modifier le conte</h1>
        <p className="text-muted-foreground">Mettre à jour le texte, l'audio et les images du conte.</p>
      </div>

      <Card className="p-6">
        <ConteForm conte={conte} />
      </Card>
    </div>
  )
}
