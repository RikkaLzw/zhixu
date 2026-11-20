import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { FlatList, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { categories, getCategory } from '../categories';
import { ActionButton, IconButton } from '../components/ui';
import { formatInterval, getStudyQueue, matchesScope, StudyScope } from '../lib/scheduler';
import { colors } from '../theme';
import { topicLabel, topics } from '../topics';
import { CategoryId, StudyCard, StudyData, TopicId } from '../types';

const shortSourceNames: Record<string, string> = {
  original: '自编起步题',
  'cic-ids2017': 'CIC-IDS2017',
  'unsw-nb15': 'UNSW-NB15',
  'sklearn-evaluation': 'sklearn 评估',
  'zeek-logs': 'Zeek',
  'suricata-eve': 'Suricata',
  'codexglue-defects': 'CodeXGLUE',
  primevul: 'PrimeVul',
  'ember-malware': 'EMBER',
  llm4vuln: 'LLM4Vuln',
  'mitre-attack': 'MITRE ATT&CK',
  'security-copilot': 'Security Copilot',
  'security-rag': '安全 RAG',
  'github-ai4sec-interview': 'GitHub 面试题',
  'isolation-forest': 'Isolation Forest',
  openphish: 'OpenPhish',
  'oss-fuzz-gen': 'OSS-Fuzz-gen',
  custom: '个人自建',
};

export function LibraryScreen({ data, now, category, onCategory, topic, onTopic, sourceId, onSource, query, onQuery, onAdd, onEdit, onDelete, onStudy }: {
  data: StudyData;
  now: number;
  category?: CategoryId;
  onCategory: (category?: CategoryId) => void;
  topic?: TopicId;
  onTopic: (topic?: TopicId) => void;
  sourceId?: string;
  onSource: (sourceId?: string) => void;
  query: string;
  onQuery: (query: string) => void;
  onAdd: () => void;
  onEdit: (card: StudyCard) => void;
  onDelete: (id: string) => void;
  onStudy: (scope: StudyScope) => void;
}) {
  const [deleteTarget, setDeleteTarget] = useState<StudyCard | null>(null);
  const scope: StudyScope = { category, topic, sourceId, query };
  const cards = data.cards.filter((card) => matchesScope(card, scope));
  const queue = getStudyQueue(data, now, undefined, scope);
  const filtered = Boolean(category || topic || sourceId || query.trim());
  const availableTopics = Array.from(new Map(
    topics.filter((item) => !category || item.category === category).map((item) => [item.id, item])
  ).values());
  const sourceIds = Array.from(new Set(data.cards.flatMap((card) => card.sources?.length
    ? card.sources.map((source) => source.id)
    : ['custom'])));

  const header = (
    <>
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>知识收藏</Text>
          <Text style={styles.title}>AI4SEC 题库</Text>
          <Text style={styles.subtitle}>按方向、主题或来源找到需要的知识。</Text>
        </View>
        <IconButton icon="add" label="添加卡片" onPress={onAdd} light />
      </View>
      <View style={styles.search}>
        <Ionicons name="search-outline" size={19} color={colors.muted} />
        <TextInput
          accessibilityLabel="搜索卡片"
          placeholder="搜索问题、解析、标签或来源"
          placeholderTextColor={colors.muted}
          value={query}
          onChangeText={onQuery}
          style={styles.searchInput}
          returnKeyType="search"
        />
        {query.length > 0 && (
          <Pressable onPress={() => onQuery('')} accessibilityRole="button" accessibilityLabel="清除搜索">
            <Ionicons name="close-circle" size={19} color={colors.muted} />
          </Pressable>
        )}
      </View>
      <Text style={styles.filterHeading}>方向</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
        <Pressable accessibilityRole="button" accessibilityLabel="全部方向" onPress={() => onCategory(undefined)} style={[styles.filter, !category && styles.filterSelected]}>
          <Text style={[styles.filterText, !category && styles.filterTextSelected]}>全部</Text>
        </Pressable>
        {categories.map((item) => (
          <Pressable key={item.id} accessibilityRole="button" accessibilityLabel={`方向：${item.label}`} onPress={() => onCategory(item.id)} style={[styles.filter, category === item.id && styles.filterSelected]}>
            <Text style={[styles.filterText, category === item.id && styles.filterTextSelected]}>{item.label}</Text>
          </Pressable>
        ))}
      </ScrollView>
      <Text style={styles.filterHeading}>主题</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
        <Pressable accessibilityRole="button" accessibilityLabel="全部主题" onPress={() => onTopic(undefined)} style={[styles.filter, !topic && styles.filterSelected]}>
          <Text style={[styles.filterText, !topic && styles.filterTextSelected]}>全部</Text>
        </Pressable>
        {availableTopics.map((item) => (
          <Pressable key={item.id} accessibilityRole="button" accessibilityLabel={`主题：${item.label}`} onPress={() => onTopic(item.id)} style={[styles.filter, topic === item.id && styles.filterSelected]}>
            <Text style={[styles.filterText, topic === item.id && styles.filterTextSelected]}>{item.label}</Text>
          </Pressable>
        ))}
      </ScrollView>
      <Text style={styles.filterHeading}>来源</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
        <Pressable accessibilityRole="button" accessibilityLabel="全部来源" onPress={() => onSource(undefined)} style={[styles.filter, !sourceId && styles.filterSelected]}>
          <Text style={[styles.filterText, !sourceId && styles.filterTextSelected]}>全部</Text>
        </Pressable>
        {sourceIds.map((id) => (
          <Pressable key={id} accessibilityRole="button" accessibilityLabel={`来源：${shortSourceNames[id] ?? id}`} onPress={() => onSource(id)} style={[styles.filter, sourceId === id && styles.filterSelected]}>
            <Text style={[styles.filterText, sourceId === id && styles.filterTextSelected]}>{shortSourceNames[id] ?? id}</Text>
          </Pressable>
        ))}
      </ScrollView>
      {filtered && (
        <View style={styles.categoryBanner}>
          <View style={styles.categoryBannerText}>
            <Text style={styles.categoryBannerTitle}>当前筛选</Text>
            <Text style={styles.categoryBannerSub}>{cards.length} 张卡片 · {queue.length} 张待学习</Text>
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="学习筛选结果"
            disabled={queue.length === 0}
            onPress={() => onStudy(scope)}
            style={[styles.smallButton, queue.length === 0 && { opacity: 0.4 }]}
          >
            <Text style={styles.smallButtonText}>开始学习</Text>
            <Ionicons name="arrow-forward" size={14} color="#FFFFFF" />
          </Pressable>
        </View>
      )}
      <View style={styles.listHeading}>
        <Text style={styles.listTitle}>{filtered ? '筛选结果' : '全部卡片'}</Text>
        <Text style={styles.listCount}>{cards.length} 张</Text>
      </View>
    </>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cards}
        keyExtractor={(card) => card.id}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        initialNumToRender={10}
        windowSize={7}
        ListHeaderComponent={header}
        ListEmptyComponent={(
          <View style={styles.empty}>
            <Ionicons name="albums-outline" size={30} color="#B4C3B8" />
            <Text style={styles.emptyTitle}>这里还没有卡片</Text>
            <Text style={styles.emptyText}>{filtered ? '试试调整筛选或关键词' : '添加一张属于你的知识卡片'}</Text>
          </View>
        )}
        renderItem={({ item: card }) => {
          const cardCategory = getCategory(card.category);
          const progress = data.progress[card.id];
          const status = !progress ? '未学习' : progress.dueAt <= now ? '待复习' : `${formatInterval(progress.dueAt - now)}后复习`;
          return (
            <View style={styles.card}>
              <View style={styles.cardTop}>
                <View style={[styles.cardTag, { backgroundColor: cardCategory.background }]}>
                  <Text style={[styles.cardTagText, { color: cardCategory.color }]}>{topicLabel(card.topic)}</Text>
                </View>
                <Text style={styles.cardStatus}>{status}</Text>
              </View>
              <Text style={styles.question}>{card.question}</Text>
              <Text style={styles.answer} numberOfLines={2}>{card.answer}</Text>
              {(card.tags?.length || card.level) ? (
                <Text style={styles.metadata} numberOfLines={1}>
                  {[card.level, ...(card.tags ?? []).slice(0, 3)].filter(Boolean).join(' · ')}
                </Text>
              ) : null}
              <View style={styles.cardActions}>
                <Pressable onPress={() => onEdit(card)} accessibilityRole="button" accessibilityLabel={`编辑卡片：${card.question}`} style={styles.textAction}>
                  <Ionicons name="create-outline" size={16} color={colors.brand} />
                  <Text style={styles.editText}>编辑</Text>
                </Pressable>
                <Pressable onPress={() => setDeleteTarget(card)} accessibilityRole="button" accessibilityLabel={`删除卡片：${card.question}`} style={styles.textAction}>
                  <Ionicons name="trash-outline" size={16} color={colors.muted} />
                  <Text style={styles.deleteText}>删除</Text>
                </Pressable>
              </View>
            </View>
          );
        }}
      />
      <Modal visible={deleteTarget !== null} transparent animationType="fade" onRequestClose={() => setDeleteTarget(null)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>删除这张卡片？</Text>
            <Text style={styles.modalText}>卡片和它的复习进度会被删除，历史学习次数会保留。</Text>
            <View style={styles.modalActions}>
              <View style={styles.modalAction}><ActionButton label="取消" secondary onPress={() => setDeleteTarget(null)} /></View>
              <View style={styles.modalAction}><ActionButton label="确认删除" onPress={() => {
                if (deleteTarget) onDelete(deleteTarget.id);
                setDeleteTarget(null);
              }} /></View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: 22, paddingTop: 30, paddingBottom: 34 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  eyebrow: { color: colors.brand, fontSize: 10, fontWeight: '800', letterSpacing: 1.5, marginBottom: 9 },
  title: { color: colors.ink, fontSize: 27, fontWeight: '800' },
  subtitle: { color: colors.secondary, fontSize: 13, marginTop: 8 },
  search: { marginTop: 23, flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 15, paddingHorizontal: 14, minHeight: 50 },
  searchInput: { flex: 1, color: colors.ink, fontSize: 13, paddingVertical: 12 },
  filterHeading: { color: colors.secondary, fontSize: 11, fontWeight: '700', marginTop: 16 },
  filters: { flexDirection: 'row', gap: 8, paddingTop: 8 },
  filter: { borderRadius: 12, backgroundColor: '#EBF0EA', paddingHorizontal: 13, paddingVertical: 9 },
  filterSelected: { backgroundColor: colors.brandDark },
  filterText: { color: colors.secondary, fontSize: 12, fontWeight: '700' },
  filterTextSelected: { color: '#FFFFFF' },
  categoryBanner: { backgroundColor: colors.brandLight, borderRadius: 18, padding: 16, flexDirection: 'row', alignItems: 'center', marginTop: 18 },
  categoryBannerText: { flex: 1 },
  categoryBannerTitle: { color: colors.brandDark, fontSize: 14, fontWeight: '800' },
  categoryBannerSub: { color: colors.brand, fontSize: 11, marginTop: 5 },
  smallButton: { backgroundColor: colors.brand, borderRadius: 12, flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 10 },
  smallButtonText: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },
  listHeading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, marginBottom: 12 },
  listTitle: { color: colors.ink, fontSize: 15, fontWeight: '800' },
  listCount: { color: colors.muted, fontSize: 12 },
  card: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 19, padding: 16, marginBottom: 10 },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  cardTag: { borderRadius: 8, paddingHorizontal: 9, paddingVertical: 5 },
  cardTagText: { fontSize: 10, fontWeight: '700' },
  cardStatus: { color: colors.muted, fontSize: 10 },
  question: { color: colors.ink, fontSize: 14, fontWeight: '800', lineHeight: 22 },
  answer: { color: colors.secondary, fontSize: 12, lineHeight: 20, marginTop: 7 },
  metadata: { color: colors.muted, fontSize: 10, lineHeight: 17, marginTop: 8 },
  cardActions: { flexDirection: 'row', gap: 22, marginTop: 14 },
  textAction: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  editText: { color: colors.brand, fontSize: 11, fontWeight: '700' },
  deleteText: { color: colors.muted, fontSize: 11 },
  empty: { alignItems: 'center', paddingVertical: 60 },
  emptyTitle: { color: colors.ink, fontSize: 14, fontWeight: '700', marginTop: 12 },
  emptyText: { color: colors.muted, fontSize: 12, marginTop: 6 },
  modalBackdrop: { flex: 1, backgroundColor: 'rgba(19, 32, 27, 0.45)', justifyContent: 'center', padding: 26 },
  modal: { backgroundColor: '#FFFFFF', borderRadius: 24, padding: 22 },
  modalTitle: { fontSize: 18, fontWeight: '800', color: colors.ink },
  modalText: { fontSize: 13, lineHeight: 22, color: colors.secondary, marginTop: 10 },
  modalActions: { flexDirection: 'row', gap: 10, marginTop: 22 },
  modalAction: { flex: 1 },
});
