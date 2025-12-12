"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Database } from "@/lib/database.types"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { v4 as uuidv4 } from 'uuid'
import { toast } from "sonner"
import dynamic from 'next/dynamic'

// Import ReactQuill dynamically to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { ImageUploader } from "@/components/ImageUploader"
import { Loader2, Save, ArrowLeft } from "lucide-react"

const blogFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required').regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    'Slug can only contain lowercase letters, numbers, and hyphens.'
  ),
  excerpt: z.string().optional(),
  content: z.string().min(1, 'Content is required'),
  cover_image: z.string().optional(),
  seo_title: z.string().optional(),
  seo_description: z.string().optional(),
  seo_keywords: z.string().optional(),
  published: z.boolean().default(false),
  gallery: z.array(z.string()).default([]),
})

type BlogFormValues = z.infer<typeof blogFormSchema>

type BlogEditorProps = {
  initialData?: Partial<Database['public']['Tables']['blogs']['Row']>
  isEditing?: boolean
}

export function BlogEditor({ initialData, isEditing = false }: BlogEditorProps) {
  const router = useRouter()
  const supabase = createClientComponentClient<Database>()
  const [loading, setLoading] = useState(false)
  const [coverImage, setCoverImage] = useState(initialData?.cover_image || '')
  const [galleryImages, setGalleryImages] = useState<string[]>(initialData?.gallery || [])

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BlogFormValues>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      title: initialData?.title || '',
      slug: initialData?.slug || '',
      excerpt: initialData?.excerpt || '',
      content: initialData?.content || '',
      cover_image: initialData?.cover_image || '',
      seo_title: initialData?.seo_title || '',
      seo_description: initialData?.seo_description || '',
      seo_keywords: initialData?.seo_keywords || '',
      published: initialData?.published || false,
      gallery: initialData?.gallery || [],
    },
  })

  // Watch for content changes for the editor
  const content = watch('content')
  const published = watch('published')

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    setValue('title', title)
    if (!isEditing) {
      setValue('slug', generateSlug(title))
    }
  }

  const handleCoverImageUpload = (urls: string[]) => {
    if (urls.length > 0) {
      setCoverImage(urls[0])
      setValue('cover_image', urls[0])
    }
  }

  const handleGalleryUpload = (urls: string[]) => {
    const updatedGallery = [...galleryImages, ...urls]
    setGalleryImages(updatedGallery)
    setValue('gallery', updatedGallery)
  }

  const removeGalleryImage = (index: number) => {
    const updatedGallery = [...galleryImages]
    updatedGallery.splice(index, 1)
    setGalleryImages(updatedGallery)
    setValue('gallery', updatedGallery)
  }

  const onSubmit = async (data: BlogFormValues) => {
    try {
      setLoading(true)
      
      const blogData = {
        ...data,
        updated_at: new Date().toISOString(),
      }

      if (isEditing && initialData?.id) {
        // Update existing blog
        const { error } = await supabase
          .from('blogs')
          .update(blogData)
          .eq('id', initialData.id)

        if (error) throw error
        
        toast.success('Blog post updated successfully')
      } else {
        // Create new blog
        const { error } = await supabase
          .from('blogs')
          .insert([{
            ...blogData,
            id: uuidv4(),
            created_at: new Date().toISOString(),
          }])

        if (error) throw error
        
        toast.success('Blog post created successfully')
      }
      
      router.push('/admin/dashboard/blogs')
      router.refresh()
    } catch (error) {
      console.error('Error saving blog post:', error)
      toast.error('Failed to save blog post')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog Posts
        </Button>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="publish"
              checked={published}
              onCheckedChange={(checked) => setValue('published', checked)}
            />
            <Label htmlFor="publish">
              {published ? 'Published' : 'Draft'}
            </Label>
          </div>
          <Button 
            onClick={handleSubmit(onSubmit)}
            disabled={loading}
            className="flex items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                {isEditing ? 'Update Post' : 'Create Post'}
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              placeholder="Enter blog post title"
              {...register('title')}
              onChange={handleTitleChange}
              disabled={loading}
            />
            {errors.title && (
              <p className="text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug *</Label>
            <Input
              id="slug"
              placeholder="blog-post-url"
              {...register('slug')}
              disabled={loading}
            />
            {errors.slug && (
              <p className="text-sm text-red-600">{errors.slug.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <textarea
              id="excerpt"
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="A brief summary of your blog post"
              {...register('excerpt')}
              disabled={loading}
              rows={3}
            />
            {errors.excerpt && (
              <p className="text-sm text-red-600">{errors.excerpt.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Content *</Label>
            {typeof window !== 'undefined' && ReactQuill && (
              <div className="h-96">
                <ReactQuill
                  theme="snow"
                  value={content}
                  onChange={(value) => setValue('content', value)}
                  className="h-80"
                />
              </div>
            )}
            {errors.content && (
              <p className="text-sm text-red-600">{errors.content.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Cover Image</Label>
            {coverImage ? (
              <div className="relative group">
                <img
                  src={coverImage}
                  alt="Cover"
                  className="w-full h-48 object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => {
                    setCoverImage('')
                    setValue('cover_image', '')
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <ImageUploader
                bucket="blog"
                folder="covers"
                multiple={false}
                onUpload={handleCoverImageUpload}
                className="h-48"
              />
            )}
          </div>

          <div className="space-y-2">
            <Label>Gallery</Label>
            <ImageUploader
              bucket="blog"
              folder="gallery"
              multiple={true}
              onUpload={handleGalleryUpload}
              className="h-32"
            />
            {galleryImages.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-2">
                {galleryImages.map((img, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={img}
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-24 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => removeGalleryImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-4 pt-4 border-t">
            <h3 className="font-medium">SEO Settings</h3>
            
            <div className="space-y-2">
              <Label htmlFor="seo_title">SEO Title</Label>
              <Input
                id="seo_title"
                placeholder="SEO Title"
                {...register('seo_title')}
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="seo_description">SEO Description</Label>
              <textarea
                id="seo_description"
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="SEO Description"
                {...register('seo_description')}
                disabled={loading}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="seo_keywords">SEO Keywords</Label>
              <Input
                id="seo_keywords"
                placeholder="keyword1, keyword2, keyword3"
                {...register('seo_keywords')}
                disabled={loading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
