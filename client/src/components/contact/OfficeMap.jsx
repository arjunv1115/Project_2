import { ExternalLink } from 'lucide-react';
import { SITE } from '@/data/site';

/** Google Map embed (no API key needed) with a fallback link. */
export default function OfficeMap() {
  return (
    <div>
      <div className="overflow-hidden rounded-3xl border border-line bg-mist shadow-card">
        <iframe
          title={`${SITE.name} office location on Google Maps`}
          src={SITE.mapEmbedUrl}
          className="block h-[340px] w-full sm:h-[440px]"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <a
        href={SITE.mapLink}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-2 rounded font-semibold text-teal-700 hover:underline"
      >
        Open in Google Maps
        <ExternalLink className="h-4 w-4" aria-hidden="true" />
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    </div>
  );
}
