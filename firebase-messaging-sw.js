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
    console.log('إشعار وصل:', payload);

    // سحب البيانات
    const title = payload.notification?.title || payload.data?.title || 'تنبيه جديد';
    const body = payload.notification?.body || payload.data?.body || '';
    
    // الرابط اللي بيمنع الـ 404
    const targetUrl = 'https://doupl2018-create.github.io/dh-automation/';

    const options = {
        body: body,
        icon: '01.jpg',
        data: { url: targetUrl }
    };

    // الحركة دي "بتحجز" الإشعار لنفسك وبتعرض النسخة الشغالة بس
    return self.registration.showNotification(title, options);
});

// منع الإشعار الافتراضي البايظ (التريك دي بتمسح الإشعارات اللي مش تبعنا)
self.addEventListener('push', (event) => {
    // لو الإشعار فيه notification payload المتصفح هيعرضه تلقائياً
    // إحنا بنسيب الـ onBackgroundMessage هي اللي تتصرف
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();
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
