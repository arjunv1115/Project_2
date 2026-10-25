import { Link } from 'react-router-dom';

const columnClasses = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
};

/**
 * Items share hairline borders instead of floating as separate cards.
 * Pass `to` on an item to make the whole cell a link.
 */
export default function FeatureGrid({ items, columns = 3 }) {
  return (
    <ul
      className={`grid gap-px overflow-hidden rounded-3xl border border-line bg-line ${columnClasses[columns]}`}
    >
      {items.map(({ icon: Icon, title, text, to, linkLabel }) => (
        <li
          key={title}
          className={`relative bg-white p-7 transition-colors duration-200 sm:p-8 ${to ? 'hover:bg-teal-50' : ''}`}
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
            <Icon className="h-6 w-6" aria-hidden="true" />
          </span>
          <h3 className="mt-5 text-xl font-bold">{title}</h3>
          <p className="mt-2 leading-relaxed text-body">{text}</p>
          {to && (
            <Link
              to={to}
              className="mt-5 inline-flex rounded font-semibold text-teal-700 after:absolute after:inset-0 hover:underline"
            >
              {linkLabel || 'Learn more'}
              <span className="sr-only"> about {title}</span>
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}
