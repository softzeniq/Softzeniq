import { Check } from "lucide-react";

export default function NarrationStory() {
  return (
    <div>
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-sm font-mono text-brand-indigo uppercase tracking-wider font-bold">
              Why We Stand Out
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-foreground mt-2 mb-6">
              Tearing Down Over-Engineered Bureaucracy
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-muted-foreground leading-relaxed font-sans">
              <p>
                Most digital agencies sell clean visual concepts built on slow,
                legacy template builders. These tools are filled with heavy
                scripts that delay mobile viewports. If page load delays exceed
                3 seconds, half of potential buying clicks are lost instantly.
              </p>
              <p>
                At Softzeniq IT, we approach designs as mathematical pipelines.
                We program storefronts on server-centric frameworks like
                Next.js, mapping collections layouts and image compression
                blocks statically to generate instantaneous responses.
              </p>
              <p>
                Whether refreshing branding guidelines or scaling Google
                Performance-Max ads, we verify impact of each change against
                actual conversions using custom server-side attribution graphs.
                We are partners, not vendors.
              </p>
            </div>
          </div>

          <div className="relative bg-secondary border border-border p-8 rounded-3xl overflow-hidden shadow-xl text-left">
            <div className="absolute top-0 right-0 bg-brand-indigo/10 text-brand-indigo text-[10px] font-mono tracking-widest py-1 px-4 rounded-bl-xl font-bold uppercase">
              Our Core Thesis
            </div>

            <h4 className="text-lg font-bold text-foreground font-display mb-4">
              Direct-to-Consumer Core Charter
            </h4>
            <ul className="space-y-3.5">
              {[
                "Every loading millisecond saved equals margin growth.",
                "The checkout process must require no more than three steps.",
                "Data attribution must align with actual Stripe invoice realities.",
                "Search Engine Optimizations should target intent, not just arbitrary volume.",
                "Ad spending must match product margins dynamically.",
              ].map((text, idx) => (
                <li
                  key={idx}
                  className="flex items-start text-sm text-muted-foreground leading-relaxed font-sans"
                >
                  <span className="p-1 bg-primary/10 text-primary rounded-lg mr-2 shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
