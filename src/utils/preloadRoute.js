// Preload route chunks on hover or idle with safe catch
export const preloadRoute = (target) => {
  try {
    if (target === 'about') {
      import('../components/About/AboutSection').catch(() => {});
    } else if (target === 'contact' || target?.startsWith('/contact')) {
      import('../components/Contact/ContactPage').catch(() => {});
    } else if (target === 'products' || target?.startsWith('/products')) {
      import('../components/Products/pages/ProductsLandingView').catch(() => {});
      import('../components/Products/pages/DivisionView').catch(() => {});
      import('../components/Products/pages/ProductFamilyView').catch(() => {});
      import('../components/Products/pages/ProductDetailView').catch(() => {});
    } else if (target === 'materials' || target?.startsWith('/materials')) {
      import('../components/Materials/pages/MaterialsLandingView').catch(() => {});
      import('../components/Materials/pages/MaterialDetailView').catch(() => {});
    }
  } catch {
    // Ignore prefetch errors
  }
};
