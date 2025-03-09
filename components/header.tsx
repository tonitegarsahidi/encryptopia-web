import Link from "next/link"
import { ThemeToggle } from "./theme-toggle"
import { LockKeyhole } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <LockKeyhole className="h-6 w-6" />
          <span className="hidden sm:inline-block">Encryptopia</span>
        </Link>
        <NavigationMenu className="ml-auto">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Home</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Encrypt/Decrypt</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <ListItem href="/encrypt-decrypt/aes" title="AES Encryption">
                    Advanced Encryption Standard algorithm
                  </ListItem>
                  <ListItem href="/encrypt-decrypt/des" title="DES Encryption">
                    Data Encryption Standard algorithm
                  </ListItem>
                  <ListItem href="/encrypt-decrypt/guide" title="What Encryption Should I Choose?">
                    Guidance on selecting the right encryption method
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Encode/Decode</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <ListItem href="/encode-decode/base64" title="Base64">
                    Convert between Base64 and ASCII
                  </ListItem>
                  <ListItem href="/encode-decode/morse" title="Morse Code">
                    Convert text to and from Morse code
                  </ListItem>
                  <ListItem href="/encode-decode/hex" title="Hexadecimal">
                    Convert text to hexadecimal format
                  </ListItem>
                  <ListItem href="/encode-decode/url" title="URL Encoding">
                    Percent-encoding for URLs
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/hash" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Hash</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <ThemeToggle />
      </div>
    </header>
  )
}

const ListItem = ({ className, title, children, href, ...props }: any) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}

