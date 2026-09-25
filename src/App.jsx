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

import { preloadRoute } from './utils/preloadRoute';
import { applySEO } from './utils/seoManager';
import NotFoundPage from './components/UI/NotFoundPage';

import './App.css';

/**
 * Route parser for native history-based client routing
 */
function parseRoute(pathname = window.location.pathname) {
  const clean = (pathname || '').toLowerCase();

  // 1. Direct RFQ Routes
  if (
    clean === '/request-for-quote' || 
    clean === '/rfq' || 
    clean.startsWith('/request-for-quote') || 
    clean.startsWith('/rfq')
  ) {
    return { page: 'rfq' };
  }

  // 2. About Route
  if (clean === '/about' || clean.startsWith('/about')) {
    return { page: 'about' };
  }

  // 3. Contact Route
  if (clean === '/contact' || clean.startsWith('/contact')) {
    return { page: 'contact' };
  }

  // 4. Materials Routes
  if (clean.startsWith('/materials')) {
    const raw = pathname.replace(/^\/materials\/?/i, '');
    const parts = raw.split('/').filter(Boolean);

    if (parts.length === 0) {
      return { page: 'materials', view: 'landing' };
    }

    return { page: 'materials', view: 'material', materialSlug: parts[0].toLowerCase() };
  }

  // 5. Products Routes
  if (clean.startsWith('/products')) {
    const raw = pathname.replace(/^\/products\/?/i, '');
    const parts = raw.split('/').filter(Boolean);

    if (parts.length === 0) {
      return { page: 'products', view: 'landing' };
    }

    if (parts.length === 1) {
      const p0 = parts[0].toLowerCase();
      if (p0 === 'manufacturer' || p0 === 'supplier') {
        return { page: 'products', view: 'division', divisionSlug: p0 };
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

  // 6. Home Route
  if (clean === '/' || clean === '' || clean.startsWith('/#')) {
    return { page: 'home' };
  }

  // 7. Non-matching Route -> 404
  return { page: 'not-found' };
}

/**
 * Bhawal Steel & Engineering Company - Application Root
 */
export default function App() {
  const [route, setRoute] = useState(parseRoute);

  // Dynamic document title, canonical, OG, Twitter, and JSON-LD management across routes
  useEffect(() => {
    applySEO(route);
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

    if (target === 'rfq' || target === '/request-for-quote' || target === '/rfq') {
      if (window.location.pathname !== '/request-for-quote') {
        window.history.pushState({ page: 'rfq' }, '', '/request-for-quote');
      }
      setRoute({ page: 'rfq' });
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
      {route.page === 'not-found' ? (
        /* 404 Not Found Page */
        <main id="main-content" className="not-found-page-main">
          <NotFoundPage onNavigate={navigateTo} />
        </main>
      ) : route.page === 'about' ? (
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
      ) : route.page === 'rfq' ? (
        /* Direct Request for Quote Page */
        <main id="main-content" className="contact-page-main rfq-page-main">
          <Suspense fallback={<div className="page-load-shell contact-shell" aria-hidden="true" />}>
            <ContactPage onNavigate={navigateTo} initialSection="rfq-section" />
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
