import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar"
import Notification from "@/components/notification";
import { Fragment } from "react/jsx-runtime";
import { Link } from "react-router-dom";

type HeaderProps = {
  data: { label: string; href: string; }[];
};

function Header(props: HeaderProps) {

  return (
    <header className="flex h-16 shrink-0 items-center gap-2">
      <div className="flex items-center gap-2 px-4 justify-between  w-full">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              {props.data.map((item, index) => (
                <Fragment key={index}>
                  <BreadcrumbItem className={index === props.data.length - 1 ? "" : "hidden md:block"}>
                    <Link to={item.href}>
                      {item.label}
                    </Link>
                  </BreadcrumbItem>
                  {index < props.data.length - 1 && (
                    <BreadcrumbSeparator className="hidden md:block" />
                  )}
                </Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <Notification />
      </div>
    </header>

  )
}

export default Header