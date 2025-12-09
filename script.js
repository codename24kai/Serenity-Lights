// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
    
    loadProducts(); // Load initial page
    loadFlashSale(); // Load best sellers/flash sale
    startCountdown();
    updateCartCount();
    
    // Check for minigame play
    if(!localStorage.getItem('minigamePlayed')) {
        setTimeout(() => document.getElementById('minigameSection')?.scrollIntoView({behavior: 'smooth'}), 3000);
    }
});

// ===== PRODUCT DATA (20 PRODUK BARU) =====
// Menggunakan gambar dari folder assets yang tersedia
const products = [
    {
        id: 1,
        name: "Lumina Ceramic White",
        price: 350000,
        stock: 15,
        image: "assets/1.png",
        category: "minimalist",
        specs: { watt: "5W LED", material: "Ceramic", dim: "30x15cm" },
        description: "Lampu meja keramik putih dengan desain lekukan elegan."
    },
    {
        id: 2,
        name: "Noir Elegance Shade",
        price: 280000,
        stock: 20,
        image: "assets/3.avif", // Menggunakan aset yang ada
        category: "modern",
        specs: { watt: "7W LED", material: "Fabric & Metal", dim: "40x20cm" },
        description: "Kap lampu hitam klasik dengan tiang ramping."
    },
    {
        id: 3,
        name: "Terra Cotta Vibes",
        price: 420000,
        stock: 8,
        image: "assets/4.png",
        category: "minimalist",
        specs: { watt: "5W Warm", material: "Clay Texture", dim: "35x18cm" },
        description: "Sentuhan alami dengan tekstur tanah liat dan kap kayu."
    },
    {
        id: 4,
        name: "Classic Beige Stand",
        price: 320000,
        stock: 25,
        image: "assets/5.png",
        category: "minimalist",
        specs: { watt: "9W LED", material: "Linen & Iron", dim: "45x25cm" },
        description: "Lampu standar beige yang cocok untuk segala ruangan."
    },
    {
        id: 5,
        name: "Golden Leaf Luxury",
        price: 850000,
        stock: 5,
        image: "assets/6.jpg",
        category: "modern",
        specs: { watt: "12W LED", material: "Gold Plated", dim: "50x30cm" },
        description: "Aksen daun emas mewah untuk ruang tamu premium."
    },
    {
        id: 6,
        name: "Victorian Floral",
        price: 450000,
        stock: 10,
        image: "assets/7.jpg",
        category: "minimalist",
        specs: { watt: "5W Bulb", material: "Patterned Fabric", dim: "38x22cm" },
        description: "Nuansa klasik dengan motif bunga vintage."
    },
    {
        id: 7,
        name: "Architect Black Arm",
        price: 299000,
        stock: 30,
        image: "assets/8.avif",
        category: "smart",
        specs: { watt: "10W Smart", material: "Aluminium", dim: "Adjustable" },
        description: "Lampu arsitek fleksibel, cocok untuk meja kerja."
    },
    {
        id: 8,
        name: "Studio Desk Lamp",
        price: 175000,
        stock: 50,
        image: "assets/9.jpg",
        category: "smart",
        specs: { watt: "5W LED", material: "Plastic ABS", dim: "30x10cm" },
        description: "Lampu belajar minimalis dan fungsional."
    },
    {
        id: 9,
        name: "Slim Gold Stick",
        price: 550000,
        stock: 12,
        image: "assets/10.png",
        category: "modern",
        specs: { watt: "3W LED", material: "Brass", dim: "120x15cm" },
        description: "Floor lamp ultra tipis dengan finishing kuningan."
    },
    {
        id: 10,
        name: "Flexi Reading Black",
        price: 210000,
        stock: 40,
        image: "assets/11.jpg",
        category: "smart",
        specs: { watt: "5W Eye-care", material: "Silicone", dim: "40cm arm" },
        description: "Leher fleksibel untuk kenyamanan membaca maksimal."
    },
    {
        id: 11,
        name: "Nordic White Glow",
        price: 380000,
        stock: 18,
        image: "assets/12.jpg",
        category: "minimalist",
        specs: { watt: "7W Warm", material: "Frosted Glass", dim: "25x15cm" },
        description: "Cahaya lembut menembus kaca frosted putih."
    },
    {
        id: 12,
        name: "Mushroom Table Lamp",
        price: 499000,
        stock: 14,
        image: "assets/13.jpg",
        category: "modern",
        specs: { watt: "5W LED", material: "Acrylic", dim: "28x20cm" },
        description: "Desain jamur ikonik yang memancarkan cahaya ke bawah."
    },
    {
        id: 13,
        name: "Origami Paper Lamp",
        price: 225000,
        stock: 22,
        image: "assets/14.jpg",
        category: "minimalist",
        specs: { watt: "3W LED", material: "Washi Paper", dim: "30x30cm" },
        description: "Seni lipat kertas Jepang yang menenangkan."
    },
    {
        id: 14,
        name: "Glass Ombre Grey",
        price: 670000,
        stock: 7,
        image: "assets/15.jpg",
        category: "modern",
        specs: { watt: "9W LED", material: "Ombre Glass", dim: "45x28cm" },
        description: "Gradasi warna abu-abu pada kaca yang artistik."
    },
    {
        id: 15,
        name: "Pleated Vintage",
        price: 340000,
        stock: 15,
        image: "assets/16.jpg",
        category: "minimalist",
        specs: { watt: "5W Warm", material: "Pleated Fabric", dim: "35x25cm" },
        description: "Kap berlipat memberikan tekstur cahaya yang unik."
    },
    {
        id: 16,
        name: "Edison Bulb Stand",
        price: 150000,
        stock: 60,
        image: "assets/17.jpg",
        category: "modern",
        specs: { watt: "4W Filament", material: "Wood Base", dim: "15x10cm" },
        description: "Tampilan bohlam telanjang dengan base kayu estetik."
    },
    {
        id: 17,
        name: "Driftwood Natural",
        price: 1200000,
        stock: 3,
        image: "assets/18.jpg",
        category: "minimalist",
        specs: { watt: "7W LED", material: "Real Wood", dim: "40x35cm" },
        description: "Potongan kayu alami asli, setiap unit unik."
    },
    {
        id: 18,
        name: "Clip-on Reader",
        price: 95000,
        stock: 100,
        image: "assets/19.jpg",
        category: "smart",
        specs: { watt: "2W LED", material: "Plastic", dim: "Compact" },
        description: "Lampu jepit praktis untuk buku atau meja."
    },
    {
        id: 19,
        name: "Portable Cone Pair",
        price: 550000,
        stock: 20,
        image: "assets/20.jpg",
        category: "smart",
        specs: { watt: "Battery 12h", material: "Matte Metal", dim: "15x10cm" },
        description: "Sepasang lampu portable tanpa kabel, rechargeable."
    },
    {
        id: 20,
        name: "Ambient Sphere V2",
        price: 275000,
        stock: 25,
        image: "assets/1.png", // Reusing asset for demo
        category: "minimalist",
        specs: { watt: "5W RGB", material: "Glass", dim: "20x20cm" },
        description: "Versi terbaru dengan fitur ganti warna."
    }
];

let cart = [];
let currentFilter = 'all';
let currentPage = 1;
const itemsPerPage = 10;
let activeDiscount = 0;

// ===== TOAST NOTIFICATION =====
function showToast(message, duration = 3000) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), duration);
}

// ===== CUSTOM MODAL =====
function showCustomModal(title, message, type = 'success') {
    const modal = document.getElementById('customModal');
    const body = document.getElementById('customModalBody');
    const icon = type === 'success' ? '✓' : 'ℹ';
    const color = type === 'success' ? 'var(--accent)' : 'var(--accent-secondary)';
    
    body.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
            <div style="width: 80px; height: 80px; border-radius: 50%; background: ${color}; 
                        display: flex; align-items: center; justify-content: center; 
                        margin: 0 auto 1.5rem; font-size: 3rem; color: white;">
                ${icon}
            </div>
            <h2 style="font-family: 'Space Grotesk', sans-serif; margin-bottom: 1rem;">${title}</h2>
            <p style="color: var(--text-secondary); font-size: 1.125rem;">${message}</p>
        </div>
    `;
    modal.style.display = 'flex';
}

function closeCustomModal() { document.getElementById('customModal').style.display = 'none'; }

// ===== LOAD PRODUCTS (WITH PAGINATION) =====
function loadProducts() {
    const grid = document.getElementById('productGrid');
    const paginationContainer = document.getElementById('pagination');
    if (!grid) return;
    
    // 1. Filter
    let filtered = currentFilter === 'all' 
        ? products 
        : products.filter(p => p.category === currentFilter);
    
    // 2. Paginate
    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    if(currentPage > totalPages) currentPage = 1;
    
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedItems = filtered.slice(start, end);
    
    // 3. Render Items
    grid.innerHTML = paginatedItems.map((product, index) => `
        <div class="product-card" data-aos="fade-up" data-aos-delay="${index * 50}">
            <div class="card-image-wrapper">
                <img src="${product.image}" alt="${product.name}">
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

    // 4. Render Pagination Controls
    if (paginationContainer) {
        let paginationHTML = '';
        if(totalPages > 1) {
            paginationHTML += `<button class="page-btn" onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>Prev</button>`;
            for(let i=1; i<=totalPages; i++) {
                paginationHTML += `<button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="changePage(${i})">${i}</button>`;
            }
            paginationHTML += `<button class="page-btn" onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>Next</button>`;
        }
        paginationContainer.innerHTML = paginationHTML;
    }
}

function changePage(page) {
    currentPage = page;
    loadProducts();
    document.getElementById('productGrid').scrollIntoView({behavior: 'smooth'});
}

function filterProducts(category) {
    currentFilter = category;
    currentPage = 1; // Reset to page 1
    // Update active button UI
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    loadProducts();
}

// ===== BEST SELLERS (HOME) =====
function loadFlashSale() {
    const bestSellerContainer = document.getElementById('bestSellerGrid');
    if (!bestSellerContainer) return;
    
    // Ambil 4 produk acak sebagai best seller
    const bestSellers = products.slice(0, 4); 
    
    bestSellerContainer.innerHTML = bestSellers.map(product => `
        <div class="product-card" data-aos="fade-up">
            <span class="product-badge">BEST SELLER</span>
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="price">Rp ${product.price.toLocaleString('id-ID')}</p>
                <button class="btn btn-primary btn-full" onclick="showProductDetail(${product.id})">Lihat</button>
            </div>
        </div>
    `).join('');
}

// ===== MINIGAME LOGIC =====
function playMinigame() {
    const codes = [
        { code: 'HEMAT10', discount: 10, msg: 'Selamat! Diskon 10%' },
        { code: 'ONGKIRFREE', discount: 0, msg: 'Gratis Ongkir (Voucher: ONGKIRFREE)' },
        { code: 'SERENITY20', discount: 20, msg: 'Jackpot! Diskon 20%' }
    ];
    
    // Simple randomizer
    const result = codes[Math.floor(Math.random() * codes.length)];
    
    const gameArea = document.getElementById('gameArea');
    gameArea.innerHTML = `
        <div class="game-result animate-pop">
            <h3>🎉 ${result.msg} 🎉</h3>
            <p>Gunakan kode: <strong>${result.code}</strong></p>
            <button class="btn btn-primary" onclick="copyCode('${result.code}')">Salin Kode</button>
        </div>
    `;
    localStorage.setItem('minigamePlayed', 'true');
}

function copyCode(code) {
    navigator.clipboard.writeText(code);
    showToast('Kode berhasil disalin!');
}

// ===== PRODUCT DETAIL & QUANTITY =====
function showProductDetail(id) {
    const product = products.find(p => p.id === id);
    const modalBody = document.getElementById('modalBody');
    
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
                    <p><strong>Dimensi:</strong> ${product.specs.dim}</p>
                </div>
                <p class="description">${product.description}</p>
                
                <div class="quantity-control">
                    <button onclick="adjustQty(-1)">-</button>
                    <input type="number" id="modalQty" value="1" min="1" max="${product.stock}" readonly>
                    <button onclick="adjustQty(1, ${product.stock})">+</button>
                </div>

                <div style="display: flex; gap: 1rem; margin-top: 1rem;">
                    <button class="btn btn-primary" onclick="addToCart(${product.id})">
                        Tambah ke Keranjang
                    </button>
                    <button class="btn btn-outline" onclick="closeProductModal()">
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    `;
    document.getElementById('productModal').style.display = 'flex';
}

function adjustQty(change, max) {
    const input = document.getElementById('modalQty');
    let val = parseInt(input.value);
    val += change;
    if (val < 1) val = 1;
    if (max && val > max) val = max;
    input.value = val;
}

function closeProductModal() { document.getElementById('productModal').style.display = 'none'; }

// ===== CART FUNCTIONS (UPDATED) =====
function addToCart(id) {
    const qtyInput = document.getElementById('modalQty');
    const qty = qtyInput ? parseInt(qtyInput.value) : 1;
    
    const product = products.find(p => p.id === id);
    const existingItem = cart.find(item => item.id === id);
    
    if (product.stock < qty) {
        showToast('Stok tidak mencukupi!');
        return;
    }

    if (existingItem) {
        if(existingItem.quantity + qty > product.stock) {
            showToast('Mencapai batas stok!');
            return;
        }
        existingItem.quantity += qty;
    } else {
        cart.push({...product, quantity: qty});
    }
    
    updateCartCount();
    closeProductModal();
    showToast(`${qty}x ${product.name} masuk keranjang!`);
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const el = document.getElementById('cart-count');
    if (el) el.textContent = count;
}

// ===== CHECKOUT & DISCOUNT =====
function showCart() {
    if (cart.length === 0) {
        showCustomModal('Keranjang Kosong', 'Yuk mulai belanja!', 'info');
        return;
    }
    renderCheckoutItems();
    document.getElementById('checkoutModal').style.display = 'flex';
}

function renderCheckoutItems() {
    const itemsHtml = cart.map(item => `
        <div class="checkout-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="item-info">
                <h4>${item.name}</h4>
                <p>Rp ${item.price.toLocaleString('id-ID')} x ${item.quantity}</p>
            </div>
            <div class="price-total">Rp ${(item.price * item.quantity).toLocaleString('id-ID')}</div>
            <button class="btn-remove" onclick="removeFromCart(${item.id})">X</button>
        </div>
    `).join('');
    
    document.getElementById('checkoutItems').innerHTML = itemsHtml;
    calculateTotal();
}

function calculateTotal() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 20000;
    
    // Logic Diskon
    let discountAmount = 0;
    if (activeDiscount > 0) {
        discountAmount = subtotal * (activeDiscount / 100);
    }

    const total = subtotal + shipping - discountAmount;
    
    document.getElementById('subtotal').textContent = `Rp ${subtotal.toLocaleString('id-ID')}`;
    document.getElementById('discountDisplay').textContent = `- Rp ${discountAmount.toLocaleString('id-ID')}`;
    document.getElementById('total').textContent = `Rp ${total.toLocaleString('id-ID')}`;
}

function applyVoucher() {
    const code = document.getElementById('voucherCode').value.toUpperCase();
    if (code === 'HEMAT10') activeDiscount = 10;
    else if (code === 'SERENITY20') activeDiscount = 20;
    else {
        showToast('Kode tidak valid');
        activeDiscount = 0;
    }
    calculateTotal();
    if(activeDiscount > 0) showToast(`Voucher ${activeDiscount}% terpasang!`);
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartCount();
    if (cart.length === 0) closeCheckout();
    else renderCheckoutItems();
}

function closeCheckout() { document.getElementById('checkoutModal').style.display = 'none'; }

function processOrder(e) {
    e.preventDefault();
    // Validasi Pemesanan Selesai dengan Custom Notification (Bukan Alert)
    document.getElementById('checkoutModal').style.display = 'none';
    showCustomModal('Pesanan Berhasil!', 'Terima kasih telah berbelanja. Resi akan dikirim via email.', 'success');
    
    // Reset Logic
    cart = [];
    activeDiscount = 0;
    updateCartCount();
    e.target.reset();
}

// ===== MISC =====
function startCountdown() { /* (Biarkan kode lama untuk countdown) */ }

// Helper Modal Close
window.onclick = function(event) {
    const modals = ['productModal', 'checkoutModal', 'customModal'];
    modals.forEach(id => {
        if (event.target === document.getElementById(id)) {
            document.getElementById(id).style.display = 'none';
        }
    });
}