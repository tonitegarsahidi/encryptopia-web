import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { KeyRound, FileCode, Hash } from "lucide-react"

export default function ToolsMenu() {
  return (
    <section className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Cryptographic Tools</h2>
          <p className="max-w-[700px] text-muted-foreground">
            Choose from our wide range of secure cryptographic tools to protect your data
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <KeyRound className="h-8 w-8 text-primary" />
              <div className="grid gap-1">
                <CardTitle>Encrypt/Decrypt</CardTitle>
                <CardDescription>Secure your data with powerful encryption</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>
                  <Link href="/encrypt-decrypt/aes" className="hover:underline">
                    AES Encryption/Decryption
                  </Link>
                </li>
                <li>
                  <Link href="/encrypt-decrypt/des" className="hover:underline">
                    DES Encryption/Decryption
                  </Link>
                </li>
                <li>
                  <Link href="/encrypt-decrypt/guide" className="hover:underline">
                    Encryption Selection Guide
                  </Link>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Button asChild className="w-full">
                <Link href="/encrypt-decrypt/aes">AES Encryption</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/encrypt-decrypt/guide">Which Encryption to Choose?</Link>
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <FileCode className="h-8 w-8 text-primary" />
              <div className="grid gap-1">
                <CardTitle>Encode/Decode</CardTitle>
                <CardDescription>Convert between different data formats</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>
                  <Link href="/encode-decode/base64" className="hover:underline">
                    Base64 Encoding/Decoding
                  </Link>
                </li>
                <li>
                  <Link href="/encode-decode/morse" className="hover:underline">
                    Morse Code Conversion
                  </Link>
                </li>
                <li>
                  <Link href="/encode-decode/hex" className="hover:underline">
                    Hexadecimal Encoding
                  </Link>
                </li>
                <li>
                  <Link href="/encode-decode/url" className="hover:underline">
                    URL Encoding (Percent-Encoding)
                  </Link>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Button asChild className="w-full">
                <Link href="/encode-decode/base64">Base64 Conversion</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/encode-decode">View All Encoding Tools</Link>
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Hash className="h-8 w-8 text-primary" />
              <div className="grid gap-1">
                <CardTitle>Hash Online</CardTitle>
                <CardDescription>Generate secure hash values</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>
                  <Link href="/hash?tab=md5" className="hover:underline">
                    MD5 hashing
                  </Link>
                </li>
                <li>
                  <Link href="/hash?tab=sha1" className="hover:underline">
                    SHA1 hashing
                  </Link>
                </li>
                <li>
                  <Link href="/hash?tab=sha2" className="hover:underline">
                    SHA2 hashing
                  </Link>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/hash">Hash Generator</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}

