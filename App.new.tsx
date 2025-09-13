// App.tsx
// Expo + TypeScript + NativeWind (Tailwind for React Native)
// Minimal dependencies:
//   expo install react-native-safe-area-context react-native-svg
//   npm i nativewind
//   npm i -D tailwindcss
// Configure NativeWind per docs (tailwind.config.js with "nativewind/preset")
// Then run: npx tailwindcss init -p
// In babel.config.js add: ['nativewind/babel']

import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, Text, Linking, Pressable } from "react-native";

// If using NativeWind v4+
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import "nativewind/types";

// ---------- Utility components ----------
const Section: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <View className="mt-6">
    <Text className="text-xl font-semibold tracking-tight text-gray-900">
      {title}
    </Text>
    <View className="mt-2 h-[1px] bg-gray-200" />
    <View className="mt-3">{children}</View>
  </View>
);

const Row: React.FC<{ left: React.ReactNode; right?: React.ReactNode }> = ({
  left,
  right,
}) => (
  <View className="flex-row justify-between items-start gap-3">
    <View className="flex-1">{left}</View>
    {right ? <View className="items-end min-w-[96px]">{right}</View> : null}
  </View>
);

const Bullet: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View className="flex-row gap-2 mb-1.5">
    <Text className="text-base leading-6">•</Text>
    <Text className="flex-1 text-base leading-6 text-gray-800">{children}</Text>
  </View>
);

const Tag: React.FC<{ label: string }> = ({ label }) => (
  <View className="px-2 py-1 bg-gray-100 rounded-md mr-2 mb-2">
    <Text className="text-xs text-gray-700">{label}</Text>
  </View>
);

const LinkText: React.FC<{ href: string; children: React.ReactNode }> = ({
  href,
  children,
}) => (
  <Pressable onPress={() => Linking.openURL(href)}>
    <Text className="text-base text-blue-600">{children}</Text>
  </Pressable>
);

// ---------- Data (edit as needed) ----------
const resume = {
  name: "Jonathan Troncoso",
  location: "Los Angeles, CA",
  email: "you@email.com",
  phone: "(XXX) XXX-XXXX",
  linkedin: "https://www.linkedin.com/in/jonathan-troncoso-0b687360/",
  github: "https://github.com/your-handle",
  summary:
    "Senior Software Engineer & Technical Leader with 10+ years building and scaling fintech, SaaS, and consumer platforms. Expert in AWS, Kubernetes, microservices (gRPC/GraphQL/REST), and modern web/mobile. Blends hands-on delivery with team leadership to ship reliable, secure, and high-impact products.",
  skills: {
    languages: [
      "TypeScript",
      "Node.js",
      "React.js",
      "React Native",
      "Laravel",
      "GraphQL",
      "gRPC",
      "REST",
    ],
    cloud: [
      "AWS (EKS, S3, RDS, EC2, Route53, CloudFront)",
      "Kubernetes",
      "AWS CDK",
      "Cloudflare",
      "Docker",
      "CI/CD",
      "Linux",
    ],
    strengths: [
      "End-to-End Delivery",
      "Technical Vision",
      "Performance Tuning",
      "Debugging",
      "Team Leadership",
      "FinTech & SaaS",
    ],
  },
  experience: [
    {
      title: "Product Engineer",
      company: "CARD.com",
      location: "Los Angeles, CA",
      start: "Nov 2019",
      end: "Aug 2024",
      bullets: [
        "Recruited and managed developers; set code quality standards and mentoring practices.",
        "Architected and managed a secure Kubernetes control plane on AWS (EKS) via CDK with ALB-backed nodes, Cloudflare protection, and subdomains via Route53.",
        "Designed, implemented, and debugged gRPC, GraphQL, and RESTful microservices for core fintech functions.",
        "Deployed React Native apps to the App Store and Google Play with Firebase-based debugging and release workflows.",
        "Built and maintained a Twilio IVR microservice to streamline support and reduce call handling time.",
      ],
    },
    {
      title: "Full Stack Engineer",
      company: "Amply",
      location: "Los Angeles, CA",
      start: "Aug 2017",
      end: "Aug 2019",
      bullets: [
        "Delivered SaaS platform using Laravel, MySQL, AWS (EC2, RDS, S3).",
        "Built responsive UI with React.js and Bootstrap; optimized backend queries and performance.",
      ],
    },
    {
      title: "Web Developer",
      company: "Chive Charities",
      location: "Austin, TX",
      start: "Dec 2016",
      end: "Jul 2017",
      bullets: [
        "Built automated donation gifting service integrated with Stripe webhooks and distributor APIs.",
        "Implemented multi-provider email workflows to improve donor engagement and retention.",
      ],
    },
    {
      title: "Lead Developer",
      company: "HighBridge Creative, Inc.",
      location: "—",
      start: "2015",
      end: "Dec 2016",
      bullets: [
        "Directed client delivery across backend and cloud projects; enforced coding standards and reviews.",
      ],
    },
    {
      title: "Developer",
      company: "ActiveJunky.com",
      location: "—",
      start: "2012",
      end: "May 2015",
      bullets: [
        "Engineered SaaS features and optimized backend for high-traffic ecommerce platform.",
      ],
    },
    {
      title: "Founder",
      company: "Vidliography",
      location: "Denver, CO",
      start: "Oct 2011",
      end: "2015",
      bullets: [
        "Built and launched a video platform managing product dev, cloud hosting, and database optimization.",
      ],
    },
    {
      title: "Web Developer",
      company: "Cactus Marketing Communications",
      location: "—",
      start: "Oct 2012",
      end: "Feb 2013",
      bullets: [
        "Delivered custom web solutions; contributed to backend and integrations.",
      ],
    },
    {
      title: "Web Developer",
      company: "Spire Digital",
      location: "—",
      start: "Jun 2010",
      end: "Jun 2012",
      bullets: [
        "Shipped production features and improved developer tooling and delivery cadence.",
      ],
    },
  ],
};

// ---------- Screen ----------
export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView className="bg-white">
        <ScrollView
          className="px-5 py-6"
          contentContainerStyle={{ paddingBottom: 48 }}
        >
          {/* Header */}
          <View className="items-start">
            <Text className="text-3xl font-extrabold tracking-tight text-gray-900">
              {resume.name}
            </Text>
            <Text className="mt-1 text-base text-gray-700">
              {resume.location}
            </Text>
            <View className="mt-2 flex-row flex-wrap gap-x-3 gap-y-1">
              <Text className="text-base text-gray-800">{resume.email}</Text>
              <Text className="text-base text-gray-400">•</Text>
              <Text className="text-base text-gray-800">{resume.phone}</Text>
              <Text className="text-base text-gray-400">•</Text>
              <LinkText href={resume.linkedin}>LinkedIn</LinkText>
              <Text className="text-base text-gray-400">•</Text>
              <LinkText href={resume.github}>GitHub</LinkText>
            </View>
          </View>

          {/* Summary */}
          <Section title="Summary">
            <Text className="text-base leading-6 text-gray-800">
              {resume.summary}
            </Text>
          </Section>

          {/* Skills */}
          <Section title="Core Skills">
            <View className="mt-1">
              <Text className="text-sm font-semibold text-gray-900">
                Languages & Frameworks
              </Text>
              <View className="flex-row flex-wrap mt-2">
                {resume.skills.languages.map((s) => (
                  <Tag key={s} label={s} />
                ))}
              </View>
            </View>
            <View className="mt-3">
              <Text className="text-sm font-semibold text-gray-900">
                Cloud & Infrastructure
              </Text>
              <View className="flex-row flex-wrap mt-2">
                {resume.skills.cloud.map((s) => (
                  <Tag key={s} label={s} />
                ))}
              </View>
            </View>
            <View className="mt-3">
              <Text className="text-sm font-semibold text-gray-900">
                Strengths
              </Text>
              <View className="flex-row flex-wrap mt-2">
                {resume.skills.strengths.map((s) => (
                  <Tag key={s} label={s} />
                ))}
              </View>
            </View>
          </Section>

          {/* Experience */}
          <Section title="Professional Experience">
            {resume.experience.map((role) => (
              <View key={`${role.company}-${role.title}`} className="mb-4">
                <Row
                  left={
                    <View>
                      <Text className="text-base font-semibold text-gray-900">
                        {role.title}
                      </Text>
                      <Text className="text-base text-gray-700">
                        {role.company}
                      </Text>
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
          </Section>

          {/* Footer note */}
          <View className="mt-8 opacity-70">
            <Text className="text-xs text-gray-500">
              Built with Expo + NativeWind. Edit App.tsx to customize. You can
              also export to PDF via a web share or native print module.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
