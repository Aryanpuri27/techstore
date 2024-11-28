"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { useSession } from "@clerk/nextjs";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { ImageUploader } from "./image-uploader";
import { X, Plus } from "lucide-react";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { Textarea } from "@/components/ui/textarea";

export default function ProductForm({ params }) {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: 0,
    discounted_price: 0,
    description: "",
    images: [],
    specifications: [],
    material: "",
    print_time: "",
    rating: 1,
    review_count: 0,
  });
  const [categories, setCategories] = useState([]);
  const [newSpec, setNewSpec] = useState({ name: "", value: "" });
  const router = useRouter();
  const { session } = useSession();
  const { id } = params;

  function createClerkSupabaseClient() {
    return createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_KEY!,
      {
        global: {
          fetch: async (url, options = {}) => {
            const clerkToken = await session?.getToken({
              template: "supabase",
            });
            const headers = new Headers((options as RequestInit).headers);
            headers.set("Authorization", `Bearer ${clerkToken}`);
            return fetch(url, {
              ...options,
              headers,
            });
          },
        },
      }
    );
  }

  const client = createClerkSupabaseClient();

  useEffect(() => {
    if (id !== "new") {
      fetchProduct(id);
    }
    fetchCategories();
  }, [id]);

  async function fetchProduct(id) {
    const { data, error } = await client
      .from("products")
      .select("*")
      .eq("id", id)
      .single();
    if (error) {
      console.error("Error fetching product:", error);
      toast({
        title: "Error",
        description: "Failed to fetch product details.",
        variant: "destructive",
      });
    } else {
      setProduct(data);
    }
  }

  async function fetchCategories() {
    const { data, error } = await client.from("category").select("*");
    if (error) {
      console.error("Error fetching categories:", error);
      toast({
        title: "Error",
        description: "Failed to fetch categories.",
        variant: "destructive",
      });
    } else {
      setCategories(data);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let error;
    if (id === "new") {
      const { error: insertError } = await client
        .from("products")
        .insert([product]);
      error = insertError;
    } else {
      const { error: updateError } = await client
        .from("products")
        .update(product)
        .eq("id", id);
      error = updateError;
    }
    if (error) {
      console.error("Error saving product:", error);
      toast({
        title: "Error",
        description: "Failed to save product.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Product saved successfully.",
      });
      router.push("/admin/products");
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  }

  function handleSpecChange(index, field, value) {
    const updatedSpecs = [...product.specifications];
    updatedSpecs[index][field] = value;
    setProduct((prev) => ({ ...prev, specifications: updatedSpecs }));
  }

  function addSpecification() {
    if (newSpec.name && newSpec.value) {
      setProduct((prev) => ({
        ...prev,
        specifications: [...prev.specifications, newSpec],
      }));
      setNewSpec({ name: "", value: "" });
    }
  }

  function removeSpecification(index) {
    const updatedSpecs = product.specifications.filter((_, i) => i !== index);
    setProduct((prev) => ({ ...prev, specifications: updatedSpecs }));
  }
  /////////////////////////////////////////////
  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto p-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">
            {id === "new" ? "Add New Product" : "Edit Product"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="basic" className="space-y-6 ">
            <TabsList className="grid w-full grid-cols-4 gap-4 p-2 h-auto">
              <TabsTrigger value="basic" className="text-lg">
                Basic Info
              </TabsTrigger>
              <TabsTrigger value="description" className="text-lg">
                Description
              </TabsTrigger>
              <TabsTrigger value="images" className="text-lg">
                Images
              </TabsTrigger>
              <TabsTrigger value="specifications" className="text-lg">
                Specifications
              </TabsTrigger>
            </TabsList>
            <TabsContent value="basic" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-lg">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    required
                    className="text-lg p-3"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-lg">
                    Category
                  </Label>
                  <Select
                    name="category"
                    value={product.category}
                    onValueChange={(value) =>
                      handleChange({ target: { name: "category", value } })
                    }
                  >
                    <SelectTrigger className="text-lg p-3">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={category.name}
                          className="text-lg"
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price" className="text-lg">
                    Price
                  </Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    value={product.price}
                    onChange={handleChange}
                    required
                    className="text-lg p-3"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discounted_price" className="text-lg">
                    Discounted Price
                  </Label>
                  <Input
                    id="discounted_price"
                    name="discounted_price"
                    type="number"
                    value={product.discounted_price}
                    onChange={handleChange}
                    className="text-lg p-3"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="material" className="text-lg">
                    Material
                  </Label>
                  <Input
                    id="material"
                    name="material"
                    type="text"
                    value={product.material}
                    onChange={handleChange}
                    required
                    className="text-lg p-3"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="print_time" className="text-lg">
                    Print Time
                  </Label>
                  <Input
                    id="print_time"
                    name="print_time"
                    type="number"
                    value={product.print_time}
                    onChange={handleChange}
                    className="text-lg p-3"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="material" className="text-lg">
                    {" "}
                    Rating
                  </Label>
                  <Input
                    id="rating"
                    name="rating"
                    type="number"
                    value={product.rating}
                    onChange={handleChange}
                    required
                    className="text-lg p-3"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="print_time" className="text-lg">
                    Review Count
                  </Label>
                  <Input
                    id="review_count"
                    name="review_count"
                    type="number"
                    value={product.review_count}
                    onChange={handleChange}
                    className="text-lg p-3"
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="description">
              <div className="space-y-2">
                <Label htmlFor="description" className="text-lg">
                  Description
                </Label>
                <Textarea
                  value={product.description}
                  onChange={(e) =>
                    setProduct((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                />
              </div>
            </TabsContent>
            <TabsContent value="images">
              <ImageUploader
                images={product.images}
                onImagesChange={(newImages) =>
                  setProduct((prev) => ({ ...prev, images: newImages }))
                }
              />
            </TabsContent>
            <TabsContent value="specifications">
              <div className="space-y-6">
                {product.specifications.map((spec, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <Input
                      value={spec.name}
                      onChange={(e) =>
                        handleSpecChange(index, "name", e.target.value)
                      }
                      placeholder="Specification name"
                      className="flex-1 text-lg p-3"
                    />
                    <Input
                      value={spec.value}
                      onChange={(e) =>
                        handleSpecChange(index, "value", e.target.value)
                      }
                      placeholder="Specification value"
                      className="flex-1 text-lg p-3"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => removeSpecification(index)}
                      className="shrink-0"
                    >
                      <X size={20} />
                    </Button>
                  </div>
                ))}
                <div className="flex items-center space-x-4">
                  <Input
                    value={newSpec.name}
                    onChange={(e) =>
                      setNewSpec((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="New specification name"
                    className="flex-1 text-lg p-3"
                  />
                  <Input
                    value={newSpec.value}
                    onChange={(e) =>
                      setNewSpec((prev) => ({ ...prev, value: e.target.value }))
                    }
                    placeholder="New specification value"
                    className="flex-1 text-lg p-3"
                  />
                  <Button
                    type="button"
                    onClick={addSpecification}
                    className="shrink-0"
                  >
                    <Plus size={20} />
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      <Button type="submit" className="w-full text-lg py-6">
        Save Product
      </Button>
    </form>
  );
}
