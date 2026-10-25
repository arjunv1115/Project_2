import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import ContactForm from '@/components/contact/ContactForm';
import OfficeMap from '@/components/contact/OfficeMap';
import Seo from '@/components/seo/Seo';
import Container from '@/components/ui/Container';
import PageHeader from '@/components/ui/PageHeader';
import SectionHeading from '@/components/ui/SectionHeading';
import { getServiceById } from '@/data/services';
import { SITE } from '@/data/site';
import { contactPageSchema } from '@/utils/structuredData';

export default function Contact() {
  const [searchParams] = useSearchParams();

  // "Ask about this service" links arrive as /contact?service=web-development.
  const service = getServiceById(searchParams.get('service'));
  const initialValues = service ? { subject: `Enquiry about ${service.title}` } : {};

  const details = [
    {
      icon: MapPin,
      label: 'Visit us',
      content: (
        <>
          {SITE.address.lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
          {SITE.address.locality}, {SITE.address.region} {SITE.address.postalCode}
        </>
      ),
    },
    {
      icon: Phone,
      label: 'Call us',
      content: (
        <a href={SITE.phoneHref} className="rounded font-medium text-navy-900 hover:text-teal-700">
          {SITE.phone}
        </a>
      ),
    },
    {
      icon: Mail,
      label: 'Email us',
      content: (
        <a
          href={`mailto:${SITE.email}`}
          className="break-all rounded font-medium text-navy-900 hover:text-teal-700"
        >
          {SITE.email}
        </a>
      ),
    },
    { icon: Clock, label: 'Opening hours', content: SITE.hours },
  ];

  return (
    <>
      <Seo
        title="Contact Us"
        path="/contact"
        description="Contact Smart Ideal Technologies to discuss your website, app or software project. Send a message, call or visit our office. We reply within one business day."
        jsonLd={contactPageSchema()}
      />

      <PageHeader
        title="Tell us what you need"
        crumb="Contact Us"
        intro="Share a few details about your project. A member of our team will reply within one business day."
      />

      <section className="section-y">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <div>
            <h2 className="text-2xl font-bold">Contact details</h2>
            <ul className="mt-8 space-y-7">
              {details.map(({ icon: Icon, label, content }) => (
                <li key={label} className="flex gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-base font-bold">{label}</h3>
                    <div className="mt-1 leading-relaxed text-body">{content}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-line bg-white p-6 shadow-card sm:p-9">
            <h2 className="text-2xl font-bold">Send us a message</h2>
            <p className="mb-7 mt-2 text-body">All fields are required unless marked optional.</p>
            {/* Remount when the pre-filled service changes so the subject updates. */}
            <ContactForm key={service?.id || 'general'} initialValues={initialValues} />
          </div>
        </Container>
      </section>

      <section className="bg-mist section-y" aria-labelledby="map-heading">
        <Container>
          <SectionHeading
            title="Find our office"
            intro="Parking is available on site. Please book a time first so the right person is there to meet you."
          />
          <div id="map-heading" className="mt-10">
            <OfficeMap />
          </div>
        </Container>
      </section>
    </>
  );
}
