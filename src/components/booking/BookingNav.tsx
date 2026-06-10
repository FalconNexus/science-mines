"use client";

const SECTIONS = [
  { id: "demo", label: "Free Demo" },
  { id: "slots", label: "Workshop" },
  { id: "courses", label: "Courses" },
  { id: "print", label: "3D Printing" },
  { id: "lab", label: "Lab Access" },
  { id: "products", label: "Products" },
];

export function BookingNav() {
  return (
    <nav className="sticky top-20 z-30 glass border-y border-border">
      <div className="container-wide px-6 py-3 flex gap-2 overflow-x-auto scrollbar-hide">
        {SECTIONS.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="shrink-0 px-4 py-2 rounded-full text-sm border border-border text-muted hover:text-foreground hover:border-primary/30 transition-colors"
          >
            {s.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
