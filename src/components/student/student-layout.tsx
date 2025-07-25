import React from "react";

export function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-4 md:p-6">
      <div className="w-full bg-white shadow-lg rounded-xl p-6 md:p-10">
        {children}
      </div>
    </div>
  );
}
