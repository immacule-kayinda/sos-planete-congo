"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import {
  MoreHorizontal,
  CheckCircle,
  XCircle,
  AlertCircle,
  Mail,
  TrendingUp,
  User,
} from "lucide-react";

interface StudentActionsProps {
  studentId: string;
  currentStatus: string;
  studentName: string;
  onStatusUpdate?: () => void;
}

export function StudentActions({
  studentId,
  currentStatus,
  studentName,
  onStatusUpdate,
}: StudentActionsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [actionToConfirm, setActionToConfirm] = useState<{
    status: string;
    label: string;
    description: string;
  } | null>(null);
  const { toast } = useToast();

  const updateStudentStatus = async (newStatus: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/students/${studentId}/approve`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erreur lors de la mise à jour");
      }

      toast({
        title: "Succès",
        description: data.message,
      });

      onStatusUpdate?.();
    } catch (error) {
      toast({
        title: "Erreur",
        description:
          error instanceof Error ? error.message : "Une erreur est survenue",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAction = (status: string, label: string, description: string) => {
    setActionToConfirm({ status, label, description });
    setShowConfirmDialog(true);
  };

  const confirmAction = () => {
    if (actionToConfirm) {
      updateStudentStatus(actionToConfirm.status);
      setShowConfirmDialog(false);
      setActionToConfirm(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return <Badge className="bg-green-500 text-white">Actif</Badge>;
      case "LIMITED_ACCESS":
        return <Badge className="bg-yellow-500 text-white">Accès Limité</Badge>;
      case "PENDING_ACTIVATION":
        return <Badge className="bg-orange-500 text-white">En Attente</Badge>;
      default:
        return <Badge variant="secondary">Inconnu</Badge>;
    }
  };

  return (
    <>
      <div className="flex items-center gap-2">
        {getStatusBadge(currentStatus)}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              disabled={isLoading}
              className="h-8 w-8 p-0"
            >
              <MoreHorizontal size={14} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />

            {currentStatus !== "ACTIVE" && (
              <DropdownMenuItem
                onClick={() =>
                  handleAction(
                    "ACTIVE",
                    "Activer le compte",
                    "L'étudiant aura accès complet à tous les contenus et fonctionnalités."
                  )
                }
                className="text-green-600"
              >
                <CheckCircle size={14} className="mr-2" />
                Activer le compte
              </DropdownMenuItem>
            )}

            {currentStatus !== "LIMITED_ACCESS" && (
              <DropdownMenuItem
                onClick={() =>
                  handleAction(
                    "LIMITED_ACCESS",
                    "Accès limité",
                    "L'étudiant aura accès uniquement à la première histoire."
                  )
                }
                className="text-yellow-600"
              >
                <AlertCircle size={14} className="mr-2" />
                Accès limité
              </DropdownMenuItem>
            )}

            {currentStatus !== "PENDING_ACTIVATION" && (
              <DropdownMenuItem
                onClick={() =>
                  handleAction(
                    "PENDING_ACTIVATION",
                    "Mettre en attente",
                    "L'étudiant devra attendre une nouvelle approbation pour accéder aux contenus."
                  )
                }
                className="text-orange-600"
              >
                <XCircle size={14} className="mr-2" />
                Mettre en attente
              </DropdownMenuItem>
            )}

            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <TrendingUp size={14} className="mr-2" />
              Voir les progrès
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Mail size={14} className="mr-2" />
              Contacter
            </DropdownMenuItem>
            <DropdownMenuItem>
              <User size={14} className="mr-2" />
              Voir le profil
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer l'action</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir{" "}
              <strong>{actionToConfirm?.label.toLowerCase()}</strong> pour{" "}
              <strong>{studentName}</strong> ?
              <br />
              <br />
              {actionToConfirm?.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmAction}
              disabled={isLoading}
              className="bg-[#d31929] hover:bg-[#b91525]"
            >
              {isLoading ? "Traitement..." : "Confirmer"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
