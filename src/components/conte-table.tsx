"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MoreHorizontal, Edit, Trash2, Search, Play } from "lucide-react";
import { toast } from "sonner";

interface Conte {
  id: string;
  title: string;
  audioUrl: string;
  sectionId: string;
  pages: {
    id: string;
    imageUrl: string;
    caption: string;
    duration: number;
    order: number;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

export function ConteTable() {
  const [contes, setContes] = useState<Conte[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContes();
  }, []);

  const fetchContes = async () => {
    try {
      const response = await fetch("/api/stories");
      if (!response.ok) throw new Error("Failed to fetch contes");
      const data = await response.json();
      setContes(data);
    } catch (error) {
      console.error("Error fetching contes:", error);
      toast.error("Erreur lors du chargement des contes");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteConte = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce conte ?")) return;

    try {
      const response = await fetch(`/api/stories/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete conte");

      setContes(contes.filter((conte) => conte.id !== id));
      toast.success("Conte supprimé avec succès");
    } catch (error) {
      console.error("Error deleting conte:", error);
      toast.error("Erreur lors de la suppression");
    }
  };

  const filteredContes = contes.filter((conte) =>
    conte.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Rechercher des contes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Titre</TableHead>
              <TableHead>Nombre de pages</TableHead>
              <TableHead>Section ID</TableHead>
              <TableHead>Créé le</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredContes.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center text-muted-foreground"
                >
                  Aucun conte trouvé.
                </TableCell>
              </TableRow>
            ) : (
              filteredContes.map((conte) => (
                <TableRow key={conte.id}>
                  <TableCell className="font-medium">{conte.title}</TableCell>
                  <TableCell>{conte.pages.length}</TableCell>
                  <TableCell>{conte.sectionId}</TableCell>
                  <TableCell>
                    {new Date(conte.createdAt).toLocaleDateString("fr-FR")}
                  </TableCell>
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
                          <Link href={`/stories/${conte.id}`}>
                            <Play className="mr-2 h-4 w-4" />
                            Voir le conte
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/contes/${conte.id}`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Modifier
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDeleteConte(conte.id)}
                        >
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
  );
}
