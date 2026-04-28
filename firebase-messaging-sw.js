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

// معالجة الإشعارات في الخلفية - هنا بنبني الإشعار الوحيد الشغال
messaging.onBackgroundMessage((payload) => {
    console.log('إشعار وصل في الخلفية:', payload);
    
    // سحب البيانات مع وضع قيم افتراضية عشان نضمن عدم حدوث خطأ
    const title = payload.data?.title || payload.notification?.title || 'تنبيه من DH Automation';
    const body = payload.data?.body || payload.notification?.body || 'لديك تحديث جديد';
    
    // تأمين الرابط: بنجيبه من الـ data ولو مش موجود بنحط رابط المشروع مباشرة
    const targetUrl = payload.data?.url || 'https://doupl2018-create.github.io/dh-automation/';

    const options = {
        body: body,
        icon: '01.jpg',
        badge: '01.jpg',
        data: {
            url: targetUrl // بنخزن الرابط هنا عشان الـ click listener يشوفه
        }
    };

    // عرض الإشعار والتحكم الكامل فيه لمنع الـ 404
    return self.registration.showNotification(title, options);
});

// التعامل مع الضغطة على الإشعار وتوجيه المستخدم للرابط المظبوط
self.addEventListener('notificationclick', function(event) {
    event.notification.close(); // قفل الإشعار فوراً
    
    // سحب الرابط اللي خزناه في الـ data فوق
    const urlToOpen = event.notification.data.url;

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
            // لو الموقع مفتوح في أي تبويب، نركز عليه بدل ما نفتح واحد جديد
            for (let i = 0; i < clientList.length; i++) {
                let client = clientList[i];
                if (client.url === urlToOpen && 'focus' in client) {
                    return client.focus();
                }
            }
            // لو مش مفتوح، افتح تبويب جديد بالرابط الصح لمشروعك
            if (clients.openWindow) {
                return clients.openWindow(urlToOpen);
            }
        })
    );
});
