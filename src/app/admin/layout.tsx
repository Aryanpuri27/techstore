// import { ClerkProvider } from "@clerk/nextjs";
import { ClerkProvider } from "@clerk/nextjs";
import { Sidebar } from "./components/sidebar";
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <ClerkProvider>
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
    // </ClerkProvider>
  );
}
