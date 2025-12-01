"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ImageUploader } from "@/components/ImageUploader"
import { TourForm } from "@/components/TourForm"
import { Upload, Plus, LogOut } from "lucide-react"
import { supabase } from "@/lib/auth"

export default function AdminDashboard() {
  const router = useRouter()
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/admin/login")
      } else {
        setUser(user)
        setLoading(false)
      }
    }

    checkAuth()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/admin/login")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    )
  }

  const handleImageUpload = (urls: string[]) => {
    setUploadedImages([...uploadedImages, ...urls])
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage your tours and media content</p>
            <p className="text-sm text-gray-500 mt-1">Logged in as: {user?.email}</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2 bg-transparent">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        <Tabs defaultValue="tours" className="space-y-6">
          <TabsList className="bg-white border">
            <TabsTrigger value="tours">Tours</TabsTrigger>
            <TabsTrigger value="media">Media Library</TabsTrigger>
          </TabsList>

          {/* Tours Tab */}
          <TabsContent value="tours" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Create New Tour
                </CardTitle>
                <CardDescription>Add a new safari tour to your collection</CardDescription>
              </CardHeader>
              <CardContent>
                <TourForm onSuccess={() => {}} />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Media Tab */}
          <TabsContent value="media" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Upload Media
                </CardTitle>
                <CardDescription>Upload images for your tours</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-8">
                  <ImageUploader bucket="media" folder="tours" multiple={true} onUpload={handleImageUpload} />
                </div>

                {/* Uploaded Images Preview */}
                {uploadedImages.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Recently Uploaded</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {uploadedImages.map((url, idx) => (
                        <div key={idx} className="relative group">
                          <div className="relative h-32 bg-gray-200 rounded-lg overflow-hidden">
                            <img
                              src={url || "/placeholder.svg"}
                              alt={`Uploaded ${idx}`}
                              className="w-full h-full object-cover"
                            />
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(url)
                              }}
                              className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                            >
                              <span className="text-white text-xs font-semibold">Copy URL</span>
                            </button>
                          </div>
                          <p className="text-xs text-gray-600 mt-2 truncate">{url.split("/").pop()}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
