import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, FolderOpen } from "lucide-react"

const statusLabels: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  ACTIF: { label: "Actif", variant: "default" },
  EN_PAUSE: { label: "En pause", variant: "secondary" },
  TERMINE: { label: "Terminé", variant: "outline" },
  ARCHIVE: { label: "Archivé", variant: "secondary" },
}

export default async function DashboardPage() {
  const session = await auth()
  if (!session) redirect("/login")

  const memberships = await prisma.projectMember.findMany({
    where: { userId: session.user.id },
    include: {
      project: true,
    },
    orderBy: { project: { updatedAt: "desc" } },
  })

  const projects = memberships.map((m) => m.project)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mes projets</h1>
          <p className="text-gray-500 mt-1">
            {projects.length} projet{projects.length !== 1 ? "s" : ""} en cours
          </p>
        </div>
        <Link href="/dashboard/projets/nouveau">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nouveau projet
          </Button>
        </Link>
      </div>

      {projects.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <FolderOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun projet</h3>
            <p className="text-gray-500 mb-4">
              Créez votre premier projet pour commencer une mission d&apos;audit.
            </p>
            <Link href="/dashboard/projets/nouveau">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Créer un projet
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => {
            const status = statusLabels[project.status] ?? { label: project.status, variant: "outline" as const }
            return (
              <Link key={project.id} href={`/dashboard/projets/${project.id}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-base leading-tight">{project.name}</CardTitle>
                      <Badge variant={status.variant}>{status.label}</Badge>
                    </div>
                    <CardDescription>{project.clientName}</CardDescription>
                  </CardHeader>
                  {project.description && (
                    <CardContent>
                      <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>
                    </CardContent>
                  )}
                </Card>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
