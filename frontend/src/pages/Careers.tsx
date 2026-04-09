import { useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import SectionReveal from "@/components/SectionReveal";
import { useToast } from "@/hooks/use-toast";
import { DEFAULT_KEYWORDS, buildWebPageSchema } from "@/lib/seo";

const CareersPage = () => {
  const { toast } = useToast();
  const [fileName, setFileName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Solicitud enviada", description: "Hemos recibido tu información. Te contactaremos pronto." });
  };

  return (
    <Layout>
      <Seo
        title="Bolsa de empleo"
        description="Postúlate a oportunidades laborales con L&M Habitat y conecta tu talento con empresas que buscan profesionales en distintas áreas."
        path="/trabaje-con-nosotros"
        keywords={[...DEFAULT_KEYWORDS, "bolsa de empleo", "trabaje con nosotros", "empleos en Ecuador", "postulación laboral"]}
        schema={buildWebPageSchema({
          path: "/trabaje-con-nosotros",
          name: "Bolsa de empleo",
          description:
            "Conectamos talento con empresas que buscan profesionales y perfiles estratégicos para crecer.",
          type: "CollectionPage",
        })}
      />
      <section className="pt-32 pb-[16vh]">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <SectionReveal>
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Encuentra nuevas oportunidades laborales.</p>
            <h1 className="text-hero font-bold text-foreground leading-[1.1] mb-6">
              Bolsa de Empleo.
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-12">
              Postulate! En L&M Habitat conectamos tu talento con empresas que buscan profesionales como tú. Postúlate y nosotros te ayudamos a encontrar el trabajo ideal.
            </p>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Nombre completo</label>
                  <Input placeholder="Tu nombre" required className="rounded-lg" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Email</label>
                  <Input type="email" placeholder="tu@email.com" required className="rounded-lg" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Teléfono</label>
                <Input placeholder="+593..." className="rounded-lg" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Mensaje / Área de interés</label>
                <Textarea placeholder="Cuéntanos sobre tu experiencia y el área en la que te gustaría trabajar..." rows={5} className="rounded-lg" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Adjuntar CV</label>
                <label className="flex items-center justify-center gap-3 border-2 border-dashed border-border rounded-xl p-8 cursor-pointer hover:border-primary/40 transition-colors">
                  <Upload className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {fileName || "Arrastra tu archivo o haz clic para seleccionar"}
                  </span>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={(e) => setFileName(e.target.files?.[0]?.name || "")}
                  />
                </label>
              </div>
              <Button type="submit" size="lg" className="rounded-lg w-full font-semibold">
                Enviar solicitud
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                También puedes enviar tu CV a <a href="mailto:info@habitatempresarial.com" className="text-primary hover:underline">info@habitatempresarial.com</a>
              </p>
            </form>
          </SectionReveal>
        </div>
      </section>
    </Layout>
  );
};

export default CareersPage;
