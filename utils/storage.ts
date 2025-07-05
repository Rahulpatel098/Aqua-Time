import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';

const TODAY_KEY = 'TodayHistory';
const LAST_DATE_KEY = 'LastTrackedDate';

export const addTodayEntry = async (amount: number) => {
  const now = new Date();
  const currentDate = format(now, 'yyyy-MM-dd');
const currentTime = format(now, 'hh:mm a'); // 12-hour format

  const lastDate = await AsyncStorage.getItem(LAST_DATE_KEY);
  if (lastDate !== currentDate) {
    await AsyncStorage.removeItem(TODAY_KEY);
    await AsyncStorage.setItem(LAST_DATE_KEY, currentDate);
  }

  const existing = await AsyncStorage.getItem(TODAY_KEY);
  const log = existing ? JSON.parse(existing) : [];

  log.push({ amount, time: currentTime });
  await AsyncStorage.setItem(TODAY_KEY, JSON.stringify(log));
};


export const getTodayLog = async () => {
  const currentDate = format(new Date(), 'yyyy-MM-dd');
  const lastDate = await AsyncStorage.getItem(LAST_DATE_KEY);

  if (lastDate !== currentDate) {
    await AsyncStorage.removeItem(TODAY_KEY);
    await AsyncStorage.setItem(LAST_DATE_KEY, currentDate);
    return [];
  }

  const log = await AsyncStorage.getItem(TODAY_KEY);
  return log ? JSON.parse(log) : [];
};
