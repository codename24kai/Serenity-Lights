// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Init AOS (Animate On Scroll)
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
        
        // Wheel of Fortune: Cek Reset Harian (24 Jam)
        const lastPlayed = localStorage.getItem('wheelPlayedTime');
        if (lastPlayed) {
            const oneDay = 24 * 60 * 60 * 1000; // 24 jam dalam milidetik
            const now = new Date().getTime();
            // Jika sudah lewat 24 jam, reset agar bisa main lagi
            if (now - parseInt(lastPlayed) > oneDay) {
                localStorage.removeItem('wheelPlayedTime');
            }
        }
        
        // Auto scroll ke wheel jika belum dimainkan hari ini (Opsional)
        if(!localStorage.getItem('wheelPlayedTime') && document.getElementById('wheelSection')) {
            setTimeout(() => {
                // document.getElementById('wheelSection').scrollIntoView({behavior: 'smooth'});
            }, 3000);
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
let searchQuery = ''; // Variabel untuk pencarian
let currentPage = 1;
const itemsPerPage = 10;
let activeDiscount = 0;

// ===== SEARCH & FILTER LOGIC =====
function searchProducts() {
    const input = document.getElementById('searchInput');
    if (input) {
        searchQuery = input.value.toLowerCase();
        currentPage = 1; // Reset ke halaman 1 saat mencari
        loadProducts();
    }
}

function filterProducts(category) {
    currentFilter = category;
    searchQuery = ''; // Reset search saat ganti kategori
    
    // Reset tampilan input search jika ada
    const searchInput = document.getElementById('searchInput');
    if(searchInput) searchInput.value = '';
    
    currentPage = 1;
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    if(event && event.target) event.target.classList.add('active');
    loadProducts();
}

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

// ===== PAYMENT PAGE LOGIC =====
function initPaymentPage() {
    const pendingOrder = JSON.parse(localStorage.getItem('pendingOrder'));
    
    if (!pendingOrder || !pendingOrder.cart || pendingOrder.cart.length === 0) {
        window.location.href = 'index.html';
        return;
    }

    const itemList = document.getElementById('paymentOrderItems');
    if(itemList) {
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
    }

    if(document.getElementById('paySubtotal')) document.getElementById('paySubtotal').innerText = pendingOrder.subtotal;
    if(document.getElementById('payDiscount')) document.getElementById('payDiscount').innerText = pendingOrder.discount;
    if(document.getElementById('payShipping')) document.getElementById('payShipping').innerText = `Rp ${pendingOrder.shipping.toLocaleString('id-ID')}`;
    if(document.getElementById('payTotal')) document.getElementById('payTotal').innerText = pendingOrder.total;

    if(document.getElementById('customerDetails')) {
        document.getElementById('customerDetails').innerHTML = `
            <p><strong>Penerima:</strong> ${pendingOrder.customer.name}</p>
            <p><strong>Telepon:</strong> ${pendingOrder.customer.phone}</p>
            <p><strong>Alamat:</strong> ${pendingOrder.customer.address}</p>
        `;
    }
}

function handlePayment() {
    const selectedMethod = document.querySelector('input[name="paymentMethod"]:checked');
    if (!selectedMethod) {
        showCustomModal('Pembayaran Gagal', 'Silakan pilih metode pembayaran terlebih dahulu!', 'error');
        return;
    }

    const btn = document.querySelector('.btn-primary');
    if(btn) {
        const originalText = btn.innerText;
        btn.innerText = 'Memproses...';
        btn.disabled = true;

        setTimeout(() => {
            const isSuccess = true; 
            if (isSuccess) {
                localStorage.removeItem('serenityCart');
                localStorage.removeItem('pendingOrder');
                // localStorage.removeItem('wheelPlayedTime'); // Opsional: reset wheel setelah beli
                
                showCustomModal('Pembayaran Berhasil!', 'Terima kasih telah berbelanja. Anda akan dialihkan ke halaman utama.', 'success');
                setTimeout(() => { window.location.href = 'index.html'; }, 3000);
            } else {
                showCustomModal('Pembayaran Gagal', 'Terjadi kesalahan pada gateway pembayaran.', 'error');
                btn.innerText = originalText;
                btn.disabled = false;
            }
        }, 2000);
    }
}

// ===== CHECKOUT PROCESS (To Payment Page) =====
function processOrder(e) {
    e.preventDefault();
    const getVal = (id) => parseInt(document.getElementById(id).innerText.replace(/[^0-9]/g, '')) || 0;
    
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
    window.location.href = 'payment.html';
}

// ===== LOAD PRODUCTS (Updated with Search) =====
function loadProducts() {
    const grid = document.getElementById('productGrid');
    const paginationContainer = document.getElementById('pagination');
    if (!grid) return;
    
    // FILTER: Kategori DAN Search Query
    let filtered = products.filter(p => {
        const matchCategory = currentFilter === 'all' || p.category === currentFilter;
        const matchSearch = p.name.toLowerCase().includes(searchQuery) || 
                            p.description.toLowerCase().includes(searchQuery);
        return matchCategory && matchSearch;
    });
    
    // PAGINATION
    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    if(currentPage > totalPages) currentPage = 1;
    
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedItems = filtered.slice(start, end);
    
    // RENDER ITEMS
    if (paginatedItems.length > 0) {
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
    } else {
        grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 2rem;">
            <h3>Produk tidak ditemukan 🔍</h3>
            <p>Coba kata kunci lain.</p>
        </div>`;
    }

    // RENDER PAGINATION
    if (paginationContainer) {
        let html = '';
        if(totalPages > 1) {
            html += `<button class="page-btn" onclick="changePage(${currentPage-1})" ${currentPage===1?'disabled':''}>Prev</button>`;
            for(let i=1; i<=totalPages; i++) {
                html += `<button class="page-btn ${i===currentPage?'active':''}" onclick="changePage(${i})">${i}</button>`;
            }
            html += `<button class="page-btn" onclick="changePage(${currentPage+1})" ${currentPage===totalPages?'disabled':''}>Next</button>`;
        }
        paginationContainer.innerHTML = html;
    }
}

// ===== OTHER STANDARD FUNCTIONS =====
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

// ===== WHEEL OF FORTUNE (DAILY RESET) =====
let wheelSpinning = false;
let currentRotation = 0;

function spinWheel() {
    if (wheelSpinning) return;
    
    // Cek apakah sudah main hari ini
    if (localStorage.getItem('wheelPlayedTime')) {
        showCustomModal('Kesempatan Habis', 'Anda sudah memutar roda hari ini. Coba lagi besok!', 'info');
        return;
    }

    const wheel = document.getElementById('wheel');
    const resultDiv = document.getElementById('wheelResult');
    wheelSpinning = true;

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
    
    if(wheel) wheel.style.transform = `rotate(${totalRotation}deg)`;

    setTimeout(() => {
        wheelSpinning = false;
        const actualDeg = totalRotation % 360;
        const winningAngle = (360 - actualDeg) % 360;
        const win = rewards.find(r => winningAngle >= r.min && winningAngle < r.max);
        
        if(win && win.code) {
            if(resultDiv) resultDiv.innerHTML = `<h3>Dapat ${win.label}</h3><p>Kode: <strong>${win.code}</strong></p><button class="btn btn-primary btn-sm" onclick="copyCode('${win.code}')">Salin</button>`;
            showCustomModal('Hore!', `Menang ${win.label}!`, 'success');
        } else {
            if(resultDiv) resultDiv.innerHTML = `<h3>ZONK...</h3>`;
            showCustomModal('Oops', 'Kurang beruntung.', 'info');
        }
        
        // Simpan Waktu Main (Timestamp)
        localStorage.setItem('wheelPlayedTime', new Date().getTime().toString());
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
                    <div class="specs-box">
                         <p><strong>Stok:</strong> ${product.stock} unit</p>
                         <p><strong>Power:</strong> ${product.specs.watt}</p>
                         <p><strong>Material:</strong> ${product.specs.material}</p>
                    </div>
                    <p>${product.description}</p>
                    <div class="quantity-control"><button onclick="adjustQty(-1)">-</button><input id="modalQty" value="1" readonly><button onclick="adjustQty(1,${product.stock})">+</button></div>
                    <button class="btn btn-primary" onclick="addToCart(${product.id})" style="margin-top:1rem;">Masuk Keranjang</button>
                </div>
            </div>`;
        const modal = document.getElementById('productModal');
        if(modal) modal.style.display = 'flex';
    }
}

function showCart() {
    if (cart.length === 0) return showCustomModal('Keranjang Kosong', 'Belum ada barang.', 'info');
    renderCheckoutItems();
    const modal = document.getElementById('checkoutModal');
    if(modal) modal.style.display = 'flex';
}

function renderCheckoutItems() {
    const container = document.getElementById('checkoutItems');
    if(container) {
        container.innerHTML = cart.map(item => `
            <div class="checkout-item">
                <img src="${item.image}" style="width:50px;">
                <div style="flex:1; margin-left:1rem;"><h4>${item.name}</h4><p>${item.quantity} x Rp ${item.price.toLocaleString('id-ID')}</p></div>
                <button class="btn-remove" onclick="removeFromCart(${item.id})">X</button>
            </div>`).join('');
        calculateTotal();
    }
}

function calculateTotal() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = (document.getElementById('voucherCode') && document.getElementById('voucherCode').value.toUpperCase() === 'FREESHIP') ? 0 : 20000;
    let discount = activeDiscount > 0 ? subtotal * (activeDiscount/100) : 0;
    
    if(document.getElementById('subtotal')) document.getElementById('subtotal').innerText = `Rp ${subtotal.toLocaleString('id-ID')}`;
    if(document.getElementById('discountDisplay')) document.getElementById('discountDisplay').innerText = `- Rp ${discount.toLocaleString('id-ID')}`;
    if(document.getElementById('total')) document.getElementById('total').innerText = `Rp ${(subtotal + shipping - discount).toLocaleString('id-ID')}`;
}

function applyVoucher() {
    const codeInput = document.getElementById('voucherCode');
    if(!codeInput) return;
    
    const code = codeInput.value.toUpperCase();
    if(code === 'LUCKY10') activeDiscount = 10;
    else if(code === 'LUCKY5') activeDiscount = 5;
    else if(code === 'LUCKY15') activeDiscount = 15;
    else if(code === 'SUPER20') activeDiscount = 20;
    else if(code === 'FREESHIP') activeDiscount = 0; 
    else { showToast('Kode tidak valid'); activeDiscount = 0; }
    
    calculateTotal();
    if(activeDiscount > 0 || code === 'FREESHIP') showToast('Voucher dipakai!');
}

function changePage(p) { currentPage = p; loadProducts(); const g=document.getElementById('productGrid'); if(g) g.scrollIntoView({behavior:'smooth'}); }
function adjustQty(d,m){const i=document.getElementById('modalQty');if(i){let v=parseInt(i.value)+d;if(v<1)v=1;if(m&&v>m)v=m;i.value=v;}}
function closeProductModal(){const m=document.getElementById('productModal');if(m)m.style.display='none';}
function closeCheckout(){const m=document.getElementById('checkoutModal');if(m)m.style.display='none';}
function showToast(m){const t=document.getElementById('toast');if(t){t.innerText=m;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),3000);}}
function showCustomModal(t,m,type='success'){
    const modal=document.getElementById('customModal');
    const color = type === 'success' ? 'var(--accent)' : '#ef4444';
    const icon = type === 'success' ? '✓' : '⚠';
    const body = document.getElementById('customModalBody');
    if(body) body.innerHTML = `<div style="text-align:center;padding:2rem;"><div style="width:60px;height:60px;background:${color};border-radius:50%;color:white;font-size:2rem;display:flex;align-items:center;justify-content:center;margin:0 auto 1rem;">${icon}</div><h2>${t}</h2><p>${m}</p></div>`;
    if(modal) modal.style.display='flex';
}
function closeCustomModal(){const m=document.getElementById('customModal');if(m)m.style.display='none';}
function copyCode(c){navigator.clipboard.writeText(c);showToast('Disalin!');}

// Event untuk menutup modal saat klik luar
window.onclick = function(e) {
    ['productModal','checkoutModal','customModal'].forEach(id=>{
        const m=document.getElementById(id);
        if(m&&e.target===m)m.style.display='none';
    });
}