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
