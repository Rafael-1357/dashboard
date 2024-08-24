import NavMobile from "@/components/ui/nav-mobile"
import NavDesktop from "@/components/ui/nav-desktop"

function Home() {
  return (
    <>
      <div className="flex flex-col md:flex-row md:min-w-full">
        <NavDesktop></NavDesktop>
        <NavMobile></NavMobile>
        <div className="w-full">
          <div className="hidden h-14 items-center bg-muted/40 border-b px-4 md:flex lg:h-[60px] lg:px-6"></div>
          <div className="w-full p-4">
            Home
          </div>
        </div>
      </div>
    </>
  )
}

export default Home