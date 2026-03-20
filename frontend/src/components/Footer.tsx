import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => (
  <footer className="bg-[#0f172a] text-primary-foreground py-16">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h3 className="font-display font-bold text-xl mb-4">
            L&M <span className="text-primary">HABITAT</span>
          </h3>
          <p className="text-primary-foreground/60 text-sm leading-relaxed max-w-xs">
            Consultoría integral empresarial para optimizar operaciones, seguridad industrial y crecimiento organizacional.
          </p>
        </div>

        <div>
          <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-4 text-primary-foreground/80">
            Navegación
          </h4>
          <nav className="flex flex-col gap-2">
            {[
              { label: "Home", path: "/" },
              { label: "Quiénes Somos", path: "/quienes-somos" },
              { label: "Soluciones", path: "/soluciones" },
              { label: "Trabaje con Nosotros", path: "/trabaje-con-nosotros" },
              { label: "Contáctenos", path: "/contactenos" },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-4 text-primary-foreground/80">
            Contacto
          </h4>
          <div className="flex flex-col gap-3 text-sm text-primary-foreground/60">
            <a href="https://wa.me/593992561970" className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
              <Phone size={14} /> <span className="tabular-nums">099 256 1970</span>
            </a>
            <a href="mailto:info@habitatempresarial.com" className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
              <Mail size={14} /> info@habitatempresarial.com
            </a>
            <span className="flex items-start gap-2">
              <MapPin size={14} className="mt-0.5 shrink-0" /> Av. Agustín Freire e Isidro Ayora
            </span>
          </div>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-primary-foreground/10 text-center">
        <p className="text-xs text-primary-foreground/40">
          © {new Date().getFullYear()} L & M Habitat S.A.S. Todos los derechos reservados.
        </p>
        <a
          href="https://www.nivusoftware.com"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-3 text-sm text-primary-foreground/60 transition-colors hover:text-primary-foreground"
        >
          <img
            src="/images/logo_nube.png"
            alt="Nivusoftware"
            className="h-6 w-auto object-contain"
          />
          <span>
            Desarrollado por <span className="font-semibold text-primary-foreground">Nivusoftware</span>
          </span>
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
