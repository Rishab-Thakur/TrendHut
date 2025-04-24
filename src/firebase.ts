import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyC9Fu9bqQzbfFe17n3p5k92e0cIZ1ig31E",
    authDomain: "trendhut-8c598.firebaseapp.com",
    projectId: "trendhut-8c598",
    storageBucket: "trendhut-8c598.firebasestorage.app",
    messagingSenderId: "1085840659206",
    appId: "1:1085840659206:web:7e14e6b734c2073caac487",
    measurementId: "G-6YQQX60GKC",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

// VAPID KEY from env
const VAPID_KEY = "BBXCPgXBaDeJq4eCM7YTlphHha2fvpTxUH9V-gx4pbzE9og98DYhns7UK5hv4MhnpZr3jXqtu2rE1BnSfd1zCas";

// Request permission and get FCM token
export const NotificationPermission = async (): Promise<void> => {
    try {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        console.warn('⚠️ Notification permission was not granted by the user.');
        return;
      }
  
      const token = await getToken(messaging, { vapidKey: VAPID_KEY });
  
      if (token) {
        console.log('✅ Successfully obtained FCM token:', token);
        // TODO: Send this token to your backend if needed
      } else {
        console.warn('⚠️ No FCM registration token available. Request permission to generate one.');
      }
    } catch (error) {
      console.error('❌ Failed to get FCM token:', error);
    }
  };
  
  // Foreground message listener with customized notification content and updated console logs
  export const onFirebaseMessage = () =>
    new Promise((resolve) => {
      onMessage(messaging, (payload) => {
        console.log('📩 Foreground message received:', payload);
  
        // Customize notification content here
        const notificationTitle = '🔥 New Alert from TrendHut!';
        const notificationOptions = {
          body: 'You have a new notification. Check it out now!',
          icon: '/vite.svg', // Make sure vite.svg is in your public folder
          // You can add other options like badge, image, actions, etc.
        };
  
        if (Notification.permission === 'granted') {
          new Notification(notificationTitle, notificationOptions);
          console.log('🔔 Displayed custom notification to the user.');
        } else {
          console.warn('⚠️ Notification permission not granted. Cannot display notification.');
        }
  
        resolve(payload);
      });
    });