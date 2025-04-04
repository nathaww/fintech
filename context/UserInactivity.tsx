import { useAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserInactivityProvider = ({ children }: any) => {
  const appState = useRef(AppState.currentState);
  const router = useRouter();
  const { isSignedIn } = useAuth();

  useEffect(() => {
    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => {
      subscription.remove();
    };
  }, []);

  const handleAppStateChange = async (nextAppState: AppStateStatus) => {
    console.log('🚀 ~ handleAppStateChange ~ nextAppState', nextAppState);

    if (nextAppState === 'background') {
      await recordStartTime();
    } else if (nextAppState === 'active' && appState.current.match(/background/)) {
      const storedTime = await AsyncStorage.getItem('startTime');
      const startTime = storedTime ? parseInt(storedTime, 10) : 0;
      const elapsed = Date.now() - startTime;

      console.log('🚀 ~ handleAppStateChange ~ elapsed:', elapsed);

      if (elapsed > 3000 && isSignedIn) {
        router.replace('/(authenticated)/(modals)/lock');
      }
    }

    appState.current = nextAppState;
  };

  const recordStartTime = async () => {
    try {
      await AsyncStorage.setItem('startTime', Date.now().toString());
    } catch (e) {
      console.error('Failed to save start time to AsyncStorage', e);
    }
  };

  return children;
};
