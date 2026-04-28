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

// ده الكود اللي بيعرض الإشعار بنفسه وبيتحكم في محتواه
messaging.onBackgroundMessage((payload) => {
  console.log('إشعار في الخلفية:', payload);
  
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '01.jpg', // تأكد إن الصورة موجودة في الـ root
    data: {
      url: 'https://doupl2018-create.github.io/dh-automation/' // ده الرابط اللي إنت عايزه يفتح
    }
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});

// ده الجزء اللي بيسمع للضغطة وبيوجهك للرابط الصح
self.addEventListener('notificationclick', function(event) {
  event.notification.close(); // اقفل الإشعار
  
  // استخدم الرابط اللي إحنا حاطينه في الـ data، ولو مش موجود استخدم الرابط الافتراضي
  const urlToOpen = event.notification.data.url || 'https://doupl2018-create.github.io/dh-automation/';

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

