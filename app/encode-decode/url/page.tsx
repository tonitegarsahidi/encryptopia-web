import UrlEncoder from "@/components/encoding/url-encoder"

export const metadata = {
  title: "URL Encoder | Encryptopia",
  description: "Percent-encoding for URLs and form data",
}

export default function UrlEncodingPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">URL Encoder</h1>
          <p className="text-muted-foreground">Percent-encoding for URLs and form data</p>
        </div>

        <UrlEncoder />
      </div>
    </div>
  )
}

