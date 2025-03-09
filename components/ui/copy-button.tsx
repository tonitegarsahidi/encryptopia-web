"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface CopyButtonProps {
  text: string
  className?: string
  showToast?: boolean
  size?: "default" | "sm" | "lg" | "icon"
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
}

export function CopyButton({ text, className, showToast = true, size = "sm", variant = "ghost" }: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false)
  const { toast } = useToast()

  const handleCopy = async () => {
    if (!text) return

    try {
      await navigator.clipboard.writeText(text)
      setIsCopied(true)

      if (showToast) {
        toast({
          title: "Copied!",
          description: "Text copied to clipboard",
        })
      }

      setTimeout(() => {
        setIsCopied(false)
      }, 2000)
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Could not copy text to clipboard",
        variant: "destructive",
      })
    }
  }

  return (
    <Button variant={variant} size={size} onClick={handleCopy} className={className} type="button">
      {isCopied ? (
        <>
          <Check className="h-4 w-4 mr-2" />
          Copied!
        </>
      ) : (
        <>
          <Copy className="h-4 w-4 mr-2" />
          Copy
        </>
      )}
    </Button>
  )
}

