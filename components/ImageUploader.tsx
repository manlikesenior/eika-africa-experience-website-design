"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Upload, CheckCircle } from "lucide-react"
import { supabase } from "@/lib/supabase"

interface ImageUploaderProps {
  bucket: string
  folder: string
  multiple?: boolean
  onUpload?: (urls: string[]) => void
}

export function ImageUploader({ bucket, folder, multiple = true, onUpload }: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files
      if (!files || files.length === 0) return

      setIsUploading(true)
      setError(null)
      const newUrls: string[] = []

      try {
        for (let i = 0; i < files.length; i++) {
          const file = files[i]

          // Validate file type
          if (!file.type.startsWith("image/")) {
            setError("Please upload image files only")
            continue
          }

          // Generate unique filename
          const timestamp = Date.now()
          const random = Math.random().toString(36).substring(7)
          const ext = file.name.split(".").pop()
          const filename = `${folder}/${timestamp}-${random}.${ext}`

          // Upload to Supabase
          const { data, error: uploadError } = await supabase.storage.from(bucket).upload(filename, file, {
            cacheControl: "3600",
            upsert: false,
          })

          if (uploadError) {
            console.error("Upload error:", uploadError)
            setError(`Failed to upload ${file.name}`)
            continue
          }

          // Get public URL
          const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(filename)
          if (publicUrlData?.publicUrl) {
            newUrls.push(publicUrlData.publicUrl)
          }
        }

        if (newUrls.length > 0) {
          setUploadedUrls([...uploadedUrls, ...newUrls])
          onUpload?.(newUrls)
        }
      } catch (err) {
        console.error("Upload error:", err)
        setError("Failed to upload files")
      } finally {
        setIsUploading(false)
        if (e.target) {
          e.target.value = ""
        }
      }
    },
    [bucket, folder, onUpload, uploadedUrls],
  )

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-amber-900 transition-colors">
        <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center gap-3">
          <Upload className="h-8 w-8 text-gray-400" />
          <div>
            <p className="font-semibold text-gray-900">Click to upload {multiple ? "images" : "an image"}</p>
            <p className="text-sm text-gray-500">or drag and drop</p>
            <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 10MB</p>
          </div>
          <input
            id="image-upload"
            type="file"
            multiple={multiple}
            accept="image/*"
            onChange={handleFileChange}
            disabled={isUploading}
            className="hidden"
          />
        </label>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm flex items-start gap-3">
          <span>⚠️</span>
          <span>{error}</span>
        </div>
      )}

      {/* Uploading State */}
      {isUploading && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-700 text-sm">Uploading files...</div>
      )}

      {/* Success Message */}
      {uploadedUrls.length > 0 && !isUploading && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-green-900">{uploadedUrls.length} file(s) uploaded successfully</p>
            <p className="text-sm text-green-700 mt-1">URLs are ready to use in your tour forms</p>
          </div>
        </div>
      )}
    </div>
  )
}
