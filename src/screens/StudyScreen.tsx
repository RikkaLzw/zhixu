import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Alert, Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { getCategory } from '../categories';
import { ActionButton, IconButton } from '../components/ui';
import { formatInterval, getNextDue, getStudyQueue, scheduleCard, StudyScope } from '../lib/scheduler';
import { colors } from '../theme';
import { Rating, StudyCard, StudyData } from '../types';

const ratings: { id: Rating; label: string; color: string; background: string }[] = [
  { id: 'again', label: '忘记', color: '#AE5353', background: '#FAEBE9' },
  { id: 'hard', label: '模糊', color: '#AF7A3E', background: '#FBF1E3' },
  { id: 'good', label: '记得', color: '#397A62', background: '#E8F4EB' },
  { id: 'easy', label: '简单', color: '#5D72AA', background: '#EEF1FB' },
];

export function StudyScreen({ data, now, scope, onReview, onClose }: {
  data: StudyData;
  now: number;
  scope: StudyScope;
  onReview: (card: StudyCard, rating: Rating, now: number) => void;
  onClose: () => void;
}) {
  const queue = getStudyQueue(data, now, undefined, scope);
  const [currentId, setCurrentId] = useState<string | null>(queue[0]?.id ?? null);
  const [revealed, setRevealed] = useState(false);
  const [completed, setCompleted] = useState(0);
  const current = data.cards.find((card) => card.id === currentId);

  useEffect(() => {
    if (!currentId && queue.length > 0) setCurrentId(queue[0].id);
  }, [currentId, queue]);

  const rate = (rating: Rating) => {
    if (!current) return;
    onReview(current, rating, Date.now());
    setCompleted((count) => count + 1);
    setRevealed(false);
    setCurrentId(null);
  };

  if (!current) {
    const nextDue = getNextDue(data, now, undefined, scope);
    return (
      <View style={styles.container}>
        <View style={styles.topBar}>
          <IconButton icon="close" label="结束学习" onPress={onClose} />
          <Text style={styles.topTitle}>本次学习</Text>
          <View style={styles.topSpacer} />
        </View>
        <View style={styles.finished}>
          <View style={styles.finishedIcon}><Ionicons name="leaf-outline" size={36} color={colors.brand} /></View>
          <Text style={styles.finishedTitle}>这一刻，先学到这里</Text>
          <Text style={styles.finishedText}>
            {completed > 0 ? `本次完成 ${completed} 次学习。` : '当前没有需要学习的卡片。'}
            {nextDue ? `\n下一张卡片约 ${formatInterval(nextDue - now)} 后到期。` : '\n新知识会按照每日目标加入。'}
          </Text>
          <View style={styles.finishedButton}><ActionButton label="回到首页" onPress={onClose} /></View>
        </View>
      </View>
    );
  }

  const cardCategory = getCategory(current.category);
  const progress = data.progress[current.id];
  const stage = !progress ? '新知识' : progress.stage === 'learning' ? '短期巩固' : '长期复习';

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <IconButton icon="close" label="结束学习" onPress={onClose} />
        <View style={styles.topCenter}>
          <Text style={styles.topTitle}>{scope.category ? getCategory(scope.category).label : scope.sourceId || scope.topic || scope.query ? '筛选学习' : '今日学习'}</Text>
          <Text style={styles.topSubtitle}>已完成 {completed} 次 · 待学习 {queue.length} 张</Text>
        </View>
        <View style={styles.topSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={[styles.categoryTag, { backgroundColor: cardCategory.background }]}>
              <Text style={[styles.categoryTagText, { color: cardCategory.color }]}>{cardCategory.label}</Text>
            </View>
            <Text style={styles.stage}>{stage}</Text>
          </View>
          <Text style={styles.cardEyebrow}>问题</Text>
          <Text style={styles.question}>{current.question}</Text>
          {!revealed && (
            <View style={styles.thinkHint}>
              <Ionicons name="sparkles-outline" size={15} color={colors.muted} />
              <Text style={styles.thinkHintText}>先试着回忆，再查看答案</Text>
            </View>
          )}
          {revealed && (
            <View style={styles.answerBlock}>
              <View style={styles.answerDivider} />
              <Text style={styles.answerEyebrow}>答案</Text>
              <Text style={styles.answer}>{current.answer}</Text>
              {current.explanation && (
                <View style={styles.detailBlock}>
                  <Text style={styles.detailTitle}>深入理解</Text>
                  <Text style={styles.detailText}>{current.explanation}</Text>
                  {current.otherExplanations?.map((explanation) => (
                    <Text key={explanation} style={styles.detailText}>{explanation}</Text>
                  ))}
                </View>
              )}
              {current.example && (
                <View style={styles.detailBlock}>
                  <Text style={styles.detailTitle}>应用示例</Text>
                  <Text style={styles.detailText}>{current.example}</Text>
                  {current.otherExamples?.map((example) => (
                    <Text key={example} style={styles.detailText}>{example}</Text>
                  ))}
                </View>
              )}
              {current.alternateQuestions && current.alternateQuestions.length > 0 && (
                <View style={styles.detailBlock}>
                  <Text style={styles.detailTitle}>相关问法</Text>
                  {current.alternateQuestions.map((question) => <Text key={question} style={styles.detailText}>{question}</Text>)}
                </View>
              )}
              {current.sources && current.sources.length > 0 && (
                <View style={styles.sources}>
                  <Text style={styles.detailTitle}>参考来源</Text>
                  {current.sources.map((source) => (
                    <Pressable
                      key={`${source.id}-${source.sourceCardId}`}
                      disabled={!source.url}
                      onPress={() => {
                        if (source.url) void Linking.openURL(source.url).catch(() => Alert.alert('无法打开资料', '请检查设备是否可以访问该链接。'));
                      }}
                      accessibilityRole={source.url ? 'link' : 'text'}
                      accessibilityLabel={`${source.title}，${source.evidence === 'source' ? '原文依据' : '应用整理'}`}
                      style={styles.sourceRow}
                    >
                      <Text style={styles.sourceText}>{source.title} · {source.evidence === 'source' ? '原文依据' : '应用整理'}</Text>
                      {source.url ? <Ionicons name="open-outline" size={13} color={colors.brand} /> : null}
                    </Pressable>
                  ))}
                </View>
              )}
            </View>
          )}
        </View>

        {!revealed ? (
          <View style={styles.actions}>
            <ActionButton label="显示答案" icon="eye-outline" onPress={() => setRevealed(true)} />
            <Text style={styles.actionHint}>回忆的过程，就是记忆生长的过程</Text>
          </View>
        ) : (
          <View style={styles.actions}>
            <Text style={styles.ratingTitle}>回忆得怎么样？</Text>
            <Text style={styles.ratingSubtitle}>根据你的选择，安排下次复习</Text>
            <View style={styles.ratingRow}>
              {ratings.map((rating) => {
                const next = scheduleCard(progress, rating.id, now);
                const interval = formatInterval(next.dueAt - now);
                return (
                  <Pressable
                    key={rating.id}
                    onPress={() => rate(rating.id)}
                    accessibilityRole="button"
                    accessibilityLabel={`${rating.label}，${interval}后复习`}
                    style={({ pressed }) => [styles.ratingButton, { backgroundColor: rating.background }, pressed && { opacity: 0.7 }]}
                  >
                    <Text style={[styles.ratingLabel, { color: rating.color }]}>{rating.label}</Text>
                    <Text style={[styles.ratingInterval, { color: rating.color }]}>{interval}</Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 22, paddingTop: 13, paddingBottom: 18 },
  topCenter: { alignItems: 'center' },
  topTitle: { color: colors.ink, fontSize: 15, fontWeight: '800', textAlign: 'center' },
  topSubtitle: { color: colors.muted, fontSize: 10, marginTop: 5 },
  topSpacer: { width: 42 },
  scroll: { flexGrow: 1, paddingHorizontal: 22, paddingBottom: 30 },
  card: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 25, padding: 23, minHeight: 335, justifyContent: 'center' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 35 },
  categoryTag: { borderRadius: 9, paddingHorizontal: 10, paddingVertical: 6 },
  categoryTagText: { fontSize: 11, fontWeight: '700' },
  stage: { color: colors.muted, fontSize: 11 },
  cardEyebrow: { color: colors.brand, fontSize: 10, fontWeight: '800', letterSpacing: 1.5, marginBottom: 14 },
  question: { color: colors.ink, fontSize: 22, fontWeight: '800', lineHeight: 34 },
  thinkHint: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 30 },
  thinkHintText: { color: colors.muted, fontSize: 12 },
  answerBlock: { marginTop: 24 },
  answerDivider: { height: 1, backgroundColor: colors.border, marginBottom: 23 },
  answerEyebrow: { color: colors.brand, fontSize: 10, fontWeight: '800', letterSpacing: 1.5, marginBottom: 10 },
  answer: { color: '#465B52', fontSize: 15, lineHeight: 26 },
  detailBlock: { marginTop: 19 },
  detailTitle: { color: colors.ink, fontSize: 12, fontWeight: '800' },
  detailText: { color: colors.secondary, fontSize: 13, lineHeight: 22, marginTop: 7 },
  sources: { marginTop: 20, paddingTop: 17, borderTopWidth: 1, borderTopColor: colors.border },
  sourceRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 9 },
  sourceText: { color: colors.brand, fontSize: 11, lineHeight: 18, flexShrink: 1 },
  actions: { marginTop: 21 },
  actionHint: { textAlign: 'center', color: colors.muted, fontSize: 11, marginTop: 13 },
  ratingTitle: { textAlign: 'center', color: colors.ink, fontSize: 15, fontWeight: '800' },
  ratingSubtitle: { textAlign: 'center', color: colors.muted, fontSize: 11, marginTop: 6, marginBottom: 16 },
  ratingRow: { flexDirection: 'row', gap: 8 },
  ratingButton: { flex: 1, alignItems: 'center', borderRadius: 15, paddingVertical: 13, minWidth: 0 },
  ratingLabel: { fontSize: 14, fontWeight: '800' },
  ratingInterval: { fontSize: 10, marginTop: 5 },
  finished: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 32, paddingBottom: 90 },
  finishedIcon: { width: 82, height: 82, borderRadius: 28, backgroundColor: colors.brandLight, alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
  finishedTitle: { color: colors.ink, fontSize: 21, fontWeight: '800', textAlign: 'center' },
  finishedText: { color: colors.secondary, fontSize: 13, lineHeight: 23, textAlign: 'center', marginTop: 12 },
  finishedButton: { width: '100%', marginTop: 28 },
});
