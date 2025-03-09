import DesEncryption from "@/components/encryption/des-encryption"

export const metadata = {
  title: "DES Encryption | Encryptopia",
  description: "Secure encryption and decryption using the Data Encryption Standard algorithm",
}

export default function DesEncryptionPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">DES Encryption</h1>
          <p className="text-muted-foreground">Secure your sensitive data with Data Encryption Standard algorithm</p>
        </div>

        <DesEncryption />
      </div>
    </div>
  )
}

