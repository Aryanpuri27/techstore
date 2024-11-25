"use server";

import { createClerkSupabaseClientSsr } from "@/app/ssr/client";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function addCategory(name: string) {
  const supabase = await createClerkSupabaseClientSsr();
  const { error } = await supabase.from("category").insert({ name });
  if (error) throw error;
  revalidatePath("/admin/category");
}

export async function updateCategory(id: number, name: string) {
  const supabase = await createClerkSupabaseClientSsr();
  const { error } = await supabase
    .from("category")
    .update({ name })
    .eq("id", id);
  if (error) throw error;
  revalidatePath("/admin/category");
}

export async function deleteCategory(id: number) {
  const supabase = await createClerkSupabaseClientSsr();
  const { error } = await supabase.from("category").delete().eq("id", id);
  if (error) throw error;
  revalidatePath("/admin/category");
}
