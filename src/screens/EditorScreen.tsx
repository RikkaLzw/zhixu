import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { categories } from '../categories';
import { ActionButton, IconButton } from '../components/ui';
import { colors } from '../theme';
import { normalizeTag } from '../tags';
import { defaultTopic, topics } from '../topics';
import { CategoryId, StudyCard, TopicId } from '../types';

export function EditorScreen({ card, initialCategory, initialTopic, onSave, onClose }: {
  card?: StudyCard;
  initialCategory?: CategoryId;
  initialTopic?: TopicId;
  onSave: (card: { id?: string; category: CategoryId; topic: TopicId; question: string; answer: string; explanation?: string; example?: string; tags: string[] }) => void;
  onClose: () => void;
}) {
  const [question, setQuestion] = useState(card?.question ?? '');
  const [answer, setAnswer] = useState(card?.answer ?? '');
  const initialGroup = card?.category ?? initialCategory ?? topics.find((item) => item.id === initialTopic)?.category ?? 'foundations';
  const [category, setCategory] = useState<CategoryId>(initialGroup);
  const [topic, setTopic] = useState<TopicId>(card?.topic ??
    (topics.some((item) => item.id === initialTopic && item.category === initialGroup) ? initialTopic! : defaultTopic(initialGroup)));
  const [explanation, setExplanation] = useState(card?.explanation ?? '');
  const [example, setExample] = useState(card?.example ?? '');
  const [tags, setTags] = useState((card?.tags ?? []).join('，'));
  const [error, setError] = useState(false);

  const save = () => {
    if (!question.trim() || !answer.trim()) {
      setError(true);
      return;
    }
    onSave({
      id: card?.id,
      category,
      topic,
      question,
      answer,
      explanation: explanation.trim() || undefined,
      example: example.trim() || undefined,
      tags: Array.from(new Set(tags.split(/[，,、]/).map(normalizeTag).filter(Boolean))),
    });
    onClose();
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.topBar}>
        <IconButton icon="close" label="关闭编辑" onPress={onClose} />
        <Text style={styles.topTitle}>{card ? '编辑卡片' : '添加卡片'}</Text>
        <View style={styles.topSpacer} />
      </View>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.intro}>把一个知识点，写成一张卡片。</Text>
        <Text style={styles.label}>所属分类</Text>
        <View style={styles.categories}>
          {categories.map((item) => (
            <Pressable key={item.id} onPress={() => { setCategory(item.id); setTopic(defaultTopic(item.id)); }} style={[styles.category, category === item.id && styles.categorySelected]}>
              <Text style={[styles.categoryText, category === item.id && styles.categoryTextSelected]}>{item.label}</Text>
            </Pressable>
          ))}
        </View>
        <Text style={styles.label}>知识主题</Text>
        <View style={styles.categories}>
          {topics.filter((item) => item.category === category).map((item) => (
            <Pressable key={item.id} accessibilityRole="button" accessibilityLabel={`选择主题：${item.label}`} onPress={() => setTopic(item.id)} style={[styles.category, topic === item.id && styles.categorySelected]}>
              <Text style={[styles.categoryText, topic === item.id && styles.categoryTextSelected]}>{item.label}</Text>
            </Pressable>
          ))}
        </View>
        <Text style={styles.label}>问题</Text>
        <TextInput
          accessibilityLabel="卡片问题"
          multiline
          value={question}
          onChangeText={(value) => { setQuestion(value); setError(false); }}
          placeholder="例如：安全检测中的误报是什么？"
          placeholderTextColor={colors.muted}
          style={[styles.input, styles.question]}
          textAlignVertical="top"
        />
        <Text style={styles.label}>答案</Text>
        <TextInput
          accessibilityLabel="卡片答案"
          multiline
          value={answer}
          onChangeText={(value) => { setAnswer(value); setError(false); }}
          placeholder="写下简洁、准确的解释"
          placeholderTextColor={colors.muted}
          style={[styles.input, styles.answer]}
          textAlignVertical="top"
        />
        <Text style={styles.label}>深入理解（可选）</Text>
        <TextInput
          accessibilityLabel="卡片解析"
          multiline
          value={explanation}
          onChangeText={setExplanation}
          placeholder="补充原理、边界或易错点"
          placeholderTextColor={colors.muted}
          style={[styles.input, styles.optionalInput]}
          textAlignVertical="top"
        />
        <Text style={styles.label}>应用示例（可选）</Text>
        <TextInput
          accessibilityLabel="卡片示例"
          multiline
          value={example}
          onChangeText={setExample}
          placeholder="结合一个安全场景说明"
          placeholderTextColor={colors.muted}
          style={[styles.input, styles.optionalInput]}
          textAlignVertical="top"
        />
        <Text style={styles.label}>标签（可选）</Text>
        <TextInput
          accessibilityLabel="卡片标签"
          value={tags}
          onChangeText={setTags}
          placeholder="用逗号分隔，例如：流量检测，误报"
          placeholderTextColor={colors.muted}
          style={styles.input}
        />
        {card?.sources?.length ? <Text style={styles.sourceHint}>修改问题、答案或解析后，该卡片会标记为个人自建内容。</Text> : null}
        {error && <Text style={styles.error}>请填写问题和答案。</Text>}
        <View style={styles.save}><ActionButton label="保存卡片" onPress={save} icon="checkmark" /></View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 22, paddingTop: 13, paddingBottom: 18 },
  topTitle: { color: colors.ink, fontSize: 15, fontWeight: '800' },
  topSpacer: { width: 42 },
  content: { paddingHorizontal: 22, paddingBottom: 40 },
  intro: { color: colors.secondary, fontSize: 13, marginBottom: 8 },
  label: { color: colors.ink, fontSize: 13, fontWeight: '800', marginTop: 23, marginBottom: 11 },
  categories: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  category: { borderRadius: 12, backgroundColor: '#EBF0EA', paddingHorizontal: 13, paddingVertical: 10 },
  categorySelected: { backgroundColor: colors.brandDark },
  categoryText: { color: colors.secondary, fontSize: 12, fontWeight: '700' },
  categoryTextSelected: { color: '#FFFFFF' },
  input: { borderWidth: 1, borderColor: colors.border, borderRadius: 16, backgroundColor: colors.surface, padding: 15, fontSize: 14, lineHeight: 22, color: colors.ink },
  question: { minHeight: 110 },
  answer: { minHeight: 150 },
  optionalInput: { minHeight: 90 },
  sourceHint: { color: colors.muted, fontSize: 11, lineHeight: 19, marginTop: 14 },
  error: { color: colors.danger, fontSize: 12, marginTop: 10 },
  save: { marginTop: 24 },
});
