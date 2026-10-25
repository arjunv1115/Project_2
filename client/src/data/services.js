import { Braces, CloudCog, Globe, Headset, PenTool, Smartphone } from 'lucide-react';
import cloudDevops from '@/assets/services/cloud-devops.svg';
import customSoftware from '@/assets/services/custom-software.svg';
import itConsulting from '@/assets/services/it-consulting.svg';
import mobileApps from '@/assets/services/mobile-apps.svg';
import uiUxDesign from '@/assets/services/ui-ux-design.svg';
import webDevelopment from '@/assets/services/web-development.svg';

export const SERVICES = [
  {
    id: 'web-development',
    title: 'Website and web app development',
    short: 'Fast, responsive websites and web apps your customers enjoy using.',
    description:
      'From a five-page company website to a customer portal with logins and payments, we build for speed, search visibility and easy updates. Every site is tested on phones, tablets and desktops before it goes live.',
    icon: Globe,
    image: webDevelopment,
    imageAlt: 'A website layout on a browser window with a cursor selecting an image block',
    features: [
      'Company websites and landing pages',
      'Web apps and customer portals',
      'Online stores and payment integration',
      'Performance, SEO and accessibility built in',
    ],
  },
  {
    id: 'mobile-apps',
    title: 'Mobile app development',
    short: 'Android and iOS apps that feel native and stay easy to maintain.',
    description:
      'We build one codebase that runs on Android and iOS, so you launch sooner and pay less to maintain it. Apps connect to your existing systems and keep working when the network does not.',
    icon: Smartphone,
    image: mobileApps,
    imageAlt: 'Two smartphones showing a feed screen and an analytics dashboard',
    features: [
      'Cross-platform apps with React Native',
      'Offline mode and push notifications',
      'App Store and Google Play submission',
      'Integration with your existing systems',
    ],
  },
  {
    id: 'custom-software',
    title: 'Custom software and APIs',
    short: 'Business software, dashboards and APIs shaped around the way you work.',
    description:
      'When spreadsheets and off-the-shelf tools stop fitting, we build software that matches your process. We design the database, the API and the screens together so they stay simple to extend.',
    icon: Braces,
    image: customSoftware,
    imageAlt: 'Three server units connected to an API badge and a database',
    features: [
      'CRM, inventory, billing and booking tools',
      'REST APIs and third-party integrations',
      'Secure login with role-based access',
      'Data migration from spreadsheets and legacy tools',
    ],
  },
  {
    id: 'cloud-devops',
    title: 'Cloud and DevOps',
    short: 'Reliable hosting, automated releases and monitoring that lets you sleep.',
    description:
      'We set up hosting that stays online, releases that ship without downtime and alerts that reach the right person. You get a setup your team can understand, with costs that stay predictable.',
    icon: CloudCog,
    image: cloudDevops,
    imageAlt: 'A cloud connected to three containers with a continuous delivery loop',
    features: [
      'Setup on AWS, Azure or Google Cloud',
      'CI/CD pipelines and automated testing',
      'Backups, monitoring and uptime alerts',
      'Cost reviews and scaling plans',
    ],
  },
  {
    id: 'ui-ux-design',
    title: 'UI and UX design',
    short: 'Clear, accessible interfaces designed around real user needs.',
    description:
      'We talk to your users, map how they move through the product and test clickable prototypes before development starts. The result is an interface that is easy to learn and costly mistakes caught early.',
    icon: PenTool,
    image: uiUxDesign,
    imageAlt: 'A design canvas with a selected shape, a curve with anchor points and colour swatches',
    features: [
      'User research and journey mapping',
      'Wireframes and clickable prototypes',
      'Design systems that match your brand',
      'Usability testing before launch',
    ],
  },
  {
    id: 'it-consulting',
    title: 'IT consulting and support',
    short: 'Straight advice and dependable support for the technology you already run.',
    description:
      'Not sure what to build, buy or retire? We review your current setup, explain the options in plain language and stay on hand for fixes, updates and training once the plan is in motion.',
    icon: Headset,
    image: itConsulting,
    imageAlt: 'A security shield with a check mark between two chat bubbles',
    features: [
      'Technology audits and roadmaps',
      'Security reviews and best practices',
      'Maintenance and bug-fix retainers',
      'Training for your team',
    ],
  },
];

export const getServiceById = (id) => SERVICES.find((service) => service.id === id);
