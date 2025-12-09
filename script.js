// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Init AOS jika ada
    if (typeof AOS !== 'undefined') {
        AOS.init({duration: 800, easing: 'ease-in-out', once: true, offset: 100});
    }
    
    // Cek halaman mana yang aktif
    if (document.getElementById('payment-page')) {
        initPaymentPage();
    } else {
        // Halaman Utama/Katalog
        loadProducts();
        loadFlashSale();
        updateCartCount();
        
        // Wheel Logic Check
        if(!localStorage.getItem('wheelPlayed') && document.getElementById('wheelSection')) {
            setTimeout(() => {}, 3000);
        }
    }
});

// ===== DATA PRODUK (25 Item) =====
const products = [
    { id: 1, name: "Crystal Diamond Lamp", price: 155000, stock: 50, image: "assets/1.jpg", category: "minimalist", specs: {watt: "3W LED", material: "Acrylic Crystal", dim: "12x26cm"}, description: "Lampu meja kristal dengan efek cahaya mawar." },
    { id: 2, name: "Amber Glass Candle", price: 125000, stock: 45, image: "assets/2.jpg", category: "minimalist", specs: {watt: "Battery", material: "Glass & Wood", dim: "10x15cm"}, description: "Lampu lilin elektrik kaca amber." },
    { id: 3, name: "Zen Wood Nightlight", price: 180000, stock: 30, image: "assets/3.jpg", category: "minimalist", specs: {watt: "5W LED", material: "Oak Wood", dim: "15x15cm"}, description: "Desain kayu solid menenangkan." },
    { id: 4, name: "Flexi Neck Study", price: 95000, stock: 100, image: "assets/4.jpg", category: "smart", specs: {watt: "7W LED", material: "ABS Plastic", dim: "Adjustable"}, description: "Lampu belajar fleksibel 360 derajat." },
    { id: 5, name: "Galaxy Projector", price: 299000, stock: 25, image: "assets/5.jpg", category: "smart", specs: {watt: "10W RGB", material: "Plastic", dim: "16x16cm"}, description: "Proyektor bintang dan galaksi." },
    { id: 6, name: "Textured Ceramic", price: 350000, stock: 15, image: "assets/6.jpeg", category: "modern", specs: {watt: "9W LED", material: "Ceramic", dim: "30x40cm"}, description: "Tekstur keramik kasar artistik." },
    { id: 7, name: "Soft Duck Silicone", price: 85000, stock: 80, image: "assets/7.jpg", category: "minimalist", specs: {watt: "1W LED", material: "Silicone", dim: "10x10cm"}, description: "Lampu bebek empuk dan lucu." },
    { id: 8, name: "Polar Bear Glow", price: 89000, stock: 75, image: "assets/8.webp", category: "minimalist", specs: {watt: "1W LED", material: "Silicone", dim: "12x12cm"}, description: "Teman tidur menggemaskan." },
    { id: 9, name: "Slim Clip Lamp", price: 75000, stock: 120, image: "assets/9.webp", category: "smart", specs: {watt: "3W LED", material: "Plastic", dim: "Clip-on"}, description: "Lampu jepit praktis hemat ruang." },
    { id: 10, name: "Modern Desk Blade", price: 450000, stock: 20, image: "assets/10.jpg", category: "smart", specs: {watt: "12W LED", material: "Aluminium", dim: "40x50cm"}, description: "Desain ultra tipis modern." },
    { id: 11, name: "Architect Pro Black", price: 210000, stock: 35, image: "assets/11.jpg", category: "modern", specs: {watt: "E27 Bulb", material: "Metal", dim: "Adjustable"}, description: "Lampu arsitek klasik hitam matte." },
    { id: 12, name: "Frosted Glass Stand", price: 320000, stock: 18, image: "assets/12.jpg", category: "minimalist", specs: {watt: "5W LED", material: "Frosted Glass", dim: "20x35cm"}, description: "Cahaya lembut kaca buram." },
    { id: 13, name: "Mushroom Acrylic", price: 199000, stock: 40, image: "assets/13.jpg", category: "modern", specs: {watt: "5W LED", material: "Acrylic", dim: "25x30cm"}, description: "Bentuk jamur ikonik transparan." },
    { id: 14, name: "Origami Art Lamp", price: 275000, stock: 12, image: "assets/14.jpg", category: "minimalist", specs: {watt: "5W LED", material: "Special Paper", dim: "30x40cm"}, description: "Seni lipat kertas bercahaya." },
    { id: 15, name: "Gradient Glass Grey", price: 399000, stock: 10, image: "assets/15.jpg", category: "modern", specs: {watt: "9W LED", material: "Ombre Glass", dim: "30x50cm"}, description: "Gradasi warna abu-abu elegan." },
    { id: 16, name: "Retro Pleated", price: 245000, stock: 22, image: "assets/16.jpg", category: "minimalist", specs: {watt: "5W LED", material: "Fabric & Metal", dim: "25x35cm"}, description: "Gaya retro kap berlipat." },
    { id: 17, name: "Edison Bulb Wood", price: 135000, stock: 55, image: "assets/17.jpg", category: "minimalist", specs: {watt: "4W Filament", material: "Wood", dim: "10x15cm"}, description: "Estetika bohlam filamen kayu." },
    { id: 18, name: "Driftwood Masterpiece", price: 1500000, stock: 3, image: "assets/18.jpg", category: "minimalist", specs: {watt: "7W LED", material: "Natural Wood", dim: "Unique"}, description: "Karya seni kayu alami." },
    { id: 19, name: "Mini Reading Light", price: 45000, stock: 200, image: "assets/19.jpg", category: "smart", specs: {watt: "1W LED", material: "Plastic", dim: "Small"}, description: "Lampu baca mini portable." },
    { id: 20, name: "Twin Cone Portable", price: 550000, stock: 15, image: "assets/20.jpg", category: "modern", specs: {watt: "Battery", material: "Matte Metal", dim: "12x20cm"}, description: "Lampu portable kerucut premium." },
    { id: 21, name: "Spiral Art Lamp", price: 650000, stock: 8, image: "assets/21.jpg", category: "modern", specs: {watt: "15W LED", material: "Chrome", dim: "20x45cm"}, description: "Bentuk spiral artistik silver." },
    { id: 22, name: "Aroma Diffuser Bulb", price: 165000, stock: 60, image: "assets/22.webp", category: "smart", specs: {watt: "USB", material: "ABS", dim: "15x15cm"}, description: "Humidifier lampu aesthetic." },
    { id: 23, name: "Humidifier Simple", price: 145000, stock: 50, image: "assets/23.webp", category: "smart", specs: {watt: "USB", material: "Plastic", dim: "10x12cm"}, description: "Pelembab udara minimalis." },
    { id: 24, name: "Mushroom Rain Cloud", price: 380000, stock: 20, image: "assets/24.jpg", category: "smart", specs: {watt: "USB", material: "ABS", dim: "18x25cm"}, description: "Efek hujan dan lampu warna." },
    { id: 25, name: "Sunrise Alarm Clock", price: 420000, stock: 25, image: "assets/25.jpg", category: "smart", specs: {watt: "Digital", material: "Fabric & ABS", dim: "20x20cm"}, description: "Bangun natural simulasi matahari." }
];

// ===== GLOBAL VARS =====
let cart = JSON.parse(localStorage.getItem('serenityCart')) || [];
let currentFilter = 'all';
let currentPage = 1;
const itemsPerPage = 10;
let activeDiscount = 0;

// ===== CART SYSTEM =====
function addToCart(id) {
    const qtyInput = document.getElementById('modalQty');
    const qty = qtyInput ? parseInt(qtyInput.value) : 1;
    const product = products.find(p => p.id === id);
    const existingItem = cart.find(item => item.id === id);
    
    if (product.stock < qty) return showToast('Stok kurang!');
    
    if (existingItem) {
        existingItem.quantity += qty;
    } else {
        cart.push({...product, quantity: qty});
    }
    
    saveCart();
    updateCartCount();
    closeProductModal();
    showToast('Produk ditambahkan ke keranjang!');
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    updateCartCount();
    if (cart.length === 0) closeCheckout();
    else renderCheckoutItems();
}

function saveCart() {
    localStorage.setItem('serenityCart', JSON.stringify(cart));
}

function updateCartCount() {
    const el = document.getElementById('cart-count');
    if (el) el.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

// ===== PAYMENT PAGE LOGIC (NEW) =====
function initPaymentPage() {
    // Ambil data pesanan sementara
    const pendingOrder = JSON.parse(localStorage.getItem('pendingOrder'));
    
    if (!pendingOrder || !pendingOrder.cart || pendingOrder.cart.length === 0) {
        // Jika tidak ada data, kembalikan ke home
        window.location.href = 'index.html';
        return;
    }

    // Render Item List
    const itemList = document.getElementById('paymentOrderItems');
    itemList.innerHTML = pendingOrder.cart.map(item => `
        <div class="summary-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="item-text">
                <h4>${item.name}</h4>
                <p>${item.quantity} x Rp ${item.price.toLocaleString('id-ID')}</p>
            </div>
            <div class="item-total">Rp ${(item.price * item.quantity).toLocaleString('id-ID')}</div>
        </div>
    `).join('');

    // Render Totals
    document.getElementById('paySubtotal').innerText = pendingOrder.subtotal;
    document.getElementById('payDiscount').innerText = pendingOrder.discount;
    document.getElementById('payShipping').innerText = `Rp ${pendingOrder.shipping.toLocaleString('id-ID')}`;
    document.getElementById('payTotal').innerText = pendingOrder.total;

    // Render Customer Info
    document.getElementById('customerDetails').innerHTML = `
        <p><strong>Penerima:</strong> ${pendingOrder.customer.name}</p>
        <p><strong>Telepon:</strong> ${pendingOrder.customer.phone}</p>
        <p><strong>Alamat:</strong> ${pendingOrder.customer.address}</p>
    `;
}

function handlePayment() {
    // 1. Validasi Metode Pembayaran
    const selectedMethod = document.querySelector('input[name="paymentMethod"]:checked');
    if (!selectedMethod) {
        showCustomModal('Pembayaran Gagal', 'Silakan pilih metode pembayaran terlebih dahulu!', 'error');
        return;
    }

    // 2. Simulasi Loading
    const btn = document.querySelector('.btn-primary');
    const originalText = btn.innerText;
    btn.innerText = 'Memproses...';
    btn.disabled = true;

    // 3. Proses Pembayaran (Simulasi Delay)
    setTimeout(() => {
        // Skenario Sukses (Bisa ditambahkan random fail jika mau)
        const isSuccess = true; 

        if (isSuccess) {
            // Bersihkan data
            localStorage.removeItem('serenityCart');
            localStorage.removeItem('pendingOrder');
            localStorage.removeItem('wheelPlayed'); // Reset game (opsional)
            
            showCustomModal('Pembayaran Berhasil!', 'Terima kasih telah berbelanja. Anda akan dialihkan ke halaman utama.', 'success');
            
            // Redirect ke Home setelah 3 detik
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 3000);
        } else {
            showCustomModal('Pembayaran Gagal', 'Terjadi kesalahan pada gateway pembayaran. Silakan coba lagi.', 'error');
            btn.innerText = originalText;
            btn.disabled = false;
        }
    }, 2000);
}

// ===== CHECKOUT PROCESS (MODIFIED) =====
function processOrder(e) {
    e.preventDefault();
    
    // Ambil nilai numerik dari teks (hapus "Rp " dan titik)
    const getVal = (id) => parseInt(document.getElementById(id).innerText.replace(/[^0-9]/g, '')) || 0;
    
    // Simpan data pesanan ke LocalStorage untuk halaman pembayaran
    const orderData = {
        cart: cart,
        subtotal: document.getElementById('subtotal').innerText,
        discount: document.getElementById('discountDisplay').innerText,
        shipping: getVal('subtotal') > 0 && document.getElementById('voucherCode').value.toUpperCase() === 'FREESHIP' ? 0 : 20000,
        total: document.getElementById('total').innerText,
        customer: {
            name: e.target.querySelector('input[placeholder="Nama Lengkap"]').value,
            phone: e.target.querySelector('input[placeholder="Nomor Telepon"]').value,
            address: e.target.querySelector('textarea').value
        }
    };

    localStorage.setItem('pendingOrder', JSON.stringify(orderData));
    
    // Redirect ke Halaman Pembayaran
    window.location.href = 'payment.html';
}

// ===== STANDARD FUNCTIONS (Catalog, Wheel, etc) =====
function loadProducts() {
    const grid = document.getElementById('productGrid');
    const paginationContainer = document.getElementById('pagination');
    if (!grid) return;
    
    let filtered = currentFilter === 'all' ? products : products.filter(p => p.category === currentFilter);
    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    if(currentPage > totalPages) currentPage = 1;
    
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedItems = filtered.slice(start, end);
    
    grid.innerHTML = paginatedItems.map((product, index) => `
        <div class="product-card" data-aos="fade-up" data-aos-delay="${index * 50}">
            <div class="card-image-wrapper">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/300'">
                <span class="stock-badge">${product.stock} left</span>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="price">Rp ${product.price.toLocaleString('id-ID')}</p>
                <div class="product-actions">
                    <button class="btn btn-outline" onclick="showProductDetail(${product.id})">Detail</button>
                    <button class="btn btn-primary" onclick="showProductDetail(${product.id})">Beli</button>
                </div>
            </div>
        </div>
    `).join('');

    if (paginationContainer) {
        let html = '';
        if(totalPages > 1) {
            html += `<button class="page-btn" onclick="changePage(${currentPage-1})" ${currentPage===1?'disabled':''}>Prev</button>`;
            for(let i=1; i<=totalPages; i++) html += `<button class="page-btn ${i===currentPage?'active':''}" onclick="changePage(${i})">${i}</button>`;
            html += `<button class="page-btn" onclick="changePage(${currentPage+1})" ${currentPage===totalPages?'disabled':''}>Next</button>`;
        }
        paginationContainer.innerHTML = html;
    }
}

function loadFlashSale() {
    const container = document.getElementById('bestSellerGrid');
    if (!container) return;
    container.innerHTML = products.slice(0, 4).map(product => `
        <div class="product-card" data-aos="fade-up">
            <div class="card-image-wrapper">
                <span class="stock-badge" style="background:var(--accent);left:10px;right:auto;">BEST SELLER</span>
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="price">Rp ${product.price.toLocaleString('id-ID')}</p>
                <button class="btn btn-primary btn-full" onclick="showProductDetail(${product.id})">Lihat Detail</button>
            </div>
        </div>
    `).join('');
}

function spinWheel() {
    if (wheelSpinning) return;
    if (localStorage.getItem('wheelPlayed')) return showCustomModal('Kesempatan Habis', 'Coba lagi besok!', 'info');

    const wheel = document.getElementById('wheel');
    const resultDiv = document.getElementById('wheelResult');
    let wheelSpinning = true;

    const rewards = [
        { label: "ZONK 😢", code: null, min: 0, max: 60 },
        { label: "DISKON 10%", code: "LUCKY10", min: 60, max: 120 },
        { label: "DISKON 5%", code: "LUCKY5", min: 120, max: 180 },
        { label: "FREE ONGKIR", code: "FREESHIP", min: 180, max: 240 },
        { label: "DISKON 20%", code: "SUPER20", min: 240, max: 300 },
        { label: "DISKON 15%", code: "LUCKY15", min: 300, max: 360 }
    ];

    const randomDeg = Math.floor(Math.random() * 360);
    const totalRotation = 1800 + randomDeg;
    wheel.style.transform = `rotate(${totalRotation}deg)`;

    setTimeout(() => {
        wheelSpinning = false;
        const actualDeg = totalRotation % 360;
        const winningAngle = (360 - actualDeg) % 360;
        const win = rewards.find(r => winningAngle >= r.min && winningAngle < r.max);
        
        if(win && win.code) {
            resultDiv.innerHTML = `<h3>Dapat ${win.label}</h3><p>Kode: <strong>${win.code}</strong></p><button class="btn btn-primary btn-sm" onclick="copyCode('${win.code}')">Salin</button>`;
            showCustomModal('Hore!', `Menang ${win.label}!`, 'success');
        } else {
            resultDiv.innerHTML = `<h3>ZONK...</h3>`;
            showCustomModal('Oops', 'Kurang beruntung.', 'info');
        }
        localStorage.setItem('wheelPlayed', 'true');
    }, 4000);
}

// ===== HELPERS =====
function showProductDetail(id) {
    const product = products.find(p => p.id === id);
    const modalBody = document.getElementById('modalBody');
    if(modalBody) {
        modalBody.innerHTML = `
            <div class="product-detail">
                <img src="${product.image}" alt="${product.name}">
                <div class="detail-info">
                    <h2>${product.name}</h2>
                    <p class="price">Rp ${product.price.toLocaleString('id-ID')}</p>
                    <p>${product.description}</p>
                    <div class="quantity-control"><button onclick="adjustQty(-1)">-</button><input id="modalQty" value="1" readonly><button onclick="adjustQty(1,${product.stock})">+</button></div>
                    <button class="btn btn-primary" onclick="addToCart(${product.id})" style="margin-top:1rem;">Masuk Keranjang</button>
                </div>
            </div>`;
        document.getElementById('productModal').style.display = 'flex';
    }
}

function showCart() {
    if (cart.length === 0) return showCustomModal('Keranjang Kosong', 'Belum ada barang.', 'info');
    renderCheckoutItems();
    document.getElementById('checkoutModal').style.display = 'flex';
}

function renderCheckoutItems() {
    document.getElementById('checkoutItems').innerHTML = cart.map(item => `
        <div class="checkout-item">
            <img src="${item.image}" style="width:50px;">
            <div style="flex:1; margin-left:1rem;"><h4>${item.name}</h4><p>${item.quantity} x Rp ${item.price.toLocaleString('id-ID')}</p></div>
            <button class="btn-remove" onclick="removeFromCart(${item.id})">X</button>
        </div>`).join('');
    calculateTotal();
}

function calculateTotal() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = document.getElementById('voucherCode')?.value.toUpperCase() === 'FREESHIP' ? 0 : 20000;
    let discount = activeDiscount > 0 ? subtotal * (activeDiscount/100) : 0;
    
    document.getElementById('subtotal').innerText = `Rp ${subtotal.toLocaleString('id-ID')}`;
    document.getElementById('discountDisplay').innerText = `- Rp ${discount.toLocaleString('id-ID')}`;
    document.getElementById('total').innerText = `Rp ${(subtotal + shipping - discount).toLocaleString('id-ID')}`;
}

function applyVoucher() {
    const code = document.getElementById('voucherCode').value.toUpperCase();
    if(code === 'LUCKY10') activeDiscount = 10;
    else if(code === 'FREESHIP') activeDiscount = 0; // handled in calcTotal
    else { showToast('Kode tidak valid'); activeDiscount = 0; }
    calculateTotal();
    if(activeDiscount > 0 || code === 'FREESHIP') showToast('Voucher dipakai!');
}

function changePage(p) { currentPage = p; loadProducts(); document.getElementById('productGrid').scrollIntoView({behavior:'smooth'}); }
function filterProducts(c) { currentFilter = c; currentPage=1; document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active')); event.target.classList.add('active'); loadProducts(); }
function adjustQty(d,m){const i=document.getElementById('modalQty');let v=parseInt(i.value)+d;if(v<1)v=1;if(m&&v>m)v=m;i.value=v;}
function closeProductModal(){document.getElementById('productModal').style.display='none';}
function closeCheckout(){document.getElementById('checkoutModal').style.display='none';}
function showToast(m){const t=document.getElementById('toast');t.innerText=m;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),3000);}
function showCustomModal(t,m,type='success'){
    const modal=document.getElementById('customModal');
    const color = type === 'success' ? 'var(--accent)' : '#ef4444';
    const icon = type === 'success' ? '✓' : '⚠';
    document.getElementById('customModalBody').innerHTML = `<div style="text-align:center;padding:2rem;"><div style="width:60px;height:60px;background:${color};border-radius:50%;color:white;font-size:2rem;display:flex;align-items:center;justify-content:center;margin:0 auto 1rem;">${icon}</div><h2>${t}</h2><p>${m}</p></div>`;
    modal.style.display='flex';
}
function closeCustomModal(){document.getElementById('customModal').style.display='none';}
function copyCode(c){navigator.clipboard.writeText(c);showToast('Disalin!');}

window.onclick = function(e) {
    ['productModal','checkoutModal','customModal'].forEach(id=>{
        const m=document.getElementById(id);
        if(m&&e.target===m)m.style.display='none';
    });
}