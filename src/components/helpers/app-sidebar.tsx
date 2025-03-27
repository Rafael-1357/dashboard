"use client"

import * as React from "react"
import {
  Package,
  Command,
  Frame,
  Bolt,
  House,
} from "lucide-react"

import { NavMain } from "../helpers/nav-main"
import { NavProjects } from "../helpers/nav-projects"
import { NavUser } from "./nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom"

const data = {
  user: {
    name: "Usuário",
    email: "Administrador",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Home",
      url: "/home",
      icon: House,
      isActive: true,
    },
    {
      title: "Produtos",
      url: "/produtos",
      icon: Package,
      items: [
        {
          title: "Criar produto",
          url: "/produtos/criar",
        },
      ],
    },
  ],
  additional: [
    {
      name: "Configurações",
      url: "#",
      icon: Bolt,
    }
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to={"/home"}>
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Depósito</span>
                  <span className="truncate text-xs">Empresa</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects additional={data.additional} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
