"use client"

import { useState } from "react"
import { Check, ChevronsUpDown, MessageSquare, Image, Video, Layers3Icon as Layers3D } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

const topics = [
  { value: "technology", label: "Technology" },
  { value: "politics", label: "Politics" },
  { value: "business", label: "Business" },
  { value: "health", label: "Health" },
  { value: "science", label: "Science" },
  { value: "sports", label: "Sports" },
  { value: "entertainment", label: "Entertainment" },
  { value: "travel", label: "Travel" },
  { value: "food", label: "Food & Cooking" },
  { value: "fashion", label: "Fashion" },
  { value: "education", label: "Education" },
  { value: "environment", label: "Environment" },
]

export default function PreferencesPage() {
  const [open, setOpen] = useState(false)
  const [selectedTopics, setSelectedTopics] = useState<string[]>(["technology", "science"])
  const [tone, setTone] = useState("balanced")
  const [detailLevel, setDetailLevel] = useState([50])
  const [mediaPreferences, setMediaPreferences] = useState({
    text: true,
    images: true,
    videos: true,
    ar: true,
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Customize Preferences</h1>
        <p className="text-muted-foreground">Personalize your news experience by setting your preferences.</p>
      </div>

      <Tabs defaultValue="topics">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="topics">Topics</TabsTrigger>
          <TabsTrigger value="style">Style & Tone</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="topics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Topics of Interest</CardTitle>
              <CardDescription>Select the topics you're interested in to personalize your news feed.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Selected Topics</Label>
                <div className="flex flex-wrap gap-2">
                  {selectedTopics.map((topic) => (
                    <div
                      key={topic}
                      className="flex items-center rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground"
                    >
                      {topics.find((t) => t.value === topic)?.label}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="ml-1 h-4 w-4 rounded-full"
                        onClick={() => setSelectedTopics(selectedTopics.filter((t) => t !== topic))}
                      >
                        <Check className="h-3 w-3" />
                        <span className="sr-only">Remove {topic}</span>
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Add Topics</Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
                      Select topics...
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search topics..." />
                      <CommandList>
                        <CommandEmpty>No topic found.</CommandEmpty>
                        <CommandGroup>
                          {topics.map((topic) => (
                            <CommandItem
                              key={topic.value}
                              value={topic.value}
                              onSelect={(currentValue) => {
                                if (!selectedTopics.includes(currentValue)) {
                                  setSelectedTopics([...selectedTopics, currentValue])
                                }
                                setOpen(false)
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  selectedTopics.includes(topic.value) ? "opacity-100" : "opacity-0",
                                )}
                              />
                              {topic.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Topic Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="style" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Style & Tone Preferences</CardTitle>
              <CardDescription>Choose how you want your news content to be presented.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Tone</Label>
                <RadioGroup value={tone} onValueChange={setTone} className="flex flex-col space-y-1">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="formal" id="formal" />
                    <Label htmlFor="formal">Formal - Professional and academic style</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="balanced" id="balanced" />
                    <Label htmlFor="balanced">Balanced - Neutral and informative</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="casual" id="casual" />
                    <Label htmlFor="casual">Casual - Conversational and relaxed</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="humorous" id="humorous" />
                    <Label htmlFor="humorous">Humorous - Light-hearted with witty elements</Label>
                  </div>
                </RadioGroup>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Detail Level</Label>
                  <span className="text-sm text-muted-foreground">
                    {detailLevel[0] < 33 ? "Brief" : detailLevel[0] < 66 ? "Standard" : "Detailed"}
                  </span>
                </div>
                <Slider value={detailLevel} max={100} step={1} onValueChange={setDetailLevel} className="w-full" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Brief summaries</span>
                  <span>Detailed analysis</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Style Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="media" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Media Preferences</CardTitle>
              <CardDescription>Choose what types of media you want to see in your news feed.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="flex items-start space-x-4">
                  <Checkbox
                    id="text"
                    checked={mediaPreferences.text}
                    onCheckedChange={(checked) => setMediaPreferences({ ...mediaPreferences, text: checked === true })}
                  />
                  <div className="space-y-1">
                    <Label htmlFor="text" className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Text Articles
                    </Label>
                    <p className="text-sm text-muted-foreground">Standard text-based news articles and summaries</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Checkbox
                    id="images"
                    checked={mediaPreferences.images}
                    onCheckedChange={(checked) =>
                      setMediaPreferences({ ...mediaPreferences, images: checked === true })
                    }
                  />
                  <div className="space-y-1">
                    <Label htmlFor="images" className="flex items-center gap-2">
                      <Image className="h-4 w-4" />
                      Image-Rich Content
                    </Label>
                    <p className="text-sm text-muted-foreground">News with AI-generated images and infographics</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Checkbox
                    id="videos"
                    checked={mediaPreferences.videos}
                    onCheckedChange={(checked) =>
                      setMediaPreferences({ ...mediaPreferences, videos: checked === true })
                    }
                  />
                  <div className="space-y-1">
                    <Label htmlFor="videos" className="flex items-center gap-2">
                      <Video className="h-4 w-4" />
                      Video Content
                    </Label>
                    <p className="text-sm text-muted-foreground">News with AI-generated video summaries</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Checkbox
                    id="ar"
                    checked={mediaPreferences.ar}
                    onCheckedChange={(checked) => setMediaPreferences({ ...mediaPreferences, ar: checked === true })}
                  />
                  <div className="space-y-1">
                    <Label htmlFor="ar" className="flex items-center gap-2">
                      <Layers3D className="h-4 w-4" />
                      AR Overlays
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Augmented reality news overlays for real-world objects
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Media Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>Fine-tune your news experience with advanced settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <Checkbox id="personalized-recommendations" defaultChecked />
                  <div className="space-y-1">
                    <Label htmlFor="personalized-recommendations">Personalized Recommendations</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow AI to learn from your reading habits to improve recommendations
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Checkbox id="content-diversity" defaultChecked />
                  <div className="space-y-1">
                    <Label htmlFor="content-diversity">Content Diversity</Label>
                    <p className="text-sm text-muted-foreground">
                      Include some content outside your usual interests to broaden perspectives
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Checkbox id="breaking-news" defaultChecked />
                  <div className="space-y-1">
                    <Label htmlFor="breaking-news">Breaking News Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications for major breaking news events
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Checkbox id="data-collection" defaultChecked />
                  <div className="space-y-1">
                    <Label htmlFor="data-collection">Data Collection</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow anonymous usage data collection to improve the service
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Content Refresh Rate</Label>
                <RadioGroup defaultValue="standard">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="frequent" id="frequent" />
                    <Label htmlFor="frequent">Frequent (Multiple times per day)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="standard" id="standard" />
                    <Label htmlFor="standard">Standard (Once daily)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="weekly" id="weekly" />
                    <Label htmlFor="weekly">Weekly digest</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Advanced Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

