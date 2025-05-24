"use client"

import { useState } from "react"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MoreHorizontal, Edit, Trash2, Search } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { deleteChapter } from "@/lib/actions"

// Mock data - in a real app, this would come from your database
const mockChapters = [
  {
    id: "1",
    title: "Numbers and Counting",
    moduleTitle: "Introduction to Mathematics",
    contentLength: 1250,
    createdAt: "2023-01-15T00:00:00.000Z",
  },
  {
    id: "2",
    title: "Addition and Subtraction",
    moduleTitle: "Introduction to Mathematics",
    contentLength: 1800,
    createdAt: "2023-01-20T00:00:00.000Z",
  },
  {
    id: "3",
    title: "Basic Verbs",
    moduleTitle: "French Grammar",
    contentLength: 2100,
    createdAt: "2023-02-15T00:00:00.000Z",
  },
  {
    id: "4",
    title: "Adjectives",
    moduleTitle: "French Grammar",
    contentLength: 1600,
    createdAt: "2023-02-20T00:00:00.000Z",
  },
  {
    id: "5",
    title: "Ancient Kingdoms",
    moduleTitle: "History of Africa",
    contentLength: 3200,
    createdAt: "2023-04-25T00:00:00.000Z",
  },
]

// Mock modules for filtering
const mockModules = [
  { id: "1", title: "Introduction to Mathematics" },
  { id: "2", title: "French Grammar" },
  { id: "3", title: "Science Basics" },
  { id: "4", title: "History of Africa" },
]

export function ChapterTable() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [moduleFilter, setModuleFilter] = useState("All modules")

  // Filter chapters based on search term and module filter
  const filteredChapters = mockChapters.filter((chapter) => {
    const matchesSearch = chapter.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesModule = moduleFilter === "All modules" || chapter.moduleTitle === moduleFilter

    return matchesSearch && matchesModule
  })

  const handleDeleteChapter = async (chapterId: string) => {
    try {
      // In a real app, this would call a server action to delete the chapter
      await deleteChapter(chapterId)
      toast({
        title: "Chapter deleted",
        description: "The chapter has been successfully deleted.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete chapter. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher des chapitres..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={moduleFilter} onValueChange={setModuleFilter}>
          <SelectTrigger className="w-full sm:w-[250px]">
            <SelectValue placeholder="Tous les modules" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All modules">Tous les modules</SelectItem>
            {mockModules.map((module) => (
              <SelectItem key={module.id} value={module.title}>
                {module.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Titre</TableHead>
              <TableHead>Module</TableHead>
              <TableHead>Longueur du contenu</TableHead>
              <TableHead>Créé le</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredChapters.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  Aucun chapitre trouvé.
                </TableCell>
              </TableRow>
            ) : (
              filteredChapters.map((chapter) => (
                <TableRow key={chapter.id}>
                  <TableCell className="font-medium">{chapter.title}</TableCell>
                  <TableCell>{chapter.moduleTitle}</TableCell>
                  <TableCell>{chapter.contentLength} caractères</TableCell>
                  <TableCell>{new Date(chapter.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/chapters/${chapter.id}`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Éditer
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteChapter(chapter.id)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
