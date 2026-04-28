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

messaging.onBackgroundMessage((payload) => {
    // هنا بنسحب البيانات من الـ Custom Data فقط
    const title = payload.data?.title || 'تنبيه من DH Automation';
    const body = payload.data?.body || 'لديك إشعار جديد';
    const targetUrl = payload.data?.url || 'https://doupl2018-create.github.io/dh-automation/';

    const options = {
        body: body,
        icon: '01.jpg',
        data: { url: targetUrl }
    };

    return self.registration.showNotification(title, options);
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    const urlToOpen = event.notification.data.url;

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
            // بنشوف لو الموقع مفتوح في أي تبويب
            for (let i = 0; i < clientList.length; i++) {
                let client = clientList[i];
                // بنستخدم includes عشان نضمن المطابقة حتى لو الرابط فيه زيادات
                if (client.url.includes('dh-automation') && 'focus' in client) {
                    return client.focus();
                }
            }
            // لو مش مفتوح، بنفتح الرابط المظبوط
            if (clients.openWindow) {
                return clients.openWindow(urlToOpen);
            }
        })
    );
});
