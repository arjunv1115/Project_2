import { Check } from 'lucide-react';
import aboutIllustration from '@/assets/images/about-illustration.svg';
import heroIllustration from '@/assets/images/hero-illustration.svg';
import Seo from '@/components/seo/Seo';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import CtaBand from '@/components/ui/CtaBand';
import FeatureGrid from '@/components/ui/FeatureGrid';
import SectionHeading from '@/components/ui/SectionHeading';
import { PROCESS_STEPS, TECHNOLOGIES, WHY_US } from '@/data/content';
import { SERVICES } from '@/data/services';
import { SITE } from '@/data/site';
import { organizationSchema, websiteSchema } from '@/utils/structuredData';

const HERO_POINTS = ['Fixed-price quotes', 'Works on every screen', 'You own the source code'];

export default function Home() {
  const serviceItems = SERVICES.map((service) => ({
    icon: service.icon,
    title: service.title,
    text: service.short,
    to: { pathname: '/services', hash: `#${service.id}` },
  }));

  return (
    <>
      <Seo path="/" jsonLd={[organizationSchema(), websiteSchema()]} />

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-mist">
        <div className="blueprint-grid absolute inset-0 -z-10" aria-hidden="true" />
        <Container className="grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-[1.02fr_0.98fr] lg:gap-6 lg:py-24">
          <div className="max-w-xl animate-rise">
            <h1 className="text-[2.6rem] font-extrabold leading-[1.04] sm:text-5xl lg:text-[3.7rem]">
              Websites, apps and systems built to last.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-body">
              {SITE.name} designs and builds software for growing businesses: company websites,
              mobile apps and the internal tools that keep your team moving.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/contact">Start a project</Button>
              <Button to="/services" variant="secondary">
                Explore services
              </Button>
            </div>
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-[0.95rem] font-medium text-navy-900">
              {HERO_POINTS.map((point) => (
                <li key={point} className="flex items-center gap-2">
                  <Check className="h-5 w-5 rounded-full bg-teal-100 p-1 text-teal-700" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="animate-rise [animation-delay:150ms]">
            <img
              src={heroIllustration}
              alt="A company website, a mobile app, a database and a cloud connected into one system"
              width="640"
              height="560"
              fetchPriority="high"
              className="mx-auto h-auto w-full max-w-[580px]"
            />
          </div>
        </Container>
      </section>

      {/* Services */}
      <section className="section-y" aria-labelledby="home-services">
        <Container>
          <SectionHeading
            title="Everything your business needs online, from one team"
            intro="Start with a website, add a mobile app later, or bring us in to fix the system you already run."
            className="[&_h2]:max-w-xl"
          />
          <div className="mt-12" id="home-services">
            <FeatureGrid items={serviceItems} columns={3} />
          </div>
        </Container>
      </section>

      {/* Why us */}
      <section className="bg-mist section-y">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <img
            src={aboutIllustration}
            alt="A light bulb with circuit traces, surrounded by a web page, a chart and a code badge"
            width="560"
            height="460"
            loading="lazy"
            className="mx-auto h-auto w-full max-w-[560px] lg:order-1"
          />
          <div>
            <SectionHeading
              title="Careful work you can rely on"
              intro="Good software is quiet. It loads quickly, does what people expect and is easy for the next developer to change."
            />
            <ul className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2">
              {WHY_US.map(({ icon: Icon, title, text }) => (
                <li key={title}>
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-teal-700 shadow-card">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-lg font-bold">{title}</h3>
                  <p className="mt-1.5 leading-relaxed text-body">{text}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="section-y" aria-labelledby="process-heading">
        <Container>
          <SectionHeading
            title="How a project runs"
            intro="Four steps, with a working result and a decision for you at the end of each."
            className="[&_h2]:max-w-xl"
          />
          <ol id="process-heading" className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {PROCESS_STEPS.map((step, index) => (
              <li key={step.title} className="relative">
                {index < PROCESS_STEPS.length - 1 && (
                  <span
                    className="absolute left-14 right-[-1rem] top-6 hidden h-px border-t-2 border-dashed border-teal-200 lg:block"
                    aria-hidden="true"
                  />
                )}
                <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-navy-900 font-display text-lg font-bold text-white">
                  {index + 1}
                </span>
                <h3 className="mt-5 text-xl font-bold">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-body">{step.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Technologies */}
      <section className="border-y border-line bg-white py-14">
        <Container className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-12">
          <h2 className="shrink-0 text-2xl font-bold lg:max-w-[15rem]">Tools we build with</h2>
          <ul className="flex flex-wrap gap-3">
            {TECHNOLOGIES.map((tool) => (
              <li
                key={tool}
                className="flex items-center gap-2 rounded-full border border-line bg-mist px-4 py-2 text-[0.95rem] font-semibold text-navy-900"
              >
                <span className="h-2 w-2 rounded-full bg-teal-500" aria-hidden="true" />
                {tool}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <div className="pt-16 sm:pt-20 lg:pt-24">
        <CtaBand />
      </div>
    </>
  );
}
