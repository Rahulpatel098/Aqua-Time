import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Alert, Platform } from 'react-native';

export const requestNotificationPremission=async()=>{
    const {status} =await Notifications.getPermissionsAsync();
    if(status !== 'granted'){
        Alert.alert(" Premision is not given , open you setting and give permission");
        return
    }
}
export const scheduleWaterReminder = async () => {

  await Notifications.cancelAllScheduledNotificationsAsync(); 

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Time to Hydrate 💧",
      body: "Don't forget to drink water!",
    },
    trigger: null
  });
};
export const cancelWaterReminders = async () => {
  await Notifications.cancelAllScheduledNotificationsAsync();
};