import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Building2, Users, GraduationCap, Briefcase, Presentation,
  Award, Target, ShieldCheck, Rocket, Store, Factory, Home as HomeIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import SectionReveal from "@/components/SectionReveal";
import SuccessCasesSection from "@/components/SuccessCasesSection";
import skyImage from "@/assets/sky.png";
import buildingImage from "@/assets/building.png";
import solutionsBgImage from "@/assets/bg.jpg";

const services = [
  {
    icon: Building2,
    title: "Gestión financiera y administrativa",
    includes: "Administración y Finanzas",
    summary: "Optimización y control de la operación empresarial.",
    resolves: [
      "Desorden administrativo",
      "Falta de control financiero",
      "Ineficiencia operativa",
    ],
  },
  {
    icon: Users,
    title: "Gestión del talento humano y bienestar laboral",
    includes: "Recursos Humanos y Seguridad y Salud Ocupacional",
    summary: "Desarrollo, gestión y protección del talento humano.",
    resolves: [
      "Problemas laborales",
      "Rotación de personal",
      "Riesgos laborales",
    ],
  },
  {
    icon: Factory,
    title: "Gestión operativa y ejecución de proyectos",
    includes: "Logística y Construcción",
    summary: "Ejecución eficiente de operaciones y proyectos.",
    resolves: [
      "Fallas en logística",
      "Retrasos en proyectos",
      "Mala coordinación operativa",
    ],
  },
  {
    icon: GraduationCap,
    title: "Capacitaciones y conferencias",
    summary: "Espacios formativos y de actualización para fortalecer competencias técnicas, operativas y estratégicas.",
  },
  {
    icon: Briefcase,
    title: "Asesorías y consultorías",
    summary: "Acompañamiento especializado para mejorar procesos, tomar decisiones y resolver retos clave del negocio.",
  },
];

const values = [
  { icon: Award, title: "Profesionales con experiencia y liderazgo", desc: "Gestionamos cada proceso conforme a la normativa vigente, para que puedas operar con total confianza y seguridad." },
  { icon: Target, title: "Gestión orientada a resultados", desc: "Gestionamos cada proceso conforme a la normativa vigente, para que puedas operar con total confianza y seguridad." },
  { icon: ShieldCheck, title: "Cumplimiento de normativas", desc: "Gestionamos cada proceso conforme a la normativa vigente, para que puedas operar con total confianza y seguridad." },
];

const clients = [
  { icon: HomeIcon, label: "Empresas familiares" },
  { icon: Rocket, label: "Micro y Pequeñas empresas" },
  { icon: Factory, label: "Empresas Pymes" },
  
];

const successCases = [
  { src: "/images/success_case/LOS-PORTEONES-NEGRO.png", alt: "Logo de Los Porteones Negro" },
  { src: "/images/success_case/agrocorrectores.png", alt: "Logo de Agrocorrectores" },
  { src: "/images/success_case/red-barn-logo.png", alt: "Logo de Red Barn" },
  { src: "/images/success_case/tropical.jpeg", alt: "Logo de Tropical" },
];

const HomePage = () => {
  const heroRef = useRef(null);

  const handleScrollToSuccessCases = () => {
    const successCasesSection = document.getElementById("casos-de-exito");

    if (!successCasesSection) return;

    const offsetTop = successCasesSection.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });
  };

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"],
  });
  const skyY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const skyScale = useTransform(scrollYProgress, [0, 1], [1, 1.035]);
  const buildingY = useTransform(scrollYProgress, [0, 1], [0, -72]);
  const buildingScale = useTransform(scrollYProgress, [0, 1], [1, 1.035]);
  const textY = useTransform(scrollYProgress, [0, 0.78], [0, 190]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.58, 0.78, 0.94], [1, 1, 0.4, 0.12]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.8], [0.72, 0.82]);
  const frontLayerOpacity = useTransform(scrollYProgress, [0, 0.24, 0.42, 0.6], [1, 1, 0.3, 0.02]);
  const frontLayerY = useTransform(scrollYProgress, [0, 0.55], [0, 80]);
  const frontOverlayOpacity = useTransform(scrollYProgress, [0.14, 0.32, 0.58], [0, 0.34, 0.86]);

  return (
    <Layout>
      {/* Hero */}
      <section ref={heroRef} className="relative h-[138vh] md:h-[180vh]">
        <div className="sticky top-0 h-screen overflow-hidden relative">
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ y: skyY, scale: skyScale }}
          >
            <img
              src={skyImage}
              alt="Cielo corporativo"
              className="h-full w-full object-cover"
            />
          </motion.div>

          <motion.div
            className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-[#081225] via-[#102344] to-[#12284d]"
            style={{ opacity: overlayOpacity }}
          />

          <div className="relative flex h-full items-start md:items-center pt-32 md:pt-0">
            <div className="max-w-7xl mx-auto w-full px-6 lg:px-8">
              <div className="max-w-full md:max-w-2xl">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="relative z-20 max-w-[22rem] p-1 md:max-w-none md:p-0"
                  style={{
                    y: textY,
                    opacity: textOpacity,
                  }}
                >
                  
                  <h1 className="text-[clamp(2rem,10vw,3.8rem)] md:text-[clamp(2.4rem,9vw,5.5rem)] font-bold text-white leading-[0.98] md:leading-[1.02]">
                    Proyectamos tu negocio al nivel empresarial.
                  </h1>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="relative z-40 mt-8 md:mt-8 max-w-[22rem] md:max-w-xl"
                  style={{
                    y: frontLayerY,
                    opacity: frontLayerOpacity,
                  }}
                >
                  <motion.div
                    className="absolute inset-0 -m-4 pointer-events-none bg-gradient-to-b from-transparent via-[#17365f]/12 to-[#0b1932]/70 blur-2xl"
                    style={{ opacity: frontOverlayOpacity }}
                  />
                  <p className="relative text-white md:text-lg text-white/88 leading-relaxed mb-6 md:mb-10">
                    Soluciones integrales para optimizar y hacer crecer tu empresa
                  </p>
                  <div className="relative flex flex-col sm:flex-row gap-3 md:gap-4">
                    <Button asChild size="lg" className="rounded-lg text-sm font-semibold px-8 w-full sm:w-auto">
                      <Link to="/contactenos">Solicita asesoría</Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      type="button"
                      onClick={handleScrollToSuccessCases}
                      className="rounded-lg text-sm font-semibold px-8 w-full sm:w-auto border-white/30 bg-white/8 text-white hover:bg-white/16 hover:text-white"
                    >
                      Ver casos de éxito
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          <motion.div
            className="absolute inset-x-0 bottom-0 z-30 pointer-events-none"
            style={{ y: buildingY, scale: buildingScale }}
          >
            <img
              src={buildingImage}
              alt="Edificio corporativo"
              className="w-[155%] max-w-none -ml-[28%] -mb-[-2vh] md:ml-auto md:mb-0 md:w-[82%] h-[39vh] md:min-h-[68vh] object-contain object-bottom"
            />
          </motion.div>

          <div className="absolute inset-x-0 bottom-0 z-50 h-28 bg-gradient-to-t from-background to-transparent" />
        </div>
      </section>

      {/* Values */}
      <section className="py-[12vh] lg:py-[16vh]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionReveal>
            <p className="text-4xl font-semibold text-primary uppercase tracking-wider mb-3">Por qué elegirnos</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-12">
              Te ayudamos en la operación de tu empresa
            </h2>
          </SectionReveal>
          <div className="grid items-stretch gap-8 md:grid-cols-3">
            {values.map((v, i) => (
              <SectionReveal key={v.title} delay={i * 0.1} className="h-full">
                <div className="flex h-full flex-col items-center rounded-xl border border-border bg-card p-8 text-center shadow-corporate transition-all duration-300 group hover:shadow-corporate-lg">
                  <v.icon className="mb-6 h-10 w-10 text-primary transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} />
                  <h3 className="mb-3 min-h-[3.5rem] text-lg font-bold text-foreground">{v.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <SuccessCasesSection
        sectionId="casos-de-exito"
        title="Casos de éxito"
        subtitle="Ellos ya confían en nuestros servicios"
        items={successCases}
      />

      {/* Services Preview */}
      <section
        className="relative overflow-hidden py-[12vh] lg:py-[16vh] bg-scroll bg-cover bg-center bg-no-repeat md:bg-fixed"
        style={{ backgroundImage: `url(${solutionsBgImage})` }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(248,250,252,0.72),rgba(248,250,252,0.58),rgba(248,250,252,0.72))]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <SectionReveal>
            <p className="text-4xl font-semibold text-primary uppercase tracking-wider mb-3">Nuestras soluciones</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-12">
              Gestionamos integralmente la operación de tu empresa.
            </h2>
          </SectionReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((s, i) => (
              <SectionReveal key={s.title} delay={i * 0.08} className="h-full">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="flex h-full flex-col rounded-xl border border-white bg-white p-8 shadow-corporate transition-all duration-300 hover:border-primary/30 hover:shadow-corporate-lg"
                >
                  <s.icon className="w-10 h-10 text-primary mb-6" strokeWidth={1.5} />
                  <h3 className="text-lg font-bold text-foreground mb-3">{s.title}</h3>
                  {s.includes && (
                    <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
                      <span className="font-semibold text-foreground">Incluye:</span> {s.includes}
                    </p>
                  )}
                  {s.summary && (
                    <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
                      <span className="font-semibold text-foreground">Qué hacemos:</span> {s.summary}
                    </p>
                  )}
                  {s.resolves && (
                    <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
                      <span className="font-semibold text-foreground">Resolviendo:</span> {s.resolves.join(", ")}
                    </p>
                  )}
                  {!s.resolves && s.summary && <div className="mb-5" />}
                  <Link to="/soluciones" className="mt-auto text-sm font-semibold text-primary transition-colors hover:text-accent">
                    Explorar Solución →
                  </Link>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Client Types */}
      <section className="py-[12vh] lg:py-[16vh]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <SectionReveal>
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Nuestros clientes</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-12">
              Trabajamos con empresas que quieren crecer.
            </h2>
          </SectionReveal>
          <div className="flex flex-wrap justify-center gap-8 lg:gap-16">
            {clients.map((c, i) => (
              <SectionReveal key={c.label} delay={i * 0.1}>
                <div className="flex flex-col items-center gap-4 group">
                  <div className="w-20 h-20 rounded-2xl bg-secondary flex items-center justify-center shadow-corporate group-hover:shadow-corporate-lg transition-all duration-300">
                    <c.icon className="w-9 h-9 text-primary" strokeWidth={1.5} />
                  </div>
                  <span className="text-sm font-semibold text-foreground">{c.label}</span>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-[12vh] lg:py-[20vh] bg-primary">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <SectionReveal>
            <h2 className="text-3xl lg:text-5xl font-bold text-primary-foreground mb-6">
              Optimiza tu empresa con asesoría profesional.
            </h2>
            <p className="text-primary-foreground/70 mb-10 max-w-lg mx-auto leading-relaxed">
              Agenda una consulta con nuestro equipo y descubre cómo podemos impulsar tu crecimiento.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-lg font-semibold px-8 border-primary-foreground/35 bg-primary-foreground text-primary hover:bg-primary-foreground/90 hover:text-primary"
              >
                <Link to="/contactenos">Solicita tu análisis</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="rounded-lg font-semibold px-8 bg-primary-foreground/12 text-primary-foreground border border-primary-foreground/20 hover:bg-primary-foreground hover:text-primary"
              >
                <a href="https://wa.me/593992561970" target="_blank" rel="noopener noreferrer">WhatsApp</a>
              </Button>
            </div>
          </SectionReveal>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
