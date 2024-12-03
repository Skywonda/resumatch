import { Link } from "react-router-dom";

export default function Footer() {
  const links = {
    product: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Templates", href: "/templates" },
    ],
    resources: [
      { label: "Blog", href: "/blog" },
      { label: "Help Center", href: "/help" },
      { label: "Contact", href: "/contact" },
    ],
    legal: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  };

  return (
    <footer className="bg-gray-50">
      <div className="container px-4 md:px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="inline-flex items-center space-x-2">
              <span className="text-xl font-bold">ResuMatch</span>
            </Link>
            <p className="mt-4 text-sm text-gray-500">
              AI-powered tools to help you land your dream job.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-3">
              {links.product.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-gray-500 hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              {links.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-gray-500 hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              {links.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-gray-500 hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-500">
            © {new Date().getFullYear()} ResuMatch. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
