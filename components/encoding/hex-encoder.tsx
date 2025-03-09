"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowDownUp, RotateCcw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CopyButton } from "@/components/ui/copy-button"

export default function HexEncoder() {
  const { toast } = useToast()
  const [text, setText] = useState("")
  const [result, setResult] = useState("")
  const [format, setFormat] = useState<"string" | "space" | "array">("string")
  const [prefix, setPrefix] = useState<"none" | "0x">("none")
  const [action, setAction] = useState<"encode" | "decode">("encode")

  const encodeToHex = () => {
    if (!text) {
      toast({
        title: "Error",
        description: "Please enter text to encode",
        variant: "destructive",
      })
      return
    }

    try {
      // Convert string to hex
      const hexArray = Array.from(text).map((char) => {
        let hex = char.charCodeAt(0).toString(16)
        // Ensure two digits
        hex = hex.length === 1 ? "0" + hex : hex
        // Add prefix if needed
        return prefix === "0x" ? "0x" + hex : hex
      })

      let encodedResult = ""

      // Format according to user preference
      switch (format) {
        case "string":
          encodedResult = hexArray.join("")
          break
        case "space":
          encodedResult = hexArray.join(" ")
          break
        case "array":
          encodedResult = "[" + hexArray.map((h) => `"${h}"`).join(", ") + "]"
          break
        default:
          encodedResult = hexArray.join("")
      }

      setResult(encodedResult)
      setAction("encode")
      toast({
        title: "Success",
        description: "Text encoded to hexadecimal successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to encode text to hexadecimal",
        variant: "destructive",
      })
    }
  }

  const decodeFromHex = () => {
    if (!text) {
      toast({
        title: "Error",
        description: "Please enter hexadecimal to decode",
        variant: "destructive",
      })
      return
    }

    try {
      // Process the input hex string
      let hexString = text

      // Handle array format
      if (hexString.startsWith("[") && hexString.endsWith("]")) {
        hexString = hexString
          .slice(1, -1)
          .split(",")
          .map((item) => item.trim().replace(/"/g, "").replace(/'/g, ""))
          .join("")
      }

      // Remove spaces and 0x prefixes
      hexString = hexString.replace(/\s+/g, "").replace(/0x/g, "")

      // Ensure even number of characters
      if (hexString.length % 2 !== 0) {
        toast({
          title: "Error",
          description: "Hex string must have an even number of characters",
          variant: "destructive",
        })
        return
      }

      // Convert hex to string
      let result = ""
      for (let i = 0; i < hexString.length; i += 2) {
        const byte = Number.parseInt(hexString.substr(i, 2), 16)
        result += String.fromCharCode(byte)
      }

      setResult(result)
      setAction("decode")
      toast({
        title: "Success",
        description: "Hexadecimal decoded successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to decode hexadecimal. Check your input format.",
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
          <Label htmlFor="text">Text {action === "encode" ? "to Encode" : "to Decode"}</Label>
          <Textarea
            id="text"
            placeholder={
              action === "encode"
                ? "Enter text to convert to hexadecimal..."
                : "Enter hexadecimal to convert to text..."
            }
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[120px]"
          />
        </div>

        {action === "encode" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Output Format</Label>
              <RadioGroup
                defaultValue="string"
                value={format}
                onValueChange={(value) => setFormat(value as "string" | "space" | "array")}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="string" id="string" />
                  <Label htmlFor="string" className="cursor-pointer">
                    Continuous String
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="space" id="space" />
                  <Label htmlFor="space" className="cursor-pointer">
                    Space-Separated
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="array" id="array" />
                  <Label htmlFor="array" className="cursor-pointer">
                    Array Format
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Hex Prefix</Label>
              <RadioGroup
                defaultValue="none"
                value={prefix}
                onValueChange={(value) => setPrefix(value as "none" | "0x")}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="none" id="none" />
                  <Label htmlFor="none" className="cursor-pointer">
                    None
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="0x" id="0x" />
                  <Label htmlFor="0x" className="cursor-pointer">
                    0x Prefix
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-2">
          <Button onClick={encodeToHex} className={`flex-1 ${action === "decode" ? "hidden" : ""}`} type="button">
            <ArrowDownUp className="mr-2 h-4 w-4" /> Encode to Hex
          </Button>
          <Button onClick={decodeFromHex} className={`flex-1 ${action === "encode" ? "hidden" : ""}`} type="button">
            <ArrowDownUp className="mr-2 h-4 w-4" /> Decode from Hex
          </Button>
          <Button
            onClick={() => setAction(action === "encode" ? "decode" : "encode")}
            className="flex-1"
            variant="secondary"
            type="button"
          >
            Switch to {action === "encode" ? "Decoding" : "Encoding"}
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
            <Textarea id="result" readOnly value={result} className="min-h-[120px] font-mono" />
          </div>
        )}

        <div className="bg-muted rounded-md p-4 text-sm">
          <h3 className="font-semibold mb-2">About Hexadecimal Encoding</h3>
          <p>
            Hexadecimal is a base-16 number system that uses 16 distinct symbols: the numbers 0-9 and the letters A-F.
            Each hexadecimal digit represents 4 binary digits, making it a compact way to represent binary data.
          </p>
          <p className="mt-2">
            In computing, hexadecimal is commonly used for representing byte values, memory addresses, and color codes.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

