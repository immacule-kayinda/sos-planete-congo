"use client";

import { Button } from "@/components/ui/button";
import { ClassroomForm } from "@/components/classroom-form";
import { Plus, Users, FileText } from "lucide-react";

interface ClassroomManagerProps {
  hasClasses: boolean;
}

export function ClassroomManager({ hasClasses }: ClassroomManagerProps) {
  const handleClassroomCreated = () => {
    // Refresh the page to show the new classroom
    window.location.reload();
  };

  return (
    <>
      {/* Create Class Button in header */}
      <ClassroomForm onClassroomCreated={handleClassroomCreated}>
        <Button className="bg-[#d31929] hover:bg-[#b91525] w-full sm:w-auto">
          <Plus size={16} className="mr-2" />
          Nouvelle classe
        </Button>
      </ClassroomForm>

      {/* Quick Actions */}
      <div className="space-y-3">
        <ClassroomForm onClassroomCreated={handleClassroomCreated}>
          <Button variant="outline" className="w-full justify-start">
            <Plus size={16} className="mr-2" />
            Créer une classe
          </Button>
        </ClassroomForm>
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={() => (window.location.href = "/teacher/classes")}
        >
          <Users size={16} className="mr-2" />
          Gérer les classes
        </Button>
        <Button variant="outline" className="w-full justify-start">
          <FileText size={16} className="mr-2" />
          Voir le matériel
        </Button>
      </div>

      {/* Empty state call-to-action */}
      {!hasClasses && (
        <ClassroomForm onClassroomCreated={handleClassroomCreated}>
          <Button className="bg-[#d31929] hover:bg-[#b91525]">
            <Plus size={16} className="mr-2" />
            Créer ma première classe
          </Button>
        </ClassroomForm>
      )}
    </>
  );
}
