import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { X, ArrowUp, ArrowDown, Upload } from "lucide-react";

interface ImageUploaderProps {
  images: string[];
  onImagesChange: (newImages: string[]) => void;
}

export function ImageUploader({ images, onImagesChange }: ImageUploaderProps) {
  const [previews, setPreviews] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newPreviews = acceptedFiles.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });

  async function uploadToCloudinary(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dptx4cc9b/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Upload failed");
    }

    const data = await response.json();
    return data.secure_url;
  }

  async function handleUpload() {
    setUploading(true);
    try {
      const uploadedUrls = await Promise.all(
        previews.map(async (preview) => {
          const response = await fetch(preview);
          const blob = await response.blob();
          const file = new File([blob], "image.jpg", { type: "image/jpeg" });
          return uploadToCloudinary(file);
        })
      );
      onImagesChange([...images, ...uploadedUrls]);
      setPreviews([]);
      toast({
        title: "Success",
        description: "Images uploaded successfully.",
      });
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Error",
        description: "Failed to upload images.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  }

  function removePreview(index: number) {
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  }

  function removeImage(index: number) {
    onImagesChange(images.filter((_, i) => i !== index));
  }

  function moveImage(index: number, direction: number) {
    const newImages = [...images];
    const temp = newImages[index];
    newImages[index] = newImages[index + direction];
    newImages[index + direction] = temp;
    onImagesChange(newImages);
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative group">
            <img
              src={image}
              alt={`Product ${index + 1}`}
              className="w-full h-40 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
              {index > 0 && (
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => moveImage(index, -1)}
                >
                  <ArrowUp size={16} />
                </Button>
              )}
              {index < images.length - 1 && (
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => moveImage(index, 1)}
                >
                  <ArrowDown size={16} />
                </Button>
              )}
              <Button
                size="sm"
                variant="destructive"
                onClick={() => removeImage(index)}
              >
                <X size={16} />
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
      {previews.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Previews:</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {previews.map((preview, index) => (
              <div key={index} className="relative group">
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-40 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => removePreview(index)}
                  >
                    <X size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <Button onClick={handleUpload} disabled={uploading} className="mt-4">
            {uploading ? "Uploading..." : "Upload to Cloudinary"}
            <Upload className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
