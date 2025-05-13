import { Button } from "@/components/ui/button";
import React from "react";

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  showButton: boolean;
}

export default function BottomSheet({
  open,
  onClose,
  children,
  showButton,
}: BottomSheetProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/30">
      <div className="w-full max-w-md md:max-w-lg bg-white rounded-t-2xl md:rounded-2xl shadow-lg p-6 md:p-10 animate-slide-up mb-0 md:mb-10">
        <div className="flex flex-col items-center">
          {children}
          {showButton && (
            <button
              className="mt-6 w-full bg-red-600 text-white font-bold rounded-xl py-3 text-lg hover:bg-red-700 transition shadow"
              onClick={onClose}
            >
              Fermer
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// Ajoute l'animation Tailwind dans globals.css si besoin :
// @keyframes slide-up { from { transform: translateY(100%); } to { transform: translateY(0); } }
// .animate-slide-up { animation: slide-up 0.3s cubic-bezier(0.4,0,0.2,1); }
