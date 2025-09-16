const languages = [
  'TypeScript',
  'Node.js',
  'GraphQL',
  'gRPC',
  'REST',
  'postgreSQL',
  'MySQL',
  'MongoDB',
  'Redis',
  'HTML',
  'CSS',
] as const;
const frameworks = [
  'Express',
  'NestJS',
  'Next.js',
  'Nuxt',
  'Expo',
  'Redux',
  'TailwindCSS',
  'React',
  'Apollo',
  'Drupal',
  'Laravel',
  'React.js',
  'React Native',
] as const;
const devops = [
  'AWS EKS',
  'AWS S3',
  'AWS RDS',
  'AWS EC2',
  'AWS Route53',
  'AWS CloudFront',
  'AWS CDK',
  'AWS DynamoDB',
  'AWS Lambda',
  'AWS RedShift',
  'Step Functions',
  'AWS ELB',
  'WAF',
  'Kubernetes',
  'Terraform',
  'Cloudflare',
  'Docker',
  'CI/CD',
  'Linux',
  'Github Actions',
  'CircleCI',
  'Jenkins',
] as const;
const strengths = [
  'End-to-End Delivery',
  'Technical Vision',
  'Performance Tuning',
  'Debugging',
  'Team Leadership',
  'FinTech & SaaS',
] as const;

export const tagType = (t: TagType): 'language' | 'framework' | 'devops' | 'strength' | false => {
  if (languages.includes(t as LanguagesType)) return 'language';
  if (frameworks.includes(t as FrameworksType)) return 'framework';
  if (devops.includes(t as DevopsType)) return 'devops';
  if (strengths.includes(t as StrengthsType)) return 'strength';
  return false;
};

export type LanguagesType = (typeof languages)[number];
export type FrameworksType = (typeof frameworks)[number];
export type DevopsType = (typeof devops)[number];
export type StrengthsType = (typeof strengths)[number];
export type TagType = LanguagesType | FrameworksType | DevopsType | StrengthsType;

type ExperienceType = {
  title: string;
  company: string;
  location: string;
  start: string;
  end: string;
  bullets: string[];
  languages: LanguagesType[];
  frameworks: FrameworksType[];
  devops: DevopsType[];
  strengths: StrengthsType[];
};

type ResumeType = {
  name: string;
  generalTitle: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  summary: string;
  skills: {
    languages: readonly LanguagesType[];
    frameworks: readonly FrameworksType[];
    devops: readonly DevopsType[];
    strengths: readonly StrengthsType[];
  };
  experience: ExperienceType[];
};

// ---------- Data (edit as needed) ----------
export const resumeData: ResumeType = {
  name: 'Jonathan Troncoso',
  generalTitle: 'Senior Software Engineer | Cloud Solutions Architect | Technical Leader',
  email: 'jon.troncoso@gmail.com',
  phone: '(303) 345-1239',
  linkedin: 'https://www.linkedin.com/in/jonathan-troncoso-0b687360/',
  github: 'https://github.com/jontroncoso/Troncoso',
  summary:
    'Senior Software Engineer & Technical Leader with 10+ years building and scaling fintech, SaaS, and consumer platforms. Expert in AWS, Kubernetes, microservices (gRPC/GraphQL/REST), and modern web/mobile. Blends hands-on delivery with team leadership to ship reliable, secure, and high-impact products.',
  skills: { languages, devops, strengths, frameworks },
  experience: [
    {
      title: 'Product Engineer',
      company: 'CARD.com',
      location: 'Los Angeles, CA',
      start: 'Nov 2019',
      end: 'Aug 2024',
      bullets: [
        'Recruited and managed developers; set code quality standards and mentoring practices.',
        'Architected and managed a secure Kubernetes control plane on AWS (EKS) via CDK with ALB-backed nodes, WAF protection, and subdomains via Route53.',
        'Designed, implemented, and debugged gRPC, GraphQL, and RESTful microservices for core fintech functions.',
        'Deployed React Native apps to the App Store and Google Play with Firebase-based debugging and release workflows.',
        'Built and maintained a Twilio IVR microservice to streamline support and reduce call handling time.',
      ],
      languages: ['TypeScript', 'Node.js', 'React Native', 'React.js', 'GraphQL', 'gRPC', 'REST'],
      frameworks: ['NestJS', 'Expo', 'Redux', 'Apollo', 'TailwindCSS'],
      devops: [
        'AWS CDK',
        'AWS Route53',
        'AWS Route53',
        'AWS RDS',
        'AWS RedShift',
        'AWS Lambda',
        'AWS DynamoDB',
        'AWS EC2',
        'AWS S3',
        'AWS ELB',
        'Kubernetes',
        'Cloudflare',
        'Docker',
        'CI/CD',
        'Linux',
        'Step Functions',
        'Jenkins',
        'Github Actions',
        'CircleCI',
        'AWS EKS',
      ],
      strengths: [],
    },
    {
      title: 'Full Stack Engineer',
      company: 'Amply',
      location: 'Los Angeles, CA',
      start: 'Aug 2017',
      end: 'Aug 2019',
      bullets: [
        'Delivered SaaS platform using Laravel, MySQL, AWS (EC2, RDS, S3).',
        'Built responsive UI with React.js and Bootstrap.',
        'Optimized backend queries and performance.',
        'Helped migrate zend to laravel framework.',
        'Created custom laravel artisan commands and crons for data processing and reporting.',
      ],
      languages: ['TypeScript', 'Node.js', 'React Native', 'React.js', 'GraphQL', 'gRPC', 'REST'],
      frameworks: ['NestJS', 'Expo', 'Redux', 'Apollo', 'TailwindCSS'],
      devops: ['AWS ELB', 'AWS EC2', 'AWS RDS', 'AWS S3', 'Linux', 'CI/CD', 'Docker', 'CircleCI'],
      strengths: [
        'Debugging',
        'End-to-End Delivery',
        'Performance Tuning',
        'Technical Vision',
        'Team Leadership',
        'FinTech & SaaS',
      ],
    },
    {
      title: 'Web Developer',
      company: 'Chive Charities',
      location: 'Austin, TX',
      start: 'Dec 2016',
      end: 'Jul 2017',
      bullets: [
        'Built automated donation gifting service integrated with Stripe webhooks and distributor APIs.',
        'Implemented multi-provider email workflows to improve donor engagement and retention.',
        'Integrated analytics tools, A/B testing, and Session Recordings to enhance UX and engagement.',
      ],
      languages: ['TypeScript', 'Node.js', 'React Native', 'React.js', 'GraphQL', 'gRPC', 'REST'],
      frameworks: ['NestJS', 'Expo', 'Redux', 'Apollo', 'TailwindCSS'],
      devops: [],
      strengths: [],
    },
    {
      title: 'Lead Developer',
      company: 'HighBridge Creative, Inc.',
      location: '—',
      start: '2015',
      end: 'Dec 2016',
      bullets: [
        'Built and maintained custom Laravel applications and WordPress sites.',
        'Managed React/Redux frontends consuming RESTful APIs.',
        'Managed AWS hosting and deployments.',
        'Mentored junior developers.',
        'Enforced coding standards and reviews.',
      ],
      languages: ['TypeScript', 'Node.js', 'React Native', 'React.js', 'GraphQL', 'gRPC', 'REST'],
      frameworks: ['NestJS', 'Expo', 'Redux', 'Apollo', 'TailwindCSS'],
      devops: [],
      strengths: [],
    },
    {
      title: 'Developer',
      company: 'ActiveJunky.com',
      location: '—',
      start: '2012',
      end: 'May 2015',
      bullets: [
        'Engineered SaaS features and optimized backend for high-traffic ecommerce platform.',
        'Helped facilitate migration to RoR backend while maintaining legacy Laravel platform.',
        'Reduced AWS hosting costs through infrastructure optimizations.',
      ],
      languages: ['TypeScript', 'Node.js', 'React Native', 'React.js', 'GraphQL', 'gRPC', 'REST'],
      frameworks: ['NestJS', 'Expo', 'Redux', 'Apollo', 'TailwindCSS'],
      devops: [],
      strengths: [],
    },
    {
      title: 'Founder',
      company: 'Vidliography',
      location: 'Denver, CO',
      start: 'Oct 2011',
      end: '2015',
      bullets: [
        'Built and launched a video platform managing product dev, cloud hosting, and database optimization.',
      ],
      languages: ['TypeScript', 'Node.js', 'React Native', 'React.js', 'GraphQL', 'gRPC', 'REST'],
      frameworks: ['NestJS', 'Expo', 'Redux', 'Apollo', 'TailwindCSS'],
      devops: [],
      strengths: [],
    },
    {
      title: 'Web Developer',
      company: 'Cactus Marketing Communications',
      location: '—',
      start: 'Oct 2012',
      end: 'Feb 2013',
      bullets: ['Delivered custom web solutions; contributed to backend and integrations.'],
      languages: ['TypeScript', 'Node.js', 'React Native', 'React.js', 'GraphQL', 'gRPC', 'REST'],
      frameworks: ['NestJS', 'Expo', 'Redux', 'Apollo', 'TailwindCSS'],
      devops: [],
      strengths: [],
    },
    {
      title: 'Web Developer',
      company: 'Spire Digital',
      location: '—',
      start: 'Jun 2010',
      end: 'Jun 2012',
      bullets: [
        'Shipped production features and improved developer tooling and delivery cadence.',
        'Created complex Drupal sites using custom modules and themes.',
      ],
      languages: ['TypeScript', 'Node.js', 'React Native', 'React.js', 'GraphQL', 'gRPC', 'REST'],
      frameworks: ['NestJS', 'Expo', 'Redux', 'Apollo', 'TailwindCSS'],
      devops: [],
      strengths: [],
    },
  ],
};
