// // import { AppSidebar } from "@/components/app-sidebar";
// import Item from "@/components/item";
// import { Button } from "@/components/ui/button";
// // import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
// import { FilterIcon } from "lucide-react";
// // import Image from "next/image";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// import React from "react";

// function page() {
//   return (
//     <div className=" w-full min-h-screen flex gap-2 justify-start p-10 md:px-20">
//       <div className="hidden  shadow-2xl shadow-slate-700 border-black h-fit  px-6 min-w-[250px]  md:flex flex-col gap-4 p-8 rounded-2xl ">
//         <span className="flex gap-2 text-xl">
//           <FilterIcon />
//           Filter
//         </span>
//         <Option />
//         <Option />
//         <Option />
//         <Option />
//         <Option />
//         <Option />

//         <Button className="mt-6">Apply</Button>
//       </div>
//       {/* <SidebarProvider> */}
//       {/* <AppSidebar /> */}
//       <div className="   ">
//         <div className="  text-4xl p-3 px-5 font-bold justify-between flex ">
//           <h1>Page</h1>
//           <div className="md:hidden">
//             <Select>
//               <SelectTrigger className="w-[180px]">
//                 <SelectValue placeholder="Theme" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="light">Light</SelectItem>
//                 <SelectItem value="dark">Dark</SelectItem>
//                 <SelectItem value="system">System</SelectItem>
//               </SelectContent>
//             </Select>{" "}
//           </div>
//         </div>
//         <div className="flex gap-7 p-4 flex-wrap justify-start ">
//           <Item />
//           <Item />
//           <Item />
//           <Item />
//           <Item />
//         </div>
//       </div>
//       {/* </SidebarProvider> */}
//     </div>
//   );
// }

// export default page;

// function Option() {
//   return (
//     <>
//       <div className="flex justify-between">
//         <div className="flex gap-2 align-middle text-lg">
//           <input type="checkbox" className="w-[18px]" /> option
//         </div>
//         <span className="text-md text-slate-700">(34)</span>
//       </div>
//     </>
//   );
// }

// import { FilterSidebarComponent } from "@/components/components-filter-sidebar";
// import { ProductGridComponent } from "@/components/components-product-grid";
// import { Suspense } from "react";

// export default function Page() {
//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-8">Product Showcase</h1>
//       <div className="flex flex-col md:flex-row gap-8">
//         <aside className="w-full md:w-1/4">
//           <FilterSidebarComponent />
//         </aside>
//         <main className="w-full md:w-3/4">
//           <Suspense fallback={<div>Loading products...</div>}>
//             <ProductGridComponent />
//           </Suspense>
//         </main>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Plus, Minus, Filter, X } from "lucide-react";
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

// Mock data for products
const products = [
  {
    id: 1,
    name: "Custom Figurine",
    category: "Figurines",
    price: 29.99,
    material: "PLA",
    printTime: 3,
    image: "/printedpart.jpg",
  },
  {
    id: 2,
    name: "Architectural Model",
    category: "Models",
    price: 99.99,
    material: "Resin",
    printTime: 8,
    image: "/printedpart.jpg",
  },
  {
    id: 3,
    name: "Gear Set",
    category: "Mechanical",
    price: 39.99,
    material: "ABS",
    printTime: 5,
    image: "/printedpart.jpg",
  },
  {
    id: 4,
    name: "Phone Case",
    category: "Accessories",
    price: 19.99,
    material: "TPU",
    printTime: 2,
    image: "/printedpart.jpg",
  },
  {
    id: 5,
    name: "Vase",
    category: "Home Decor",
    price: 49.99,
    material: "PETG",
    printTime: 6,
    image: "/printedpart.jpg",
  },
  {
    id: 6,
    name: "Drone Parts",
    category: "Electronics",
    price: 79.99,
    material: "Nylon",
    printTime: 4,
    image: "/printedpart.jpg",
  },
];

export default function ProjectPage() {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showFastPrintOnly, setShowFastPrintOnly] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);
  const toast = useToast();

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  useEffect(() => {
    handleFilter();
  }, [
    categoryFilter,
    priceRange,
    searchTerm,
    sortBy,
    sortOrder,
    showFastPrintOnly,
  ]);

  const handleFilter = () => {
    let filtered = products.filter(
      (product) =>
        (categoryFilter === "All" || product.category === categoryFilter) &&
        product.price >= priceRange[0] &&
        product.price <= priceRange[1] &&
        (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (!showFastPrintOnly || product.printTime <= 3)
    );

    filtered.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return sortOrder === "asc" ? -1 : 1;
      if (a[sortBy] > b[sortBy]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredProducts(filtered);

    // Update active filters
    const newActiveFilters = [];
    if (categoryFilter !== "All")
      newActiveFilters.push(`Category: ${categoryFilter}`);
    if (priceRange[0] > 0 || priceRange[1] < 100)
      newActiveFilters.push(`Price: $${priceRange[0]} - $${priceRange[1]}`);
    if (searchTerm) newActiveFilters.push(`Search: ${searchTerm}`);
    if (showFastPrintOnly) newActiveFilters.push("Fast Print Only");
    setActiveFilters(newActiveFilters);
  };

  const clearFilters = () => {
    setCategoryFilter("All");
    setPriceRange([0, 100]);
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
        {/* Filters for desktop */}
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
          />
        </Card>

        {/* Filters for mobile */}
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
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Product Grid */}
        <div className="lg:w-3/4">
          {/* Active filters */}
          <div className="mb-4 flex flex-wrap gap-2">
            {activeFilters.map((filter, index) => (
              <Badge key={index} variant="secondary" className="text-sm">
                {filter}
                <button
                  onClick={() => {
                    // Remove this filter
                    // if (filter.startsWith("Category:"))
                    //   setCategoryFilter("All");
                    // if (filter.startsWith("Price:")) setPriceRange([0, 100]);
                    // if (filter.startsWith("Search:")) setSearchTerm("");
                    // if (filter === "Fast Print Only")
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
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                visible: { transition: { staggerChildren: 0.05 } },
              }}
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>
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
}: {
  categoryFilter: string;
  setCategoryFilter: any;
  priceRange: any;
  setPriceRange: any;
  searchTerm: string;
  setSearchTerm: any;
  sortBy: string;
  setSortBy: any;
  sortOrder: string;
  setSortOrder: any;
  showFastPrintOnly: boolean;
  setShowFastPrintOnly: any;
  categories: any;
  clearFilters: any;
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
              <SelectItem key={category} value={category}>
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
          max={100}
          step={1}
          value={priceRange}
          onValueChange={setPriceRange}
          className="mt-2"
        />
        <div className="flex justify-between mt-2">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
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
            <SelectItem value="printTime">Print Time</SelectItem>
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

function ProductCard({ product }) {
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();
  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));
  function addToCart(product, quantity) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ ...product, quantity });
    localStorage.setItem("cart", JSON.stringify(cart));
    toast({
      title: "Added to Cart",
      description: `${quantity} ${product.name} added to cart`,
    });
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
            src={product.image}
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
            Print Time: {product.printTime} hours
          </p>
          <p className="text-lg font-bold text-foreground">
            ${product.price.toFixed(2)}
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
