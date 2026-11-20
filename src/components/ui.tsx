import { Ionicons } from '@expo/vector-icons';
import { ComponentProps, ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, shadow } from '../theme';

type IconName = ComponentProps<typeof Ionicons>['name'];

export function IconButton({ icon, label, onPress, light = false }: {
  icon: IconName;
  label: string;
  onPress: () => void;
  light?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [styles.iconButton, light && styles.iconButtonLight, pressed && styles.pressed]}
    >
      <Ionicons name={icon} size={21} color={light ? colors.ink : colors.secondary} />
    </Pressable>
  );
}

export function ActionButton({ label, onPress, icon, disabled = false, secondary = false }: {
  label: string;
  onPress: () => void;
  icon?: IconName;
  disabled?: boolean;
  secondary?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        secondary && styles.buttonSecondary,
        disabled && styles.buttonDisabled,
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.buttonText, secondary && styles.buttonTextSecondary]}>{label}</Text>
      {icon && <Ionicons name={icon} size={19} color={secondary ? colors.brandDark : '#FFFFFF'} />}
    </Pressable>
  );
}

export function Surface({ children, style }: { children: ReactNode; style?: object }) {
  return <View style={[styles.surface, style]}>{children}</View>;
}

export function SectionTitle({ title, note }: { title: string; note?: string }) {
  return (
    <View style={styles.sectionTitle}>
      <Text style={styles.sectionText}>{title}</Text>
      {note && <Text style={styles.sectionNote}>{note}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EDF1EB',
  },
  iconButtonLight: { backgroundColor: colors.surface },
  pressed: { opacity: 0.72 },
  button: {
    minHeight: 54,
    borderRadius: 16,
    backgroundColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 20,
  },
  buttonSecondary: { backgroundColor: colors.brandLight },
  buttonDisabled: { opacity: 0.45 },
  buttonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
  buttonTextSecondary: { color: colors.brandDark },
  surface: {
    backgroundColor: colors.surface,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow,
  },
  sectionTitle: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 },
  sectionText: { color: colors.ink, fontSize: 17, fontWeight: '800' },
  sectionNote: { color: colors.muted, fontSize: 12 },
});
