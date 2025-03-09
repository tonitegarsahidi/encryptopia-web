import HexEncoder from "@/components/encoding/hex-encoder"

export const metadata = {
  title: "Hexadecimal Encoder | Encryptopia",
  description: "Convert text to hexadecimal format",
}

export default function HexPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Hexadecimal Encoder</h1>
          <p className="text-muted-foreground">Convert text to hexadecimal format</p>
        </div>

        <HexEncoder />
      </div>
    </div>
  )
}

