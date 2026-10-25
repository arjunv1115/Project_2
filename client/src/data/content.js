import { Gauge, Handshake, LifeBuoy, ShieldCheck, Users, Wrench, Eye, Target, MessageSquare } from 'lucide-react';

/**
 * Marketing copy shared by several pages.
 *
 * PLACEHOLDERS: the numbers, promises and FAQ answers are sample content.
 * Check each one with Smart Ideal Technologies before the site goes live.
 */

export const WHY_US = [
  {
    icon: ShieldCheck,
    title: 'Clean, documented code',
    text: 'Readable, tested code with setup notes, so any developer can pick it up later.',
  },
  {
    icon: Gauge,
    title: 'Fast on every device',
    text: 'We design for phones first and measure load time, so pages open quickly on slow networks too.',
  },
  {
    icon: Users,
    title: 'One accountable team',
    text: 'The people who plan your project also build and support it. No hand-offs, no finger pointing.',
  },
  {
    icon: LifeBuoy,
    title: 'Support after launch',
    text: 'We monitor, fix and improve your product once it is live, with response times agreed upfront.',
  },
];

export const PROCESS_STEPS = [
  {
    title: 'Discover',
    text: 'We learn your goals, users and limits, then agree on scope, timeline and cost in writing.',
  },
  {
    title: 'Design',
    text: 'You click through wireframes and prototypes before we write any production code.',
  },
  {
    title: 'Build',
    text: 'Two-week sprints end with a working demo, so you see real progress and can steer early.',
  },
  {
    title: 'Launch and support',
    text: 'We deploy, monitor and keep improving the product after it goes live.',
  },
];

export const TECHNOLOGIES = [
  'Symfony',
  'React',
  'Node.js',
  'MySQL',
  'Tailwind CSS',
  'React Native',
  'TypeScript',
  'AWS',
  'Docker',
  'Figma',
];

export const VALUES = [
  {
    icon: MessageSquare,
    title: 'Clarity',
    text: 'We explain trade-offs in plain language and put every estimate, scope and change in writing.',
  },
  {
    icon: Wrench,
    title: 'Craftsmanship',
    text: 'We review each other’s code, test before release and leave documentation behind.',
  },
  {
    icon: ShieldCheck,
    title: 'Accountability',
    text: 'We own our deadlines. When something we shipped breaks, we fix it first and discuss it after.',
  },
  {
    icon: Handshake,
    title: 'Partnership',
    text: 'We work as an extension of your team and tell you when a smaller solution will do.',
  },
];

export const COMPANY_INTRO =
  'At SMART IDEAL IT Solutions, we seamlessly blend the power of Symfony and React to create dynamic, interactive, and high-performance web applications. With over a decade of experience in web development, our team has honed its skills in harnessing the strengths of both Symfony and React to deliver cutting-edge solutions.';

export const MISSION_VISION = [
  {
    icon: Target,
    title: 'Our mission',
    text: 'Give every growing business access to well-built, fairly priced software.',
  },
  {
    icon: Eye,
    title: 'Our vision',
    text: 'Be the technology partner clients stay with for years, not just for one project.',
  },
];

export const STATS = [
  { value: '120+', label: 'Projects delivered' },
  { value: '10+ years', label: 'In web development' },
  { value: '60+', label: 'Active clients' },
  { value: '24 hours', label: 'Typical reply time' },
];

export const FAQS = [
  {
    question: 'How long does a company website take?',
    answer:
      'Most five-page company websites launch in three to five weeks once we have your content and images. Larger sites and web apps are planned in phases, with the first release usually inside eight weeks.',
  },
  {
    question: 'How do you price projects?',
    answer:
      'Clearly scoped work is quoted at a fixed price. Ongoing development is billed monthly. You always receive a written estimate before we start.',
  },
  {
    question: 'Who owns the code and the design?',
    answer:
      'You do. On final payment we hand over the source code, design files, documentation and every account we set up for you.',
  },
  {
    question: 'Can you work with our existing website or systems?',
    answer:
      'Yes. We regularly improve, rebuild or connect to existing sites, databases and tools. We start with a short review so the plan fits what you already have.',
  },
  {
    question: 'Do you offer support after launch?',
    answer:
      'Yes. Maintenance plans cover updates, security patches, backups and a set number of change requests each month. We agree on response times before you sign.',
  },
];
