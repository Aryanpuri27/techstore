import { BarChart, Package, Settings, ShoppingBag } from "lucide-react";
import Link from "next/link";

export function Sidebar() {
  return (
    <div className="w-64 bg-gray-100 h-full p-4">
      <nav className="space-y-2">
        <Link
          href="/admin"
          className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded"
        >
          <BarChart className="w-5 h-5" />
          <span>Analytics</span>
        </Link>
        <Link
          href="/admin/products"
          className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded"
        >
          <Package className="w-5 h-5" />
          <span>Products</span>
        </Link>
        <Link
          href="/admin/orders"
          className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded"
        >
          <ShoppingBag className="w-5 h-5" />
          <span>Orders</span>
        </Link>
        <Link
          href="/admin/category"
          className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded"
        >
          <Settings className="w-5 h-5" />
          <span>Category</span>
        </Link>
      </nav>
    </div>
  );
}
