import NavMobile from "@/components/ui/nav-mobile"
import NavDesktop from "@/components/ui/nav-desktop"

function Statistics() {
  return (
    <>
      <div className="flex flex-col md:flex-row md:min-w-full">
        <NavDesktop></NavDesktop>
        <NavMobile></NavMobile>
        <div className="w-full">
          <div className="w-full p-4">
            Estatísticas
          </div>
        </div>
      </div>
    </>
  )
}

export default Statistics