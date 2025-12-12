"use client"

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from '@/components/ui/button'
import { Image as ImageIcon, Upload, X, Loader2 } from 'lucide-react'
import { uploadFiles } from '@/lib/storage'
import { toast } from '@/components/ui/use-toast'

interface ImageUploadProps {
  value?: string[]
  onChange: (urls: string[]) => void
  maxFiles?: number
  bucket?: string
  path?: string
  multiple?: boolean
  disabled?: boolean
}

export function ImageUpload({
  value = [],
  onChange,
  maxFiles = 10,
  bucket = 'gallery',
  path = 'images',
  multiple = true,
  disabled = false,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [previewUrls, setPreviewUrls] = useState<string[]>(value)

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (disabled) return
      
      const files = multiple ? acceptedFiles : [acceptedFiles[0]]
      
      // Check if we're exceeding max files
      if (previewUrls.length + files.length > maxFiles) {
        toast({
          title: 'Too many files',
          description: `You can only upload up to ${maxFiles} images.`,
          variant: 'destructive',
        })
        return
      }

      try {
        setIsUploading(true)
        const urls = await uploadFiles(bucket, path, files)
        const newUrls = [...previewUrls, ...urls]
        setPreviewUrls(newUrls)
        onChange(newUrls)
      } catch (error) {
        console.error('Error uploading files:', error)
        toast({
          title: 'Error uploading files',
          description: 'There was an error uploading your files. Please try again.',
          variant: 'destructive',
        })
      } finally {
        setIsUploading(false)
      }
    },
    [previewUrls, multiple, maxFiles, bucket, path, onChange, disabled]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.gif'],
    },
    disabled: isUploading || disabled,
    multiple,
  })

  const removeImage = (index: number) => {
    const newUrls = [...previewUrls]
    newUrls.splice(index, 1)
    setPreviewUrls(newUrls)
    onChange(newUrls)
  }

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-primary/50'}
        `}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-2">
          {isUploading ? (
            <>
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Uploading...</p>
            </>
          ) : (
            <>
              <div className="p-3 rounded-full bg-primary/10">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <div className="text-sm text-muted-foreground">
                {isDragActive ? (
                  <p>Drop the images here</p>
                ) : (
                  <p>
                    Drag & drop images here, or click to select files
                    <br />
                    <span className="text-xs">
                      Supports JPG, PNG, WEBP, GIF (max {maxFiles} images)
                    </span>
                  </p>
                )}
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                disabled={disabled}
              >
                Select Images
              </Button>
            </>
          )}
        </div>
      </div>

      {previewUrls.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {previewUrls.map((url, index) => (
            <div key={url} className="relative group rounded-md overflow-hidden">
              <div className="aspect-square relative">
                <img
                  src={url}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeImage(index)
                  }}
                  className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  disabled={disabled}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
