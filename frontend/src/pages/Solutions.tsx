import { Building2, Users, GraduationCap, Briefcase, Factory } from "lucide-react";
import Layout from "@/components/Layout";
import SectionReveal from "@/components/SectionReveal";

const services = [
  {
    icon: Building2,
    title: "GESTIÓN FINANCIERA Y ADMINISTRATIVA",
    desc: "Optimización y control de la operación empresarial.",
    benefitsTitle: "Resolviendo:",
    benefits: [
      "Administración y Finanzas",
      "Desorden administrativo",
      "Falta de control financiero",
      "Ineficiencia operativa",
    ],
  },
  {
    icon: Users,
    title: "GESTIÓN DEL TALENTO HUMANO Y BIENESTAR LABORAL",
    desc: "Desarrollo, gestión y protección del talento humano.",
    benefitsTitle: "Resolviendo:",
    benefits: [
      "Recursos Humanos y Seguridad y Salud Ocupacional",
      "Problemas laborales",
      "Rotación de personal",
      "Riesgos laborales",
    ],
  },
  {
    icon: Factory,
    title: "GESTIÓN OPERATIVA Y EJECUCIÓN DE PROYECTOS",
    desc: "Ejecución eficiente de operaciones y proyectos.",
    benefitsTitle: "Resolviendo:",
    benefits: [
      "Logística y Construcción",
      "Fallas en logística",
      "Retrasos en proyectos",
      "Mala coordinación operativa",
    ],
  },
  {
    icon: GraduationCap,
    title: "CAPACITACIONES Y CONFERENCIAS",
    desc: "Programas formativos, charlas y encuentros especializados para fortalecer competencias, actualizar equipos y compartir conocimiento estratégico.",
    benefitsTitle: "Incluye:",
    benefits: [
      "Talleres y seminarios técnicos",
      "Formación en liderazgo",
      "Capacitación en normativas SST",
      "Ponencias temáticas",
      "Eventos corporativos",
      "Actualización estratégica para equipos",
    ],
  },
  {
    icon: Briefcase,
    title: "ASESORÍAS Y CONSULTORÍAS",
    desc: "Consultoría estratégica en finanzas, legal, operaciones y seguridad industrial.",
    benefitsTitle: "Incluye:",
    benefits: [
      "Diagnóstico empresarial",
      "Planificación estratégica",
      "Cumplimiento regulatorio",
    ],
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
        {services.map((s) => (
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
                <li className="text-sm font-semibold text-foreground">{s.benefitsTitle}</li>
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
