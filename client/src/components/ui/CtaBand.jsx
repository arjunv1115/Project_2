import { Phone } from 'lucide-react';
import { SITE } from '@/data/site';
import Button from './Button';
import Container from './Container';

/** Closing call to action shown at the bottom of every page. */
export default function CtaBand({
  title = 'Have a project in mind?',
  text = 'Send us a short brief. You will get a clear estimate and next steps within one business day.',
}) {
  return (
    <section className="pb-16 sm:pb-20 lg:pb-24">
      <Container>
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-navy-900 px-6 py-12 sm:px-12 sm:py-16">
          <div className="blueprint-grid-dark absolute inset-0 -z-10 opacity-70" aria-hidden="true" />
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold leading-tight !text-white sm:text-4xl">{title}</h2>
            <p className="mt-4 text-lg leading-relaxed text-navy-200">{text}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/contact" variant="accent">
                Contact us
              </Button>
              <Button href={SITE.phoneHref} variant="outlineLight" icon={Phone}>
                {SITE.phone}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
