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

// منع Firebase من عرض أي إشعار تلقائي
messaging.onBackgroundMessage((payload) => {
  console.log('الإشعار الواصل:', payload);
  
  // هنا انت اللي تتحكم في الإشعار - إشعار واحد بس
  const notificationTitle = payload.data?.title || payload.notification?.title || 'تنبيه جديد';
  const notificationBody = payload.data?.body || payload.notification?.body || 'لديك إشعار';
  
  const notificationOptions = {
    body: notificationBody,
    icon: '01.jpg',
    data: {
      url: payload.data?.url || 'https://doupl2018-create.github.io/dh-automation/'
    }
  };

  // إشعار واحد فقط - اللي انت بتعرضه
  return self.registration.showNotification(notificationTitle, notificationOptions);
});

// معالجة الضغطة على الإشعار
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
