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
import { MoreHorizontal, Edit, Trash2, Search, Music, ImageIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { deleteConte } from "@/lib/actions"

// Mock data - in a real app, this would come from your database
const mockContes = [
  {
    id: "1",
    moduleTitle: "Introduction to Mathematics",
    text: "Once upon a time, there was a kingdom of numbers...",
    hasAudio: true,
    imagesCount: 3,
    createdAt: "2023-01-15T00:00:00.000Z",
  },
  {
    id: "2",
    moduleTitle: "French Grammar",
    text: "Dans un petit village français...",
    hasAudio: true,
    imagesCount: 5,
    createdAt: "2023-02-10T00:00:00.000Z",
  },
  {
    id: "4",
    moduleTitle: "History of Africa",
    text: "Long ago, in the heart of Africa...",
    hasAudio: true,
    imagesCount: 8,
    createdAt: "2023-04-20T00:00:00.000Z",
  },
]

export function ConteTable() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")

  // Filter contes based on search term
  const filteredContes = mockContes.filter(
    (conte) =>
      conte.moduleTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conte.text.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDeleteConte = async (conteId: string) => {
    try {
      // In a real app, this would call a server action to delete the conte
      await deleteConte(conteId)
      toast({
        title: "Conte deleted",
        description: "The conte has been successfully deleted.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete conte. Please try again.",
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
            placeholder="Search contes..."
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
              <TableHead>Module</TableHead>
              <TableHead>Text Preview</TableHead>
              <TableHead>Audio</TableHead>
              <TableHead>Images</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredContes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No contes found.
                </TableCell>
              </TableRow>
            ) : (
              filteredContes.map((conte) => (
                <TableRow key={conte.id}>
                  <TableCell className="font-medium">{conte.moduleTitle}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{conte.text}</TableCell>
                  <TableCell>
                    {conte.hasAudio ? (
                      <Music className="h-5 w-5 text-green-500" />
                    ) : (
                      <span className="text-muted-foreground">None</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <ImageIcon className="h-5 w-5 text-green-500" />
                      <span>{conte.imagesCount}</span>
                    </div>
                  </TableCell>
                  <TableCell>{new Date(conte.createdAt).toLocaleDateString()}</TableCell>
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
                          <Link href={`/dashboard/contes/${conte.id}`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteConte(conte.id)}>
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
