import aboutIllustration from '@/assets/images/about-illustration.svg';
import Seo from '@/components/seo/Seo';
import Container from '@/components/ui/Container';
import CtaBand from '@/components/ui/CtaBand';
import FeatureGrid from '@/components/ui/FeatureGrid';
import PageHeader from '@/components/ui/PageHeader';
import SectionHeading from '@/components/ui/SectionHeading';
import { COMPANY_INTRO, MISSION_VISION, STATS, VALUES } from '@/data/content';
import { SITE } from '@/data/site';

export default function About() {
  return (
    <>
      <Seo
        title="About Us"
        path="/about"
        description="Meet Smart Ideal Technologies: a software team that builds dependable websites, mobile apps and business systems, and stays with clients after launch."
      />

      <PageHeader
        title="Technology that makes work easier"
        crumb="About Us"
        intro={`${SITE.name} is a software company that helps growing businesses turn ideas into dependable digital products.`}
      />

      {/* Story */}
      <section className="section-y">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading title="Built on a simple belief" />
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-body">
              <p>{COMPANY_INTRO}</p>
              <p>
                We started {SITE.name} because too many businesses were stuck with software that was
                slow, confusing or impossible to change. Technology should remove work, not add it.
              </p>
              <p>
                Today our team of designers, developers and engineers builds websites, mobile apps and
                custom systems for companies across industries. We keep projects small enough to
                finish, clear enough to explain and solid enough to grow.
              </p>
              <p>
                We stay after launch too. Monitoring, fixes and new features are part of the
                relationship, because a product is only useful while it works.
              </p>
            </div>

            <dl className="mt-10 grid gap-6 sm:grid-cols-2">
              {MISSION_VISION.map(({ icon: Icon, title, text }) => (
                <div key={title} className="rounded-2xl border border-line bg-mist p-6">
                  <dt className="flex items-center gap-3 font-display text-lg font-bold text-navy-900">
                    <Icon className="h-5 w-5 text-teal-700" aria-hidden="true" />
                    {title}
                  </dt>
                  <dd className="mt-2 leading-relaxed text-body">{text}</dd>
                </div>
              ))}
            </dl>
          </div>

          <img
            src={aboutIllustration}
            alt="A light bulb with circuit traces, surrounded by a web page, a chart and a code badge"
            width="560"
            height="460"
            loading="lazy"
            className="mx-auto h-auto w-full max-w-[560px]"
          />
        </Container>
      </section>

      {/* Values */}
      <section className="bg-mist section-y">
        <Container>
          <SectionHeading
            title="How we work with you"
            intro="Four habits that show up in every project, whatever its size."
          />
          <div className="mt-12">
            <FeatureGrid items={VALUES} columns={4} />
          </div>
        </Container>
      </section>

      {/* Numbers */}
      <section className="section-y">
        <Container>
          <SectionHeading title="Smart Ideal in numbers" />
          <dl className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map(({ value, label }) => (
              <div key={label} className="bg-white px-7 py-9">
                <dd className="font-display text-4xl font-extrabold tracking-tight text-navy-900 sm:text-5xl">
                  {value}
                </dd>
                <dt className="mt-2 font-medium text-muted">{label}</dt>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <CtaBand
        title="Let’s build something that lasts"
        text="Tell us where you are and where you want to be. We will suggest the simplest way to get there."
      />
    </>
  );
}
