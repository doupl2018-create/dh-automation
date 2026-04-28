importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyCckZ1f4-qPI2E4-KG8RrhftDZsfrfUwXs",
    authDomain: "dh-automation-47096.firebaseapp.com",
    projectId: "dh-automation-47096",
    storageBucket: "dh-automation-47096.firebasestorage.app",
    messagingSenderId: "260170011433",
    appId: "1:260170011433:web:cf427a2c03d55953d4dd38"
});

const messaging = firebase.messaging();

// معالجة الإشعارات في الخلفية
messaging.onBackgroundMessage((payload) => {
  console.log('إشعار في الخلفية:', payload);
  // مفيش داعي تعمل self.registration.showNotification هنا لو بتبعت من الـ Console
  // لأن الـ Console بيبعت payload بيخلي المتصفح يعرض الإشعار لوحده
});

// ده الجزء اللي هيصلح الـ 404 في الإشعار اللي بيتبعت من الكونسول
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  
  // بلاش الرابط الثابت، خليك ذكي وخد الرابط من الإشعار نفسه
  const urlToOpen = event.notification.data?.FCM_MSG?.notification?.click_action 
                     || event.notification.data?.click_action
                     || event.notification.data?.url
                     || 'https://doupl2018-create.github.io/dh-automation/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      for (let i = 0; i < clientList.length; i++) {
        let client = clientList[i];
        if (client.url === urlToOpen && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});
