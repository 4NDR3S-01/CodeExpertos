"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useTheme } from "./theme-provider";
import TechBackground from "./components/tech-background";
import TechParticles from "./components/tech-particles";

const sections = [
  { id: "inicio", key: "home" },
  { id: "servicios", key: "services" },
  { id: "portafolio", key: "portfolio" },
  { id: "nosotros", key: "about" },
  { id: "contacto", key: "contact" },
];

const languages = [
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "en", name: "English", flag: "🇺🇸" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("es");
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const themeDropdownRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();

  // Simular useTranslation (en un proyecto real usarías next-i18next)
  const t = (key: string) => {
    const translations = {
      es: {
        "nav.home": "Inicio",
        "nav.services": "Servicios",
        "nav.portfolio": "Portafolio",
        "nav.about": "Sobre Nosotros",
        "nav.contact": "Contacto",
        "hero.title": "Desarrollo de Software y Soluciones Digitales",
        "hero.subtitle": "Somos expertos en desarrollo de apps web, móviles y mantenimiento de software. Llevamos tu negocio al siguiente nivel.",
        "services.title": "Servicios",
        "services.web.title": "Desarrollo Web",
        "services.web.description": "Sitios y aplicaciones web modernas, rápidas y seguras.",
        "services.mobile.title": "Apps Móviles",
        "services.mobile.description": "Aplicaciones móviles nativas y multiplataforma.",
        "services.custom.title": "Software a Medida",
        "services.custom.description": "Soluciones personalizadas para tu empresa.",
        "services.maintenance.title": "Mantenimiento",
        "services.maintenance.description": "Soporte y mantenimiento de sistemas existentes.",
        "portfolio.title": "Portafolio",
        "portfolio.project1.title": "Proyecto Ejemplo 1",
        "portfolio.project1.description": "Descripción breve del proyecto realizado.",
        "portfolio.project2.title": "Proyecto Ejemplo 2",
        "portfolio.project2.description": "Descripción breve del proyecto realizado.",
        "about.title": "Sobre Nosotros",
        "about.description": "Somos un equipo apasionado por la tecnología y la innovación, comprometidos con el éxito de nuestros clientes.",
        "contact.title": "Contacto",
        "contact.name": "Nombre",
        "contact.email": "Correo electrónico",
        "contact.message": "Mensaje",
        "contact.sendEmail": "Enviar por correo",
        "contact.whatsapp": "WhatsApp",
        "contact.success": "Mensaje enviado (ejemplo)"
      },
      en: {
        "nav.home": "Home",
        "nav.services": "Services",
        "nav.portfolio": "Portfolio",
        "nav.about": "About Us",
        "nav.contact": "Contact",
        "hero.title": "Software Development and Digital Solutions",
        "hero.subtitle": "We are experts in web and mobile app development and software maintenance. We take your business to the next level.",
        "services.title": "Services",
        "services.web.title": "Web Development",
        "services.web.description": "Modern, fast and secure websites and web applications.",
        "services.mobile.title": "Mobile Apps",
        "services.mobile.description": "Native and cross-platform mobile applications.",
        "services.custom.title": "Custom Software",
        "services.custom.description": "Personalized solutions for your company.",
        "services.maintenance.title": "Maintenance",
        "services.maintenance.description": "Support and maintenance of existing systems.",
        "portfolio.title": "Portfolio",
        "portfolio.project1.title": "Example Project 1",
        "portfolio.project1.description": "Brief description of the completed project.",
        "portfolio.project2.title": "Example Project 2",
        "portfolio.project2.description": "Brief description of the completed project.",
        "about.title": "About Us",
        "about.description": "We are a team passionate about technology and innovation, committed to our clients' success.",
        "contact.title": "Contact",
        "contact.name": "Name",
        "contact.email": "Email",
        "contact.message": "Message",
        "contact.sendEmail": "Send by email",
        "contact.whatsapp": "WhatsApp",
        "contact.success": "Message sent (example)"
      }
    };
    return translations[currentLang as keyof typeof translations][key as keyof typeof translations.es] || key;
  };

  // Detectar idioma del navegador
  useEffect(() => {
    const browserLang = navigator.language.split('-')[0];
    if (browserLang === 'en') {
      setCurrentLang('en');
    }
  }, []);

  // Cerrar dropdowns al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
      if (themeDropdownRef.current && !themeDropdownRef.current.contains(event.target as Node)) {
        setThemeDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollToSection = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const changeLanguage = (langCode: string) => {
    setCurrentLang(langCode);
    setLangDropdownOpen(false);
  };

  const changeTheme = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme);
    setThemeDropdownOpen(false);
  };

  const currentLanguage = languages.find(lang => lang.code === currentLang);

  const getThemeIcon = () => {
    switch (theme) {
      case "light":
        return "☀️";
      case "dark":
        return "🌙";
      case "system":
        return "💻";
      default:
        return "☀️";
    }
  };

  const getThemeName = () => {
    switch (theme) {
      case "light":
        return currentLang === "es" ? "Claro" : "Light";
      case "dark":
        return currentLang === "es" ? "Oscuro" : "Dark";
      case "system":
        return currentLang === "es" ? "Sistema" : "System";
      default:
        return currentLang === "es" ? "Claro" : "Light";
    }
  };

  return (
    <div className="relative min-h-screen z-10 bg-background text-foreground font-sans">
      {/* Fondo tecnológico animado */}
      <TechBackground />
      <TechParticles />
      
      {/* Menú hamburguesa */}
      <header className="fixed top-0 left-0 w-full z-50 glass-effect border-b border-border">
        <nav className="flex items-center justify-between max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <Image src="/icono_sin-fondo.png" alt="Logo" width={32} height={32} className="sm:w-10 sm:h-10" />
            <span className="font-bold text-base sm:text-lg lg:text-xl tracking-tight">CodeExpertos</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Selector de idioma moderno */}
            <div className="relative" ref={langDropdownRef}>
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded-lg bg-card/50 hover:bg-card/80 transition-all duration-200 border border-border hover:border-border/80 shadow-sm hover:shadow-md"
                aria-label="Seleccionar idioma"
              >
                <span className="text-base sm:text-lg">{currentLanguage?.flag}</span>
                <span className="text-xs sm:text-sm font-medium hidden md:block">{currentLanguage?.name}</span>
                <motion.span
                  animate={{ rotate: langDropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-muted text-xs sm:text-sm"
                >
                  ▼
                </motion.span>
              </button>
              
              <AnimatePresence>
                {langDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-2 w-40 sm:w-48 bg-card rounded-lg shadow-lg border border-border overflow-hidden"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={`w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 text-left hover:bg-secondary transition-colors text-sm sm:text-base ${
                          currentLang === lang.code ? 'bg-primary/10 text-primary' : 'text-card-foreground'
                        }`}
                      >
                        <span className="text-base sm:text-lg">{lang.flag}</span>
                        <span className="font-medium">{lang.name}</span>
                        {currentLang === lang.code && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="w-2 h-2 bg-primary rounded-full ml-auto"
                          />
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Selector de tema */}
            <div className="relative" ref={themeDropdownRef}>
              <button
                onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
                className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded-lg bg-card/50 hover:bg-card/80 transition-all duration-200 border border-border hover:border-border/80 shadow-sm hover:shadow-md theme-toggle"
                aria-label="Cambiar tema"
              >
                <span className="text-base sm:text-lg">{getThemeIcon()}</span>
                <span className="text-xs sm:text-sm font-medium hidden md:block">{getThemeName()}</span>
                <motion.span
                  animate={{ rotate: themeDropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-muted text-xs sm:text-sm"
                >
                  ▼
                </motion.span>
              </button>
              
              <AnimatePresence>
                {themeDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-2 w-40 sm:w-48 bg-card rounded-lg shadow-lg border border-border overflow-hidden"
                  >
                    {[
                      { value: "light", icon: "☀️", name: currentLang === "es" ? "Claro" : "Light" },
                      { value: "dark", icon: "🌙", name: currentLang === "es" ? "Oscuro" : "Dark" },
                      { value: "system", icon: "💻", name: currentLang === "es" ? "Sistema" : "System" },
                    ].map((themeOption) => (
                      <button
                        key={themeOption.value}
                        onClick={() => changeTheme(themeOption.value as "light" | "dark" | "system")}
                        className={`w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 text-left hover:bg-secondary transition-colors text-sm sm:text-base ${
                          theme === themeOption.value ? 'bg-primary/10 text-primary' : 'text-card-foreground'
                        }`}
                      >
                        <span className="text-base sm:text-lg">{themeOption.icon}</span>
                        <span className="font-medium">{themeOption.name}</span>
                        {theme === themeOption.value && (
                          <motion.div
                            layoutId="activeThemeIndicator"
                            className="w-2 h-2 bg-primary rounded-full ml-auto"
                          />
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              className="sm:hidden flex flex-col gap-1 sm:gap-1.5 p-2"
              aria-label="Abrir menú"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span className="block w-5 sm:w-6 h-0.5 bg-foreground rounded"></span>
              <span className="block w-5 sm:w-6 h-0.5 bg-foreground rounded"></span>
              <span className="block w-5 sm:w-6 h-0.5 bg-foreground rounded"></span>
            </button>
          </div>
          <ul className="hidden lg:flex gap-4 xl:gap-6">
            {sections.map((s) => (
              <li key={s.id}>
                <button
                  className="hover:text-primary transition-colors font-medium text-sm xl:text-base"
                  onClick={() => scrollToSection(s.id)}
                >
                  {t(`nav.${s.key}`)}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        {/* Menú móvil */}
        {menuOpen && (
          <div className="sm:hidden absolute top-full left-0 w-full bg-background border-b border-border animate-fade-in">
            <ul className="flex flex-col gap-1 p-4">
              {sections.map((s) => (
                <li key={s.id}>
                  <button
                    className="w-full text-left py-3 px-3 rounded-lg hover:bg-primary/10 font-medium text-base transition-colors"
                    onClick={() => scrollToSection(s.id)}
                  >
                    {t(`nav.${s.key}`)}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      {/* Secciones */}
      <main className="pt-16 sm:pt-20 lg:pt-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-20 sm:gap-24 lg:gap-32">
        {/* INICIO */}
        <motion.section
          id="inicio"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7 }}
          className="min-h-[50vh] sm:min-h-[60vh] lg:min-h-[70vh] flex flex-col justify-center items-center text-center gap-4 sm:gap-6"
        >
          <div className="glass-effect rounded-2xl p-8 sm:p-12 backdrop-blur-md max-w-4xl">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight bg-gradient-to-r from-primary via-accent to-cyan-400 bg-clip-text text-transparent mb-6">
              CodeExpertos
            </h1>
            <p className="text-base sm:text-lg lg:text-xl max-w-sm sm:max-w-xl lg:max-w-2xl text-muted leading-relaxed mb-8">
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                onClick={() => document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Nuestros Servicios
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border border-border text-foreground rounded-lg font-semibold hover:bg-secondary transition-colors"
                onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Contáctanos
              </motion.button>
            </div>
          </div>
        </motion.section>

        {/* SERVICIOS */}
        <motion.section
          id="servicios"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex flex-col gap-6 sm:gap-8 items-center"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-2 sm:mb-4">{t("services.title")}</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Ofrecemos soluciones completas de desarrollo digital para empresas de todos los tamaños
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 w-full max-w-4xl">
            <motion.div 
              whileHover={{ y: -5 }}
              className="glass-effect rounded-lg p-4 sm:p-6 backdrop-blur-md hover:shadow-lg transition-all duration-300"
            >
              <h3 className="font-bold text-lg sm:text-xl mb-2">{t("services.web.title")}</h3>
              <p className="text-sm sm:text-base text-muted leading-relaxed">{t("services.web.description")}</p>
            </motion.div>
            <motion.div 
              whileHover={{ y: -5 }}
              className="glass-effect rounded-lg p-4 sm:p-6 backdrop-blur-md hover:shadow-lg transition-all duration-300"
            >
              <h3 className="font-bold text-lg sm:text-xl mb-2">{t("services.mobile.title")}</h3>
              <p className="text-sm sm:text-base text-muted leading-relaxed">{t("services.mobile.description")}</p>
            </motion.div>
            <motion.div 
              whileHover={{ y: -5 }}
              className="glass-effect rounded-lg p-4 sm:p-6 backdrop-blur-md hover:shadow-lg transition-all duration-300"
            >
              <h3 className="font-bold text-lg sm:text-xl mb-2">{t("services.custom.title")}</h3>
              <p className="text-sm sm:text-base text-muted leading-relaxed">{t("services.custom.description")}</p>
            </motion.div>
            <motion.div 
              whileHover={{ y: -5 }}
              className="glass-effect rounded-lg p-4 sm:p-6 backdrop-blur-md hover:shadow-lg transition-all duration-300"
            >
              <h3 className="font-bold text-lg sm:text-xl mb-2">{t("services.maintenance.title")}</h3>
              <p className="text-sm sm:text-base text-muted leading-relaxed">{t("services.maintenance.description")}</p>
            </motion.div>
          </div>
        </motion.section>

        {/* PORTAFOLIO */}
        <motion.section
          id="portafolio"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col gap-6 sm:gap-8 items-center"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-2 sm:mb-4">{t("portfolio.title")}</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Algunos de nuestros proyectos más destacados
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full max-w-4xl">
            <motion.div 
              whileHover={{ y: -5 }}
              className="glass-effect rounded-lg p-4 sm:p-6 backdrop-blur-md hover:shadow-lg transition-all duration-300"
            >
              <h3 className="font-bold text-base sm:text-lg lg:text-xl mb-2">{t("portfolio.project1.title")}</h3>
              <p className="text-sm sm:text-base text-muted leading-relaxed">{t("portfolio.project1.description")}</p>
            </motion.div>
            <motion.div 
              whileHover={{ y: -5 }}
              className="glass-effect rounded-lg p-4 sm:p-6 backdrop-blur-md hover:shadow-lg transition-all duration-300"
            >
              <h3 className="font-bold text-base sm:text-lg lg:text-xl mb-2">{t("portfolio.project2.title")}</h3>
              <p className="text-sm sm:text-base text-muted leading-relaxed">{t("portfolio.project2.description")}</p>
            </motion.div>
          </div>
        </motion.section>

        {/* SOBRE NOSOTROS */}
        <motion.section
          id="nosotros"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col gap-6 sm:gap-8 items-center"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-2 sm:mb-4">{t("about.title")}</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Somos un equipo apasionado por la tecnología y la innovación
            </p>
          </div>
          <div className="glass-effect rounded-2xl p-8 sm:p-12 backdrop-blur-md max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Nuestra Misión</h3>
                <p className="text-muted-foreground mb-6">
                  Transformar ideas en soluciones digitales innovadoras que impulsen el crecimiento de nuestros clientes.
                </p>
                <h3 className="text-2xl font-semibold mb-4">Nuestros Valores</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Innovación constante</li>
                  <li>• Calidad excepcional</li>
                  <li>• Atención al cliente</li>
                  <li>• Trabajo en equipo</li>
                </ul>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl font-bold text-white">CE</span>
                </div>
                <p className="text-lg font-semibold">CodeExpertos</p>
                <p className="text-muted-foreground">Desarrollo de Software</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* CONTACTO */}
        <motion.section
          id="contacto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-col gap-6 sm:gap-8 items-center"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-2 sm:mb-4">{t("contact.title")}</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              ¿Listo para comenzar tu proyecto? ¡Hablemos!
            </p>
          </div>
          <div className="glass-effect rounded-2xl p-8 sm:p-12 backdrop-blur-md max-w-2xl w-full">
            <form
              className="flex flex-col gap-6"
              onSubmit={(e) => {
                e.preventDefault();
                alert(t("contact.success"));
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  Enviar Mensaje
                </motion.button>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.open('https://wa.me/1234567890?text=Hola%20CodeExpertos,%20quiero%20más%20información.', '_blank')}
                  className="flex-1 px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  WhatsApp
                </motion.button>
              </div>
            </form>
          </div>
        </motion.section>
      </main>

      {/* Pie de página */}
      <footer className="mt-16 sm:mt-24 lg:mt-32 py-6 sm:py-8 border-t border-border bg-background/50 backdrop-blur">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-sm sm:text-base lg:text-lg text-muted font-medium leading-relaxed"
          >
            Desarrollado con <span className="text-red-500 animate-pulse">❤️</span> por{" "}
            <span className="text-primary font-semibold">CodeExpertos</span>
          </motion.p>
        </div>
      </footer>
    </div>
  );
}
