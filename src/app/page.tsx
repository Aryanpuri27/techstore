"use server";
import HomePage from "@/components/home-page";
// import { createClerkSupabaseClientSsr } from "@/app/ssr/client";

export default async function Home() {
  return (
    <div>
      <HomePage />
    </div>
  );
}
