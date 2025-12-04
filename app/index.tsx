import React from 'react';
import { ScrollView, View, Text, Pressable, Image, Linking } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {
  Mail,
  Phone,
  Linkedin,
  Github,
  Sun,
  Moon,
  SunMoon,
  Code,
  Layers,
  Cloud,
  Users,
} from 'lucide-react-native';
import { useDarkMode } from '~/store/store';
import { resumeData } from '~/utils/resume';
import { Link } from 'expo-router';

// ---------- Inline Components ----------

const MetricItem = ({ number, label }: { number: string; label: string }) => (
  <View className="items-center px-4 py-2">
    <Text className="text-3xl font-bold" style={{ color: 'var(--color-50)' }}>
      {number}
    </Text>
    <Text className="mt-1 text-sm" style={{ color: 'var(--color-400)' }}>
      {label}
    </Text>
  </View>
);

const SkillTag = ({ label, type }: { label: string; type: string }) => {
  const colorMap: Record<string, string> = {
    language: 'var(--color-language)',
    framework: 'var(--color-framework)',
    devops: 'var(--color-devops)',
    strength: 'var(--color-strength)',
  };
  const bgMap: Record<string, string> = {
    language: 'var(--color-language-light)',
    framework: 'var(--color-framework-light)',
    devops: 'var(--color-devops-light)',
    strength: 'var(--color-strength-light)',
  };

  return (
    <View
      className="rounded-full px-3 py-1"
      style={{ backgroundColor: bgMap[type] || 'var(--color-100)' }}>
      <Text className="text-xs font-medium" style={{ color: colorMap[type] || 'var(--color-600)' }}>
        {label}
      </Text>
    </View>
  );
};

const SkillCategory = ({
  title,
  icon,
  skills,
  type,
}: {
  title: string;
  icon: React.ReactNode;
  skills: readonly string[];
  type: string;
}) => (
  <View
    className="w-full rounded-2xl p-5 sm:w-[calc(50%-8px)] lg:w-[calc(25%-12px)]"
    style={{ backgroundColor: 'var(--color-100)' }}>
    <View className="mb-4 flex-row items-center gap-3">
      {icon}
      <Text className="text-base font-semibold" style={{ color: 'var(--color-900)' }}>
        {title}
      </Text>
    </View>
    <View className="flex-row flex-wrap gap-2">
      {skills.map((skill) => (
        <SkillTag key={skill} label={skill} type={type} />
      ))}
    </View>
  </View>
);

const ExperienceCard = ({
  experience,
  isEven,
}: {
  experience: (typeof resumeData.experience)[0];
  isEven: boolean;
}) => {
  const allTags = [
    ...experience.languages.slice(0, 2),
    ...experience.frameworks.slice(0, 2),
    ...experience.devops.slice(0, 3),
  ];

  return (
    <View className={`relative mb-10 flex-row ${isEven ? 'lg:flex-row-reverse' : ''}`}>
      {/* Timeline Dot */}
      <View
        className="absolute left-[7px] top-6 z-10 h-4 w-4 rounded-full border-4 lg:left-1/2 lg:-translate-x-1/2"
        style={{
          backgroundColor: 'var(--color-devops)',
          borderColor: 'var(--color-50)',
        }}
      />

      {/* Card */}
      <View
        className={`ml-10 flex-1 lg:ml-0 lg:w-[calc(50%-32px)] ${isEven ? 'lg:mr-auto lg:pr-10' : 'lg:ml-auto lg:pl-10'}`}>
        <View
          className="rounded-2xl border p-5"
          style={{
            backgroundColor: 'var(--color-50)',
            borderColor: 'var(--color-200)',
          }}>
          {/* Header */}
          <View className="flex-row items-start justify-between gap-3">
            <View className="flex-1">
              <Text className="text-lg font-bold" style={{ color: 'var(--color-900)' }}>
                {experience.title}
              </Text>
              <Text className="text-base font-medium" style={{ color: 'var(--color-devops)' }}>
                {experience.company}
              </Text>
            </View>
            <View
              className="rounded-full px-3 py-1"
              style={{ backgroundColor: 'var(--color-100)' }}>
              <Text className="text-xs" style={{ color: 'var(--color-600)' }}>
                {experience.start} - {experience.end}
              </Text>
            </View>
          </View>

          {/* Bullets */}
          <View className="mt-4 gap-2">
            {experience.bullets.slice(0, 4).map((bullet, i) => (
              <View key={i} className="flex-row">
                <Text className="mr-2" style={{ color: 'var(--color-devops)' }}>
                  -
                </Text>
                <Text className="flex-1 text-sm" style={{ color: 'var(--color-700)' }}>
                  {bullet}
                </Text>
              </View>
            ))}
          </View>

          {/* Tags */}
          <View className="mt-4 flex-row flex-wrap gap-1">
            {allTags.map((tag) => (
              <Text
                key={tag}
                className="rounded px-2 py-0.5 text-[10px]"
                style={{ backgroundColor: 'var(--color-100)', color: 'var(--color-500)' }}>
                {tag}
              </Text>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

const SocialButton = ({
  icon,
  onPress,
  label,
}: {
  icon: React.ReactNode;
  onPress: () => void;
  label: string;
}) => (
  <Pressable
    onPress={onPress}
    accessibilityLabel={label}
    className="rounded-full p-3"
    style={{ backgroundColor: 'var(--color-200)' }}>
    {icon}
  </Pressable>
);

// ---------- Main Screen ----------
export default function NewResume() {
  const darkMode = useDarkMode((state) => state.darkMode);
  const toggleDarkMode = useDarkMode((state) => state.toggleDarkMode);

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1" style={{ backgroundColor: 'var(--color-50)' }}>
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 48 }}
          scrollEventThrottle={16}>
          {/* ========== HERO SECTION ========== */}
          <View className="relative px-6 pb-12 pt-6">
            {/* Dark Mode Toggle */}
            <Pressable
              onPress={toggleDarkMode}
              className="absolute right-6 top-6 z-10 rounded-full p-2"
              style={{ backgroundColor: 'var(--color-200)' }}>
              {darkMode === 'light' && <Sun color="var(--color-900)" size={24} />}
              {darkMode === 'dark' && <Moon color="var(--color-900)" size={24} />}
              {darkMode === false && <SunMoon color="var(--color-900)" size={24} />}
            </Pressable>

            {/* Hero Content */}
            <View className="flex-col items-center gap-6 pt-8 sm:flex-row sm:items-start sm:gap-10">
              {/* Profile Photo */}
              <View
                className="h-40 w-40 overflow-hidden rounded-full border-4 sm:h-48 sm:w-48"
                style={{ borderColor: 'var(--color-200)' }}>
                <Image
                  source={require('../assets/me.jpeg')}
                  className="h-full w-full"
                  style={{ width: '100%', height: '100%' }}
                  resizeMode="cover"
                />
              </View>

              {/* Text Content */}
              <View className="flex-1 items-center sm:items-start">
                <Text
                  className="text-center text-4xl font-bold tracking-tight sm:text-left sm:text-5xl"
                  style={{ color: 'var(--color-900)' }}>
                  {resumeData.name}
                </Text>
                <Text
                  className="mt-2 text-center text-xl font-semibold sm:text-left"
                  style={{ color: 'var(--color-devops)' }}>
                  Senior Software Engineer
                </Text>
                <Text
                  className="mt-1 text-center text-base sm:text-left"
                  style={{ color: 'var(--color-600)' }}>
                  Cloud Solutions Architect | Technical Leader
                </Text>
                <Text
                  className="mt-4 max-w-xl text-center text-base leading-6 sm:text-left"
                  style={{ color: 'var(--color-700)' }}>
                  {resumeData.summary}
                </Text>

                {/* Contact Icons */}
                <View className="mt-6 flex-row gap-3">
                  <SocialButton
                    icon={<Mail color="var(--color-900)" size={20} />}
                    onPress={() => Linking.openURL(`mailto:${resumeData.email}`)}
                    label="Email"
                  />
                  <SocialButton
                    icon={<Phone color="var(--color-900)" size={20} />}
                    onPress={() => Linking.openURL(`tel:${resumeData.phone}`)}
                    label="Phone"
                  />
                  <SocialButton
                    icon={<Linkedin color="var(--color-900)" size={20} />}
                    onPress={() => Linking.openURL(resumeData.linkedin)}
                    label="LinkedIn"
                  />
                  <SocialButton
                    icon={<Github color="var(--color-900)" size={20} />}
                    onPress={() => Linking.openURL(resumeData.github)}
                    label="GitHub"
                  />
                </View>
              </View>
            </View>
          </View>

          {/* ========== METRICS BAR ========== */}
          <View className="px-6 py-8" style={{ backgroundColor: 'var(--color-900)' }}>
            <View className="flex-row flex-wrap justify-center gap-6 sm:gap-12">
              <MetricItem number="15+" label="Years Experience" />
              <MetricItem number="5" label="Years FinTech" />
              <MetricItem number="30%" label="AWS Cost Savings" />
            </View>
          </View>

          {/* ========== SKILLS SECTION ========== */}
          <View className="px-6 py-12">
            <Text
              className="mb-8 text-center text-2xl font-bold tracking-tight"
              style={{ color: 'var(--color-900)' }}>
              Technical Expertise
            </Text>

            <View className="flex-row flex-wrap justify-center gap-4">
              <SkillCategory
                title="Languages & Data"
                icon={<Code color="var(--color-language)" size={20} />}
                skills={resumeData.skills.languages}
                type="language"
              />
              <SkillCategory
                title="Frameworks"
                icon={<Layers color="var(--color-framework)" size={20} />}
                skills={resumeData.skills.frameworks}
                type="framework"
              />
              <SkillCategory
                title="Cloud & DevOps"
                icon={<Cloud color="var(--color-devops)" size={20} />}
                skills={resumeData.skills.devops}
                type="devops"
              />
              <SkillCategory
                title="Leadership"
                icon={<Users color="var(--color-strength)" size={20} />}
                skills={resumeData.skills.strengths}
                type="strength"
              />
            </View>
          </View>

          {/* ========== EXPERIENCE TIMELINE ========== */}
          <View className="px-6 py-12">
            <Text
              className="mb-10 text-center text-2xl font-bold tracking-tight"
              style={{ color: 'var(--color-900)' }}>
              Professional Journey
            </Text>

            {/* Timeline Container */}
            <View className="relative mx-auto max-w-4xl">
              {/* Vertical Line */}
              <View
                className="absolute bottom-0 left-[14px] top-0 w-0.5 lg:left-1/2 lg:-translate-x-1/2"
                style={{ backgroundColor: 'var(--color-200)' }}
              />

              {/* Experience Cards */}
              {resumeData.experience.map((exp, index) => (
                <ExperienceCard
                  key={`${exp.company}-${exp.title}`}
                  experience={exp}
                  isEven={index % 2 === 0}
                />
              ))}
            </View>
          </View>

          {/* ========== FOOTER CTA ========== */}
          <View className="px-6 py-16" style={{ backgroundColor: 'var(--color-900)' }}>
            <View className="mx-auto max-w-2xl items-center">
              <Text
                className="text-center text-2xl font-bold sm:text-3xl"
                style={{ color: 'var(--color-50)' }}>
                Let&apos;s Build Something Great
              </Text>
              <Text className="mt-4 text-center text-base" style={{ color: 'var(--color-400)' }}>
                15+ years of experience ready for your next challenge
              </Text>

              {/* CTA Buttons */}
              <View className="mt-8 flex-row gap-4">
                <Link
                  href={`mailto:${resumeData.email}`}
                  className="rounded-full px-8 py-4"
                  style={{ backgroundColor: 'var(--color-100)' }}>
                  <Text className="font-semibold" style={{ color: 'var(--color-900)' }}>
                    Get In Touch
                  </Text>
                </Link>
                <Pressable
                  onPress={() => Linking.openURL(resumeData.github)}
                  className="rounded-full border px-8 py-4"
                  style={{ borderColor: 'var(--color-400)' }}>
                  <Text className="font-semibold" style={{ color: 'var(--color-50)' }}>
                    View GitHub
                  </Text>
                </Pressable>
              </View>

              {/* Social Links */}
              <View className="mt-10 flex-row gap-6">
                <Link href={`mailto:${resumeData.email}`}>
                  <Mail color="var(--color-400)" size={24} />
                </Link>
                <Pressable onPress={() => Linking.openURL(resumeData.linkedin)}>
                  <Linkedin color="var(--color-400)" size={24} />
                </Pressable>
                <Pressable onPress={() => Linking.openURL(resumeData.github)}>
                  <Github color="var(--color-400)" size={24} />
                </Pressable>
                <Pressable onPress={() => Linking.openURL(`tel:${resumeData.phone}`)}>
                  <Phone color="var(--color-400)" size={24} />
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
