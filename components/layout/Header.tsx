"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const navLinks = [
  { href: "/#services", label: "Services" },
  { href: "/#process", label: "Process" },
  { href: "/tour", label: "Private Tour" },
  { href: "/about", label: "About us" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-navy-900/10 bg-white/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between sm:h-20">
        <Link
          href="/"
          className="transition-opacity hover:opacity-80"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/logo-wordmark.png"
            alt="SOJOURN KOREA"
            width={115}
            height={71}
            priority
            className="h-8 w-auto sm:h-9"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {navLinks.map((link) =>
            !link.href.includes("#") ? (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-navy-900/80 transition-colors hover:text-navy-900"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-navy-900/80 transition-colors hover:text-navy-900"
              >
                {link.label}
              </a>
            )
          )}
          <Button href="/#contact">Request a consultation</Button>
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-navy-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel-500 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((prev) => !prev)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.75}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
            aria-hidden="true"
          >
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
            )}
          </svg>
        </button>
      </Container>

      {/* Mobile menu panel */}
      <div
        id="mobile-menu"
        className={`md:hidden ${open ? "block" : "hidden"} border-t border-navy-900/10 bg-white`}
      >
        <Container className="flex flex-col gap-1 py-4">
          {navLinks.map((link) =>
            !link.href.includes("#") ? (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-3 text-base font-medium text-navy-900/80 transition-colors hover:bg-navy-900/5 hover:text-navy-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel-500"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-3 text-base font-medium text-navy-900/80 transition-colors hover:bg-navy-900/5 hover:text-navy-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel-500"
              >
                {link.label}
              </a>
            )
          )}
          <Button
            href="/#contact"
            onClick={() => setOpen(false)}
            className="mt-2 w-full"
          >
            Request a consultation
          </Button>
        </Container>
      </div>
    </header>
  );
}
