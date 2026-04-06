import { useState } from "react";
import { Phone, Mail, MapPin, MessageCircle, Instagram, Linkedin, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Layout from "@/components/Layout";
import SectionReveal from "@/components/SectionReveal";
import { useToast } from "@/hooks/use-toast";

const API_URL = `${(import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace(/\/$/, "")}/send-email`;

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    icon: Instagram,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
    icon: Linkedin,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/",
    icon: Facebook,
  },
];

const ContactPage = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    empresa: "",
    mensaje: "",
  });

  const handleChange = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((current) => ({ ...current, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      const payload = {
        nombre: formData.nombre.trim(),
        email: formData.email.trim(),
        empresa: formData.empresa.trim(),
        mensaje: formData.mensaje.trim(),
      };

      if (!payload.nombre || !payload.email || !payload.mensaje) {
        throw new Error("Completa los campos obligatorios antes de enviar.");
      }

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let errorMessage = "No se pudo enviar tu mensaje. Intenta nuevamente en unos minutos.";

        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch {
          // Mantiene el mensaje por defecto si la respuesta no es JSON.
        }

        throw new Error(errorMessage);
      }

      setFormData({
        nombre: "",
        email: "",
        empresa: "",
        mensaje: "",
      });

      toast({
        title: "Mensaje enviado",
        description: "Nos pondremos en contacto contigo muy pronto.",
      });
    } catch (error) {
      toast({
        title: "No se pudo enviar el mensaje",
        description: error instanceof Error ? error.message : "Ocurrió un error inesperado.",
      });
    } finally {
      setIsSubmitting(false);
    }
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
                    <Input
                      name="nombre"
                      placeholder="Tu nombre"
                      value={formData.nombre}
                      onChange={handleChange("nombre")}
                      required
                      className="rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Email</label>
                    <Input
                      name="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={formData.email}
                      onChange={handleChange("email")}
                      required
                      className="rounded-lg"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Empresa</label>
                  <Input
                    name="empresa"
                    placeholder="Nombre de tu empresa"
                    value={formData.empresa}
                    onChange={handleChange("empresa")}
                    className="rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Mensaje</label>
                  <Textarea
                    name="mensaje"
                    placeholder="¿En qué podemos ayudarte?"
                    rows={6}
                    value={formData.mensaje}
                    onChange={handleChange("mensaje")}
                    required
                    className="rounded-lg"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="rounded-lg w-full font-semibold"
                >
                  {isSubmitting ? "Enviando..." : "Enviar mensaje"}
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

                <div>
                  <h3 className="font-bold text-foreground mb-4">Síguenos en nuestras redes</h3>
                  <div className="flex flex-wrap gap-3">
                    {socialLinks.map((item) => {
                      const Icon = item.icon;

                      return (
                        <a
                          key={item.label}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Ir a ${item.label}`}
                          className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-corporate transition-all hover:-translate-y-0.5 hover:text-primary hover:shadow-corporate-lg"
                        >
                          <Icon size={18} />
                        </a>
                      );
                    })}
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
