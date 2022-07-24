import AsyncStorage from '@react-native-community/async-storage';

export default function (key) {
  return AsyncStorage.getItem(key);
}
