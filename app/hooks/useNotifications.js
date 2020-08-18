import { useEffect } from 'react';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

import expoPushTokens from '../api/expoPushTokens';

export default useNotifications = (notificationListener) => {
  useEffect(() => {
    registerForPushNotification();

    if (notificationListener) Notifications.addListener(notificationListener);
  }, []);

  const registerForPushNotification = async () => {
    try {
      const permission = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (!permission.granted) return;

      const token = await Notifications.getExpoPushTokenAsync();
      expoPushTokens.register(token);
    } catch (e) {
      console.log('Error getting a push token', e);
    }
  };
};
