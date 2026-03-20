import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPortal } from "react-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Inicio", path: "/" },
  { label: "Quiénes Somos", path: "/quienes-somos" },
  { label: "Soluciones", path: "/soluciones" },
  { label: "Trabaje con Nosotros", path: "/trabaje-con-nosotros" },
  { label: "Contáctenos", path: "/contactenos" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollLocked, setScrollLocked] = useState(false);
  const [mounted, setMounted] = useState(false);
  const location = useLocation();
  const scrollLockY = useRef(0);
  const hadScrollLock = useRef(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useLayoutEffect(() => {
    if (scrollLocked) {
      hadScrollLock.current = true;
      scrollLockY.current = window.scrollY;
      document.documentElement.style.height = "100%";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollLockY.current}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
      document.body.style.height = "100%";
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.overscrollBehavior = "none";
    } else {
      document.documentElement.style.height = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.height = "";
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      document.documentElement.style.overflow = "";
      document.documentElement.style.overscrollBehavior = "";
      if (hadScrollLock.current) {
        window.scrollTo(0, scrollLockY.current);
        hadScrollLock.current = false;
      }
    }

    return () => {
      document.documentElement.style.height = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.height = "";
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      document.documentElement.style.overflow = "";
      document.documentElement.style.overscrollBehavior = "";
    };
  }, [scrollLocked]);

  const openMobileMenu = () => {
    setScrollLocked(true);
    setMobileOpen(true);
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  const mobileMenu =
    mounted && typeof document !== "undefined"
      ? createPortal(
          <AnimatePresence onExitComplete={() => setScrollLocked(false)}>
            {mobileOpen && (
              <div className="lg:hidden">
                <motion.button
                  type="button"
                  aria-label="Cerrar menú"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 z-[90] bg-transparent"
                  onClick={closeMobileMenu}
                />
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  className="fixed inset-x-0 bottom-0 z-[100] flex justify-center"
                >
                  <div className="flex h-[75vh] w-full max-w-3xl flex-col rounded-t-[2rem] border border-border bg-white px-6 pb-8 pt-5 shadow-[0_-18px_60px_rgba(15,23,42,0.16)]">
                    <div className="mx-auto mb-5 h-1.5 w-14 rounded-full bg-primary/20" />
                    <div className="mb-6 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/80">Menú</p>
                        <p className="mt-1 text-lg font-semibold text-foreground">Navegación</p>
                      </div>
                      <button
                        type="button"
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-primary"
                        onClick={closeMobileMenu}
                      >
                        <X size={20} />
                      </button>
                    </div>

                    <nav className="flex flex-1 flex-col gap-2">
                      {navItems.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className={`rounded-2xl border px-4 py-3 text-base font-medium transition-colors ${
                            location.pathname === item.path
                              ? "border-primary/25 bg-primary/8 text-primary"
                              : "border-transparent bg-[#f6f8fc] text-muted-foreground"
                          }`}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </nav>

                    <Button asChild size="lg" className="mt-6 rounded-2xl">
                      <Link to="/contactenos">Solicita tu análisis</Link>
                    </Button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body,
        )
      : null;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-card/80 backdrop-blur-md border-b border-border shadow-corporate"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="font-display font-bold text-xl lg:text-2xl text-foreground tracking-tight">
            L&M <span className="text-primary">HABITAT</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors duration-200 ${
                  location.pathname === item.path
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Button asChild size="sm" className="rounded-lg">
              <Link to="/contactenos">Solicita tu análisis</Link>
            </Button>
          </nav>

          {/* Mobile Toggle */}
          <button
            type="button"
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            className="lg:hidden text-primary"
            onClick={() => (mobileOpen ? closeMobileMenu() : openMobileMenu())}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>
      {mobileMenu}
    </>
  );
};

export default Header;
