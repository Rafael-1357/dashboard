import { NavLink } from "react-router-dom"

import {
	Home,
	LineChart,
	Package,
	ShoppingCart,
} from "lucide-react"

function NavDesktop() {

	return (
		<>
			<div className="hidden min-h-screen border-r md:block md:min-w-[220px] lg:min-w-[280px]">
				<div className="flex h-full max-h-screen flex-col gap-2">
					<div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
					</div>
					<div className="flex-1">
						<nav className="grid items-start px-2 text-sm font-medium lg:px-4">
							<NavLink
								to="/"
								className={({ isActive }) =>
									isActive ? 'flex items-center gap-3 rounded-lg px-3 py-2 bg-muted text-primary transition-all  hover:text-primary' : 'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'
								}
							>
								<Home className="h-4 w-4" />
								Home
							</NavLink>
							<NavLink
								to="/Vendas"
								className={({ isActive }) =>
									isActive ? 'flex items-center gap-3 rounded-lg px-3 py-2 bg-muted text-primary transition-all  hover:text-primary' : 'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'
								}
							>
								<ShoppingCart className="h-4 w-4" />
								Vendas
							</NavLink>
							<NavLink
								to="/produtos"
								className={({ isActive }) =>
									isActive ? 'flex items-center gap-3 rounded-lg px-3 py-2 bg-muted text-primary transition-all  hover:text-primary' : 'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'
								}
							>
								<Package className="h-4 w-4" />
								Produtos
							</NavLink>
							<NavLink
								to="/estatisticas"
								className={({ isActive }) =>
									isActive ? 'flex items-center gap-3 rounded-lg px-3 py-2 bg-muted text-primary transition-all  hover:text-primary' : 'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'
								}
							>
								<LineChart className="h-4 w-4" />
								Estatísticas
							</NavLink>
						</nav>
					</div>
				</div>
			</div>
		</>
	)
}

export default NavDesktop