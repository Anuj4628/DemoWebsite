import React, { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import MaterialsSection from './components/Materials/MaterialsSection';
import ProductsSection from './components/Products/ProductsSection';
import WhyChooseSection from './components/WhyChoose/WhyChooseSection';
import IndustriesSection from './components/Industries/IndustriesSection';
import ValueAddedSection from './components/ValueAdded/ValueAddedSection';
import ClientNetworkSection from './components/Clients/ClientNetworkSection';
import GlobalExportSection from './components/Export/GlobalExportSection';
import FinalCTASection from './components/CTA/FinalCTASection';
import Footer from './components/Footer/Footer';
import FloatingContactButtons from './components/UI/FloatingContactButtons';

// Lazy-loaded routes for ultra-fast initial bundle and snappy navigation
const AboutSection = lazy(() => import('./components/About/AboutSection'));
const ProductsLandingView = lazy(() => import('./components/Products/pages/ProductsLandingView'));
const DivisionView = lazy(() => import('./components/Products/pages/DivisionView'));
const ProductFamilyView = lazy(() => import('./components/Products/pages/ProductFamilyView'));
const ProductDetailView = lazy(() => import('./components/Products/pages/ProductDetailView'));
const MaterialsLandingView = lazy(() => import('./components/Materials/pages/MaterialsLandingView'));
const MaterialDetailView = lazy(() => import('./components/Materials/pages/MaterialDetailView'));
const ContactPage = lazy(() => import('./components/Contact/ContactPage'));

export { preloadRoute } from './utils/preloadRoute';
import { preloadRoute } from './utils/preloadRoute';

import './App.css';

/**
 * Route parser for native history-based client routing
 */
function parseRoute(pathname = window.location.pathname) {
  const clean = (pathname || '').toLowerCase();

  if (clean.includes('about')) {
    return { page: 'about' };
  }

  if (clean.includes('contact')) {
    return { page: 'contact' };
  }

  if (clean.startsWith('/materials')) {
    const raw = pathname.replace(/^\/materials\/?/i, '');
    const parts = raw.split('/').filter(Boolean);

    if (parts.length === 0) {
      return { page: 'materials', view: 'landing' };
    }

    return { page: 'materials', view: 'material', materialSlug: parts[0].toLowerCase() };
  }

  if (clean.startsWith('/products')) {
    const raw = pathname.replace(/^\/products\/?/i, '');
    const parts = raw.split('/').filter(Boolean);

    if (parts.length === 0) {
      return { page: 'products', view: 'landing' };
    }

    if (parts.length === 1) {
      const p0 = parts[0].toLowerCase();
      if (p0 === 'manufacturer' || p0 === 'supplier') {
        return { page: 'products', view: 'landing' };
      }
      return { page: 'products', view: 'family', groupSlug: parts[0] };
    }

    if (parts.length === 2) {
      const p0 = parts[0].toLowerCase();
      if (p0 === 'manufacturer' || p0 === 'supplier') {
        return { page: 'products', view: 'family', divisionSlug: p0, groupSlug: parts[1] };
      }
      return { page: 'products', view: 'detail', groupSlug: parts[0], productSlug: parts[1] };
    }

    if (parts.length >= 3) {
      return {
        page: 'products',
        view: 'detail',
        divisionSlug: parts[0].toLowerCase(),
        groupSlug: parts[1],
        productSlug: parts[2]
      };
    }
  }

  return { page: 'home' };
}

/**
 * Bhawal Steel & Engineering Company - Application Root
 */
export default function App() {
  const [route, setRoute] = useState(parseRoute);

  // Dynamic document title management across routes
  useEffect(() => {
    if (route.page === 'about') {
      document.title = 'About Us | Bhawal Steel & Engineering Company — Metallurgy, Heritage & Supply';
    } else if (route.page === 'contact') {
      document.title = 'Contact Us | Bhawal Steel & Engineering Company — Technical Desk & Location';
    } else if (route.page === 'materials') {
      if (route.view === 'material' && route.materialSlug) {
        const matName = route.materialSlug.replace(/-/g, ' ').toUpperCase();
        document.title = `${matName} Products | Bhawal Steel & Engineering Company`;
      } else {
        document.title = 'Materials & Alloys Catalog | Bhawal Steel & Engineering Company';
      }
    } else if (route.page === 'products') {
      if (route.view === 'detail' && route.productSlug) {
        const prodName = route.productSlug.replace(/-/g, ' ').toUpperCase();
        document.title = `${prodName} | Bhawal Steel & Engineering Company`;
      } else if (route.view === 'family' && route.groupSlug) {
        const grpName = route.groupSlug.replace(/-/g, ' ').toUpperCase();
        document.title = `${grpName} | Bhawal Steel & Engineering Company`;
      } else if (route.view === 'division' && route.divisionSlug) {
        const divName = route.divisionSlug === 'manufacturer' ? 'Manufacturer Division' : 'Supplier Division';
        document.title = `${divName} | Bhawal Steel & Engineering Company`;
      } else {
        document.title = 'Industrial Products Catalog | Bhawal Steel & Engineering Company';
      }
    } else {
      document.title = 'Bhawal Steel & Engineering Company | Steel Products & Solutions, Mumbai';
    }
  }, [route]);

  // Centralized page and section navigation handler
  const navigateTo = useCallback((target, param = null) => {
    // If target is a path string starting with '/'
    if (typeof target === 'string' && target.startsWith('/')) {
      if (window.location.pathname !== target) {
        window.history.pushState({}, '', target);
      }
      setRoute(parseRoute(target));
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    if (target === 'about') {
      if (window.location.pathname !== '/about') {
        window.history.pushState({ page: 'about' }, '', '/about');
      }
      setRoute({ page: 'about' });
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    if (target === 'contact') {
      if (window.location.pathname !== '/contact') {
        window.history.pushState({ page: 'contact' }, '', '/contact');
      }
      setRoute({ page: 'contact' });
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    if (target === 'materials') {
      const dest = param ? (param.startsWith('/') ? param : `/materials/${param}`) : '/materials';
      if (window.location.pathname !== dest) {
        window.history.pushState({ page: 'materials' }, '', dest);
      }
      setRoute(parseRoute(dest));
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    if (target === 'products') {
      const dest = param ? (param.startsWith('/') ? param : `/products/${param}`) : '/products';
      if (window.location.pathname !== dest) {
        window.history.pushState({ page: 'products' }, '', dest);
      }
      setRoute(parseRoute(dest));
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    // Navigate to Home with optional section scrolling
    const targetUrl = param ? `/#${param}` : '/';
    if (window.location.pathname !== '/' || param) {
      window.history.pushState({ page: 'home', section: param }, '', targetUrl);
    }
    setRoute({ page: 'home' });

    if (param) {
      setTimeout(() => {
        const el = document.getElementById(param);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 80);
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, []);

  // Listen to browser Back and Forward navigation buttons
  useEffect(() => {
    const handlePopState = () => {
      const nextRoute = parseRoute(window.location.pathname);
      setRoute(nextRoute);

      const hash = window.location.hash;
      if (hash && nextRoute.page === 'home') {
        setTimeout(() => {
          const el = document.getElementById(hash.replace('#', ''));
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 80);
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Idle preloading of secondary route bundles once initial page load is quiet
  useEffect(() => {
    const idleCallback = window.requestIdleCallback || ((cb) => setTimeout(cb, 1200));
    const idleId = idleCallback(() => {
      preloadRoute('about');
      preloadRoute('contact');
      preloadRoute('products');
      preloadRoute('materials');
    });
    return () => {
      if (window.cancelIdleCallback && typeof idleId === 'number') {
        window.cancelIdleCallback(idleId);
      }
    };
  }, []);

  return (
    <div className="app-container">
      {/* 1. Global Navbar with integrated page navigation */}
      <Navbar currentPage={route.page} onNavigate={navigateTo} />

      {/* 2. Page Switcher with Instant Suspense Fallback */}
      {route.page === 'about' ? (
        /* Dedicated Independent About Page */
        <main id="main-content" className="about-page-main">
          <Suspense fallback={<div className="page-load-shell about-shell" aria-hidden="true" />}>
            <AboutSection onNavigate={navigateTo} />
          </Suspense>
        </main>
      ) : route.page === 'contact' ? (
        /* Dedicated Independent Contact Page */
        <main id="main-content" className="contact-page-main">
          <Suspense fallback={<div className="page-load-shell contact-shell" aria-hidden="true" />}>
            <ContactPage onNavigate={navigateTo} />
          </Suspense>
        </main>
      ) : route.page === 'materials' ? (
        /* Dedicated Materials Catalog Pages */
        <main id="main-content" className="materials-page-main">
          <Suspense fallback={<div className="page-load-shell materials-shell" aria-hidden="true" />}>
            {route.view === 'material' ? (
              <MaterialDetailView
                materialSlug={route.materialSlug}
                onNavigate={navigateTo}
              />
            ) : (
              <MaterialsLandingView onNavigate={navigateTo} />
            )}
          </Suspense>
        </main>
      ) : route.page === 'products' ? (
        /* Dedicated Bright Products Catalog Pages */
        <main id="main-content" className="products-page-main">
          <Suspense fallback={<div className="page-load-shell products-shell" aria-hidden="true" />}>
            {route.view === 'division' ? (
              <DivisionView
                divisionSlug={route.divisionSlug}
                onNavigate={navigateTo}
              />
            ) : route.view === 'family' ? (
              <ProductFamilyView
                divisionSlug={route.divisionSlug}
                groupSlug={route.groupSlug}
                onNavigate={navigateTo}
              />
            ) : route.view === 'detail' ? (
              <ProductDetailView
                divisionSlug={route.divisionSlug}
                groupSlug={route.groupSlug}
                productSlug={route.productSlug}
                onNavigate={navigateTo}
              />
            ) : (
              <ProductsLandingView onNavigate={navigateTo} />
            )}
          </Suspense>
        </main>
      ) : (
        /* Full Commercial Home Page (About and Products catalog views are isolated) */
        <main id="main-content" className="home-page-main">
          <Hero onNavigate={navigateTo} />
          <ProductsSection onNavigate={navigateTo} />
          <MaterialsSection onNavigate={navigateTo} />
          <WhyChooseSection />
          <IndustriesSection />
          <ValueAddedSection />
          <ClientNetworkSection />
          <GlobalExportSection />
          <FinalCTASection onNavigate={navigateTo} />
        </main>
      )}

      {/* 3. Corporate Footer */}
      <Footer currentPage={route.page} onNavigate={navigateTo} />

      {/* 4. Floating Direct Contact Buttons (WhatsApp & Direct Call) */}
      <FloatingContactButtons />
    </div>
  );
}
