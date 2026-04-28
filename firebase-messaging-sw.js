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

// التعديل هنا: إحنا اللي هنعرض الإشعار بإيدنا عشان نضمن إنه يفتح الرابط الصح
messaging.onBackgroundMessage((payload) => {
  console.log('إشعار في الخلفية:', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '01.jpg', // أو المسار بتاع الأيقونة
    data: {
      // الرابط ده هو اللي هنستخدمه لما المستخدم يدوس على الإشعار
      url: 'https://doupl2018-create.github.io/dh-automation/'
    }
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});

// ده الجزء اللي بيسمع للضغطة وبيوجهك للرابط اللي حطيناه فوق
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  
  // بنسحب الرابط من الـ data اللي حددناها فوق
  const urlToOpen = event.notification.data.url;

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
