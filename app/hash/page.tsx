"use client"

import { useSearchParams } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Md5Hash from "@/components/hashing/md5-hash"
import Sha1Hash from "@/components/hashing/sha1-hash"
import Sha2Hash from "@/components/hashing/sha2-hash"
import { useEffect, useState } from "react"

export default function HashPage() {
  const searchParams = useSearchParams()
  const tabParam = searchParams.get("tab")
  const [activeTab, setActiveTab] = useState("md5")

  useEffect(() => {
    if (tabParam && ["md5", "sha1", "sha2"].includes(tabParam)) {
      setActiveTab(tabParam)
    }
  }, [tabParam])

  return (
    <div className="container py-8 md:py:12">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Hash Online</h1>
          <p className="text-muted-foreground">Generate secure hash values with various hashing algorithms</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="md5">MD5</TabsTrigger>
            <TabsTrigger value="sha1">SHA1</TabsTrigger>
            <TabsTrigger value="sha2">SHA2</TabsTrigger>
          </TabsList>
          <TabsContent value="md5">
            <Md5Hash />
          </TabsContent>
          <TabsContent value="sha1">
            <Sha1Hash />
          </TabsContent>
          <TabsContent value="sha2">
            <Sha2Hash />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

