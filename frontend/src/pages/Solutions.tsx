import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Building2, Users, GraduationCap, Briefcase, Factory, Volume2, VolumeX, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import SectionReveal from "@/components/SectionReveal";
import { Button } from "@/components/ui/button";
import evidenceImage from "@/assets/evidence.jpeg";
import evidenceImage1 from "@/assets/evidence1.jpeg";
import evidenceImage2 from "@/assets/evidence2.jpeg";
import evidenceImage3 from "@/assets/evidence3.jpeg";
import evidenceImage4 from "@/assets/evidence4.jpeg";
import evidenceImage5 from "@/assets/evidence5.jpeg";
import evidenceImage6 from "@/assets/evidence6.jpeg";
import evidenceImage7 from "@/assets/evidence7.jpeg";
import evidenceImage8 from "@/assets/evidence8.jpeg";
import { DEFAULT_KEYWORDS, buildWebPageSchema } from "@/lib/seo";

const HERO_VIDEO_SRC = "/videos/soluciones.mp4";
const WHATSAPP_URL = "https://wa.me/593992561970";
const EVIDENCE_IMAGES = [
  { src: evidenceImage, alt: "Evidencia de ejecución de soluciones empresariales 1" },
  { src: evidenceImage1, alt: "Evidencia de ejecución de soluciones empresariales 2" },
  { src: evidenceImage2, alt: "Evidencia de ejecución de soluciones empresariales 3" },
  { src: evidenceImage3, alt: "Evidencia de ejecución de soluciones empresariales 4" },
  { src: evidenceImage4, alt: "Evidencia de ejecución de soluciones empresariales 5" },
  { src: evidenceImage5, alt: "Evidencia de ejecución de soluciones empresariales 6" },
  { src: evidenceImage6, alt: "Evidencia de ejecución de soluciones empresariales 7" },
  { src: evidenceImage7, alt: "Evidencia de ejecución de soluciones empresariales 8" },
  { src: evidenceImage8, alt: "Evidencia de ejecución de soluciones empresariales 9" },
];

const services = [
  {
    icon: Building2,
    title: "GESTIÓN FINANCIERA Y ADMINISTRATIVA",
    desc: "Optimización y control de la operación empresarial.",
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
    benefits: [
      "Diagnóstico empresarial",
      "Planificación estratégica",
      "Cumplimiento regulatorio",
    ],
  },
];

const SolutionsPage = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [activeEvidenceIndex, setActiveEvidenceIndex] = useState(0);
  const evidenceCount = EVIDENCE_IMAGES.length;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const attemptPlayback = () => {
      video.playsInline = true;
      video.muted = video.muted || isMuted;
      const playback = video.play();

      if (playback && typeof playback.catch === "function") {
        playback.catch(() => {
          // Keep the video ready and retry on the next user/browser signal.
        });
      }
    };

    const resumePlayback = () => {
      if (document.visibilityState === "visible" && video.paused) {
        attemptPlayback();
      }
    };

    attemptPlayback();
    video.addEventListener("loadeddata", attemptPlayback);
    video.addEventListener("canplay", attemptPlayback);
    video.addEventListener("pause", attemptPlayback);
    document.addEventListener("visibilitychange", resumePlayback);
    window.addEventListener("touchstart", attemptPlayback, { passive: true });
    window.addEventListener("click", attemptPlayback);

    return () => {
      video.removeEventListener("loadeddata", attemptPlayback);
      video.removeEventListener("canplay", attemptPlayback);
      video.removeEventListener("pause", attemptPlayback);
      document.removeEventListener("visibilitychange", resumePlayback);
      window.removeEventListener("touchstart", attemptPlayback);
      window.removeEventListener("click", attemptPlayback);
    };
  }, [isMuted]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setActiveEvidenceIndex((currentIndex) =>
        currentIndex >= evidenceCount - 1 ? 0 : currentIndex + 1,
      );
    }, 3200);

    return () => window.clearTimeout(timeoutId);
  }, [activeEvidenceIndex, evidenceCount]);

  const handlePreviousEvidence = () => {
    setActiveEvidenceIndex((currentIndex) => (currentIndex - 1 + evidenceCount) % evidenceCount);
  };

  const handleNextEvidence = () => {
    setActiveEvidenceIndex((currentIndex) => (currentIndex + 1) % evidenceCount);
  };

  const handleToggleMuted = () => {
    const video = videoRef.current;
    const nextMuted = !isMuted;

    setIsMuted(nextMuted);

    if (!video) return;

    video.muted = nextMuted;
    video.defaultMuted = nextMuted;
    void video.play().catch(() => {
      // If the browser blocks playback, the next interaction retries it.
    });
  };

  return (
    <Layout>
      <Seo
        title="Soluciones empresariales"
        description="Servicios de gestión financiera, administrativa, talento humano, logística, construcción, capacitaciones y consultoría estratégica para empresas."
        path="/soluciones"
        keywords={[
          ...DEFAULT_KEYWORDS,
          "soluciones empresariales",
          "gestión operativa",
          "consultoría financiera",
          "capacitaciones corporativas",
        ]}
        schema={buildWebPageSchema({
          path: "/soluciones",
          name: "Soluciones empresariales",
          description:
            "Servicios diseñados para escalar tu empresa con ejecución operativa, asesoría estratégica y formación especializada.",
        })}
      />
      <section className="overflow-hidden pt-32 pb-[12vh]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(300px,380px)] lg:gap-16">
            <SectionReveal>
              <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Soluciones</p>
              <h1 className="text-hero font-bold text-foreground leading-[1.1] mb-6 max-w-3xl">
                Servicios diseñados para escalar tu empresa.
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                Cada solución responde a necesidades reales del entorno empresarial ecuatoriano, adaptándose al tamaño y sector de tu organización.
              </p>
            </SectionReveal>

            <SectionReveal delay={0.1}>
              <div className="relative mx-auto w-full max-w-[360px] overflow-hidden rounded-[2rem] border border-border/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(241,245,255,0.94))] p-3 shadow-[0_24px_60px_rgba(37,99,235,0.12)] lg:ml-auto">
                <div className="relative overflow-hidden rounded-[1.5rem] bg-[#081225]">
                  <video
                    ref={videoRef}
                    src={HERO_VIDEO_SRC}
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    preload="auto"
                    disablePictureInPicture
                    controlsList="nodownload nofullscreen noremoteplayback"
                    className="aspect-[9/16] w-full object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(8,18,37,0.06),rgba(8,18,37,0.18))]" />
                  <button
                    type="button"
                    onClick={handleToggleMuted}
                    aria-label={isMuted ? "Activar volumen del video" : "Silenciar video"}
                    className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#081225]/80 px-4 py-2 text-sm font-medium text-white backdrop-blur transition-colors hover:bg-[#102344]"
                  >
                    {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                    {isMuted ? "Activar audio" : "Silenciar"}
                  </button>
                </div>
              </div>
            </SectionReveal>
          </div>
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
                  {s.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="lg:col-start-2 lg:col-span-2 flex justify-end self-end">
                  <Button
                    asChild
                    variant="outline"
                    className="mt-2 inline-flex rounded-lg border-primary/20 bg-primary/5 text-primary hover:border-primary/35 hover:bg-primary/10"
                  >
                    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                      Solicitar asesoría <ArrowRight size={16} />
                    </a>
                  </Button>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>

      <section className="pb-[16vh]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionReveal>
            <div className="relative overflow-hidden rounded-[2rem] border border-border bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(240,244,255,0.94))] p-4 shadow-corporate lg:p-6">
              <div className="absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.16),transparent_70%)]" />
              <div className="relative overflow-hidden rounded-[1.5rem]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={EVIDENCE_IMAGES[activeEvidenceIndex].src}
                    src={EVIDENCE_IMAGES[activeEvidenceIndex].src}
                    alt={EVIDENCE_IMAGES[activeEvidenceIndex].alt}
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.985 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="h-[260px] w-full object-cover sm:h-[360px] lg:h-[520px]"
                  />
                </AnimatePresence>

                <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between px-3">
                  <button
                    type="button"
                    onClick={handlePreviousEvidence}
                    aria-label="Mostrar evidencia anterior"
                    className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/35 bg-[#081225]/75 text-white backdrop-blur transition-colors hover:bg-[#102344]"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextEvidence}
                    aria-label="Mostrar siguiente evidencia"
                    className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/35 bg-[#081225]/75 text-white backdrop-blur transition-colors hover:bg-[#102344]"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>

              <div className="relative mt-5 flex flex-wrap justify-center gap-3">
                {EVIDENCE_IMAGES.map((item, index) => {
                  const isActive = index === activeEvidenceIndex;

                  return (
                    <button
                      key={item.src}
                      type="button"
                      onClick={() => setActiveEvidenceIndex(index)}
                      aria-label={`Mostrar evidencia ${index + 1}`}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        isActive ? "w-10 bg-primary" : "w-2.5 bg-primary/25 hover:bg-primary/45"
                      }`}
                    />
                  );
                })}
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>
    </Layout>
  );
};

export default SolutionsPage;
