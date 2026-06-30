"use client"

import { signOut } from "next-auth/react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, User } from "lucide-react"

type HeaderProps = {
  user: {
    name?: string | null
    email?: string | null
    role?: string | null
  }
}

function getInitials(name?: string | null, email?: string | null): string {
  if (name) {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }
  return email?.[0]?.toUpperCase() ?? "?"
}

export default function Header({ user }: HeaderProps) {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      <div />
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent border-0 cursor-pointer">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-blue-100 text-blue-700 text-sm font-medium">
              {getInitials(user.name, user.email)}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-gray-700 hidden sm:block">
            {user.name ?? user.email}
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <div className="px-2 py-1.5">
            <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            Mon profil
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer text-red-600 focus:text-red-600"
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Déconnexion
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
