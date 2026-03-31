let cart = [];

// وظيفة التنقل بين الصفحات
function showPage(pageId, title, element) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    document.getElementById('header-title').innerText = title;
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active-nav'));
    element.classList.add('active-nav');
}

// وظيفة تحديث السعر والكمية
function changeQty(btn, delta) {
    let row = btn.closest('.product-row');
    let id = row.getAttribute('data-id');
    let qtySpan = row.querySelector('.qty-val');
    let currentQty = parseInt(qtySpan.innerText);
    if (currentQty + delta >= 1) {
        qtySpan.innerText = currentQty + delta;
        let itemInCart = cart.find(item => item.id === id);
        if (itemInCart) {
            itemInCart.qty = currentQty + delta;
            updateTotal();
        }
    }
}

// وظيفة إتمام الشراء عبر واتساب
function checkoutWhatsApp() {
    if (cart.length === 0) { alert("السلة فاضية يا هندسة!"); return; }
    let message = "طلب شراء جديد من DH Automation:%0A";
    cart.forEach(item => {
        message += `- ${item.name} (عدد: ${item.qty})%0A`;
    });
    window.open(`https://wa.me/201227091465?text=${message}`, '_blank');
}
// بيانات المنتجات: الصور والكلام
const productsData = {
    '1': {
        title: 'حساس حرارة NTC',
        description: 'حساس عالي الدقة يتحمل الحرارة العالية، مثالي لماكينات الحقن.',
        image: 'images/01 (1).jpg'
    },
    '2': {
        title: 'كارت تحكم LVDT',
        description: 'كارت احترافي لمعايرة مشوار البلاطة بدقة عالية.',
        image: 'images/01 (2).jpg'
    }
};

function showDetails(id) {
    const product = productsData[id];
    let content = `
        <img src="${product.image}">
        <h3>${product.title}</h3>
        <p>${product.description}</p>
    `;
    document.getElementById('modalBody').innerHTML = content;
    document.getElementById('detailsModal').style.display = "block";
}

function closeModal() {
    document.getElementById('detailsModal').style.display = "none";
}

// قفل النافذة لو دوست بره المربع الأبيض
window.onclick = function(event) {
    if (event.target == document.getElementById('detailsModal')) {
        closeModal();
    }
}
