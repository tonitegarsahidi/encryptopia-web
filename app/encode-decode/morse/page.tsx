import MorseCodeConverter from "@/components/encoding/morse-code-converter"

export const metadata = {
  title: "Morse Code Converter | Encryptopia",
  description: "Convert text to and from Morse code",
}

export default function MorseCodePage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Morse Code Converter</h1>
          <p className="text-muted-foreground">Convert text to and from Morse code format</p>
        </div>

        <MorseCodeConverter />
      </div>
    </div>
  )
}

