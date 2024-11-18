"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Pagination } from "../components/pagination";
import { Search, Plus, MoreHorizontal, Edit, Trash } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;
  const router = useRouter();
  const { session } = useSession();

  function createClerkSupabaseClient() {
    return createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_KEY!,
      {
        // global: {
        //   fetch: async (url, options = {}) => {
        //     const clerkToken = await session?.getToken({
        //       template: "supabase",
        //     });
        //     const headers = new Headers((options as RequestInit).headers);
        //     headers.set("Authorization", `Bearer ${clerkToken}`);
        //     return fetch(url, {
        //       ...options,
        //       headers,
        //     });
        //   },
        // },
      }
    );
  }

  const client = createClerkSupabaseClient();

  useEffect(() => {
    fetchProducts();
  }, [currentPage, searchTerm]);

  async function fetchProducts() {
    const { data, error, count } = await client
      .from("products")
      .select(
        "id,name,category,price,discounted_price,rating,review_count,description,images,specifications,in_stock",
        { count: "exact" }
      )

      .ilike("name", `%${searchTerm}%`)
      .range((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage - 1)
      .order("id", { ascending: false });

    if (error) console.error("Error fetching products:", error);
    else {
      setProducts(data);
      console.log(count);
      console.log(data);

      setTotalPages(Math.ceil(count / itemsPerPage));
    }
  }

  function handleSearchChange(e) {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  }

  function handlePageChange(page) {
    setCurrentPage(page);
  }

  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 pb-4">
          <div>
            <CardTitle className="text-2xl font-bold">Products</CardTitle>
            <p className="text-sm text-muted-foreground">
              Manage your product catalog
            </p>
          </div>
          <Button onClick={() => router.push("/admin/products/new")}>
            <Plus className="mr-2 h-4 w-4" /> Add New Product
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Search className="text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="max-w-sm"
            />
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">
                      {product.name}
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>Rs.{product.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge
                        variant={product.in_stock ? "outline" : "destructive"}
                      >
                        {product.in_stock ? "In Stock" : "Out of Stock"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() =>
                              router.push(`/admin/products/${product.id}`)
                            }
                          >
                            <Edit className="mr-2 h-4 w-4" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash className="mr-2 h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-end space-x-2 py-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
