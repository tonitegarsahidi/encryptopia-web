import Base64Converter from "@/components/encoding/base64-converter"

export const metadata = {
  title: "Base64 Encoding & Decoding | Encryptopia",
  description: "Convert text between Base64 and ASCII formats",
}

export default function Base64Page() {
  return (
    <div className="container py-8 md:py-12">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Base64 Encoding & Decoding</h1>
          <p className="text-muted-foreground">Convert text between Base64 and ASCII formats</p>
        </div>

        <Base64Converter />
      </div>
    </div>
  )
}

