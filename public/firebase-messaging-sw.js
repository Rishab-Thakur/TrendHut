// public/firebase-messaging-sw.js
/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/10.11.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.11.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyC9Fu9bqQzbfFe17n3p5k92e0cIZ1ig31E",
    authDomain: "trendhut-8c598.firebaseapp.com",
    projectId: "trendhut-8c598",
    storageBucket: "trendhut-8c598.firebasestorage.app",
    messagingSenderId: "1085840659206",
    appId: "1:1085840659206:web:7e14e6b734c2073caac487",
    measurementId: "G-6YQQX60GKC"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/vite.svg' ,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});