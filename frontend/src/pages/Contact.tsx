import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Layout from "@/components/Layout";
import SectionReveal from "@/components/SectionReveal";
import { useToast } from "@/hooks/use-toast";

const ContactPage = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Mensaje enviado", description: "Nos pondremos en contacto contigo muy pronto." });
  };

  return (
    <Layout>
      <section className="pt-32 pb-[16vh]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionReveal>
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Contáctenos</p>
            <h1 className="text-hero font-bold text-foreground leading-[1.1] mb-6 max-w-3xl">
              Solicita tu análisis empresarial.
            </h1>
          </SectionReveal>

          <div className="grid lg:grid-cols-[1fr_400px] gap-16 mt-12">
            <SectionReveal delay={0.1}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Nombre</label>
                    <Input placeholder="Tu nombre" required className="rounded-lg" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Email</label>
                    <Input type="email" placeholder="tu@email.com" required className="rounded-lg" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Empresa</label>
                  <Input placeholder="Nombre de tu empresa" className="rounded-lg" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Mensaje</label>
                  <Textarea placeholder="¿En qué podemos ayudarte?" rows={6} required className="rounded-lg" />
                </div>
                <Button type="submit" size="lg" className="rounded-lg w-full font-semibold">
                  Enviar mensaje
                </Button>
              </form>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <div className="space-y-8">
                <div>
                  <h3 className="font-bold text-foreground mb-4">Información de contacto</h3>
                  <div className="space-y-4 text-sm text-muted-foreground">
                    <a href="https://wa.me/593992561970" className="flex items-center gap-3 hover:text-foreground transition-colors">
                      <Phone size={16} className="text-primary" /> <span className="tabular-nums">099 256 1970</span>
                    </a>
                    <a href="mailto:info@habitatempresarial.com" className="flex items-center gap-3 hover:text-foreground transition-colors">
                      <Mail size={16} className="text-primary" /> info@habitatempresarial.com
                    </a>
                    <span className="flex items-start gap-3">
                      <MapPin size={16} className="text-primary mt-0.5" /> Av. Agustín Freire e Isidro Ayora
                    </span>
                  </div>
                </div>

                <a
                  href="https://wa.me/593992561970"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border shadow-corporate hover:shadow-corporate-lg transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">WhatsApp directo</p>
                    <p className="text-xs text-muted-foreground">Respuesta inmediata</p>
                  </div>
                </a>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;
