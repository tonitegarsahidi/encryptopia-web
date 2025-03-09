import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Lock, Key, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "What Encryption Should I Choose? | Encryptopia",
  description: "A guide to selecting the appropriate encryption method for your needs",
}

export default function EncryptionGuidePage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">What Encryption Should I Choose?</h1>
          <p className="text-muted-foreground max-w-[700px] mx-auto">
            A guide to help you select the most appropriate encryption method for your specific needs
          </p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <CardTitle>AES Encryption</CardTitle>
                <CardDescription>Advanced Encryption Standard</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                AES (Advanced Encryption Standard) is currently the most widely used and trusted symmetric encryption
                algorithm in the world. It was established by the U.S. National Institute of Standards and Technology
                (NIST) in 2001.
              </p>

              <div className="space-y-2">
                <h3 className="font-semibold">Best For:</h3>
                <ul className="list-disc list-inside space-y-1 pl-4">
                  <li>Modern applications requiring high security</li>
                  <li>Sensitive data that needs long-term protection</li>
                  <li>Applications where performance is important</li>
                  <li>Government or enterprise security compliance</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">Key Features:</h3>
                <ul className="list-disc list-inside space-y-1 pl-4">
                  <li>Available in 128, 192, and 256-bit key lengths</li>
                  <li>Excellent performance in both hardware and software</li>
                  <li>Resistant to all known attacks when properly implemented</li>
                  <li>Multiple modes of operation (CBC, ECB, CFB, OFB, CTR)</li>
                </ul>
              </div>

              <Button asChild>
                <Link href="/encrypt-decrypt/aes">Use AES Encryption</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Lock className="h-8 w-8 text-primary" />
              <div>
                <CardTitle>DES Encryption</CardTitle>
                <CardDescription>Data Encryption Standard</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-yellow-100 dark:bg-yellow-900/40 p-4 rounded-md flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
                <p className="text-sm">
                  DES is considered <strong>outdated and insecure</strong> by modern standards due to its short key
                  length. It is included for educational purposes and legacy system compatibility only. For new
                  applications, we strongly recommend using AES instead.
                </p>
              </div>

              <p>
                DES (Data Encryption Standard) was adopted as a federal standard in 1977 and was widely used until the
                late 1990s. It uses a 56-bit key, which is considered too short to be secure against modern computing
                power.
              </p>

              <div className="space-y-2">
                <h3 className="font-semibold">Use Cases:</h3>
                <ul className="list-disc list-inside space-y-1 pl-4">
                  <li>Legacy systems that still use DES</li>
                  <li>Educational purposes to understand cryptographic history</li>
                  <li>Applications where compatibility with older systems is required</li>
                </ul>
              </div>

              <Button asChild>
                <Link href="/encrypt-decrypt/des">Use DES Encryption</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Key className="h-8 w-8 text-primary" />
              <div>
                <CardTitle>Making the Right Choice</CardTitle>
                <CardDescription>Factors to consider when selecting an encryption method</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>When choosing an encryption method, consider these important factors:</p>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2 border rounded-md p-4">
                  <h3 className="font-semibold">Security Requirements</h3>
                  <p className="text-sm text-muted-foreground">
                    Consider the sensitivity of your data and how long it needs to remain secure. AES-256 provides the
                    highest level of security for long-term protection.
                  </p>
                </div>

                <div className="space-y-2 border rounded-md p-4">
                  <h3 className="font-semibold">Performance Considerations</h3>
                  <p className="text-sm text-muted-foreground">
                    AES is efficient on modern hardware. For resource-constrained environments, AES-128 offers a good
                    balance between security and performance.
                  </p>
                </div>

                <div className="space-y-2 border rounded-md p-4">
                  <h3 className="font-semibold">Regulatory Compliance</h3>
                  <p className="text-sm text-muted-foreground">
                    Many standards and regulations (HIPAA, PCI DSS, GDPR) require the use of strong encryption. AES is
                    widely accepted for compliance requirements.
                  </p>
                </div>

                <div className="space-y-2 border rounded-md p-4">
                  <h3 className="font-semibold">Compatibility</h3>
                  <p className="text-sm text-muted-foreground">
                    Consider what encryption algorithms your systems and partners support. AES is widely supported
                    across modern platforms and applications.
                  </p>
                </div>
              </div>

              <div className="bg-blue-100 dark:bg-blue-900/40 p-4 rounded-md">
                <p className="text-sm">
                  <strong>Recommendation:</strong> For nearly all modern applications, AES-256 is the recommended
                  choice. It provides an excellent balance of security, performance, and compatibility.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

