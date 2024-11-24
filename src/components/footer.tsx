import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4">About Us</h3>
            <p className="text-sm text-gray-600">
              Aivora is your one-stop shop for all things tech. We offer the
              latest gadgets and accessories at competitive prices.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-gray-600 hover:underline"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-sm text-gray-600 hover:underline"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-600 hover:underline"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-gray-600 hover:underline"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/faq"
                  className="text-sm text-gray-600 hover:underline"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-gray-600 hover:underline"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="text-sm text-gray-600 hover:underline"
                >
                  Returns
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-gray-600 hover:underline"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Connect With Us</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-gray-600 hover:underline">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:underline">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:underline">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:underline">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-gray-600">
          © 2024 TechStore. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
