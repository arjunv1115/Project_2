import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import PageLoader from '@/components/ui/PageLoader';
import Footer from './Footer';
import Navbar from './Navbar';
import ScrollToTop from './ScrollToTop';

export default function Layout() {
  return (
    <>
      <ScrollToTop />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-amber-400 focus:px-5 focus:py-3 focus:font-semibold focus:text-navy-900"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main">
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
