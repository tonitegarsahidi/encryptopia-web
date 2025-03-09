"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowDownUp, RotateCcw, Play } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CopyButton } from "@/components/ui/copy-button"

// Morse code mapping
const MORSE_CODE_MAP: Record<string, string> = {
  A: ".-",
  B: "-...",
  C: "-.-.",
  D: "-..",
  E: ".",
  F: "..-.",
  G: "--.",
  H: "....",
  I: "..",
  J: ".---",
  K: "-.-",
  L: ".-..",
  M: "--",
  N: "-.",
  O: "---",
  P: ".--.",
  Q: "--.-",
  R: ".-.",
  S: "...",
  T: "-",
  U: "..-",
  V: "...-",
  W: ".--",
  X: "-..-",
  Y: "-.--",
  Z: "--..",
  "0": "-----",
  "1": ".----",
  "2": "..---",
  "3": "...--",
  "4": "....-",
  "5": ".....",
  "6": "-....",
  "7": "--...",
  "8": "---..",
  "9": "----.",
  ".": ".-.-.-",
  ",": "--..--",
  "?": "..--..",
  "'": ".----.",
  "!": "-.-.--",
  "/": "-..-.",
  "(": "-.--.",
  ")": "-.--.-",
  "&": ".-...",
  ":": "---...",
  ";": "-.-.-.",
  "=": "-...-",
  "+": ".-.-.",
  "-": "-....-",
  _: "..--.-",
  '"': ".-..-.",
  $: "...-..-",
  "@": ".--.-.",
}

// Reverse morse code mapping for decoding
const REVERSE_MORSE_CODE_MAP: Record<string, string> = Object.entries(MORSE_CODE_MAP).reduce(
  (acc, [key, value]) => {
    acc[value] = key
    return acc
  },
  {} as Record<string, string>,
)

export default function MorseCodeConverter() {
  const { toast } = useToast()
  const [text, setText] = useState("")
  const [result, setResult] = useState("")
  const [mode, setMode] = useState<"encode" | "decode">("encode")

  const encodeToMorse = (input: string) => {
    return input
      .toUpperCase()
      .split("")
      .map((char) => {
        if (char === " ") return "/"
        return MORSE_CODE_MAP[char] || char
      })
      .join(" ")
  }

  const decodeFromMorse = (input: string) => {
    return input
      .split("/")
      .map((word) =>
        word
          .trim()
          .split(" ")
          .map((char) => REVERSE_MORSE_CODE_MAP[char] || char)
          .join(""),
      )
      .join(" ")
  }

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
      const encoded = encodeToMorse(text)
      setResult(encoded)
      setMode("encode")
      toast({
        title: "Success",
        description: "Text encoded to Morse code successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to encode text to Morse code",
        variant: "destructive",
      })
    }
  }

  const handleDecode = () => {
    if (!text) {
      toast({
        title: "Error",
        description: "Please enter Morse code to decode",
        variant: "destructive",
      })
      return
    }

    try {
      const decoded = decodeFromMorse(text)
      setResult(decoded)
      setMode("decode")
      toast({
        title: "Success",
        description: "Morse code decoded successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to decode Morse code. Check your input format.",
        variant: "destructive",
      })
    }
  }

  const handleReset = () => {
    setText("")
    setResult("")
  }

  const playMorseCode = () => {
    if (!result || mode !== "encode") {
      toast({
        title: "Error",
        description: "Please encode text to Morse code first",
        variant: "destructive",
      })
      return
    }

    const context = new (window.AudioContext || (window as any).webkitAudioContext)()
    const dot = 100 // Duration of a dot in milliseconds
    const dash = dot * 3 // Duration of a dash
    const symbolSpace = dot // Space between symbols (dots/dashes)
    const letterSpace = dot * 3 // Space between letters
    const wordSpace = dot * 7 // Space between words

    let startTime = context.currentTime

    // Parse the Morse code and play sounds
    const morseCode = result.split(" ")

    morseCode.forEach((symbol) => {
      if (symbol === "/") {
        startTime += wordSpace / 1000
        return
      }

      for (let i = 0; i < symbol.length; i++) {
        const tone = context.createOscillator()
        tone.frequency.value = 700
        tone.type = "sine"

        const gainNode = context.createGain()
        tone.connect(gainNode)
        gainNode.connect(context.destination)

        tone.start(startTime)

        if (symbol[i] === ".") {
          tone.stop(startTime + dot / 1000)
          startTime += (dot + symbolSpace) / 1000
        } else if (symbol[i] === "-") {
          tone.stop(startTime + dash / 1000)
          startTime += (dash + symbolSpace) / 1000
        }
      }

      startTime += (letterSpace - symbolSpace) / 1000
    })

    toast({
      title: "Playing",
      description: "Playing Morse code audio",
    })
  }

  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        <Tabs defaultValue="encode" onValueChange={(value) => setMode(value as "encode" | "decode")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="encode">Text to Morse</TabsTrigger>
            <TabsTrigger value="decode">Morse to Text</TabsTrigger>
          </TabsList>
          <TabsContent value="encode" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="text">Text to Convert to Morse Code</Label>
              <Textarea
                id="text"
                placeholder="Enter text to convert to Morse code..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="min-h-[120px]"
              />
            </div>

            <Button onClick={handleEncode} className="w-full" type="button">
              <ArrowDownUp className="mr-2 h-4 w-4" /> Convert to Morse Code
            </Button>
          </TabsContent>
          <TabsContent value="decode" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="morse">Morse Code to Convert to Text</Label>
              <div className="text-xs text-muted-foreground mb-2">
                Use dots (.) and dashes (-) separated by spaces. Use / for word separation.
              </div>
              <Textarea
                id="morse"
                placeholder="Enter Morse code to convert to text... (e.g. .... . .-.. .-.. --- / .-- --- .-. .-.. -..)"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="min-h-[120px] font-mono"
              />
            </div>

            <Button onClick={handleDecode} className="w-full" type="button">
              <ArrowDownUp className="mr-2 h-4 w-4" /> Convert to Text
            </Button>
          </TabsContent>
        </Tabs>

        <div className="flex gap-2">
          <Button onClick={handleReset} variant="outline" type="button" className="flex-1">
            <RotateCcw className="mr-2 h-4 w-4" /> Reset
          </Button>
          {mode === "encode" && (
            <Button onClick={playMorseCode} variant="outline" type="button" className="flex-1">
              <Play className="mr-2 h-4 w-4" /> Play Sound
            </Button>
          )}
        </div>

        {result && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="result">Result</Label>
              <CopyButton text={result} />
            </div>
            <Textarea
              id="result"
              readOnly
              value={result}
              className={`min-h-[120px] ${mode === "encode" ? "font-mono" : ""}`}
            />
          </div>
        )}

        {mode === "encode" && (
          <div className="bg-muted rounded-md p-4 text-sm">
            <h3 className="font-semibold mb-2">Morse Code Chart</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
              {Object.entries(MORSE_CODE_MAP).map(([char, code]) => (
                <div key={char} className="flex items-center gap-2">
                  <span className="font-semibold">{char}</span>
                  <span className="font-mono text-muted-foreground">{code}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

