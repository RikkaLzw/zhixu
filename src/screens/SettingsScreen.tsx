import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { IconButton, Surface } from '../components/ui';
import { colors } from '../theme';

export function SettingsScreen({ dailyLimit, onLimit, onClose }: {
  dailyLimit: number;
  onLimit: (limit: number) => void;
  onClose: () => void;
}) {
  const [draft, setDraft] = useState(String(dailyLimit));
  const [error, setError] = useState(false);

  const commit = () => {
    if (draft === '') {
      setError(true);
      return false;
    }
    const value = Number(draft);
    if (!Number.isInteger(value) || value < 0 || value > 5000) {
      setError(true);
      return false;
    }
    onLimit(value);
    setDraft(String(value));
    setError(false);
    return true;
  };

  const adjust = (amount: number) => {
    const entered = draft === '' ? dailyLimit : Number(draft);
    const next = Math.max(0, Math.min(5000, entered + amount));
    setDraft(String(next));
    setError(false);
    onLimit(next);
  };

  const close = () => {
    if (commit()) onClose();
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <IconButton icon="close" label="关闭设置" onPress={close} />
        <Text style={styles.topTitle}>学习设置</Text>
        <View style={styles.topSpacer} />
      </View>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.eyebrow}>自定义学习节奏</Text>
        <Text style={styles.title}>找到你的节奏</Text>
        <Text style={styles.subtitle}>把每天的学习量调整到舒服、可持续的程度。</Text>
        <Surface style={styles.settingCard}>
          <View style={styles.settingHeader}>
            <View style={styles.settingIcon}><Ionicons name="sunny-outline" size={21} color={colors.brand} /></View>
            <View style={styles.settingText}>
              <Text style={styles.settingTitle}>每日新卡上限</Text>
              <Text style={styles.settingSub}>到期复习不受此上限影响</Text>
            </View>
          </View>
          <View style={styles.stepper}>
            <Pressable accessibilityRole="button" accessibilityLabel="减少每日新卡" disabled={draft !== '' && Number(draft) <= 0} onPress={() => adjust(-1)} style={[styles.step, draft !== '' && Number(draft) <= 0 && styles.stepDisabled]}>
              <Ionicons name="remove" size={20} color={colors.brandDark} />
            </Pressable>
            <View style={styles.stepValue}>
              <TextInput
                accessibilityLabel="每日新卡数量"
                keyboardType="number-pad"
                value={draft}
                onChangeText={(value) => {
                  const digits = value.replace(/[^0-9]/g, '');
                  setDraft(digits);
                  setError(false);
                }}
                onBlur={() => { if (draft !== '' && Number(draft) <= 5000) commit(); }}
                onSubmitEditing={commit}
                maxLength={4}
                selectTextOnFocus
                style={styles.stepInput}
              />
              <Text style={styles.stepUnit}>张 / 天</Text>
            </View>
            <Pressable accessibilityRole="button" accessibilityLabel="增加每日新卡" disabled={draft !== '' && Number(draft) >= 5000} onPress={() => adjust(1)} style={[styles.step, draft !== '' && Number(draft) >= 5000 && styles.stepDisabled]}>
              <Ionicons name="add" size={20} color={colors.brandDark} />
            </Pressable>
          </View>
          {error && <Text style={styles.error}>请输入 0～5000 之间的整数。</Text>}
          <Text style={styles.settingHint}>可直接输入数量；设为 0 可以暂时只复习已学内容。</Text>
          <Pressable accessibilityRole="button" accessibilityLabel="保存每日新卡数量" onPress={commit} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>保存数量</Text>
          </Pressable>
        </Surface>
        <Surface style={styles.infoCard}>
          <Text style={styles.infoTitle}>复习怎样安排？</Text>
          <Text style={styles.infoText}>忘记或模糊的卡片会在短间隔后再出现；记住后进入天级复习，并根据每次评分调整间隔。</Text>
          <View style={styles.divider} />
          <Text style={styles.infoTitle}>数据保存在设备上</Text>
          <Text style={styles.infoText}>卡片和学习记录保存在当前设备，卸载应用会清除这些数据。</Text>
        </Surface>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 22, paddingTop: 13, paddingBottom: 18 },
  topTitle: { color: colors.ink, fontSize: 15, fontWeight: '800' },
  topSpacer: { width: 42 },
  content: { paddingHorizontal: 22, paddingTop: 16, paddingBottom: 35 },
  eyebrow: { color: colors.brand, fontSize: 10, fontWeight: '800', letterSpacing: 1.5, marginBottom: 9 },
  title: { color: colors.ink, fontSize: 25, fontWeight: '800' },
  subtitle: { color: colors.secondary, fontSize: 13, lineHeight: 22, marginTop: 8 },
  settingCard: { padding: 19, marginTop: 25 },
  settingHeader: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  settingIcon: { width: 43, height: 43, borderRadius: 14, backgroundColor: colors.brandLight, alignItems: 'center', justifyContent: 'center' },
  settingText: { flex: 1 },
  settingTitle: { color: colors.ink, fontSize: 14, fontWeight: '800' },
  settingSub: { color: colors.muted, fontSize: 11, marginTop: 5 },
  stepper: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 24, paddingHorizontal: 7 },
  step: { height: 42, width: 42, borderRadius: 14, backgroundColor: colors.brandLight, alignItems: 'center', justifyContent: 'center' },
  stepDisabled: { opacity: 0.35 },
  stepValue: { flex: 1, flexDirection: 'row', alignItems: 'baseline', justifyContent: 'center', gap: 5 },
  stepInput: { color: colors.ink, fontSize: 30, fontWeight: '800', width: 90, flexGrow: 0, flexShrink: 0, padding: 0, textAlign: 'center', borderBottomWidth: 1, borderBottomColor: colors.border },
  stepUnit: { color: colors.secondary, fontSize: 12 },
  settingHint: { color: colors.muted, fontSize: 11, textAlign: 'center', marginTop: 15 },
  error: { color: colors.danger, fontSize: 11, textAlign: 'center', marginTop: 12 },
  saveButton: { alignSelf: 'center', backgroundColor: colors.brandLight, borderRadius: 11, paddingHorizontal: 16, paddingVertical: 9, marginTop: 13 },
  saveButtonText: { color: colors.brand, fontSize: 12, fontWeight: '700' },
  infoCard: { padding: 19, marginTop: 17 },
  infoTitle: { color: colors.ink, fontSize: 13, fontWeight: '800' },
  infoText: { color: colors.secondary, fontSize: 12, lineHeight: 21, marginTop: 7 },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: 17 },
});
