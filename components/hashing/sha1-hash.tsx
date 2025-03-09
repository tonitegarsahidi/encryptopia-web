"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Hash, RotateCcw, Upload } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import CryptoJS from "crypto-js"
import { CopyButton } from "@/components/ui/copy-button"

export default function Sha1Hash() {
  const { toast } = useToast()
  const [text, setText] = useState("")
  const [result, setResult] = useState("")

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
      const hashed = CryptoJS.SHA1(text).toString()
      setResult(hashed)
      toast({
        title: "Success",
        description: "SHA1 hash generated successfully",
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
            placeholder="Enter text to generate SHA1 hash..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[120px]"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Button onClick={handleHash} className="flex-1" type="button">
            <Hash className="mr-2 h-4 w-4" /> Generate SHA1 Hash
          </Button>
          <Button variant="outline" type="button" onClick={() => document.getElementById("file-upload-sha1")?.click()}>
            <Upload className="mr-2 h-4 w-4" /> Upload File
            <input id="file-upload-sha1" type="file" className="hidden" onChange={handleFileUpload} />
          </Button>
          <Button onClick={handleReset} variant="outline" type="button">
            <RotateCcw className="mr-2 h-4 w-4" /> Reset
          </Button>
        </div>

        {result && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="result">SHA1 Hash</Label>
              <CopyButton text={result} />
            </div>
            <Textarea id="result" readOnly value={result} className="font-mono text-sm" />
          </div>
        )}
      </CardContent>
    </Card>
  )
}

