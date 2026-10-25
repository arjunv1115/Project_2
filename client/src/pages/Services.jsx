import { Check, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import Seo from '@/components/seo/Seo';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import CtaBand from '@/components/ui/CtaBand';
import PageHeader from '@/components/ui/PageHeader';
import SectionHeading from '@/components/ui/SectionHeading';
import { FAQS } from '@/data/content';
import { SERVICES } from '@/data/services';
import { faqSchema } from '@/utils/structuredData';

export default function Services() {
  return (
    <>
      <Seo
        title="Services"
        path="/services"
        description="Website and web app development, mobile apps, custom software, cloud and DevOps, UI/UX design and IT consulting from Smart Ideal Technologies."
        jsonLd={faqSchema(FAQS)}
      />

      <PageHeader
        title="Services for every stage of your product"
        crumb="Services"
        intro="Pick one service or combine several. Each one comes with a written scope, a fixed timeline and a named contact."
      >
        <ul className="mt-8 flex flex-wrap gap-2.5" aria-label="Jump to a service">
          {SERVICES.map((service) => (
            <li key={service.id}>
              <Link
                to={{ pathname: '/services', hash: `#${service.id}` }}
                className="inline-flex items-center gap-2 rounded-full border border-navy-900/15 bg-white px-4 py-2 text-[0.95rem] font-semibold text-navy-900 transition-colors hover:border-teal-500 hover:bg-teal-50"
              >
                <service.icon className="h-4 w-4 text-teal-700" aria-hidden="true" />
                {service.title}
              </Link>
            </li>
          ))}
        </ul>
      </PageHeader>

      {/* Service details */}
      <div>
        {SERVICES.map((service, index) => {
          const reversed = index % 2 === 1;
          return (
            <section
              key={service.id}
              id={service.id}
              aria-labelledby={`${service.id}-title`}
              className={`scroll-mt-32 section-y ${reversed ? 'bg-mist' : ''}`}
            >
              <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <img
                  src={service.image}
                  alt={service.imageAlt}
                  width="480"
                  height="360"
                  loading="lazy"
                  className={`mx-auto h-auto w-full max-w-[520px] rounded-[1.75rem] shadow-card ${reversed ? 'lg:order-2' : ''}`}
                />
                <div className={reversed ? 'lg:order-1' : ''}>
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
                    <service.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h2 id={`${service.id}-title`} className="mt-5 text-3xl font-bold leading-tight sm:text-4xl">
                    {service.title}
                  </h2>
                  <p className="mt-4 text-lg leading-relaxed text-body">{service.description}</p>
                  <ul className="mt-6 space-y-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 font-medium text-navy-900">
                        <Check
                          className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-teal-100 p-1 text-teal-700"
                          aria-hidden="true"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    to={{ pathname: '/contact', search: `?service=${service.id}` }}
                    className="mt-8"
                  >
                    Ask about this service
                  </Button>
                </div>
              </Container>
            </section>
          );
        })}
      </div>

      {/* FAQ */}
      <section className="section-y" aria-labelledby="faq-heading">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading
            as="h2"
            title="Questions we hear often"
            intro="Not here? Send us a message and we will answer within one business day."
          />
          <div id="faq-heading" className="divide-y divide-line rounded-3xl border border-line bg-white">
            {FAQS.map((faq) => (
              <details key={faq.question} className="group px-6 py-5 sm:px-8">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded font-display text-lg font-bold text-navy-900 [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <ChevronDown
                    className="h-5 w-5 shrink-0 text-teal-700 transition-transform duration-200 group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <p className="mt-3 max-w-2xl leading-relaxed text-body">{faq.answer}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand
        title="Not sure which service you need?"
        text="Describe the problem you want to solve. We will recommend the smallest solution that works."
      />
    </>
  );
}
