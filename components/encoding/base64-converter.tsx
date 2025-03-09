"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowDownUp, RotateCcw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { CopyButton } from "@/components/ui/copy-button"

export default function Base64Converter() {
  const { toast } = useToast()
  const [text, setText] = useState("")
  const [result, setResult] = useState("")
  const [action, setAction] = useState<"encode" | "decode">("encode")

  const handleEncode = () => {
    if (!text) {
      toast({
        title: "Error",
        description: "Please enter text to encode",
        variant: "destructive",
      })
      return
    }

    try {
      const encoded = btoa(text)
      setResult(encoded)
      setAction("encode")
      toast({
        title: "Success",
        description: "Text encoded to Base64 successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to encode text. Make sure it contains valid characters.",
        variant: "destructive",
      })
    }
  }

  const handleDecode = () => {
    if (!text) {
      toast({
        title: "Error",
        description: "Please enter text to decode",
        variant: "destructive",
      })
      return
    }

    try {
      const decoded = atob(text)
      setResult(decoded)
      setAction("decode")
      toast({
        title: "Success",
        description: "Base64 decoded to text successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to decode text. Make sure it's valid Base64.",
        variant: "destructive",
      })
    }
  }

  const handleReset = () => {
    setText("")
    setResult("")
  }

  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="text">Text to {action === "encode" ? "Encode" : "Decode"}</Label>
          <Textarea
            id="text"
            placeholder={action === "encode" ? "Enter text to encode to Base64..." : "Enter Base64 to decode..."}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[120px]"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Button onClick={handleEncode} className="flex-1" type="button">
            <ArrowDownUp className="mr-2 h-4 w-4" /> Encode to Base64
          </Button>
          <Button onClick={handleDecode} className="flex-1" type="button">
            <ArrowDownUp className="mr-2 h-4 w-4" /> Decode from Base64
          </Button>
          <Button onClick={handleReset} variant="outline" type="button">
            <RotateCcw className="mr-2 h-4 w-4" /> Reset
          </Button>
        </div>

        {result && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="result">Result</Label>
              <CopyButton text={result} />
            </div>
            <Textarea id="result" readOnly value={result} className="min-h-[120px]" />
          </div>
        )}
      </CardContent>
    </Card>
  )
}

