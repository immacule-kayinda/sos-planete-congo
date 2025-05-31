"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  LinkIcon,
  ImageIcon,
  Code,
} from "lucide-react"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
}

export function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const [activeTab, setActiveTab] = useState<string>("edit")

  const handleCommand = (command: string) => {
    // This is a simplified example - in a real app, you'd implement proper rich text editing
    console.log(`Executing command: ${command}`)
  }

  return (
    <div className="border border-white/20 rounded-md overflow-hidden">
      <Tabs defaultValue="edit" onValueChange={setActiveTab}>
        <div className="bg-white/5 border-b border-white/10 p-1 flex justify-between items-center">
          <div className="flex gap-1">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-white/70 hover:text-white"
              onClick={() => handleCommand("bold")}
            >
              <Bold className="h-4 w-4" />
              <span className="sr-only">Bold</span>
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-white/70 hover:text-white"
              onClick={() => handleCommand("italic")}
            >
              <Italic className="h-4 w-4" />
              <span className="sr-only">Italic</span>
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-white/70 hover:text-white"
              onClick={() => handleCommand("link")}
            >
              <LinkIcon className="h-4 w-4" />
              <span className="sr-only">Link</span>
            </Button>
            <span className="border-r border-white/10 mx-1 h-6"></span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-white/70 hover:text-white"
              onClick={() => handleCommand("bulletList")}
            >
              <List className="h-4 w-4" />
              <span className="sr-only">Bullet List</span>
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-white/70 hover:text-white"
              onClick={() => handleCommand("orderedList")}
            >
              <ListOrdered className="h-4 w-4" />
              <span className="sr-only">Ordered List</span>
            </Button>
            <span className="border-r border-white/10 mx-1 h-6"></span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-white/70 hover:text-white"
              onClick={() => handleCommand("alignLeft")}
            >
              <AlignLeft className="h-4 w-4" />
              <span className="sr-only">Align Left</span>
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-white/70 hover:text-white"
              onClick={() => handleCommand("alignCenter")}
            >
              <AlignCenter className="h-4 w-4" />
              <span className="sr-only">Align Center</span>
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-white/70 hover:text-white"
              onClick={() => handleCommand("alignRight")}
            >
              <AlignRight className="h-4 w-4" />
              <span className="sr-only">Align Right</span>
            </Button>
            <span className="border-r border-white/10 mx-1 h-6"></span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-white/70 hover:text-white"
              onClick={() => handleCommand("image")}
            >
              <ImageIcon className="h-4 w-4" />
              <span className="sr-only">Image</span>
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-white/70 hover:text-white"
              onClick={() => handleCommand("code")}
            >
              <Code className="h-4 w-4" />
              <span className="sr-only">Code</span>
            </Button>
          </div>

          <TabsList className="bg-white/10">
            <TabsTrigger value="edit" className={activeTab === "edit" ? "bg-white/20 text-white" : "text-white/70"}>
              Éditer
            </TabsTrigger>
            <TabsTrigger
              value="preview"
              className={activeTab === "preview" ? "bg-white/20 text-white" : "text-white/70"}
            >
              Aperçu
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="edit" className="mt-0">
          <textarea
            className="w-full min-h-[300px] p-4 bg-white/5 text-white resize-y focus:outline-none"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Écrivez votre contenu ici..."
          />
        </TabsContent>

        <TabsContent value="preview" className="mt-0 p-4 min-h-[300px] bg-white/5 prose prose-invert max-w-none">
          {value ? (
            <div dangerouslySetInnerHTML={{ __html: value }} />
          ) : (
            <p className="text-white/50 italic">Aucun contenu à prévisualiser</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
