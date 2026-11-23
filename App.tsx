import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, AppState, BackHandler, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ActionButton } from './src/components/ui';
import { StudyScope } from './src/lib/scheduler';
import { enabledStudyLevels } from './src/levels';
import { EditorScreen } from './src/screens/EditorScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { LibraryScreen } from './src/screens/LibraryScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { StatsScreen } from './src/screens/StatsScreen';
import { StudyScreen } from './src/screens/StudyScreen';
import { colors } from './src/theme';
import { CategoryId, StudyCard, StudyLevel, TopicId } from './src/types';
import { useStudyData } from './src/useStudyData';

type Tab = 'home' | 'library' | 'stats';
type Overlay = 'study' | 'editor' | 'settings' | null;

const tabs = [
  { id: 'home' as const, label: '学习', icon: 'home-outline' as const, selected: 'home' as const },
  { id: 'library' as const, label: '题库', icon: 'albums-outline' as const, selected: 'albums' as const },
  { id: 'stats' as const, label: '进度', icon: 'bar-chart-outline' as const, selected: 'bar-chart' as const },
];

function StudyApp() {
  const store = useStudyData();
  const [tab, setTab] = useState<Tab>('home');
  const [overlay, setOverlay] = useState<Overlay>(null);
  const [category, setCategory] = useState<CategoryId | undefined>();
  const [topic, setTopic] = useState<TopicId | undefined>();
  const [sourceId, setSourceId] = useState<string | undefined>();
  const [query, setQuery] = useState('');
  const [libraryStudySet, setLibraryStudySet] = useState<NonNullable<StudyScope['studySet']>>('regular');
  const [libraryLevel, setLibraryLevel] = useState<StudyLevel | undefined>();
  const [studyScope, setStudyScope] = useState<StudyScope>({});
  const [editing, setEditing] = useState<StudyCard | undefined>();
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 15_000);
    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'active') setNow(Date.now());
    });
    return () => {
      clearInterval(timer);
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      if (overlay) {
        setOverlay(null);
        return true;
      }
      if (tab !== 'home') {
        setTab('home');
        return true;
      }
      return false;
    });
    return () => subscription.remove();
  }, [overlay, tab]);

  const startStudy = (scope: StudyScope = {}) => {
    setNow(Date.now());
    setStudyScope(scope);
    setOverlay('study');
  };

  if (!store.data) {
    return (
      <View style={styles.loading}>
        {store.loadError ? (
          <>
            <Text style={styles.loadingTitle}>学习数据暂时无法读取</Text>
            <Text style={styles.loadingText}>请重试，原有数据仍保留在设备中。</Text>
            <View style={styles.retry}><ActionButton label="重新读取" onPress={() => void store.load()} /></View>
          </>
        ) : <ActivityIndicator size="large" color={colors.brand} />}
      </View>
    );
  }

  const data = store.data;
  let content;
  if (overlay === 'study') {
    content = <StudyScreen data={data} now={now} scope={studyScope} onReview={store.review} onClose={() => setOverlay(null)} />;
  } else if (overlay === 'editor') {
    content = <EditorScreen card={editing} initialCategory={category} initialTopic={topic} onSave={store.saveCard} onClose={() => setOverlay(null)} />;
  } else if (overlay === 'settings') {
    content = <SettingsScreen dailyLimit={data.settings.dailyNewLimit} cards={data.cards} enabledLevels={enabledStudyLevels(data.settings)}
      onLimit={store.setDailyLimit} onLevels={store.setEnabledLevels} onClose={() => setOverlay(null)} />;
  } else if (tab === 'home') {
    content = <HomeScreen data={data} now={now} onStudy={() => startStudy()} onSettings={() => setOverlay('settings')} onCategory={(selected) => {
      setCategory(selected);
      setTopic(undefined);
      setSourceId(undefined);
      setQuery('');
      setLibraryStudySet('regular');
      setLibraryLevel(undefined);
      setTab('library');
    }} />;
  } else if (tab === 'library') {
    content = <LibraryScreen data={data} now={now} category={category} onCategory={(selected) => {
      setCategory(selected);
      setTopic(undefined);
    }} topic={topic} onTopic={setTopic} sourceId={sourceId} onSource={setSourceId} query={query} onQuery={setQuery}
      studySet={libraryStudySet} onStudySet={setLibraryStudySet} level={libraryLevel} onLevel={setLibraryLevel}
      onSettings={() => setOverlay('settings')} onAdd={() => {
      setEditing(undefined);
      setOverlay('editor');
    }} onEdit={(card) => {
      setEditing(card);
      setOverlay('editor');
    }} onDelete={store.deleteCard} onStudy={startStudy} />;
  } else {
    content = <StatsScreen data={data} now={now} />;
  }

  return (
    <View style={styles.app}>
      {store.saveError && (
        <Pressable onPress={store.retrySave} style={styles.saveError} accessibilityRole="button">
          <Text style={styles.saveErrorText}>保存失败，点击重试</Text>
        </Pressable>
      )}
      <View style={styles.screen}>{content}</View>
      {!overlay && (
        <View style={styles.navigation}>
          {tabs.map((item) => (
            <Pressable key={item.id} onPress={() => setTab(item.id)} accessibilityRole="tab" accessibilityLabel={item.label} accessibilityState={{ selected: tab === item.id }} style={styles.navItem}>
              <Ionicons name={tab === item.id ? item.selected : item.icon} size={21} color={tab === item.id ? colors.brand : colors.muted} />
              <Text style={[styles.navLabel, tab === item.id && styles.navLabelSelected]}>{item.label}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <StatusBar style="dark" />
        <StudyApp />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  app: { flex: 1, width: '100%', maxWidth: 600, alignSelf: 'center', backgroundColor: colors.background },
  screen: { flex: 1 },
  navigation: { flexDirection: 'row', backgroundColor: colors.surface, borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 9, paddingBottom: 8 },
  navItem: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 3, minHeight: 44 },
  navLabel: { color: colors.muted, fontSize: 10, fontWeight: '600' },
  navLabelSelected: { color: colors.brand, fontWeight: '800' },
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 25, backgroundColor: colors.background },
  loadingTitle: { color: colors.ink, fontSize: 17, fontWeight: '800', textAlign: 'center' },
  loadingText: { color: colors.secondary, fontSize: 13, marginTop: 10, textAlign: 'center' },
  retry: { marginTop: 22, width: 180 },
  saveError: { backgroundColor: colors.dangerLight, paddingVertical: 10, alignItems: 'center' },
  saveErrorText: { color: colors.danger, fontSize: 12, fontWeight: '700' },
});
