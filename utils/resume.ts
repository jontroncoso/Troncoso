const languages = [
  'CSS',
  'GraphQL',
  'gRPC',
  'HTML/XHTML/XML',
  'MongoDB',
  'MySQL',
  'Node.js',
  'postgreSQL',
  'PHP',
  'Python',
  'Redis',
  'Ruby',
  'TypeScript',
] as const;

const frameworks = [
  'Angular',
  'Apollo',
  'Drupal',
  'Expo',
  'Express',
  'Laravel',
  'NestJS',
  'Next.js',
  'Nuxt',
  'OpenAPI',
  'React Native',
  'React',
  'Redux',
  'RoR',
  'Symfony',
  'TailwindCSS',
  'Zend',
  'zod',
] as const;

const devops = [
  'AWS CDK',
  'AWS CloudFront',
  'AWS DynamoDB',
  'AWS EC2',
  'AWS ECR',
  'AWS EKS',
  'AWS ELB',
  'AWS Glue',
  'AWS Lambda',
  'AWS RDS',
  'AWS RedShift',
  'AWS Route53',
  'AWS S3',
  'AWS AppSync',
  'CI/CD',
  'CircleCI',
  'Cloudflare',
  'Docker',
  'Github Actions',
  'Jenkins',
  'Kubernetes',
  'Linux',
  'Step Functions',
  'Terraform',
  'WAF',
  'microservices',
] as const;

const strengths = [
  'End-to-End testing',
  'Software Architecture',
  'Performance Tuning',

  'Team Leadership',
  'FinTech & SaaS',
  'Mentorship',
  'Implemented CI/CD pipelines',
  'Code Migration & Upgrades',
  'Infrastructure Cost Optimization',
  'Migrating Manual Infrastructure to IaC',
  'Security Best Practices',
  'Scalability & Reliability',
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
        'Recruited, trained, and managed developers',
        'Architected and managed a secure Kubernetes control plane on AWS (EKS) via CDK with ALB-backed nodes, WAF protection, and subdomains via Route53.',
        'Designed, implemented, and debugged gRPC, GraphQL, and RESTful microservices for core fintech functions.',
        'Deployed React Native apps to the App Store and Google Play with Firebase-based debugging and release workflows.',
        'Built and maintained a Twilio IVR microservice to streamline support and reduce call handling time.',
        'Built K8S cronjobs for auditing, reporting, and data processing tasks.',
        'Helped organize microservices into monorepo to streamline development and sharing of common libraries.',
        'Led migration from monolithic PHP app to microservices architecture, improving scalability and deployment speed.',
        'Implemented end-to-end testing with Cypress to improve release confidence and reduce bugs.',
        'Optimized AWS costs by 30% through infrastructure right-sizing, reserved instances, Query Optimization, and call caching.',
        'Collaborated with cross-functional teams to define technical requirements and deliver high-impact features on time.',
      ],
      languages: [
        'CSS',
        'GraphQL',
        'gRPC',
        'HTML/XHTML/XML',
        'MongoDB',
        'MySQL',
        'Node.js',
        'postgreSQL',
        'PHP',
        'Python',
        'Redis',
        'TypeScript',
      ],
      frameworks: [
        'Angular',
        'Apollo',
        'Expo',
        'Express',
        'NestJS',
        'React Native',
        'React',
        'TailwindCSS',
        'Symfony',
        'OpenAPI',
        'zod',
        'Next.js',
        'Nuxt',
      ],
      devops: [
        'AWS CDK',
        'AWS DynamoDB',
        'AWS EC2',
        'AWS EKS',
        'AWS ELB',
        'AWS Lambda',
        'AWS RDS',
        'AWS Route53',
        'AWS S3',
        'AWS AppSync',
        'CI/CD',
        'Cloudflare',
        'Docker',
        'Github Actions',
        'Kubernetes',
        'Linux',
        'Terraform',
        'WAF',
        'microservices',
      ],
      strengths: [
        'Code Migration & Upgrades',

        'End-to-End testing',
        'FinTech & SaaS',
        'Infrastructure Cost Optimization',
        'Mentorship',
        'Performance Tuning',
        'Scalability & Reliability',
        'Security Best Practices',
        'Team Leadership',
        'Software Architecture',
        'Implemented CI/CD pipelines',
        'Migrating Manual Infrastructure to IaC',
      ],
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
      languages: ['CSS', 'HTML/XHTML/XML', 'MySQL', 'TypeScript', 'PHP'],
      frameworks: ['Angular', 'Laravel', 'React'],
      devops: ['AWS EC2', 'AWS RDS', 'AWS S3', 'Linux', 'Docker', 'CI/CD', 'Jenkins', 'CircleCI'],
      strengths: [
        'Code Migration & Upgrades',

        'Mentorship',
        'Performance Tuning',
        'Team Leadership',
        'Software Architecture',
        'Implemented CI/CD pipelines',
        'Scalability & Reliability',
        'End-to-End testing',
        'Infrastructure Cost Optimization',
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
      languages: ['CSS', 'HTML/XHTML/XML', 'MySQL', 'TypeScript', 'PHP'],
      frameworks: ['Angular', 'Laravel', 'React'],
      devops: ['AWS EC2', 'AWS RDS', 'AWS S3', 'Linux', 'Docker', 'CI/CD', 'Jenkins', 'CircleCI'],
      strengths: [
        'Code Migration & Upgrades',

        'Mentorship',
        'Performance Tuning',
        'Team Leadership',
        'Software Architecture',
        'Implemented CI/CD pipelines',
        'Scalability & Reliability',
        'End-to-End testing',
        'Infrastructure Cost Optimization',
      ],
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
      languages: ['CSS', 'HTML/XHTML/XML', 'MySQL', 'TypeScript', 'PHP'],
      frameworks: ['Drupal', 'Laravel', 'React', 'Redux'],
      devops: ['AWS EC2', 'AWS RDS', 'AWS S3', 'Linux', 'Docker', 'CI/CD', 'Jenkins', 'CircleCI'],
      strengths: [
        'Mentorship',
        'Team Leadership',
        'Software Architecture',

        'Performance Tuning',
        'End-to-End testing',
        'Code Migration & Upgrades',
      ],
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
      languages: ['Ruby', 'CSS', 'HTML/XHTML/XML', 'MySQL', 'PHP'],
      frameworks: ['Laravel', 'RoR', 'Angular'],
      devops: ['AWS ELB', 'AWS RDS', 'AWS S3', 'Linux', 'Docker'],
      strengths: ['Code Migration & Upgrades', 'Performance Tuning', 'Scalability & Reliability'],
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
      languages: ['CSS', 'HTML/XHTML/XML', 'MySQL', 'PHP', 'TypeScript'],
      frameworks: ['Angular'],
      devops: ['AWS ELB', 'AWS RDS', 'AWS S3', 'Linux', 'Docker', 'CI/CD', 'Github Actions'],
      strengths: [
        'Code Migration & Upgrades',

        'Performance Tuning',
        'Software Architecture',
        'Team Leadership',
        'Scalability & Reliability',
        'Infrastructure Cost Optimization',
        'End-to-End testing',
      ],
    },
    {
      title: 'Web Developer',
      company: 'Cactus Marketing Communications',
      location: '—',
      start: 'Oct 2012',
      end: 'Feb 2013',
      bullets: ['Delivered custom web solutions; contributed to backend and integrations.'],
      languages: ['CSS', 'HTML/XHTML/XML', 'MySQL', 'PHP', 'TypeScript'],
      frameworks: ['Laravel', 'Angular'],
      devops: ['Linux', 'Docker', 'AWS S3', 'AWS EC2'],
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
      languages: ['CSS', 'HTML/XHTML/XML', 'MySQL', 'PHP', 'TypeScript'],
      frameworks: ['Drupal'],
      devops: ['Linux', 'Docker', 'AWS S3', 'AWS EC2'],
      strengths: ['Performance Tuning', 'End-to-End testing', 'Code Migration & Upgrades'],
    },
  ],
};
