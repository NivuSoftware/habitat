import { Building2, Users, GraduationCap, Briefcase, Presentation } from "lucide-react";
import Layout from "@/components/Layout";
import SectionReveal from "@/components/SectionReveal";

const services = [
  {
    icon: Building2,
    title: "Administración integral",
    desc: "Gestión completa de procesos administrativos y organizacionales.",
    benefits: ["Optimización de flujos de trabajo", "Estructuración de áreas funcionales", "Implementación de políticas internas"],
  },
  {
    icon: Users,
    title: "Gestión del talento humano",
    desc: "Selección, evaluación y desarrollo de capital humano.",
    benefits: ["Reclutamiento y selección", "Evaluación de desempeño", "Planes de carrera y retención"],
  },
  {
    icon: GraduationCap,
    title: "Capacitaciones",
    desc: "Programas formativos para fortalecer competencias organizacionales.",
    benefits: ["Talleres y seminarios técnicos", "Formación en liderazgo", "Capacitación en normativas SST"],
  },
  {
    icon: Presentation,
    title: "Conferencias",
    desc: "Charlas y encuentros especializados para transferir conocimiento y fortalecer visión empresarial.",
    benefits: ["Ponencias temáticas", "Eventos corporativos", "Actualización estratégica para equipos"],
  },
  {
    icon: Briefcase,
    title: "Asesorías y consultorías",
    desc: "Consultoría estratégica en finanzas, legal, operaciones y seguridad industrial.",
    benefits: ["Diagnóstico empresarial", "Planificación estratégica", "Cumplimiento regulatorio"],
  },
];

const SolutionsPage = () => (
  <Layout>
    <section className="pt-32 pb-[12vh]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionReveal>
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Soluciones</p>
          <h1 className="text-hero font-bold text-foreground leading-[1.1] mb-6 max-w-3xl">
            Servicios diseñados para escalar tu empresa.
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Cada solución responde a necesidades reales del entorno empresarial ecuatoriano, adaptándose al tamaño y sector de tu organización.
          </p>
        </SectionReveal>
      </div>
    </section>

    <section className="pb-[16vh]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-8">
        {services.map((s, i) => (
          <SectionReveal key={s.title} delay={0.05}>
            <div className="bg-card rounded-xl border border-border shadow-corporate p-8 lg:p-12 grid lg:grid-cols-[auto_1fr_1fr] gap-8 items-start">
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <s.icon className="w-8 h-8 text-primary" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">{s.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
              <ul className="space-y-2">
                {s.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </SectionReveal>
        ))}
      </div>
    </section>
  </Layout>
);

export default SolutionsPage;
