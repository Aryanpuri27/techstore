// import { AlignJustify, HamIcon, ShoppingCart } from "lucide-react";
// import React from "react";
// import SigninBtn from "./login-btn";
// import { auth } from "@/auth";
// import { SignOut } from "./sign-out";
// import { ModeToggle } from "./theam-toggle";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "./ui/dropdown-menu";

// async function Header() {
//   const session = await auth();
//   return (
//     <div className="flex w-full mt-2 border-gray-200 px-4 lg:px-6 py-2.5 justify-between items-center text-center">
//       <div className="flex gap-8 items-center text-center">
//         <div>
//           <span className=" text-3xl font-bold text-primary">Estore</span>
//         </div>
//         <nav>
//           <ul className="hidden md:flex text-md justify-between gap-6">
//             <li className="text-secondary-foreground cursor-pointer hover:text-primary">
//               products
//             </li>
//             <li className="text-secondary-foreground cursor-pointer hover:text-primary">
//               youtube
//             </li>
//             <li className="text-secondary-foreground cursor-pointer hover:text-primary">
//               about
//             </li>
//           </ul>
//         </nav>
//       </div>
//       <div className="flex gap-6 items-center">
//         <ModeToggle />
//         <ShoppingCart />
//         {session?.user ? <SignOut /> : <SigninBtn />}
//         <span className="md:hidden">
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <button className="text-primary">
//                 <AlignJustify />
//               </button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end">
//               <a href="/product">
//                 <DropdownMenuItem className="p-2">Product</DropdownMenuItem>
//               </a>
//               <a href="/youtube">
//                 <DropdownMenuItem className="p-2">Youtube</DropdownMenuItem>
//               </a>
//               <a href="/about">
//                 <DropdownMenuItem className="p-2">About</DropdownMenuItem>
//               </a>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </span>
//       </div>
//     </div>
//   );
// }

// export default Header;

"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Menu, X, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ModeToggle } from "./theam-toggle";
import ShoppingCartCom from "./cart";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

// This would typically come from your authentication system
const user = {
  name: "John Doe",
  email: "john@example.com",
  isLoggedIn: true,
};

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            <span className="text-xl font-bold">AIVore</span>
          </Link>

          <nav className="hidden md:flex space-x-4">
            <Link href="/" className="text-sm font-medium hover:underline">
              Home
            </Link>
            <Link
              href="/products"
              className="text-sm font-medium hover:underline"
            >
              Products
            </Link>
            <Link
              href="/custom"
              className="text-sm font-medium hover:underline"
            >
              Custom
            </Link>
            <Link
              href="/youtube"
              className="text-sm font-medium hover:underline"
            >
              youtube
            </Link>
            <Link href="/about" className="text-sm font-medium hover:underline">
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium hover:underline"
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {/* {user.isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src="/placeholder-avatar.jpg"
                        alt={user.name}
                      />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            )} */}
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <Button variant="ghost" size="icon">
              <ShoppingCartCom />
              <span className="sr-only">Cart</span>
            </Button>
            <ModeToggle />
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4">
                  <Link
                    href="/"
                    className="text-sm font-medium hover:underline"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    href="/products"
                    className="text-sm font-medium hover:underline"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Products
                  </Link>
                  <Link
                    href="/about"
                    className="text-sm font-medium hover:underline"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    About
                  </Link>
                  <Link
                    href="/contact"
                    className="text-sm font-medium hover:underline"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Contact
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
