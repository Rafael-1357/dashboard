import { Separator } from "@/components/ui/separator";
import Layout from "../components/helpers/layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "../components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar"
import Notification from "@/components/notification";

function Home() {
  return (
    <Layout>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4 justify-between  w-full">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <Notification />
        </div>
      </header>
      <div className="p-4">
        <h1 className="text-2xl font-bold">Home</h1>
        <p>Bem vindo a página inicial</p>
      </div>
    </Layout>
  )
}

export default Home