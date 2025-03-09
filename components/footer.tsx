import Link from "next/link"
import { LockKeyhole } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div className="flex items-center gap-2">
          <LockKeyhole className="h-5 w-5" />
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Encryptopia. All rights reserved.
          </p>
        </div>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <Link href="/privacy" className="hover:underline underline-offset-4">
            Privacy
          </Link>
          <Link href="/terms" className="hover:underline underline-offset-4">
            Terms
          </Link>
          <Link href="/about" className="hover:underline underline-offset-4">
            About
          </Link>
        </div>
      </div>
    </footer>
  )
}

