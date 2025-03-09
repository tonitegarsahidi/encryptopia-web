import AesEncryption from "@/components/encryption/aes-encryption"

export const metadata = {
  title: "AES Encryption | Encryptopia",
  description: "Secure encryption and decryption using the Advanced Encryption Standard algorithm",
}

export default function AesEncryptionPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">AES Encryption</h1>
          <p className="text-muted-foreground">
            Secure your sensitive data with Advanced Encryption Standard algorithm
          </p>
        </div>

        <AesEncryption />
      </div>
    </div>
  )
}

