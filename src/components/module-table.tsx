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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MoreHorizontal,
  Edit,
  Trash2,
  FileText,
  Search,
  Layers,
  Filter,
  X,
} from "lucide-react";
import { toast } from "sonner";

interface Module {
  id: string;
  title: string;
  subtitle: string;
  order: number;
  sectionId: string;
  section: {
    id: string;
    title: string;
  };
  chapters: {
    id: string;
    title: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

interface Section {
  id: string;
  title: string;
}

export function ModuleTable() {
  const [modules, setModules] = useState<Module[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSectionId, setSelectedSectionId] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [loadingSections, setLoadingSections] = useState(true);

  useEffect(() => {
    fetchModules();
    fetchSections();
  }, []);

  const fetchModules = async () => {
    try {
      const response = await fetch("/api/modules");
      if (!response.ok) throw new Error("Failed to fetch modules");
      const data = await response.json();
      setModules(data);
    } catch (error) {
      console.error("Error fetching modules:", error);
      toast.error("Erreur lors du chargement des modules");
    } finally {
      setLoading(false);
    }
  };

  const fetchSections = async () => {
    try {
      const response = await fetch("/api/sections");
      if (!response.ok) throw new Error("Failed to fetch sections");
      const data = await response.json();
      setSections(data);
    } catch (error) {
      console.error("Error fetching sections:", error);
      toast.error("Erreur lors du chargement des sections");
    } finally {
      setLoadingSections(false);
    }
  };

  const handleDeleteModule = async (moduleId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce module ?")) return;

    try {
      const response = await fetch(`/api/modules/${moduleId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete module");

      setModules(modules.filter((module) => module.id !== moduleId));
      toast.success("Module supprimé avec succès");
    } catch (error) {
      console.error("Error deleting module:", error);
      toast.error("Erreur lors de la suppression");
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedSectionId("all");
  };

  // Filter modules based on search term and selected section
  const filteredModules = modules.filter((module) => {
    const matchesSearch =
      module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      module.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      module.section.title.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSection =
      selectedSectionId === "all" || module.sectionId === selectedSectionId;

    return matchesSearch && matchesSection;
  });

  const hasActiveFilters = searchTerm !== "" || selectedSectionId !== "all";

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher des modules..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Select
            value={selectedSectionId}
            onValueChange={setSelectedSectionId}
          >
            <SelectTrigger className="w-[200px]">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <SelectValue placeholder="Filtrer par section" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les sections</SelectItem>
              {sections.map((section) => (
                <SelectItem key={section.id} value={section.id}>
                  {section.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
              className="flex items-center gap-1"
            >
              <X className="h-4 w-4" />
              Effacer
            </Button>
          )}
        </div>
      </div>

      {hasActiveFilters && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>
            {filteredModules.length} module
            {filteredModules.length !== 1 ? "s" : ""} trouvé
            {filteredModules.length !== 1 ? "s" : ""}
          </span>
          {selectedSectionId !== "all" && (
            <span className="inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-xs">
              <Layers className="h-3 w-3" />
              {sections.find((s) => s.id === selectedSectionId)?.title}
            </span>
          )}
        </div>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Titre</TableHead>
              <TableHead>Sous-titre</TableHead>
              <TableHead>Section</TableHead>
              <TableHead>Ordre</TableHead>
              <TableHead>Chapitres</TableHead>
              <TableHead>Créé le</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredModules.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  {hasActiveFilters
                    ? "Aucun module ne correspond aux filtres."
                    : "Aucun module trouvé."}
                </TableCell>
              </TableRow>
            ) : (
              filteredModules.map((module) => (
                <TableRow key={module.id}>
                  <TableCell className="font-medium">{module.title}</TableCell>
                  <TableCell className="max-w-xs truncate">
                    {module.subtitle}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Layers className="h-4 w-4" />
                      <span className="truncate">{module.section.title}</span>
                    </div>
                  </TableCell>
                  <TableCell>{module.order}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      <span>{module.chapters.length}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(module.createdAt).toLocaleDateString("fr-FR")}
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
                          <Link href={`/dashboard/modules/${module.id}`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Modifier
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link
                            href={`/dashboard/modules/${module.id}/chapters`}
                          >
                            <FileText className="mr-2 h-4 w-4" />
                            Gérer les chapitres
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDeleteModule(module.id)}
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
