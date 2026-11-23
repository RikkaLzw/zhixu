import { Ionicons } from '@expo/vector-icons';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { categories } from '../categories';
import { IconButton, SectionTitle, Surface } from '../components/ui';
import { formatInterval, getNextDue, getStreak, getStudyQueue, getTodayNewCount, localDayKey, matchesScope } from '../lib/scheduler';
import { enabledStudyLevels } from '../levels';
import { colors } from '../theme';
import { CategoryId, StudyData } from '../types';

export function HomeScreen({ data, now, onStudy, onSettings, onCategory }: {
  data: StudyData;
  now: number;
  onStudy: () => void;
  onSettings: () => void;
  onCategory: (category: CategoryId) => void;
}) {
  const date = new Date(now);
  const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
  const queue = getStudyQueue(data, now);
  const regularCards = data.cards.filter((card) => matchesScope(card, { studySet: 'regular' }));
  const dueCount = queue.filter((card) => data.progress[card.id]).length;
  const newCount = queue.length - dueCount;
  const studiedToday = data.history.filter((event) => localDayKey(event.reviewedAt) === localDayKey(now));
  const todayNew = getTodayNewCount(data, now);
  const nextDue = getNextDue(data, now);
  const streak = getStreak(data, now);
  const goalProgress = data.settings.dailyNewLimit === 0
    ? 0
    : Math.min(1, todayNew / data.settings.dailyNewLimit);

  return (
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.logoRow}>
          <View style={styles.logo}><Image source={require('../../assets/memory-mark.png')} style={styles.logoMark} /></View>
          <View>
            <Text style={styles.brandName}>知序</Text>
            <Text style={styles.brandSub}>AI4SEC 学习卡</Text>
          </View>
        </View>
        <IconButton icon="settings-outline" label="学习设置" onPress={onSettings} light />
      </View>

      <Text style={styles.date}>{date.getMonth() + 1} 月 {date.getDate()} 日 · 星期{weekdays[date.getDay()]}</Text>
      <Text style={styles.greeting}>今天，也向前一点。</Text>
      <Text style={styles.intro}>每天记住一点，让安全知识慢慢生长。</Text>

      <View style={styles.hero}>
        <View style={styles.heroTop}>
          <View>
            <Text style={styles.heroEyebrow}>为你准备</Text>
            <Text style={styles.heroTitle}>今天的学习</Text>
          </View>
          <View style={styles.heroIcon}><Ionicons name="book-outline" size={22} color="#C9E89A" /></View>
        </View>
        <View style={styles.heroNumbers}>
          <View style={styles.heroNumberBlock}>
            <Text style={styles.heroNumber}>{dueCount}</Text>
            <Text style={styles.heroLabel}>到期复习</Text>
          </View>
          <View style={styles.heroDivider} />
          <View style={styles.heroNumberBlock}>
            <Text style={styles.heroNumber}>{newCount}</Text>
            <Text style={styles.heroLabel}>今日新卡</Text>
          </View>
          <View style={styles.heroDivider} />
          <View style={styles.heroNumberBlock}>
            <Text style={styles.heroNumber}>{studiedToday.length}</Text>
            <Text style={styles.heroLabel}>今日学习次数</Text>
          </View>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="开始学习"
          disabled={queue.length === 0}
          onPress={onStudy}
          style={({ pressed }) => [styles.heroButton, queue.length === 0 && styles.heroButtonDisabled, pressed && { opacity: 0.8 }]}
        >
          <Text style={styles.heroButtonText}>{queue.length ? '开始学习' : '暂时没有待学习的卡片'}</Text>
          {queue.length > 0 && <Ionicons name="arrow-forward" size={19} color={colors.brandDark} />}
        </Pressable>
        <Text style={styles.heroHint}>
          {queue.length > 0 ? '先复习到期内容，再学习新知识' : enabledStudyLevels(data.settings).length === 0 ? '请在学习设置中开启至少一个阶段' : nextDue ? `下一张卡片将在约 ${formatInterval(nextDue - now)} 后到期` : '可在题库中查看卡片或调整学习阶段'}
        </Text>
      </View>

      <View style={styles.section}>
        <SectionTitle title="学习节奏" note="每天一点，持续积累" />
        <Surface style={styles.rhythm}>
          <View style={styles.rhythmHeading}>
            <View style={styles.rhythmIcon}><Ionicons name="sunny-outline" size={20} color={colors.brand} /></View>
            <View style={styles.rhythmText}>
              <Text style={styles.rhythmTitle}>每日新卡</Text>
              <Text style={styles.rhythmSub}>新知识按你的节奏加入</Text>
            </View>
            <Text style={styles.goalNumber}>{todayNew}<Text style={styles.goalTotal}> / {data.settings.dailyNewLimit}</Text></Text>
          </View>
          <View style={styles.progressTrack}><View style={[styles.progressFill, { width: `${goalProgress * 100}%` }]} /></View>
          <View style={styles.rhythmFooter}>
            <Text style={styles.rhythmSub}>已连续学习 {streak} 天</Text>
            <Pressable onPress={onSettings} accessibilityRole="button" accessibilityLabel="调整每日新卡目标">
              <Text style={styles.link}>调整目标</Text>
            </Pressable>
          </View>
        </Surface>
      </View>

      <View style={styles.section}>
        <SectionTitle title="你的知识路径" note={`${regularCards.length} 张常规卡片`} />
        <View style={styles.categoryGrid}>
          {categories.map((category) => {
            const count = regularCards.filter((card) => card.category === category.id).length;
            return (
              <Pressable
                key={category.id}
                onPress={() => onCategory(category.id)}
                accessibilityRole="button"
                accessibilityLabel={`查看${category.label}`}
                style={({ pressed }) => [styles.categoryCard, pressed && { opacity: 0.7 }]}
              >
                <View style={[styles.categoryIcon, { backgroundColor: category.background }]}>
                  <Ionicons name={category.icon} size={20} color={category.color} />
                </View>
                <Text style={styles.categoryName}>{category.label}</Text>
                <Text style={styles.categoryCount}>{count} 张卡片</Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 22, paddingTop: 14, paddingBottom: 34 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 34 },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  logo: { width: 39, height: 39, borderRadius: 14, backgroundColor: colors.ink, alignItems: 'center', justifyContent: 'center' },
  logoMark: { width: 39, height: 39, tintColor: '#F4F8EC' },
  brandName: { color: colors.ink, fontSize: 17, fontWeight: '900', letterSpacing: 1 },
  brandSub: { color: colors.muted, fontSize: 8, fontWeight: '800', letterSpacing: 1.5, marginTop: 1 },
  date: { color: colors.brand, fontSize: 12, fontWeight: '700', letterSpacing: 0.4, marginBottom: 9 },
  greeting: { color: colors.ink, fontSize: 27, fontWeight: '800', letterSpacing: 0.2 },
  intro: { color: colors.secondary, fontSize: 13, marginTop: 8, marginBottom: 23 },
  hero: { backgroundColor: colors.brandDark, borderRadius: 25, padding: 22 },
  heroTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  heroEyebrow: { color: '#A9C4B5', fontSize: 9, fontWeight: '800', letterSpacing: 1.5, marginBottom: 8 },
  heroTitle: { color: '#FFFFFF', fontSize: 20, fontWeight: '800' },
  heroIcon: { width: 43, height: 43, borderRadius: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: '#35574B' },
  heroNumbers: { flexDirection: 'row', alignItems: 'center', marginTop: 26, marginBottom: 23 },
  heroNumberBlock: { flex: 1 },
  heroNumber: { color: '#FFFFFF', fontSize: 30, fontWeight: '800' },
  heroLabel: { color: '#B2C8BD', fontSize: 11, marginTop: 4 },
  heroDivider: { height: 35, width: 1, backgroundColor: '#496258', marginRight: 16 },
  heroButton: { minHeight: 52, borderRadius: 15, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 9 },
  heroButtonDisabled: { backgroundColor: '#B9C6B7' },
  heroButtonText: { color: colors.brandDark, fontWeight: '800', fontSize: 15 },
  heroHint: { textAlign: 'center', color: '#A9C4B5', fontSize: 11, marginTop: 13 },
  section: { marginTop: 27 },
  rhythm: { padding: 17 },
  rhythmHeading: { flexDirection: 'row', alignItems: 'center', gap: 11 },
  rhythmIcon: { width: 41, height: 41, borderRadius: 14, backgroundColor: colors.brandLight, alignItems: 'center', justifyContent: 'center' },
  rhythmText: { flex: 1 },
  rhythmTitle: { fontSize: 14, fontWeight: '800', color: colors.ink },
  rhythmSub: { color: colors.muted, fontSize: 11, marginTop: 4 },
  goalNumber: { color: colors.brand, fontSize: 18, fontWeight: '800' },
  goalTotal: { color: colors.muted, fontSize: 13, fontWeight: '600' },
  progressTrack: { height: 6, backgroundColor: '#E9EEE8', borderRadius: 6, overflow: 'hidden', marginTop: 17 },
  progressFill: { height: 6, backgroundColor: colors.brand, borderRadius: 6 },
  rhythmFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  link: { color: colors.brand, fontSize: 11, fontWeight: '700' },
  categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  categoryCard: { width: '48.4%', flexGrow: 1, minWidth: 140, borderRadius: 20, padding: 16, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  categoryIcon: { height: 39, width: 39, borderRadius: 13, alignItems: 'center', justifyContent: 'center', marginBottom: 14 },
  categoryName: { color: colors.ink, fontSize: 13, fontWeight: '800' },
  categoryCount: { color: colors.muted, fontSize: 11, marginTop: 5 },
});
