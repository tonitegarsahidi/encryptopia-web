import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Shield, Lock, Key } from "lucide-react"

export default function Hero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground mb-4">
              Secure Your Data Instantly
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Encrypt & Decrypt Online</h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Your secure haven for instant encryption, decryption, encoding, decoding, and hashing - all in your
              browser!
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg">
              <Link href="/encrypt-decrypt">Get Started</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-card">
            <Shield className="h-12 w-12 text-primary mb-2" />
            <h3 className="text-xl font-bold">Secure Encryption</h3>
            <p className="text-center text-muted-foreground">
              Industry-standard encryption algorithms to protect your sensitive data.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-card">
            <Lock className="h-12 w-12 text-primary mb-2" />
            <h3 className="text-xl font-bold">Browser-Based</h3>
            <p className="text-center text-muted-foreground">
              All operations happen in your browser. Your data never leaves your device.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-card">
            <Key className="h-12 w-12 text-primary mb-2" />
            <h3 className="text-xl font-bold">Multiple Tools</h3>
            <p className="text-center text-muted-foreground">
              Comprehensive suite of encryption, encoding, and hashing tools in one place.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

