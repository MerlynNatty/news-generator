"use client"

import type React from "react"

import { useState } from "react"
import { Camera, Info, Layers3Icon as Layers3D, Newspaper, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ARNewsPage() {
  const [activeCamera, setActiveCamera] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AR News</h1>
        <p className="text-muted-foreground">
          Experience news in augmented reality by scanning images or uploading photos.
        </p>
      </div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>How AR News Works</AlertTitle>
        <AlertDescription>
          Point your camera at a newspaper, magazine, or upload an image to see related news content overlaid in
          augmented reality.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="camera">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="camera">Camera</TabsTrigger>
          <TabsTrigger value="upload">Upload Image</TabsTrigger>
        </TabsList>

        <TabsContent value="camera" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Camera View</CardTitle>
              <CardDescription>Point your camera at an image to see AR news overlays.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-video w-full overflow-hidden rounded-md border bg-muted">
                {activeCamera ? (
                  <div className="flex h-full items-center justify-center">
                    <div className="relative h-full w-full bg-black">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Camera className="h-16 w-16 text-muted-foreground opacity-20" />
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <Card className="bg-background/80 backdrop-blur">
                          <CardHeader className="p-3">
                            <CardTitle className="text-sm">AI Breakthrough Detected</CardTitle>
                          </CardHeader>
                          <CardContent className="p-3 pt-0">
                            <p className="text-xs">
                              New AI model understands context better than ever before. Tap to read more.
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-4">
                    <Camera className="h-16 w-16 text-muted-foreground" />
                    <p className="text-center text-sm text-muted-foreground">Camera preview will appear here</p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <Layers3D className="mr-2 h-4 w-4" />
                AR Examples
              </Button>
              <Button onClick={() => setActiveCamera(!activeCamera)}>
                {activeCamera ? "Stop Camera" : "Start Camera"}
              </Button>
            </CardFooter>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>How to Use</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-2 pl-5 text-sm">
                  <li>Click "Start Camera" to activate your device camera</li>
                  <li>Point your camera at a newspaper, magazine, or image</li>
                  <li>Hold steady while the AI analyzes the content</li>
                  <li>View AR news overlays related to the detected content</li>
                  <li>Tap on overlays to read full articles</li>
                </ol>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Supported Content</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 pl-5 text-sm">
                  <li>Newspaper headlines and articles</li>
                  <li>Magazine covers and feature stories</li>
                  <li>Product packaging with news relevance</li>
                  <li>Advertisements related to current events</li>
                  <li>Public signage and billboards</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="upload" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upload Image</CardTitle>
              <CardDescription>Upload an image to see AR news overlays.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-video w-full overflow-hidden rounded-md border bg-muted">
                {uploadedImage ? (
                  <div className="relative h-full w-full">
                    <img
                      src={uploadedImage || "/placeholder.svg"}
                      alt="Uploaded"
                      className="h-full w-full object-contain"
                    />
                    <div className="absolute bottom-4 left-4 right-4">
                      <Card className="bg-background/80 backdrop-blur">
                        <CardHeader className="p-3">
                          <CardTitle className="text-sm">Climate Change Article Detected</CardTitle>
                        </CardHeader>
                        <CardContent className="p-3 pt-0">
                          <p className="text-xs">Global Climate Summit reaches historic agreement. Tap to read more.</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-4">
                    <Upload className="h-16 w-16 text-muted-foreground" />
                    <p className="text-center text-sm text-muted-foreground">Upload an image to analyze</p>
                    <Button size="sm" onClick={() => document.getElementById("file-upload")?.click()}>
                      Select Image
                    </Button>
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              {uploadedImage ? (
                <>
                  <Button variant="outline" onClick={() => setUploadedImage(null)}>
                    Clear Image
                  </Button>
                  <Button>
                    <Newspaper className="mr-2 h-4 w-4" />
                    View Related News
                  </Button>
                </>
              ) : (
                <Button className="ml-auto" onClick={() => document.getElementById("file-upload")?.click()}>
                  Upload Image
                </Button>
              )}
            </CardFooter>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent AR Interactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 overflow-hidden rounded-md">
                      <img
                        src="/placeholder.svg?height=48&width=48"
                        alt="Thumbnail"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Climate Change Report</p>
                      <p className="text-xs text-muted-foreground">Analyzed 2 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 overflow-hidden rounded-md">
                      <img
                        src="/placeholder.svg?height=48&width=48"
                        alt="Thumbnail"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Tech Conference Poster</p>
                      <p className="text-xs text-muted-foreground">Analyzed 5 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Tips for Best Results</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 pl-5 text-sm">
                  <li>Use well-lit, clear images</li>
                  <li>Ensure text is readable in the image</li>
                  <li>Avoid blurry or distorted images</li>
                  <li>Include full headlines when possible</li>
                  <li>Try different angles if recognition fails</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

