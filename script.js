const products = [
    { id: 1, name: 'حساس NTC', price: 150, img: 'images/01.jpg' },
    // ضيف أي عدد هنا، الإنديكس مش هيتأثر
];

function renderMarket() {
    const marketDiv = document.getElementById('market');
    marketDiv.innerHTML = products.map(p => `
        <div class="product-row" data-id="${p.id}">
            <img src="${p.img}" class="product-img">
            <div class="product-info">
                <h4>${p.name}</h4>
                <p>${p.price} ج.م</p>
            </div>
            </div>
    `).join('');
}
// تحديد رقم الإصدار الحالي للتطبيق
const APP_VERSION = "1.1"; 

function smartRefresh() {
    const savedVersion = localStorage.getItem('app_version');

    // لو النسخة المتخزنة مختلفة عن النسخة الجديدة
    if (savedVersion !== APP_VERSION) {
        console.log("جاري تحديث البيانات للنسخة الجديدة...");
        
        // تحديث رقم النسخة في الكاش
        localStorage.setItem('app_version', APP_VERSION);
        
        // إعادة تحميل الصفحة لإجبار المتصفح على سحب الملفات الجديدة
        window.location.reload(true); 
    }
}

// تشغيل الفحص أول ما البرنامج يفتح
window.onload = () => {
    smartRefresh();
    renderMarket(); // الدالة القديمة بتاعتك
};
