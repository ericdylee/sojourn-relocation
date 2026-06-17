import { Container } from "@/components/ui/Container";
import { site } from "@/lib/content/site";

const whatsappDigits = site.whatsapp.replace(/[^0-9]/g, "");

const exploreLinks = [
  { href: "/#services", label: "Services" },
  { href: "/#process", label: "Process" },
  { href: "/tour", label: "Private Tours" },
  { href: "/about", label: "About us" },
  { href: "/#contact", label: "Request a consultation" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 text-white">
      <Container className="py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand block */}
          <div className="lg:pr-8">
            <p className="text-lg font-bold tracking-wide text-white">
              {site.name}
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
              {site.tagline}
            </p>
            <p className="mt-2 text-sm font-medium text-steel-300">
              {site.subTagline}
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="rounded transition-colors hover:text-steel-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel-500"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${whatsappDigits}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded transition-colors hover:text-steel-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel-500"
                >
                  WhatsApp: {site.whatsapp}
                </a>
              </li>
              <li>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded transition-colors hover:text-steel-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel-500"
                >
                  LinkedIn
                </a>
              </li>
              <li className="text-white/60">{site.address}</li>
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50">
              Explore
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="rounded transition-colors hover:text-steel-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel-500"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50">
              Company
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              <li>Since {site.since}</li>
              <li className="text-white/60">{site.kita}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-sm text-white/50">
          © {currentYear} {site.name}. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
