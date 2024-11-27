"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import Image from "next/image";
import { toast, useToast } from "@/hooks/use-toast";
import { MotionDiv } from "@/components/type/motion";
import { useSession } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showFastPrintOnly, setShowFastPrintOnly] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [categories, setCategories] = useState(["All"]);
  const { session } = useSession();

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
  function createClerkSupabaseClientNonAuth() {
    return createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_KEY!
    );
  }

  const client = createClerkSupabaseClient();
  const nonAuthClient = createClerkSupabaseClientNonAuth();

  useEffect(() => {
    async function fetchProductDetails() {
      try {
        const { data, error } = await nonAuthClient
          .from("products")
          .select("*");
        if (error) throw error;
        setProducts(data);
        setFilteredProducts(data);
        const uniqueCategories = [
          "All",
          ...new Set(data.map((product) => product.category)),
        ];
        setCategories(uniqueCategories);
        const maxPrice = Math.max(...data.map((product) => product.price));
        setPriceRange([0, maxPrice]);
      } catch (error) {
        console.error("Error fetching product details:", error);
        toast({
          title: "Error",
          description: "Failed to fetch product details.",
          variant: "destructive",
        });
      }
    }
    fetchProductDetails();
  }, []);

  useEffect(() => {
    handleFilter();
  }, [
    categoryFilter,
    priceRange,
    searchTerm,
    sortBy,
    sortOrder,
    showFastPrintOnly,
    products,
  ]);

  const handleFilter = () => {
    let filtered = products.filter(
      (product) =>
        (categoryFilter === "All" || product.category === categoryFilter) &&
        product.price >= priceRange[0] &&
        product.price <= priceRange[1] &&
        (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (!showFastPrintOnly || product.print_time <= 3)
    );

    filtered.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return sortOrder === "asc" ? -1 : 1;
      if (a[sortBy] > b[sortBy]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredProducts(filtered);

    const newActiveFilters = [];
    if (categoryFilter !== "All")
      newActiveFilters.push(`Category: ${categoryFilter}`);
    if (
      priceRange[0] > 0 ||
      priceRange[1] < Math.max(...products.map((p) => p.price))
    )
      newActiveFilters.push(`Price: Rs.${priceRange[0]} - Rs.${priceRange[1]}`);
    if (searchTerm) newActiveFilters.push(`Search: ${searchTerm}`);
    if (showFastPrintOnly) newActiveFilters.push("Fast Print Only");
    setActiveFilters(newActiveFilters);
  };

  const clearFilters = () => {
    setCategoryFilter("All");
    setPriceRange([0, Math.max(...products.map((p) => p.price))]);
    setSearchTerm("");
    setShowFastPrintOnly(false);
    setSortBy("name");
    setSortOrder("asc");
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="text-4xl font-bold mb-8 text-foreground">
        Our 3D Printing Projects
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <Card className="p-6 hidden lg:block w-1/4">
          <FiltersContent
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            showFastPrintOnly={showFastPrintOnly}
            setShowFastPrintOnly={setShowFastPrintOnly}
            categories={categories}
            clearFilters={clearFilters}
            maxPrice={Math.max(...products.map((p) => p.price))}
          />
        </Card>

        <div className="lg:hidden mb-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full">
                <Filter className="mr-2 h-4 w-4" /> Filters
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>
                  Adjust your product filters here.
                </SheetDescription>
              </SheetHeader>
              <div className="mt-4">
                <FiltersContent
                  categoryFilter={categoryFilter}
                  setCategoryFilter={setCategoryFilter}
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  sortOrder={sortOrder}
                  setSortOrder={setSortOrder}
                  showFastPrintOnly={showFastPrintOnly}
                  setShowFastPrintOnly={setShowFastPrintOnly}
                  categories={categories}
                  clearFilters={clearFilters}
                  maxPrice={Math.max(...products.map((p) => p.price))}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="lg:w-3/4">
          <div className="mb-4 flex flex-wrap gap-2">
            {activeFilters.map((filter, index) => (
              <Badge key={index} variant="secondary" className="text-sm">
                {filter}
                <button
                  onClick={() => {
                    if (filter.startsWith("Category:"))
                      setCategoryFilter("All");
                    if (filter.startsWith("Price:"))
                      setPriceRange([
                        0,
                        Math.max(...products.map((p) => p.price)),
                      ]);
                    if (filter.startsWith("Search:")) setSearchTerm("");
                    if (filter === "Fast Print Only")
                      setShowFastPrintOnly(false);
                  }}
                  className="ml-2 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            {activeFilters.length > 0 && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear All
              </Button>
            )}
          </div>

          <AnimatePresence>
            <MotionDiv
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                visible: { transition: { staggerChildren: 0.05 } },
              }}
            >
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  client={client}
                />
              ))}
            </MotionDiv>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function FiltersContent({
  categoryFilter,
  setCategoryFilter,
  priceRange,
  setPriceRange,
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  showFastPrintOnly,
  setShowFastPrintOnly,
  categories,
  clearFilters,
  maxPrice,
}) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="category">Category</Label>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger id="category">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category || "all"}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="price-range">Price Range</Label>
        <Slider
          id="price-range"
          min={0}
          max={maxPrice}
          step={1}
          value={priceRange}
          onValueChange={setPriceRange}
          className="mt-2"
        />
        <div className="flex justify-between mt-2">
          <span>Rs.{priceRange[0]}</span>
          <span>Rs.{priceRange[1]}</span>
        </div>
      </div>

      <div>
        <Label htmlFor="search">Search</Label>
        <Input
          id="search"
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="sort-by">Sort By</Label>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger id="sort-by">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="price">Price</SelectItem>
            <SelectItem value="print_time">Print Time</SelectItem>
            <SelectItem value="category">Category</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="sort-order">Sort Order</Label>
        <Select value={sortOrder} onValueChange={setSortOrder}>
          <SelectTrigger id="sort-order">
            <SelectValue placeholder="Sort order" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Ascending</SelectItem>
            <SelectItem value="desc">Descending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="fast-print"
          checked={showFastPrintOnly}
          onCheckedChange={setShowFastPrintOnly}
        />
        <Label htmlFor="fast-print">Fast Print Only (≤ 3 hours)</Label>
      </div>

      <Button onClick={clearFilters} variant="outline" className="w-full">
        Clear Filters
      </Button>
    </div>
  );
}

function ProductCard({ product, client }) {
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();
  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  async function addToCart(product, quantity) {
    try {
      const response = await client.from("cart").insert({
        product_id: product.id,
        quantity: quantity,
        unit_price: product.price,
      });

      if (response.error) throw response.error;

      toast({
        title: "Added to Cart",
        description: `${quantity} ${product.name} added to cart`,
      });
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast({
        title: "Error",
        description: "Failed to add product to cart",
        variant: "destructive",
      });
    }
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden">
        <Link href={`/products/${product.id}`}>
          <Image
            src={product.images[0] || "/placeholder.jpg"}
            alt={product.name}
            width={300}
            height={200}
            className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
          />
        </Link>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-2 text-foreground">
            {product.name}
          </h3>
          <p className="text-muted-foreground mb-2">
            Category: {product.category}
          </p>
          <p className="text-muted-foreground mb-2">
            Material: {product.material}
          </p>
          <p className="text-muted-foreground mb-2">
            Print Time: {product.print_time} hours
          </p>
          <p className="text-lg font-bold text-foreground">
            Rs.{product.price.toFixed(2)}
          </p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" onClick={decrementQuantity}>
              <Minus className="h-4 w-4" />
            </Button>
            <span className="text-foreground">{quantity}</span>
            <Button variant="outline" size="icon" onClick={incrementQuantity}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <Button onClick={() => addToCart(product, quantity)}>
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
