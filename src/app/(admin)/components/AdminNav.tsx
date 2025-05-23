"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminNav() {
  const pathname = usePathname();

  console.log(pathname);

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <nav className="flex-1 p-4 space-y-2">
      <Link
        href="/admin/dashboard"
        className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
          isActive("/admin/dashboard")
            ? "bg-blue-50 text-blue-600 font-medium"
            : "text-gray-700 hover:bg-blue-200 hover:text-blue-600"
        }`}
      >
        <svg
          className="w-5 h-5 mr-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
        Dashboard
      </Link>
      <Link
        href="/admin/users"
        className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
          isActive("/admin/users")
            ? "bg-blue-50 text-blue-600 font-medium"
            : "text-gray-700 hover:bg-blue-200 hover:text-blue-600"
        }`}
      >
        <svg
          className="w-5 h-5 mr-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
        Utilisateurs
      </Link>
      <Link
        href="/admin/modules"
        className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
          isActive("/admin/modules")
            ? "bg-blue-50 text-blue-600 font-medium"
            : "text-gray-700 hover:bg-blue-200 hover:text-blue-600"
        }`}
      >
        <svg
          className="w-5 h-5 mr-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
        Modules
      </Link>
      <Link
        href="/admin/classrooms"
        className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
          isActive("/admin/classrooms")
            ? "bg-blue-50 text-blue-600 font-medium"
            : "text-gray-700 hover:bg-blue-200 hover:text-blue-600"
        }`}
      >
        <svg
          className="w-5 h-5 mr-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
        Classes
      </Link>
    </nav>
  );
}
