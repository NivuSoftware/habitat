import { useRef, useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import SectionReveal from "@/components/SectionReveal";
import { useToast } from "@/hooks/use-toast";
import { DEFAULT_KEYWORDS, buildWebPageSchema } from "@/lib/seo";

const API_URL = `${(import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace(/\/$/, "")}/send-job-application`;

const CareersPage = () => {
  const { toast } = useToast();
  const [fileName, setFileName] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: "",
  });

  const handleChange = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((current) => ({ ...current, [field]: e.target.value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;

    if (!selectedFile) {
      setCvFile(null);
      setFileName("");
      return;
    }

    const isPdf = selectedFile.type === "application/pdf" || selectedFile.name.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      e.target.value = "";
      setCvFile(null);
      setFileName("");
      toast({
        title: "Archivo no válido",
        description: "Adjunta tu CV en formato PDF.",
      });
      return;
    }

    setCvFile(selectedFile);
    setFileName(selectedFile.name);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);

      const payload = {
        nombre: formData.nombre.trim(),
        email: formData.email.trim(),
        telefono: formData.telefono.trim(),
        mensaje: formData.mensaje.trim(),
      };

      if (!payload.nombre || !payload.email) {
        throw new Error("Completa tu nombre y email antes de enviar.");
      }

      if (!cvFile) {
        throw new Error("Adjunta tu CV en formato PDF.");
      }

      const requestBody = new FormData();
      requestBody.append("nombre", payload.nombre);
      requestBody.append("email", payload.email);
      requestBody.append("telefono", payload.telefono);
      requestBody.append("mensaje", payload.mensaje);
      requestBody.append("cv", cvFile);

      const response = await fetch(API_URL, {
        method: "POST",
        body: requestBody,
      });

      if (!response.ok) {
        let errorMessage = "No se pudo enviar tu postulación. Intenta nuevamente en unos minutos.";

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
        telefono: "",
        mensaje: "",
      });
      setCvFile(null);
      setFileName("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      toast({ title: "Solicitud enviada", description: "Hemos recibido tu información. Te contactaremos pronto." });
    } catch (error) {
      toast({
        title: "No se pudo enviar la solicitud",
        description: error instanceof Error ? error.message : "Ocurrió un error inesperado.",
      });
    } finally {
      setIsSubmitting(false);
    }
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
                <label className="text-sm font-medium text-foreground mb-2 block">Teléfono</label>
                <Input
                  name="telefono"
                  placeholder="+593..."
                  value={formData.telefono}
                  onChange={handleChange("telefono")}
                  className="rounded-lg"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Mensaje / Área de interés</label>
                <Textarea
                  name="mensaje"
                  placeholder="Cuéntanos sobre tu experiencia y el área en la que te gustaría trabajar..."
                  rows={5}
                  value={formData.mensaje}
                  onChange={handleChange("mensaje")}
                  className="rounded-lg"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Adjuntar CV en PDF</label>
                <label className="flex items-center justify-center gap-3 border-2 border-dashed border-border rounded-xl p-8 cursor-pointer hover:border-primary/40 transition-colors">
                  <Upload className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {fileName || "Haz clic para seleccionar tu documento (PDF)"}
                  </span>
                  <input
                    ref={fileInputRef}
                    name="cv"
                    type="file"
                    accept="application/pdf,.pdf"
                    required
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
              <Button type="submit" size="lg" disabled={isSubmitting} className="rounded-lg w-full font-semibold">
                {isSubmitting ? "Enviando..." : "Enviar solicitud"}
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
