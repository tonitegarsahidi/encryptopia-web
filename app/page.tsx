import Hero from "@/components/hero"
import ToolsMenu from "@/components/tools-menu"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Hero />
      <ToolsMenu />
    </main>
  )
}

