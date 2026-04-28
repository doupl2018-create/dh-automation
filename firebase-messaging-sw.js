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

// أهم شيء: منع الإشعار التلقائي تماماً
messaging.onBackgroundMessage((payload) => {
  console.log('إشعار في الخلفية:', payload);
  
  // تجاهل أي notification قادم من السيرفر
  // واستخدم data فقط إن وجد
  let notificationTitle = 'تنبيه جديد';
  let notificationBody = 'لديك إشعار جديد';
  let notificationUrl = 'https://doupl2018-create.github.io/dh-automation/';
  
  // جلب البيانات من payload.data (وليس payload.notification)
  if (payload.data) {
    notificationTitle = payload.data.title || notificationTitle;
    notificationBody = payload.data.body || notificationBody;
    notificationUrl = payload.data.url || notificationUrl;
  }
  
  // إظهار إشعار واحد فقط يدوياً
  const notificationOptions = {
    body: notificationBody,
    icon: '01.jpg',
    data: {
      url: notificationUrl
    }
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});

// معالجة الضغطة
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  
  const urlToOpen = event.notification.data?.url || 'https://doupl2018-create.github.io/dh-automation/';

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
