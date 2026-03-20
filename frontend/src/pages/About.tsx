import { Eye, Target, Heart, Shield, Lightbulb, Handshake } from "lucide-react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import SectionReveal from "@/components/SectionReveal";
import josefinaImage from "@/assets/josefina.png";

const timeline = [
  {
    icon: Target,
    title: "Misión",
    text: "Brindar servicios integrales de consultoría empresarial en las áreas administrativa, financiera, legal, logística y de seguridad industrial, impulsando el desarrollo sostenible de nuestros clientes.",
  },
  {
    icon: Eye,
    title: "Visión",
    text: "Ser la firma consultora de referencia en Ecuador para empresas que buscan institucionalizar sus operaciones y escalar con estructura, cumplimiento y profesionalismo.",
  },
];

const coreValues = [
  { icon: Shield, title: "Integridad", desc: "Actuamos con transparencia y ética en cada proyecto." },
  { icon: Lightbulb, title: "Innovación", desc: "Aplicamos soluciones modernas a desafíos empresariales." },
  { icon: Handshake, title: "Compromiso", desc: "Nos alineamos con los objetivos de nuestros clientes." },
  { icon: Heart, title: "Excelencia", desc: "Buscamos la mejora continua en todo lo que hacemos." },
];

const AboutPage = () => (
  <Layout>
    {/* Hero */}
    <section className="pt-32 pb-[12vh] lg:pb-[16vh]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionReveal>
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Quiénes Somos</p>
          <h1 className="text-hero font-bold text-foreground leading-[1.1] mb-6 max-w-3xl">
            Experiencia, credibilidad y consultoría estratégica.
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
            L & M Habitat S.A.S. es una firma de consultoría integral que acompaña a empresas ecuatorianas en su camino hacia la institucionalización y el crecimiento sostenible.
          </p>
        </SectionReveal>
      </div>
    </section>

    {/* Timeline */}
    <section className="relative py-[12vh] md:pt-[20vh] md:pb-[12vh] lg:pt-[24vh] lg:pb-[16vh] bg-secondary">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 hidden -translate-y-[80%] md:block">
        <div className="max-w-7xl mx-auto flex justify-end px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: 120, scale: 0.96 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
            className="mr-2 sm:mr-6 lg:mr-10"
          >
            <motion.img
              src={josefinaImage}
              alt="Josefina"
              className="w-[24rem] lg:w-[30rem] h-auto object-contain drop-shadow-[0_24px_60px_rgba(15,23,42,0.2)]"
            />
          </motion.div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-px bg-primary/20" />
          
          {timeline.map((item, i) => (
            <SectionReveal key={item.title} delay={i * 0.15}>
              <div className="relative mb-16 last:mb-0 lg:grid lg:grid-cols-2 lg:gap-20">
                <div className="absolute left-6 lg:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-primary flex items-center justify-center z-10">
                  <item.icon className="w-5 h-5 text-primary-foreground" strokeWidth={1.5} />
                </div>
                <div
                  className={`pl-20 lg:pl-0 lg:px-14 ${
                    i % 2 === 0
                      ? "lg:col-start-2 lg:text-left"
                      : "lg:col-start-1 lg:text-right"
                  }`}
                >
                  <h3 className="text-2xl font-bold text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.text}</p>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>

    {/* Values */}
    <section className="py-[12vh] lg:py-[16vh]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionReveal>
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Nuestros valores</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-12">
            Los principios que guían cada decisión.
          </h2>
        </SectionReveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {coreValues.map((v, i) => (
            <SectionReveal key={v.title} delay={i * 0.1}>
              <div className="p-6 bg-card rounded-xl border border-border shadow-corporate text-center">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <v.icon className="w-7 h-7 text-primary" strokeWidth={1.5} />
                </div>
                <h4 className="font-bold text-foreground mb-2">{v.title}</h4>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default AboutPage;
