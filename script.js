let cart = [];

// وظيفة التنقل بين الصفحات
function showPage(pageId, title, element) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    document.getElementById('header-title').innerText = title;
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active-nav'));
    element.classList.add('active-nav');
}

// وظيفة تحديث السعر والكمية في الواجهة والسلة
function changeQty(btn, delta) {
    let row = btn.closest('.product-row');
    let id = row.getAttribute('data-id');
    let qtySpan = row.querySelector('.qty-val');
    let currentQty = parseInt(qtySpan.innerText);
    let newQty = currentQty + delta;

    if (newQty >= 1) {
        qtySpan.innerText = newQty;
        let itemInCart = cart.find(item => item.id === id);
        if (itemInCart) {
            itemInCart.qty = newQty;
            updateTotal();
        }
    }
}

// وظيفة إضافة أو إلغاء المنتج من السلة
function toggleCart(btn) {
    let row = btn.closest('.product-row');
    let id = row.getAttribute('data-id');
    let name = row.getAttribute('data-name');
    let price = parseInt(row.getAttribute('data-price'));
    let qty = parseInt(row.querySelector('.qty-val').innerText);

    if (btn.innerText === "إضافة") {
        cart.push({ id, name, price, qty });
        btn.innerText = "إلغاء";
        btn.classList.add('remove-btn');
    } else {
        cart = cart.filter(item => item.id !== id);
        btn.innerText = "إضافة";
        btn.classList.remove('remove-btn');
    }
    updateTotal();
}

// وظيفة تحديث إجمالي السعر
function updateTotal() {
    let total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    let totalElement = document.getElementById('total-price');
    if (totalElement) totalElement.innerText = total;
}

// وظيفة إفراغ السلة بالكامل
function clearCart() {
    cart = [];
    updateTotal();
    document.querySelectorAll('.add-btn').forEach(btn => {
        btn.innerText = "إضافة";
        btn.classList.remove('remove-btn');
    });
    document.querySelectorAll('.qty-val').forEach(span => span.innerText = "1");
}

// وظيفة إتمام الشراء عبر واتساب
function checkoutWhatsApp() {
    if (cart.length === 0) { alert("السلة فاضية يا هندسة!"); return; }
    let message = "طلب شراء جديد من DH Automation:%0A";
    cart.forEach(item => {
        message += `- ${item.name} (عدد: ${item.qty}) = ${item.price * item.qty} ج.م%0A`;
    });
    let total = document.getElementById('total-price').innerText;
    message += `%0A*الإجمالي: ${total} ج.م*`;
    window.open(`https://wa.me/201227091465?text=${message}`, '_blank');
}

// بيانات المنتجات للتفاصيل
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
    },
    '3': {
        title: 'منتج هندسي 3',
        description: 'وصف المنتج الثالث الخاص بك وتطبيقاته الصناعية.',
        image: 'images/01 (3).jpg'
    },
    '4': {
        title: 'منتج هندسي 4',
        description: 'وصف المنتج الرابع والمواصفات الفنية الخاصة به.',
        image: 'images/01 (4).jpg'
    }
};

// وظائف النافذة المنبثقة (Modal)
function showDetails(id) {
    const product = productsData[id];
    if (product) {
        let content = `
            <img src="${product.image}" style="width:100%; border-radius:10px;">
            <h3>${product.title}</h3>
            <p>${product.description}</p>
        `;
        document.getElementById('modalBody').innerHTML = content;
        document.getElementById('detailsModal').style.display = "block";
    }
}

function closeModal() {
    document.getElementById('detailsModal').style.display = "none";
}

function openWhatsAppDirect() {
    window.open(`https://wa.me/201227091465`, '_blank');
}

// إغلاق النافذة عند الضغط خارجها
window.onclick = function(event) {
    let modal = document.getElementById('detailsModal');
    if (event.target == modal) {
        closeModal();
    }
}
