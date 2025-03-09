"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Lock, Unlock, RotateCcw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import CryptoJS from "crypto-js"
import { CopyButton } from "@/components/ui/copy-button"

export default function DesEncryption() {
  const { toast } = useToast()
  const [text, setText] = useState("")
  const [key, setKey] = useState("")
  const [mode, setMode] = useState("ECB")
  const [result, setResult] = useState("")
  const [action, setAction] = useState<"encrypt" | "decrypt">("encrypt")

  const handleEncrypt = () => {
    if (!text) {
      toast({
        title: "Error",
        description: "Please enter text to encrypt",
        variant: "destructive",
      })
      return
    }

    if (!key) {
      toast({
        title: "Error",
        description: "Please enter an encryption key",
        variant: "destructive",
      })
      return
    }

    try {
      let encrypted
      const keyUtf8 = CryptoJS.enc.Utf8.parse(key)
      const iv = CryptoJS.enc.Utf8.parse(key.substring(0, 8))

      switch (mode) {
        case "CBC":
          encrypted = CryptoJS.DES.encrypt(text, keyUtf8, { iv, mode: CryptoJS.mode.CBC }).toString()
          break
        case "ECB":
          encrypted = CryptoJS.DES.encrypt(text, keyUtf8, { mode: CryptoJS.mode.ECB }).toString()
          break
        case "CFB":
          encrypted = CryptoJS.DES.encrypt(text, keyUtf8, { iv, mode: CryptoJS.mode.CFB }).toString()
          break
        case "OFB":
          encrypted = CryptoJS.DES.encrypt(text, keyUtf8, { iv, mode: CryptoJS.mode.OFB }).toString()
          break
        default:
          encrypted = CryptoJS.DES.encrypt(text, key).toString()
      }

      setResult(encrypted)
      setAction("encrypt")
      toast({
        title: "Success",
        description: "Text encrypted successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to encrypt text",
        variant: "destructive",
      })
    }
  }

  const handleDecrypt = () => {
    if (!text) {
      toast({
        title: "Error",
        description: "Please enter text to decrypt",
        variant: "destructive",
      })
      return
    }

    if (!key) {
      toast({
        title: "Error",
        description: "Please enter a decryption key",
        variant: "destructive",
      })
      return
    }

    try {
      let decrypted
      const keyUtf8 = CryptoJS.enc.Utf8.parse(key)
      const iv = CryptoJS.enc.Utf8.parse(key.substring(0, 8))

      switch (mode) {
        case "CBC":
          decrypted = CryptoJS.DES.decrypt(text, keyUtf8, { iv, mode: CryptoJS.mode.CBC }).toString(CryptoJS.enc.Utf8)
          break
        case "ECB":
          decrypted = CryptoJS.DES.decrypt(text, keyUtf8, { mode: CryptoJS.mode.ECB }).toString(CryptoJS.enc.Utf8)
          break
        case "CFB":
          decrypted = CryptoJS.DES.decrypt(text, keyUtf8, { iv, mode: CryptoJS.mode.CFB }).toString(CryptoJS.enc.Utf8)
          break
        case "OFB":
          decrypted = CryptoJS.DES.decrypt(text, keyUtf8, { iv, mode: CryptoJS.mode.OFB }).toString(CryptoJS.enc.Utf8)
          break
        default:
          decrypted = CryptoJS.DES.decrypt(text, key).toString(CryptoJS.enc.Utf8)
      }

      setResult(decrypted)
      setAction("decrypt")
      toast({
        title: "Success",
        description: "Text decrypted successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to decrypt text. Check your key and encrypted text.",
        variant: "destructive",
      })
    }
  }

  const handleReset = () => {
    setText("")
    setKey("")
    setResult("")
    setMode("ECB")
  }

  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="text">Text to {action === "encrypt" ? "Encrypt" : "Decrypt"}</Label>
          <Textarea
            id="text"
            placeholder={action === "encrypt" ? "Enter text to encrypt..." : "Enter text to decrypt..."}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[120px]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="key">Encryption Key</Label>
            <Input
              id="key"
              type="text"
              placeholder="Enter your secret key..."
              value={key}
              onChange={(e) => setKey(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mode">Encryption Mode</Label>
            <Select value={mode} onValueChange={setMode}>
              <SelectTrigger id="mode">
                <SelectValue placeholder="Select mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ECB">ECB (Electronic Codebook)</SelectItem>
                <SelectItem value="CBC">CBC (Cipher Block Chaining)</SelectItem>
                <SelectItem value="CFB">CFB (Cipher Feedback)</SelectItem>
                <SelectItem value="OFB">OFB (Output Feedback)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Button onClick={handleEncrypt} className="flex-1" type="button">
            <Lock className="mr-2 h-4 w-4" /> Encrypt
          </Button>
          <Button onClick={handleDecrypt} className="flex-1" type="button">
            <Unlock className="mr-2 h-4 w-4" /> Decrypt
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

