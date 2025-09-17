import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Linking,
  Pressable,
  Image,
  AnimatableNumericValue,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useDarkMode, useScrollX, useScrollY } from '~/store/store';
import { ExternalLink, Moon, Phone, Send, Sun, SunMoon } from 'lucide-react-native';
import { resumeData, tagType, TagType } from '~/utils/resume';

const Tag: React.FC<{ label: TagType }> = ({ label }) => {
  const typeMap = {
    language: ['var(--color-language)', 'var(--color-language-light)'],
    framework: ['var(--color-framework)', 'var(--color-framework-light)'],
    devops: ['var(--color-devops)', 'var(--color-devops-light)'],
    strength: ['var(--color-strength)', 'var(--color-strength-light)'],
    false: ['var(--color-300)', 'var(--color-700)'],
  };
  const type = tagType(label);
  if (!type) {
    return null;
  }
  return (
    <View className="rounded-md px-1 py-0.5" style={{ backgroundColor: typeMap[type][1] }}>
      <Text className="text-[10px]" style={{ color: typeMap[type][0] }}>
        {label}
      </Text>
    </View>
  );
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
  const experienceBumpRef = React.useRef<NodeJS.Timeout | null>(null);

  // Dark Mode
  const darkMode = useDarkMode((state) => state.darkMode);
  const toggleDarkMode = useDarkMode((state) => state.toggleDarkMode);

  // Bounce auto-scroll experience section
  const bounce = () => {
    if (experienceScrollRef.current) {
      experienceScrollRef.current.scrollTo({
        x: 100,
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
    if (experienceBumpRef.current) {
      clearInterval(experienceBumpRef.current);
    }
    experienceBumpRef.current = setInterval(bounce, 6000);
    console.log(
      `\n%c🦖 ${resumeData.name} 🚀`,
      'color:#fed7aa; background:#0b1021; font-size:1.5rem; padding:0.15rem 0.25rem; margin: 1rem auto; font-family: Rockwell; border: 2px solid #d97706; border-radius: 4px;font-weight: bold; text-shadow: 1px 1px 1px #00af87bf;'
    );

    console.log(
      `\n%c📞 ${resumeData.phone} | ${resumeData.email} ✉️`,
      'color:#93c5fd; background:#0b1021; font-size:1rem; padding:0.15rem 0.25rem; margin: 1rem auto; font-family: Helvetica; border: 2px solid #6366f1; border-radius: 4px;font-weight: bold; '
    );
  }, []);

  const pageScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const percentage =
      e.nativeEvent.contentOffset.y /
      (e.nativeEvent.contentSize.height - e.nativeEvent.layoutMeasurement.height);

    setScrollY(percentage);
  };

  const experienceScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (e.nativeEvent.contentOffset.x >= 250 && experienceBumpRef.current) {
      clearTimeout(experienceBumpRef.current);
      experienceBumpRef.current = null;
    }
    setScrollX(e.nativeEvent.contentOffset.x);
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1" style={{ backgroundColor: 'var(--color-50)' }}>
        {/* Decorative Background */}
        <View
          className="text-bold fixed left-3/4 top-0 origin-left text-left opacity-10"
          style={{
            transform: [
              { translateX: 0 },
              { rotate: '90deg' },
              { translateX: `-${80 * scrollY}%` as unknown as AnimatableNumericValue },
            ],
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
          <View
            className="w-full flex-1 flex-row flex-wrap items-start p-3 backdrop-blur"
            style={{ backgroundColor: 'var(--color-semitransparent)' }}>
            <View
              className="hidden aspect-square sm:block"
              style={{ height: Math.max(60, 120 - scrollY * 150), marginBottom: '-100%' }}>
              <Image
                source={require('../assets/me.jpeg')}
                className="rounded-full"
                style={{ width: '100%', height: '100%' }}
              />
            </View>
            <View className="flex-1 grow flex-col tracking-tight sm:pl-6">
              <View className="flex flex-row items-center gap-2">
                <Text
                  className="grow text-3xl font-extrabold"
                  style={{ color: 'var(--color-900)' }}>
                  {resumeData.name}
                </Text>
                <Pressable
                  onPress={toggleDarkMode}
                  className="rounded-full"
                  style={{ backgroundColor: 'var(--color-200)' }}>
                  {darkMode === 'light' && (
                    <Sun className="p-2" color="var(--color-900)" size={40} />
                  )}
                  {darkMode === 'dark' && (
                    <Moon className="p-2" color="var(--color-900)" size={40} />
                  )}
                  {darkMode === false && (
                    <SunMoon className="p-2" color="var(--color-900)" size={40} />
                  )}
                </Pressable>
                <Pressable
                  onPress={() => Linking.openURL(`mailto:${resumeData.email}`)}
                  className="rounded-full"
                  style={{ backgroundColor: 'var(--color-200)' }}>
                  <Send className="p-2" size={40} color="var(--color-900)" />
                </Pressable>
              </View>
              <Text className="text-md text-wrap font-normal" style={{ color: 'var(--color-900)' }}>
                {resumeData.generalTitle}
              </Text>
            </View>
          </View>
        </View>

        {/* Main Content */}
        <ScrollView
          className="px-5 pt-8"
          contentContainerStyle={{ paddingBottom: 48 }}
          onScroll={pageScroll}
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
              <View className="mt-2 flex-row flex-wrap gap-x-3 gap-y-1">
                <Pressable
                  onPress={() => Linking.openURL(`mailto:${resumeData.email}`)}
                  className="flex-row items-center">
                  <Send size={16} className="mr-1" color="var(--color-link)" />
                  <Text className="text-base underline" style={{ color: 'var(--color-link)' }}>
                    {resumeData.email}
                  </Text>
                </Pressable>
                <Text className="text-base" style={{ color: 'var(--color-400)' }}>
                  •
                </Text>
                <Pressable
                  onPress={() => Linking.openURL(`tel:${resumeData.phone}`)}
                  className="flex-row items-center">
                  <Phone size={16} className="mr-1" color="var(--color-link)" />
                  <Text className="text-base underline" style={{ color: 'var(--color-link)' }}>
                    {resumeData.phone}
                  </Text>
                </Pressable>
                <Text className="text-base" style={{ color: 'var(--color-400)' }}>
                  •
                </Text>
                <Pressable
                  onPress={() => Linking.openURL(resumeData.linkedin)}
                  className="flex-row items-center">
                  <ExternalLink size={16} className="mr-1" color="var(--color-link)" />
                  <Text className="text-base underline" style={{ color: 'var(--color-link)' }}>
                    LinkedIn
                  </Text>
                </Pressable>
                <Text className="text-base" style={{ color: 'var(--color-400)' }}>
                  •
                </Text>
                <Pressable
                  onPress={() => Linking.openURL(resumeData.github)}
                  className="flex-row items-center">
                  <ExternalLink size={16} className="mr-1" color="var(--color-link)" />
                  <Text className="text-base underline" style={{ color: 'var(--color-link)' }}>
                    GitHub
                  </Text>
                </Pressable>
              </View>
              <Text
                className="flex-wrap text-wrap text-base leading-6"
                style={{ color: 'var(--color-800)' }}>
                {resumeData.summary}
              </Text>
            </View>
          </View>

          {/* Skills */}
          <View className="mt-6">
            <Text
              className="text-xl font-semibold tracking-tight"
              style={{ color: 'var(--color-900)' }}>
              Core Skills
            </Text>
            <View className="mt-3">
              <View className="mt-1">
                <Text className="text-sm font-semibold" style={{ color: 'var(--color-900)' }}>
                  Languages
                </Text>
                <View className="mt-2 flex flex-row flex-wrap gap-1">
                  {resumeData.skills.languages.map((s) => (
                    <Tag key={s} label={s} />
                  ))}
                </View>
              </View>
              <View className="mt-1">
                <Text className="text-sm font-semibold" style={{ color: 'var(--color-900)' }}>
                  Frameworks
                </Text>
                <View className="mt-2 flex flex-row flex-wrap gap-1">
                  {resumeData.skills.frameworks.map((s) => (
                    <Tag key={s} label={s} />
                  ))}
                </View>
              </View>
              <View className="mt-3">
                <Text className="text-sm font-semibold" style={{ color: 'var(--color-900)' }}>
                  Cloud & Infrastructure
                </Text>
                <View className="mt-2 flex flex-row flex-wrap gap-1">
                  {resumeData.skills.devops.map((s) => (
                    <Tag key={s} label={s} />
                  ))}
                </View>
              </View>
              <View className="mt-3">
                <Text className="text-sm font-semibold" style={{ color: 'var(--color-900)' }}>
                  Strengths
                </Text>
                <View className="mt-2 flex flex-row flex-wrap gap-1">
                  {resumeData.skills.strengths.map((s) => (
                    <Tag key={s} label={s} />
                  ))}
                </View>
              </View>
            </View>
          </View>

          {/* Experience */}
          <View className={`mt-6`}>
            <Text
              className="text-xl font-semibold tracking-tight"
              style={{ color: 'var(--color-900)' }}>
              Professional Experience
            </Text>
            <ScrollView
              className="mt-3 flex flex-row gap-10 overflow-x-auto"
              contentContainerStyle={{ paddingBottom: 48, gap: 40, alignItems: 'flex-start' }}
              onScroll={experienceScroll}
              horizontal={true}
              scrollEventThrottle={16}
              ref={experienceScrollRef}>
              {resumeData.experience.map((role) => (
                <View
                  key={`${role.company}-${role.title}`}
                  className="mb-4 max-w-96 rounded-xl bg-zinc-500/20 p-6">
                  <View className="flex-row items-start justify-between gap-3">
                    <View className="flex-1">
                      <View>
                        <Text
                          className="text-base font-semibold"
                          style={{ color: 'var(--color-900)' }}>
                          {role.title}
                        </Text>
                        <Text className="text-base" style={{ color: 'var(--color-devops)' }}>
                          {role.company}
                        </Text>
                      </View>
                    </View>
                    <View className="min-w-[96px] items-end">
                      <Text className="text-sm" style={{ color: 'var(--color-600)' }}>
                        {role.start} – {role.end}
                      </Text>
                    </View>
                  </View>

                  <View className="mt-2 flex-col gap-2">
                    {role.bullets.map((b, i) => (
                      <Text
                        key={i}
                        className={`flex-1 border-l border-red-${i + 1}00 pl-2 text-xs`}
                        style={{ color: 'var(--color-800)' }}>
                        {b}
                      </Text>
                    ))}
                  </View>
                  <View className="mt-2 flex flex-row flex-wrap gap-1">
                    {[...role.languages, ...role.frameworks, ...role.devops, ...role.strengths].map(
                      (s) => (
                        <Tag key={s} label={s} />
                      )
                    )}
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
