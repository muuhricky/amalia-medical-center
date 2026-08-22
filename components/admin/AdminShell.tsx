"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Images,
  FileText,
  ExternalLink,
  LogOut,
  Menu,
  X,
  PanelsTopLeft,
} from "lucide-react";
import { useState } from "react";
import BrandLogo from "@/components/BrandLogo";

const nav = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/builder", label: "Page Builder", icon: PanelsTopLeft },
  { href: "/admin/media", label: "Media Library", icon: Images },
  { href: "/admin/konten", label: "Konten Website", icon: FileText },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="admin-root min-h-screen bg-[#F3F2EE] text-charcoal">
      <div className="flex min-h-screen">
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-charcoal/8 bg-[#1A1A1A] text-cream transition-transform md:static md:translate-x-0 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-full flex-col px-5 py-6">
            <div className="mb-10 px-2">
              <BrandLogo variant="mark" className="h-8 brightness-110" />
              <p className="mt-2 text-[10px] uppercase tracking-[0.3em] text-cream/40">
                Content Admin
              </p>
            </div>

            <nav className="flex flex-1 flex-col gap-1">
              {nav.map((item) => {
                const active =
                  item.href === "/admin"
                    ? pathname === "/admin"
                    : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                      active
                        ? "bg-cream/10 text-cream"
                        : "text-cream/55 hover:bg-cream/5 hover:text-cream"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto space-y-1 border-t border-cream/10 pt-4">
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-cream/55 transition-colors hover:bg-cream/5 hover:text-cream"
              >
                <ExternalLink className="h-4 w-4" />
                Lihat Website
              </a>
              <button
                type="button"
                onClick={logout}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-cream/55 transition-colors hover:bg-cream/5 hover:text-cream"
              >
                <LogOut className="h-4 w-4" />
                Keluar
              </button>
            </div>
          </div>
        </aside>

        {open && (
          <button
            type="button"
            aria-label="Tutup menu"
            className="fixed inset-0 z-30 bg-charcoal/40 md:hidden"
            onClick={() => setOpen(false)}
          />
        )}

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 flex items-center justify-between border-b border-charcoal/8 bg-[#F3F2EE]/90 px-4 py-4 backdrop-blur md:px-8">
            <button
              type="button"
              className="rounded-xl border border-charcoal/10 p-2 md:hidden"
              onClick={() => setOpen(true)}
              aria-label="Buka menu"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
            <p className="text-sm text-charcoal/50">
              Kelola gambar, video, dan teks website
            </p>
            <span className="rounded-full bg-sage/15 px-3 py-1 text-xs font-medium text-sage">
              Admin
            </span>
          </header>
          <main className="flex-1 px-4 py-6 md:px-8 md:py-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
