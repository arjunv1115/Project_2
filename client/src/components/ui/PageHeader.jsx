import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from './Container';

/** Title block at the top of every inner page, with a breadcrumb trail. */
export default function PageHeader({ title, intro, crumb, children }) {
  return (
    <section className="relative isolate overflow-hidden bg-mist">
      <div className="blueprint-grid absolute inset-0 -z-10" aria-hidden="true" />
      <Container className="py-14 sm:py-20">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted">
          <ol className="flex items-center gap-1.5">
            <li>
              <Link to="/" className="rounded font-medium text-teal-700 hover:underline">
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-4 w-4" />
            </li>
            <li aria-current="page" className="font-medium text-navy-900">
              {crumb || title}
            </li>
          </ol>
        </nav>
        <div className="max-w-3xl animate-rise">
          <h1 className="text-4xl font-extrabold leading-[1.08] sm:text-5xl">{title}</h1>
          {intro && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-body">{intro}</p>}
          {children}
        </div>
      </Container>
    </section>
  );
}
