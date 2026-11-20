import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SectionTitle, Surface } from '../components/ui';
import { getStreak, localDayKey } from '../lib/scheduler';
import { colors } from '../theme';
import { StudyData } from '../types';

export function StatsScreen({ data, now }: { data: StudyData; now: number }) {
  const dates = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(now);
    date.setHours(12, 0, 0, 0);
    date.setDate(date.getDate() - (6 - index));
    const key = localDayKey(date.getTime());
    return {
      key,
      label: index === 6 ? '今天' : `${date.getMonth() + 1}/${date.getDate()}`,
      count: data.history.filter((event) => localDayKey(event.reviewedAt) === key).length,
    };
  });
  const maximum = Math.max(1, ...dates.map((date) => date.count));
  const learned = data.cards.filter((card) => Boolean(data.progress[card.id])).length;
  const learning = data.cards.filter((card) => data.progress[card.id]?.stage === 'learning').length;
  const reviewing = data.cards.filter((card) => data.progress[card.id]?.stage === 'review').length;
  const total = data.cards.length;

  return (
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <Text style={styles.eyebrow}>学习轨迹</Text>
      <Text style={styles.title}>每一步，都算数。</Text>
      <Text style={styles.subtitle}>看见自己的积累，也相信时间的力量。</Text>

      <View style={styles.statsRow}>
        <Surface style={styles.statCard}>
          <View style={[styles.statIcon, { backgroundColor: '#F5F0E2' }]}><Ionicons name="flame-outline" size={20} color="#B78B42" /></View>
          <Text style={styles.statNumber}>{getStreak(data, now)}<Text style={styles.statUnit}> 天</Text></Text>
          <Text style={styles.statLabel}>连续学习</Text>
        </Surface>
        <Surface style={styles.statCard}>
          <View style={[styles.statIcon, { backgroundColor: colors.brandLight }]}><Ionicons name="checkmark-done-outline" size={20} color={colors.brand} /></View>
          <Text style={styles.statNumber}>{data.history.length}<Text style={styles.statUnit}> 次</Text></Text>
          <Text style={styles.statLabel}>累计学习</Text>
        </Surface>
      </View>

      <View style={styles.section}>
        <SectionTitle title="最近 7 天" note="按学习次数统计" />
        <Surface style={styles.chart}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartTitle}>学习记录</Text>
            <Text style={styles.chartTotal}>{dates.reduce((sum, date) => sum + date.count, 0)} 次</Text>
          </View>
          <View style={styles.bars}>
            {dates.map((date, index) => (
              <View key={date.key} style={styles.barColumn}>
                <Text style={styles.barValue}>{date.count || ''}</Text>
                <View style={styles.barSpace}>
                  <View style={[styles.bar, { height: date.count ? Math.max(8, (date.count / maximum) * 100) : 4 }, index === 6 && styles.barToday]} />
                </View>
                <Text style={[styles.barLabel, index === 6 && styles.barLabelToday]}>{date.label}</Text>
              </View>
            ))}
          </View>
        </Surface>
      </View>

      <View style={styles.section}>
        <SectionTitle title="记忆状态" note={`${learned} / ${total} 张已学习`} />
        <Surface style={styles.memory}>
          <View style={styles.memoryRow}>
            <View style={[styles.dot, { backgroundColor: '#D5AA74' }]} />
            <View style={styles.memoryText}><Text style={styles.memoryTitle}>短期巩固</Text><Text style={styles.memorySub}>需要较快再见面的卡片</Text></View>
            <Text style={styles.memoryCount}>{learning}</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.memoryRow}>
            <View style={[styles.dot, { backgroundColor: colors.brand }]} />
            <View style={styles.memoryText}><Text style={styles.memoryTitle}>长期复习</Text><Text style={styles.memorySub}>按逐渐拉长的间隔复习</Text></View>
            <Text style={styles.memoryCount}>{reviewing}</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.memoryRow}>
            <View style={[styles.dot, { backgroundColor: '#C7D1CA' }]} />
            <View style={styles.memoryText}><Text style={styles.memoryTitle}>等待学习</Text><Text style={styles.memorySub}>还没有开始的知识</Text></View>
            <Text style={styles.memoryCount}>{total - learned}</Text>
          </View>
        </Surface>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 22, paddingTop: 30, paddingBottom: 34 },
  eyebrow: { color: colors.brand, fontSize: 10, fontWeight: '800', letterSpacing: 1.5, marginBottom: 9 },
  title: { color: colors.ink, fontSize: 27, fontWeight: '800' },
  subtitle: { color: colors.secondary, fontSize: 13, marginTop: 8 },
  statsRow: { flexDirection: 'row', gap: 11, marginTop: 25 },
  statCard: { flex: 1, padding: 17 },
  statIcon: { width: 39, height: 39, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginBottom: 15 },
  statNumber: { color: colors.ink, fontSize: 27, fontWeight: '800' },
  statUnit: { color: colors.secondary, fontSize: 12, fontWeight: '600' },
  statLabel: { color: colors.muted, fontSize: 12, marginTop: 4 },
  section: { marginTop: 27 },
  chart: { padding: 18 },
  chartHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  chartTitle: { color: colors.secondary, fontSize: 12 },
  chartTotal: { color: colors.brand, fontSize: 13, fontWeight: '800' },
  bars: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 },
  barColumn: { flex: 1, alignItems: 'center' },
  barSpace: { height: 100, justifyContent: 'flex-end' },
  bar: { width: 19, borderRadius: 8, backgroundColor: '#DCE9DF' },
  barToday: { backgroundColor: colors.brand },
  barValue: { height: 20, fontSize: 10, color: colors.secondary },
  barLabel: { color: colors.muted, fontSize: 10, marginTop: 8 },
  barLabelToday: { color: colors.brand, fontWeight: '700' },
  memory: { paddingHorizontal: 18 },
  memoryRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 17 },
  dot: { width: 10, height: 10, borderRadius: 5, marginRight: 12 },
  memoryText: { flex: 1 },
  memoryTitle: { color: colors.ink, fontSize: 13, fontWeight: '800' },
  memorySub: { color: colors.muted, fontSize: 11, marginTop: 4 },
  memoryCount: { color: colors.ink, fontSize: 18, fontWeight: '800' },
  line: { height: 1, backgroundColor: colors.border },
});
