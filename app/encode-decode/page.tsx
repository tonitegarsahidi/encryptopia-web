import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileCode, Braces, Code, Link2 } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Encode & Decode Online | Encryptopia",
  description: "Convert between different data formats with our encoding and decoding tools",
}

export default function EncodeDecodePage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Encode & Decode Online</h1>
          <p className="text-muted-foreground">
            Convert between different data formats with our encoding and decoding tools
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <FileCode className="h-8 w-8 text-primary" />
              <div className="grid gap-1">
                <CardTitle>Base64 Converter</CardTitle>
                <CardDescription>Convert between Base64 and ASCII text</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Base64 is commonly used for encoding binary data to ASCII text format, making it suitable for
                transmission over media designed for text.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/encode-decode/base64">Base64 Converter</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Braces className="h-8 w-8 text-primary" />
              <div className="grid gap-1">
                <CardTitle>Morse Code</CardTitle>
                <CardDescription>Convert text to and from Morse code</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Morse code is a method of encoding text characters as standardized sequences of dots and dashes,
                historically used for telegraph communication.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/encode-decode/morse">Morse Code Converter</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Code className="h-8 w-8 text-primary" />
              <div className="grid gap-1">
                <CardTitle>Hexadecimal Encoding</CardTitle>
                <CardDescription>Convert text to hexadecimal format</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Hexadecimal encoding represents text as a sequence of hexadecimal (base-16) values, often used in
                programming and data representation.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/encode-decode/hex">Hex Encoder</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Link2 className="h-8 w-8 text-primary" />
              <div className="grid gap-1">
                <CardTitle>URL Encoding</CardTitle>
                <CardDescription>Percent-encoding for URLs and form data</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                URL encoding (percent-encoding) converts characters into a format that can be transmitted over the
                Internet, replacing unsafe ASCII characters with % followed by hex values.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/encode-decode/url">URL Encoder</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

