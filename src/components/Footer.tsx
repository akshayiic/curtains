import { brand, locations, nav } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="bg-ink text-ivory/80">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-4 md:px-8">
        <div className="md:col-span-2">
          <p className="font-serif text-3xl text-ivory">{brand.name}</p>
          <p className="mt-3 max-w-sm text-sm">
            Custom shutters, blinds and curtains — measured, made and installed across Melbourne.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {locations.map((l) => (
              <span key={l} className="rounded-full border border-ivory/15 px-3 py-1 text-xs">
                {l}
              </span>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs tracking-[0.3em] text-brass-light uppercase">Explore</p>
          <ul className="mt-4 space-y-2 text-sm">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="hover:text-ivory">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs tracking-[0.3em] text-brass-light uppercase">Contact</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>{brand.address}</li>
            <li>
              <a href={`tel:${brand.phone.replace(/\s/g, "")}`} className="hover:text-ivory">{brand.phone}</a>
            </li>
            <li>
              <a href={`tel:${brand.phoneAlt.replace(/[^\d]/g, "")}`} className="hover:text-ivory">{brand.phoneAlt}</a>
            </li>
            <li>
              <a href={`mailto:${brand.email}`} className="break-all hover:text-ivory">{brand.email}</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ivory/10 px-5 py-6 text-center text-xs text-ivory/50">
        © All Rights Reserved by {brand.name} · Interactive demo concept
      </div>
    </footer>
  );
}
