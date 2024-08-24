import { NavLink } from "react-router-dom"
import {
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  ShoppingCart,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

function NavMobile() {

  return (
    <>
      <header className="flex h-14 items-center gap-4 border-b px-4 md:hidden lg:min-h-[60px] lg:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col">
            <nav className="grid gap-2 text-lg font-medium">
              <span
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Package2 className="h-6 w-6" />
              </span>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? 'mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground' : 'fmx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground'
                }
              >
                <Home className="h-5 w-5" />
                Home
              </NavLink>
              <NavLink
                to="/vendas"
                className={({ isActive }) =>
                  isActive ? 'mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground' : 'fmx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground'
                }
              >
                <ShoppingCart className="h-5 w-5" />
                Vendas
              </NavLink>
              <NavLink
                to="/produtos"
                className={({ isActive }) =>
                  isActive ? 'mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground' : 'fmx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground'
                }
              >
                <Package className="h-5 w-5" />
                Produtos
              </NavLink>
              <NavLink
                to="/estatisticas"
                className={({ isActive }) =>
                  isActive ? 'mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground' : 'fmx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground'
                }
              >
                <LineChart className="h-5 w-5" />
                Estatísticas
              </NavLink>
            </nav>
          </SheetContent>
        </Sheet>
      </header>
    </>
  )
}

export default NavMobile