import React, { useRef, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesBento } from './components/ServicesBento';
import { SmokeSimulator } from './components/SmokeSimulator';
import { Configurator } from './components/Configurator';
import { PacksCatalog } from './components/PacksCatalog';
import { QualityComparison } from './components/QualityComparison';
import { CityCoverage } from './components/CityCoverage';
import { CoverageMapSection } from './components/CoverageMapSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AIChatBot } from './components/AIChatBot';
import { DiscountCouponModal } from './components/DiscountCouponModal';
import { SmokePack } from './data/smokeData';
import { ServiceTabType } from './components/ServicesBento';

export default function App() {
  const configuratorRef = useRef<HTMLDivElement | null>(null);
  const simulatorRef = useRef<HTMLDivElement | null>(null);
  const servicesRef = useRef<HTMLDivElement | null>(null);
  const [serviceTab, setServiceTab] = useState<ServiceTabType>('todos');

  const scrollToConfigurator = () => {
    configuratorRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToSimulator = () => {
    simulatorRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenServiceTab = (tab: ServiceTabType) => {
    setServiceTab(tab);
    servicesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectService = (_serviceName: string) => {
    scrollToConfigurator();
  };

  const handleSelectPack = (_pack: SmokePack) => {
    scrollToConfigurator();
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col selection:bg-rose-500 selection:text-white">
      {/* Top Bar Navigation: Logo, Services Menu & WhatsApp */}
      <Navbar
        onOpenConfigurator={scrollToConfigurator}
        onSelectServiceTab={handleOpenServiceTab}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Full-Viewport Real Video Hero with Dark Overlay & Aerial Smoke Effect */}
        <Hero
          onScrollToSimulator={scrollToSimulator}
          onOpenConfigurator={scrollToConfigurator}
        />

        {/* 2. Tabbed Services Showcase (Humo Aéreo & Máquina de Espuma Bajo, Chispas Frías) */}
        <div ref={servicesRef}>
          <ServicesBento
            onSelectService={handleSelectService}
            activeTab={serviceTab}
            onTabChange={setServiceTab}
          />
        </div>

        {/* 3. Interactive Smoke Simulator Section (1 to 9 Cannons & Custom Colors) */}
        <section id="simulador" ref={simulatorRef} className="py-20 bg-neutral-50/70 border-b border-neutral-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mb-10">
              <p className="text-xs font-bold text-rose-600 uppercase tracking-widest mb-2">
                Visualizador de Escenarios Reales
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight font-display">
                Imagina y Siente la Magia en Vuestro Espacio
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 mt-2">
                Experimenta en directo cómo lucirá vuestra combinación de colores: <strong>dispara con la cámara de tu móvil en el sitio</strong> o sube una foto de vuestra finca para ver los cañones integrados en vuestro escenario.
              </p>
            </div>

            <SmokeSimulator />
          </div>
        </section>

        {/* 4. Interactive Configurator & Quote Request */}
        <section id="configurador" ref={configuratorRef} className="py-20 bg-white border-b border-neutral-200">
          <div className="max-w-7xl mx-auto px-6">
            <Configurator />
          </div>
        </section>

        {/* 5. Complete Catalog of Pack Types */}
        <PacksCatalog onSelectPack={handleSelectPack} />

        {/* 6. Why Humo Y Efectos: Safety, CE T1 Certification & Dress Guarantee */}
        <QualityComparison />

        {/* 7. Real Couple Testimonials & Reviews */}
        <TestimonialsSection />

        {/* 8. Regional Coverage & Venue Guide in Spain */}
        <CityCoverage />

        {/* 9. Comprehensive FAQs */}
        <FaqSection />

        {/* 10. Strategic Coverage Map & High Demand Local SEO (Talavera, Madrid, Toledo, Zona Centro, España) */}
        <CoverageMapSection />

        {/* 11. Contact & Proposal Request */}
        <ContactSection />
      </main>

      {/* Footer & Floating AI Assistant + WhatsApp + 10% Discount Coupon Modal */}
      <Footer />
      <AIChatBot />
      <DiscountCouponModal />
    </div>
  );
}
