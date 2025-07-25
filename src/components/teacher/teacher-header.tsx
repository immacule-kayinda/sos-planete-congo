"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Bell, Settings, LogOut, User } from "lucide-react";
import Link from "next/link";

interface TeacherHeaderProps {
  title: string;
  teacher: {
    firstName: string;
    lastName: string;
  };
  showSearch?: boolean;
  notificationCount?: number;
}

export function TeacherHeader({
  title,
  teacher,
  showSearch = true,
  notificationCount = 0,
}: TeacherHeaderProps) {
  const handleSignout = async () => {
    try {
      const response = await fetch("/api/auth/signout", {
        method: "POST",
      });

      if (response.ok) {
        window.location.href = "/signin";
      }
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center px-4 lg:px-6 justify-between">
      <div className="flex items-center gap-4">
        <h1 className="text-lg lg:text-xl font-semibold text-gray-900">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-2 lg:gap-4">
        {showSearch && (
          <div className="relative w-[200px] lg:w-[320px] hidden sm:block">
            <Input
              placeholder="Rechercher..."
              className="pl-10 pr-4 border-gray-300 text-sm"
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
          </div>
        )}

        <Link href="/teacher/notifications">
          <Button variant="ghost" size="icon" className="relative">
            <Bell size={20} />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </Button>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-3 p-2">
              <div className="text-right hidden sm:block">
                <p className="font-medium text-sm">
                  {teacher.firstName} {teacher.lastName}
                </p>
                <p className="text-xs text-gray-500">Professeur</p>
              </div>
              <Avatar className="h-8 w-8 lg:h-9 lg:w-9">
                <AvatarImage
                  src="/placeholder.svg?height=36&width=36"
                  alt="Professeur"
                />
                <AvatarFallback className="bg-gray-100 text-gray-600 text-sm">
                  {teacher.firstName?.[0]}
                  {teacher.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {teacher.firstName} {teacher.lastName}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  Professeur
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Mon Profil</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Paramètres</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Se déconnecter</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
