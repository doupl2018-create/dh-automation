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

// منع الإشعارات التلقائية من الظهور عندما يكون التطبيق في الخلفية
messaging.onBackgroundMessage((payload) => {
  console.log('إشعار في الخلفية:', payload);

  // التحقق من وجود بيانات الإشعار
  let notificationTitle = 'تنبيه جديد';
  let notificationOptions = {
    body: 'لديك إشعار جديد',
    icon: '01.jpg',
    data: {
      url: 'https://doupl2018-create.github.io/dh-automation/'
    }
  };

  // استخدام البيانات المرسلة من السيرفر إذا كانت موجودة
  if (payload.notification) {
    notificationTitle = payload.notification.title || notificationTitle;
    notificationOptions.body = payload.notification.body || notificationOptions.body;
  }

  // إضافة أي بيانات إضافية من الـ payload
  if (payload.data) {
    notificationOptions.data = {
      ...notificationOptions.data,
      ...payload.data
    };
  }

  // إظهار الإشعار يدوياً (واحد فقط)
  return self.registration.showNotification(notificationTitle, notificationOptions);
});

// معالجة الضغطة على الإشعار وفتح الرابط الصحيح
self.addEventListener('notificationclick', function(event) {
  // إغلاق الإشعار فوراً
  event.notification.close();

  // الحصول على الرابط من البيانات
  const urlToOpen = event.notification.data?.url || 'https://doupl2018-create.github.io/dh-automation/';

  event.waitUntil(
    clients.matchAll({ 
      type: 'window', 
      includeUncontrolled: true 
    }).then(function(clientList) {
      // محاولة إيجاد نافذة مفتوحة بنفس الرابط
      for (let i = 0; i < clientList.length; i++) {
        let client = clientList[i];
        if (client.url === urlToOpen && 'focus' in client) {
          return client.focus();
        }
      }
      // إذا لم توجد نافذة مفتوحة، افتح واحدة جديدة
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});
