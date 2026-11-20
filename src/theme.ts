import { Platform } from 'react-native';

export const colors = {
  background: '#F5F7F3',
  surface: '#FFFFFF',
  ink: '#202D29',
  secondary: '#667771',
  muted: '#94A29B',
  border: '#E5EBE5',
  brand: '#3B7561',
  brandDark: '#203D34',
  brandLight: '#E6F1E9',
  accent: '#C9E89A',
  danger: '#B94F51',
  dangerLight: '#FAECEB',
};

export const shadow = Platform.select({
  ios: {
    shadowColor: '#263E32',
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
  },
  android: { elevation: 1 },
  default: {},
});
