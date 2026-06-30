"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  FolderKanban,
  ClipboardList,
  BrainCircuit,
  FileText,
  Settings,
} from "lucide-react"

const navItems = [
  { href: "/dashboard", label: "Projets", icon: FolderKanban },
  { href: "/dashboard/audit", label: "Audit", icon: ClipboardList },
  { href: "/dashboard/analyse", label: "Analyse IA", icon: BrainCircuit },
  { href: "/dashboard/livrables", label: "Livrables", icon: FileText },
]

const adminItems = [
  { href: "/dashboard/admin", label: "Administration", icon: Settings },
]

export default function Sidebar({ role }: { role: string }) {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-white border-r flex flex-col">
      <div className="p-6 border-b">
        <h1 className="text-xl font-bold text-gray-900">
          b<span className="text-blue-600">[Ai]</span>lly
        </h1>
        <p className="text-xs text-gray-500 mt-1">Consulting</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
              pathname === href || (href !== "/dashboard" && pathname.startsWith(href))
                ? "bg-blue-50 text-blue-700"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}

        {role === "ADMIN" && (
          <>
            <div className="pt-4 pb-2">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3">
                Admin
              </p>
            </div>
            {adminItems.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  pathname.startsWith(href)
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </>
        )}
      </nav>
    </aside>
  )
}
