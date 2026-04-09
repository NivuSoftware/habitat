import heroBuildingImage from "@/assets/hero-building.jpg";

export const SITE_NAME = "L&M Habitat";
export const SITE_LEGAL_NAME = "L&M Habitat S.A.S.";
export const SITE_URL = (import.meta.env.VITE_SITE_URL || "https://habitatempresarial.com").replace(/\/$/, "");
export const DEFAULT_SEO_IMAGE = heroBuildingImage;
export const DEFAULT_SEO_DESCRIPTION =
  "Consultoría empresarial integral en Ecuador para optimizar operaciones, finanzas, talento humano, logística y seguridad industrial.";
export const DEFAULT_KEYWORDS = [
  "consultoría empresarial",
  "consultoría empresarial en Ecuador",
  "gestión financiera y administrativa",
  "talento humano",
  "seguridad y salud ocupacional",
  "logística y construcción",
  "asesoría empresarial",
  "capacitaciones empresariales",
  "L&M Habitat",
];

export const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE_LEGAL_NAME,
  alternateName: SITE_NAME,
  url: SITE_URL,
  description: DEFAULT_SEO_DESCRIPTION,
  telephone: "+593992561970",
  email: "info@habitatempresarial.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. Agustín Freire e Isidro Ayora",
    addressCountry: "EC",
  },
  areaServed: [
    {
      "@type": "Country",
      name: "Ecuador",
    },
  ],
};

export const buildPageUrl = (path: string) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalizedPath, `${SITE_URL}/`).toString();
};

export const buildWebPageSchema = ({
  path,
  name,
  description,
  type = "WebPage",
}: {
  path: string;
  name: string;
  description: string;
  type?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": type,
  name,
  description,
  url: buildPageUrl(path),
  inLanguage: "es",
  isPartOf: {
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
  },
});
