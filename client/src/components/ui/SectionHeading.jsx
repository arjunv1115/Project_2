/** Heading plus optional intro paragraph for a page section. */
export default function SectionHeading({
  title,
  intro,
  align = 'left',
  light = false,
  as: Tag = 'h2',
  className = '',
}) {
  const alignment = align === 'center' ? 'mx-auto text-center' : '';

  return (
    <div className={`max-w-2xl ${alignment} ${className}`}>
      <Tag
        className={`text-3xl font-bold leading-tight sm:text-4xl ${light ? '!text-white' : ''}`}
      >
        {title}
      </Tag>
      {intro && (
        <p
          className={`mt-4 text-lg leading-relaxed ${light ? 'text-navy-200' : 'text-body'}`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
