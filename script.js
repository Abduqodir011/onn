// === Demo mahsulotlar ===
const products = [
    { id: 'p1', title: 'Klassik Koʻylak', desc: '100% paxta, turli ranglar', price: 85 },
    { id: 'p2', title: 'Yengil Kurtka', desc: 'Bahorgi va kuzgi model', price: 120 },
    { id: 'p3', title: 'Sport Trench', desc: 'Quvvatli va nafas oladigan', price: 60 },
    { id: 'p4', title: 'Jean Shim', desc: 'Yuqori sifatli denim', price: 95 },
];

// === DOM elementlari ===
const productsEl = document.getElementById('products');
const orderModal = document.getElementById('order-modal');
const ordersModal = document.getElementById('orders-modal');
const modalCloseBtn = document.getElementById('modal-close-btn');
const modalCancelBtn = document.getElementById('modal-cancel-btn');
const orderForm = document.getElementById('order-form');
const modalProductTitle = document.getElementById('modal-product-title');
const productIdInput = document.getElementById('product-id');
const feedbackEl = document.getElementById('order-feedback');
const viewOrdersBtn = document.getElementById('view-orders-btn');
const ordersListEl = document.getElementById('orders-list');
const ordersCloseBtn = document.getElementById('orders-close-btn');
const clearOrdersBtn = document.getElementById('clear-orders-btn');
const yearEl = document.getElementById('year');

yearEl.textContent = new Date().getFullYear();

// === Mahsulotlarni chiqarish ===
function renderProducts() {
    productsEl.innerHTML = '';
    products.forEach(p => {
        const card = document.createElement('div');
        card.className = 'card';

        card.innerHTML = 
            

        card.querySelector('button').addEventListener('click', () => openOrderModal(p.id));
        productsEl.appendChild(card);
    });
}

// === Modal funksiyalari ===
function openOrderModal(productId) {
    const prod = products.find(p => p.id === productId);
    modalProductTitle.textContent = Zakaz  .title } ($);
    productIdInput.value = productId;
    feedbackEl.textContent = '';

    // Inputlarni tozalash
    document.getElementById('customer-name').value = '';
    document.getElementById('customer-phone').value = '';
    document.getElementById('customer-address').value = '';
    document.getElementById('quantity').value = 1;

    showModal(orderModal);


function showModal(el) {
    el.classList.remove('hidden');
    el.setAttribute('aria-hidden', 'false');
}

function closeModal(el) {
    el.classList.add('hidden');
    el.setAttribute('aria-hidden', 'true');
}

// === Buyurtma yuborish ===
orderForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const productId = productIdInput.value;
    const name = document.getElementById('customer-name').value.trim();
    const phone = document.getElementById('customer-phone').value.trim();
    const address = document.getElementById('customer-address').value.trim();
    const qty = parseInt(document.getElementById('quantity').value, 10) || 1;

    // Telefon regex (moslashuvchanroq)
    const phoneRegex = /^\+?[0-9\s\-]{9,20}$/;

    if (!name) return showError('Ismingizni kiriting.');
    if (!phoneRegex.test(phone)) return showError('Telefon raqami noto‘g‘ri.');
    if (!address) return showError('Manzilni kiriting.');
    if (qty < 1) return showError('Miqdor 1 dan kam bo‘lishi mumkin emas.');

    const product = products.find(p => p.id === productId);
    const order = {
        id: 'o_' + Date.now(),
        productId,
        productTitle: product.title,
        priceEach: product.price,
        quantity: qty,
        total: product.price * qty,
        name,
        phone,
        address,
        createdAt: new Date().toISOString()
    };

    saveOrder(order);
    showSuccess('Buyurtmangiz qabul qilindi! Rahmat.');

    setTimeout(() => closeModal(orderModal), 1200);
});