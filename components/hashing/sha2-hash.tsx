"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Hash, RotateCcw, Upload } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import CryptoJS from "crypto-js"
import { CopyButton } from "@/components/ui/copy-button"

export default function Sha2Hash() {
  const { toast } = useToast()
  const [text, setText] = useState("")
  const [result, setResult] = useState("")
  const [variant, setVariant] = useState("256")

  const handleHash = () => {
    if (!text) {
      toast({
        title: "Error",
        description: "Please enter text to hash",
        variant: "destructive",
      })
      return
    }

    try {
      let hashed = ""

      switch (variant) {
        case "224":
          hashed = CryptoJS.SHA224(text).toString()
          break
        case "256":
          hashed = CryptoJS.SHA256(text).toString()
          break
        case "384":
          hashed = CryptoJS.SHA384(text).toString()
          break
        case "512":
          hashed = CryptoJS.SHA512(text).toString()
          break
        default:
          hashed = CryptoJS.SHA256(text).toString()
      }

      setResult(hashed)
      toast({
        title: "Success",
        description: `SHA-${variant} hash generated successfully`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate hash",
        variant: "destructive",
      })
    }
  }

  const handleReset = () => {
    setText("")
    setResult("")
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const content = event.target?.result as string
      setText(content)
    }
    reader.readAsText(file)
  }

  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="text">Text to Hash</Label>
          <Textarea
            id="text"
            placeholder="Enter text to generate SHA2 hash..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[120px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="variant">SHA2 Variant</Label>
          <Select value={variant} onValueChange={setVariant}>
            <SelectTrigger id="variant">
              <SelectValue placeholder="Select SHA2 variant" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="224">SHA-224</SelectItem>
              <SelectItem value="256">SHA-256</SelectItem>
              <SelectItem value="384">SHA-384</SelectItem>
              <SelectItem value="512">SHA-512</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Button onClick={handleHash} className="flex-1" type="button">
            <Hash className="mr-2 h-4 w-4" /> Generate SHA-{variant} Hash
          </Button>
          <Button variant="outline" type="button" onClick={() => document.getElementById("file-upload-sha2")?.click()}>
            <Upload className="mr-2 h-4 w-4" /> Upload File
            <input id="file-upload-sha2" type="file" className="hidden" onChange={handleFileUpload} />
          </Button>
          <Button onClick={handleReset} variant="outline" type="button">
            <RotateCcw className="mr-2 h-4 w-4" /> Reset
          </Button>
        </div>

        {result && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="result">SHA-{variant} Hash</Label>
              <CopyButton text={result} />
            </div>
            <Textarea id="result" readOnly value={result} className="font-mono text-sm" />
          </div>
        )}
      </CardContent>
    </Card>
  )
}

