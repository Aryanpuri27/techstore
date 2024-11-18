"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ImageUpload({ onUpload }) {
  const [uploading, setUploading] = useState(false);

  async function handleUpload(event) {
    try {
      setUploading(true);
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "your_cloudinary_upload_preset");

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/your_cloud_name/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      onUpload(data.secure_url);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <Input type="file" onChange={handleUpload} disabled={uploading} />
      {uploading && <p>Uploading...</p>}
    </div>
  );
}
