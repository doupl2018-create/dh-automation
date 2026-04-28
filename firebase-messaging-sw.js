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
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '01.jpg' // استخدم صورة موجودة فعلاً في مشروعك زي اللي في الصورة
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// الجزء الجديد عشان لما تدوس على الإشعار يفتح الموقع مش الـ 404
self.addEventListener('notificationclick', function(event) {
  event.notification.close(); // يقفل الإشعار بعد الضغط عليه

  // المسار الكامل لمشروعك على GitHub Pages
  const urlToOpen = 'https://doupl2018-create.github.io/dh-automation/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      // لو الموقع مفتوح أصلاً في تبويب، يروح عليه
      for (let i = 0; i < clientList.length; i++) {
        let client = clientList[i];
        if (client.url === urlToOpen && 'focus' in client) {
          return client.focus();
        }
      }
      // لو مش مفتوح، يفتح تبويب جديد بالموقع
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});
