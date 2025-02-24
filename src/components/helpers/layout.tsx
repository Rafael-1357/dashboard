import { AppSidebar } from "@/components/helpers/app-sidebar"

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

function Layout({ children }: {children: React.ReactNode}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        { children }
      </SidebarInset>
    </SidebarProvider>
  )
}

export default Layout
