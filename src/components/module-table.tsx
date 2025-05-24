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
import { MoreHorizontal, Edit, Trash2, FileText, Search, BookMarked } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { deleteModule } from "@/lib/actions"

// Mock data - in a real app, this would come from your database
const mockModules = [
  {
    id: "1",
    title: "Introduction to Mathematics",
    description: "Basic mathematical concepts for beginners",
    hasContent: true,
    chaptersCount: 5,
    createdAt: "2023-01-15T00:00:00.000Z",
  },
  {
    id: "2",
    title: "French Grammar",
    description: "Essential grammar rules for French language learners",
    hasContent: true,
    chaptersCount: 8,
    createdAt: "2023-02-10T00:00:00.000Z",
  },
  {
    id: "3",
    title: "Science Basics",
    description: "Introduction to scientific concepts for young learners",
    hasContent: false,
    chaptersCount: 6,
    createdAt: "2023-03-05T00:00:00.000Z",
  },
  {
    id: "4",
    title: "History of Africa",
    description: "Comprehensive overview of African history",
    hasContent: true,
    chaptersCount: 10,
    createdAt: "2023-04-20T00:00:00.000Z",
  },
]

export function ModuleTable() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")

  // Filter modules based on search term
  const filteredModules = mockModules.filter(
    (module) =>
      module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      module.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDeleteModule = async (moduleId: string) => {
    try {
      // In a real app, this would call a server action to delete the module
      await deleteModule(moduleId)
      toast({
        title: "Module deleted",
        description: "The module has been successfully deleted.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete module. Please try again.",
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
            placeholder="Search modules..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Chapters</TableHead>
              <TableHead>Content</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredModules.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No modules found.
                </TableCell>
              </TableRow>
            ) : (
              filteredModules.map((module) => (
                <TableRow key={module.id}>
                  <TableCell className="font-medium">{module.title}</TableCell>
                  <TableCell>{module.description}</TableCell>
                  <TableCell>{module.chaptersCount}</TableCell>
                  <TableCell>
                    {module.hasContent ? (
                      <BookMarked className="h-5 w-5 text-green-500" />
                    ) : (
                      <span className="text-muted-foreground">None</span>
                    )}
                  </TableCell>
                  <TableCell>{new Date(module.createdAt).toLocaleDateString()}</TableCell>
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
                          <Link href={`/dashboard/modules/${module.id}`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/modules/${module.id}/chapters`}>
                            <FileText className="mr-2 h-4 w-4" />
                            Manage Chapters
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteModule(module.id)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
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
