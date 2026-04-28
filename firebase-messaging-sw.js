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

// التعديل الجوهري هنا في الـ notificationclick
self.addEventListener('notificationclick', function(event) {
    // 1. قفل الإشعار فوراً عند الضغط عليه
    event.notification.close();
    
    // 2. لن نقوم بفتح أي نوافذ أو روابط (تجنباً للـ 404)
    console.log('تم إغلاق الإشعار. لا يوجد إجراء لفتح صفحات.');
});
