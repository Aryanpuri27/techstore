// import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { CategoryList } from "./client";
import { createClerkSupabaseClientSsr } from "@/app/ssr/client";

export default async function CategoriesPage() {
  const supabase = await createClerkSupabaseClientSsr();
  const { data: categories } = await supabase.from("category").select("*");

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Categories</h1>
      <CategoryList initialCategories={categories || []} />
    </div>
  );
}
