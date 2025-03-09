"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowDownUp, RotateCcw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CopyButton } from "@/components/ui/copy-button"

export default function UrlEncoder() {
  const { toast } = useToast()
  const [text, setText] = useState("")
  const [result, setResult] = useState("")
  const [encodeSpaces, setEncodeSpaces] = useState(true)
  const [mode, setMode] = useState<"encode" | "decode">("encode")

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
      let encoded = encodeURIComponent(text)

      // Replace + with %20 if the option is selected
      if (encodeSpaces) {
        encoded = encoded.replace(/\+/g, "%20")
      }

      setResult(encoded)
      toast({
        title: "Success",
        description: "Text URL-encoded successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to URL-encode text",
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
      const decoded = decodeURIComponent(text)
      setResult(decoded)
      toast({
        title: "Success",
        description: "URL-encoded text decoded successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to decode URL-encoded text. Check your input format.",
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
        <Tabs defaultValue="encode" onValueChange={(value) => setMode(value as "encode" | "decode")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="encode">Encode URL</TabsTrigger>
            <TabsTrigger value="decode">Decode URL</TabsTrigger>
          </TabsList>
          <TabsContent value="encode" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="text">Text to URL Encode</Label>
              <Textarea
                id="text"
                placeholder="Enter text to URL encode..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="min-h-[120px]"
              />
              <div className="flex items-center space-x-2 pt-2">
                <Switch id="encode-spaces" checked={encodeSpaces} onCheckedChange={setEncodeSpaces} />
                <Label htmlFor="encode-spaces">Encode spaces as %20 (instead of +)</Label>
              </div>
            </div>

            <Button onClick={handleEncode} className="w-full" type="button">
              <ArrowDownUp className="mr-2 h-4 w-4" /> Encode URL
            </Button>
          </TabsContent>
          <TabsContent value="decode" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="encoded">URL Encoded Text to Decode</Label>
              <Textarea
                id="encoded"
                placeholder="Enter URL encoded text to decode..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="min-h-[120px] font-mono"
              />
            </div>

            <Button onClick={handleDecode} className="w-full" type="button">
              <ArrowDownUp className="mr-2 h-4 w-4" /> Decode URL
            </Button>
          </TabsContent>
        </Tabs>

        <Button onClick={handleReset} variant="outline" type="button" className="w-full">
          <RotateCcw className="mr-2 h-4 w-4" /> Reset
        </Button>

        {result && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="result">Result</Label>
              <CopyButton text={result} />
            </div>
            <Textarea id="result" readOnly value={result} className="min-h-[120px]" />
          </div>
        )}

        <div className="bg-muted rounded-md p-4 text-sm">
          <h3 className="font-semibold mb-2">About URL Encoding</h3>
          <p>
            URL encoding, also known as percent-encoding, is a mechanism for encoding information in a Uniform Resource
            Identifier (URI). It's used primarily to handle characters that may have special meaning within URLs.
          </p>
          <div className="mt-3 space-y-1">
            <p className="font-medium">Common URL encoded characters:</p>
            <ul className="grid grid-cols-2 md:grid-cols-4 gap-1 mt-1">
              <li className="font-mono text-xs">Space = %20 or +</li>
              <li className="font-mono text-xs">! = %21</li>
              <li className="font-mono text-xs"># = %23</li>
              <li className="font-mono text-xs">$ = %24</li>
              <li className="font-mono text-xs">% = %25</li>
              <li className="font-mono text-xs">& = %26</li>
              <li className="font-mono text-xs">' = %27</li>
              <li className="font-mono text-xs">( = %28</li>
              <li className="font-mono text-xs">) = %29</li>
              <li className="font-mono text-xs">* = %2A</li>
              <li className="font-mono text-xs">+ = %2B</li>
              <li className="font-mono text-xs">, = %2C</li>
              <li className="font-mono text-xs">/ = %2F</li>
              <li className="font-mono text-xs">: = %3A</li>
              <li className="font-mono text-xs">; = %3B</li>
              <li className="font-mono text-xs">= = %3D</li>
              <li className="font-mono text-xs">? = %3F</li>
              <li className="font-mono text-xs">@ = %40</li>
              <li className="font-mono text-xs">[ = %5B</li>
              <li className="font-mono text-xs">] = %5D</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

