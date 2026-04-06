import { motion } from "framer-motion";
import SectionReveal from "@/components/SectionReveal";

interface SuccessCaseItem {
  src: string;
  alt: string;
}

interface SuccessCasesSectionProps {
  title: string;
  subtitle: string;
  items: SuccessCaseItem[];
  autoPlayMs?: number;
  className?: string;
  sectionId?: string;
}

const SuccessCasesSection = ({
  title,
  subtitle,
  items,
  autoPlayMs = 18000,
  className = "",
  sectionId,
}: SuccessCasesSectionProps) => {
  if (!items.length) return null;
  const marqueeItems = [...items, ...items];

  return (
    <section
      id={sectionId}
      className={`relative overflow-hidden bg-[linear-gradient(135deg,#081225_0%,#102344_52%,#14305c_100%)] py-[10vh] lg:py-[12vh] ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(96,165,250,0.18),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.14),transparent_30%)]" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionReveal>
          <p className="mb-3 text-4xl font-semibold uppercase tracking-wider text-sky-200">
            {title}
          </p>
          <h2 className="mb-12 text-3xl font-bold text-white lg:text-4xl">
            {subtitle}
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/6 py-6 shadow-[0_24px_60px_rgba(8,18,37,0.35)] backdrop-blur-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#081225] via-[#081225]/70 to-transparent md:w-24" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#14305c] via-[#14305c]/70 to-transparent md:w-24" />

            <motion.div
              className="flex w-max gap-4 px-2 md:gap-6"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: autoPlayMs / 1000, ease: "linear", repeat: Infinity }}
            >
              {marqueeItems.map((item, index) => (
                <div
                  key={`${item.src}-${index}`}
                  className="flex h-28 w-40 shrink-0 items-center justify-center rounded-[1.4rem] border border-border/50 bg-white px-5 shadow-[0_16px_40px_rgba(15,23,42,0.08)] sm:h-32 sm:w-48 md:h-36 md:w-56"
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="max-h-14 w-full object-contain sm:max-h-16 md:max-h-20"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
};

export default SuccessCasesSection;
