# 📱 TrendHut - Vite PWA App

A simple Progressive Web App (PWA) built using **React**, **Vite**, and **Firebase Cloud Messaging**. This app supports **offline functionality** with a service worker and enables **push notifications** using Firebase.

---

## 🌐 Live Demo

*https://trend-hut-nine.vercel.app*

---

## 📦 Features

- ✅ Installable PWA on mobile and desktop  
- ⚡ Blazing fast performance with Vite  
- 🔔 Push Notifications using Firebase Cloud Messaging  
- 🌐 Works offline via service worker  
- 📝 Dynamic manifest with `vite-plugin-pwa`

---

## 🛠️ Tech Stack

- React + TypeScript  
- Vite  
- vite-plugin-pwa  
- Firebase Cloud Messaging (FCM)

---

## 📄 PWA Configuration Report

### 1. ✅ Steps to Configure `manifest.json`

In Vite, we use the `vite-plugin-pwa` plugin to configure the PWA. There's no need to create a separate `manifest.json`. The plugin handles it automatically through the `vite.config.ts`:

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [react(), VitePWA({
    includeAssets: ['vite.svg'],
    manifest: {
      name: 'My Vite PWA App',
      short_name: 'VitePWA',
      description: 'A Progressive Web App built with Vite',
      theme_color: '#ffffff',
      background_color: '#ffffff',
      start_url: '/',
      display: 'standalone',
      icons: [
        {
          src: 'vite.svg',
          sizes: 'any',
          type: 'image/svg+xml',
          purpose: 'any maskable'
        }
      ]
    }
  })],
})

```
---

### 2. 🔧 Steps to Register Service Worker
The service worker for offline support is automatically generated and registered by vite-plugin-pwa.

For push notifications, a custom service worker file named firebase-messaging-sw.js is added in the public directory:
```ts
importScripts('https://www.gstatic.com/firebasejs/10.11.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.11.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/vite.svg',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
```
---

### 3. In App.tsx, the Firebase messaging permission and foreground listener are called:
```ts
import React, { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import { NotificationPermission, onFirebaseMessage } from "./firebase";

const App: React.FC = () => {
  useEffect(() => {
    NotificationPermission();
    onFirebaseMessage();
  }, []);

  return <AppRoutes />;
};

export default App;
```
---

### 📲 Mobile Installation Steps
Open the app in Google Chrome on your mobile device.

Tap the menu icon (three dots) in the top-right corner.

Tap "Add to Home screen".

Confirm the installation prompt.

The app will now be accessible from your device like a native app.

---

### 📁 Project Repo
🔗 GitHub Repository: https://github.com/Rishab-Thakur/TrendHut

---

### 📬 Contact
For questions, feedback, or suggestions, feel free to create an issue or contact me via GitHub.

---

### ⭐ If you found this project helpful, don't forget to leave a star!

