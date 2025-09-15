import { Link } from 'expo-router';
import React from 'react';
import { ScrollView, View, Text, Linking, Pressable, Image } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useScrollX, useScrollY } from '~/store/store';
import { Moon, Send } from 'lucide-react-native';

const Row: React.FC<{ left: React.ReactNode; right?: React.ReactNode }> = ({ left, right }) => (
  <View className="flex-row items-start justify-between gap-3">
    <View className="flex-1">{left}</View>
    {right ? <View className="min-w-[96px] items-end">{right}</View> : null}
  </View>
);

const Bullet: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View className="mb-1.5 flex-row gap-2">
    <Text className="text-base leading-6">•</Text>
    <Text className="flex-1 text-base leading-6 text-gray-800">{children}</Text>
  </View>
);

const Tag: React.FC<{ label: string }> = ({ label }) => (
  <View className="mb-2 mr-2 rounded-md bg-gray-100 px-2 py-1">
    <Text className="text-xs text-gray-700">{label}</Text>
  </View>
);

// ---------- Data (edit as needed) ----------
const resume = {
  name: 'Jonathan Troncoso',
  location: 'Denver, CO',
  email: 'jon.troncoso@gmail.com',
  phone: '(303) 345-1239',
  linkedin: 'https://www.linkedin.com/in/jonathan-troncoso-0b687360/',
  github: 'https://github.com/jontroncoso/',
  summary:
    'Senior Software Engineer & Technical Leader with 10+ years building and scaling fintech, SaaS, and consumer platforms. Expert in AWS, Kubernetes, microservices (gRPC/GraphQL/REST), and modern web/mobile. Blends hands-on delivery with team leadership to ship reliable, secure, and high-impact products.',
  skills: {
    languages: [
      'TypeScript',
      'Node.js',
      'React.js',
      'React Native',
      'Laravel',
      'GraphQL',
      'gRPC',
      'REST',
    ],
    cloud: [
      'AWS (EKS, S3, RDS, EC2, Route53, CloudFront)',
      'Kubernetes',
      'AWS CDK',
      'Cloudflare',
      'Docker',
      'CI/CD',
      'Linux',
    ],
    strengths: [
      'End-to-End Delivery',
      'Technical Vision',
      'Performance Tuning',
      'Debugging',
      'Team Leadership',
      'FinTech & SaaS',
    ],
  },
  experience: [
    {
      title: 'Product Engineer',
      company: 'CARD.com',
      location: 'Los Angeles, CA',
      start: 'Nov 2019',
      end: 'Aug 2024',
      bullets: [
        'Recruited and managed developers; set code quality standards and mentoring practices.',
        'Architected and managed a secure Kubernetes control plane on AWS (EKS) via CDK with ALB-backed nodes, Cloudflare protection, and subdomains via Route53.',
        'Designed, implemented, and debugged gRPC, GraphQL, and RESTful microservices for core fintech functions.',
        'Deployed React Native apps to the App Store and Google Play with Firebase-based debugging and release workflows.',
        'Built and maintained a Twilio IVR microservice to streamline support and reduce call handling time.',
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
        'Built responsive UI with React.js and Bootstrap; optimized backend queries and performance.',
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
      ],
    },
    {
      title: 'Lead Developer',
      company: 'HighBridge Creative, Inc.',
      location: '—',
      start: '2015',
      end: 'Dec 2016',
      bullets: [
        'Directed client delivery across backend and cloud projects; enforced coding standards and reviews.',
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
      ],
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
    },
    {
      title: 'Web Developer',
      company: 'Cactus Marketing Communications',
      location: '—',
      start: 'Oct 2012',
      end: 'Feb 2013',
      bullets: ['Delivered custom web solutions; contributed to backend and integrations.'],
    },
    {
      title: 'Web Developer',
      company: 'Spire Digital',
      location: '—',
      start: 'Jun 2010',
      end: 'Jun 2012',
      bullets: ['Shipped production features and improved developer tooling and delivery cadence.'],
    },
  ],
};

// ---------- Screen ----------
export default function Home() {
  // Background Animation on page-scroll
  const scrollY = useScrollY((state) => state.scrollY);
  const setScrollY = useScrollY((state) => state.setScrollY);

  // Background Color Change on Experience Section scroll
  const scrollX = useScrollX((state) => state.scrollX);
  const setScrollX = useScrollX((state) => state.setScrollX);
  const experienceScrollRef = React.useRef<ScrollView>(null);

  // Bounce auto-scroll experience section
  const bounce = () => {
    if (experienceScrollRef.current) {
      experienceScrollRef.current.scrollTo({
        x: 250,
        animated: true,
      });
      setTimeout(() => {
        experienceScrollRef.current?.scrollTo({
          x: 0,
          animated: true,
        });
      }, 150);
    }
  };

  React.useEffect(() => {
    setTimeout(bounce, 3000);
    setTimeout(bounce, 8000);
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-white">
        {/* Decorative Background */}
        <View
          className="text-bold fixed left-0 top-0 origin-left text-left opacity-20"
          style={{
            transform: [{ translateX: 200 }, { rotate: '45deg' }, { translateX: -1.5 * scrollY }],
          }}>
          <Text
            style={{
              fontSize: 300,
              color: `rgb(${scrollX / 5}, ${scrollX / 10}, ${255 - scrollX})`,
            }}>
            TRONCOSO
          </Text>
        </View>

        {/* Fixed Header */}
        <View className="fixed left-0 right-0 top-0 z-10 flex flex-col items-start justify-start bg-white/0 sm:flex-row">
          <View className="w-full flex-1 flex-row flex-wrap items-start bg-white/20 p-3 backdrop-blur">
            <View
              className="hidden aspect-square sm:block"
              style={{ height: Math.max(40, 120 - scrollY), marginBottom: '-100%' }}>
              <Image
                source={require('../assets/me.jpeg')}
                className="rounded-full"
                style={{ width: '100%', height: '100%' }}
              />
            </View>
            <Text className="grow text-3xl font-extrabold tracking-tight text-gray-900 sm:pl-6">
              {resume.name}
            </Text>
            <Moon className="p-2" size={40} />
            <Send className="p-2" size={40} />
          </View>
        </View>

        {/* Main Content */}
        <ScrollView
          className="px-5 py-6"
          contentContainerStyle={{ paddingBottom: 48 }}
          onScroll={(e) => setScrollY(e.nativeEvent.contentOffset.y)}
          horizontal={false}
          scrollEventThrottle={16}>
          {/* Header */}
          <View className="aspect-square w-full sm:hidden">
            <Image
              source={require('../assets/me.jpeg')}
              className="rounded-full"
              style={{ width: '100%', height: '100%' }}
            />
          </View>

          <View className="flex flex-col items-center justify-start gap-6 pt-10 sm:flex-row sm:pl-32">
            <View className="flex-1 flex-wrap items-start justify-start">
              <Text className="mt-1 text-base text-gray-700">{resume.location}</Text>
              <View className="mt-2 flex-row flex-wrap gap-x-3 gap-y-1">
                <Text className="text-base text-gray-800">{resume.email}</Text>
                <Text className="text-base text-gray-400">•</Text>
                <Text className="text-base text-gray-800">{resume.phone}</Text>
                <Text className="text-base text-gray-400">•</Text>
                <Pressable onPress={() => Linking.openURL(resume.linkedin)}>
                  <Text className="text-base text-blue-600">LinkedIn</Text>
                </Pressable>
                <Text className="text-base text-gray-400">•</Text>
                <Pressable onPress={() => Linking.openURL(resume.github)}>
                  <Text className="text-base text-blue-600">GitHub</Text>
                </Pressable>
              </View>
              <Text className="flex-wrap text-wrap text-base leading-6 text-gray-800">
                {resume.summary}
              </Text>
            </View>
          </View>

          {/* Skills */}
          <View className="mt-6">
            <Text className="text-xl font-semibold tracking-tight text-gray-900">Core Skills</Text>
            <View className="mt-3">
              <View className="mt-1">
                <Text className="text-sm font-semibold text-gray-900">Languages & Frameworks</Text>
                <View className="mt-2 flex-row flex-wrap">
                  {resume.skills.languages.map((s) => (
                    <Tag key={s} label={s} />
                  ))}
                </View>
              </View>
              <View className="mt-3">
                <Text className="text-sm font-semibold text-gray-900">Cloud & Infrastructure</Text>
                <View className="mt-2 flex-row flex-wrap">
                  {resume.skills.cloud.map((s) => (
                    <Tag key={s} label={s} />
                  ))}
                </View>
              </View>
              <View className="mt-3">
                <Text className="text-sm font-semibold text-gray-900">Strengths</Text>
                <View className="mt-2 flex-row flex-wrap">
                  {resume.skills.strengths.map((s) => (
                    <Tag key={s} label={s} />
                  ))}
                </View>
              </View>
            </View>
          </View>

          {/* Experience */}
          <View className={`mt-6`}>
            <Text className="text-xl font-semibold tracking-tight text-gray-900">
              Professional Experience
            </Text>
            <ScrollView
              className="mt-3 flex flex-row gap-10 overflow-x-auto"
              contentContainerStyle={{ paddingBottom: 48, gap: 40 }}
              onScroll={(e) => {
                setScrollX(e.nativeEvent.contentOffset.x);
              }}
              horizontal={true}
              scrollEventThrottle={16}
              ref={experienceScrollRef}>
              {resume.experience.map((role) => (
                <View
                  key={`${role.company}-${role.title}`}
                  className="mb-4 max-w-96 rounded-xl bg-zinc-500/20 p-6">
                  <Row
                    left={
                      <View>
                        <Text className="text-base font-semibold text-gray-900">{role.title}</Text>
                        <Text className="text-base text-gray-700">{role.company}</Text>
                      </View>
                    }
                    right={
                      <Text className="text-sm text-gray-600">
                        {role.start} – {role.end}
                      </Text>
                    }
                  />
                  <View className="mt-2">
                    {role.bullets.map((b, i) => (
                      <Bullet key={i}>{b}</Bullet>
                    ))}
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Footer note */}
          <View className="mt-8 opacity-70">
            <Link href="/details?name=Expo%20Rocks">
              <Text className="mt-1 text-xs text-blue-600">View Details Screen</Text>
            </Link>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
