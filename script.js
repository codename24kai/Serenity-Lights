// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
    
    loadProducts();
    loadFlashSale();
    startCountdown();
    updateCartCount();
});

// ===== PRODUCT DATA =====
const products = [
    {
        id: 1,
        name: "Minimalist Sphere",
        price: 249000,
        originalPrice: 299000,
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop",
        description: "Elegant spherical design with warm LED lighting. Perfect for modern bedrooms and living spaces. Features touch-sensitive controls and adjustable brightness.",
        category: "minimalist",
        isFlashSale: true
    },
    {
        id: 2,
        name: "Smart Touch Pro",
        price: 399000,
        originalPrice: 499000,
        image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=500&h=500&fit=crop",
        description: "Advanced touch control with 3 brightness levels and color temperature adjustment. Energy-efficient LED technology with 50,000 hours lifespan.",
        category: "smart",
        isFlashSale: true
    },
    {
        id: 3,
        name: "Aesthetic Globe",
        price: 189000,
        image: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=500&h=500&fit=crop",
        description: "Round aesthetic design with soft ambient glow. Creates a cozy atmosphere perfect for relaxation and reading. USB-powered for convenience.",
        category: "minimalist"
    },
    {
        id: 4,
        name: "Modern Pendant",
        price: 349000,
        image: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=500&h=500&fit=crop",
        description: "Contemporary hanging lamp with premium materials. Adjustable height and elegant brass finish. Perfect statement piece for any room.",
        category: "modern"
    },
    {
        id: 5,
        name: "Natural Wood Desk",
        price: 279000,
        originalPrice: 329000,
        image: "https://images.unsplash.com/photo-1550985543-49bee3167284?w=500&h=500&fit=crop",
        description: "Sustainable wooden base with warm LED bulb. Eco-friendly design combining natural aesthetics with modern functionality.",
        category: "minimalist",
        isFlashSale: true
    },
    {
        id: 6,
        name: "RGB Smart Light",
        price: 449000,
        image: "https://images.unsplash.com/photo-1565891741441-64926e441838?w=500&h=500&fit=crop",
        description: "App-controlled RGB lamp with 16 million colors. Voice control compatible, scheduling features, and music sync capability.",
        category: "smart"
    },
    {
        id: 7,
        name: "Industrial Arc",
        price: 429000,
        image: "https://images.unsplash.com/photo-1543198126-a8e6889ea3c7?w=500&h=500&fit=crop",
        description: "Industrial-style arc lamp with adjustable arm. Matte black finish with brushed metal accents. Perfect for reading corners.",
        category: "modern"
    },
    {
        id: 8,
        name: "Zen Minimalist",
        price: 199000,
        image: "https://images.unsplash.com/photo-1571508601936-affa18f0f5e6?w=500&h=500&fit=crop",
        description: "Japanese-inspired minimal design with soft diffused light. Creates a peaceful zen atmosphere for meditation and relaxation.",
        category: "minimalist"
    }
];

let cart = [];
let currentFilter = 'all';

// ===== TOAST NOTIFICATION =====
function showToast(message, duration = 3000) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
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

function closeCustomModal() {
    document.getElementById('customModal').style.display = 'none';
}

// ===== COUNTDOWN TIMER =====
function startCountdown() {
    const countdownElement = document.getElementById('countdown');
    if (!countdownElement) return;
    
    // Set target time (24 hours from now)
    const targetTime = new Date().getTime() + (24 * 60 * 60 * 1000);
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetTime - now;
        
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
        
        if (distance < 0) {
            clearInterval(countdownInterval);
        }
    }
    
    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
}

// ===== LOAD FLASH SALE =====
function loadFlashSale() {
    const flashContainer = document.getElementById('flashProducts');
    if (!flashContainer) return;
    
    const flashProducts = products.filter(p => p.isFlashSale);
    
    flashContainer.innerHTML = flashProducts.map(product => `
        <div class="product-card" data-aos="fade-up">
            <span class="product-badge">FLASH SALE</span>
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <div style="display: flex; align-items: center; gap: 1rem;">
                    <p class="price">Rp ${product.price.toLocaleString('id-ID')}</p>
                    <span style="text-decoration: line-through; color: var(--text-secondary); font-size: 1rem;">
                        Rp ${product.originalPrice.toLocaleString('id-ID')}
                    </span>
                </div>
                <div class="product-actions">
                    <button class="btn btn-outline" onclick="showProductDetail(${product.id})">Details</button>
                    <button class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
        </div>
    `).join('');
}

// ===== LOAD PRODUCTS =====
function loadProducts() {
    const grid = document.getElementById('productGrid');
    if (!grid) return;
    
    const filteredProducts = currentFilter === 'all' 
        ? products 
        : products.filter(p => p.category === currentFilter);
    
    grid.innerHTML = filteredProducts.map((product, index) => `
        <div class="product-card" data-aos="fade-up" data-aos-delay="${index * 50}">
            ${product.isFlashSale ? '<span class="product-badge">SALE</span>' : ''}
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="price">Rp ${product.price.toLocaleString('id-ID')}</p>
                <div class="product-actions">
                    <button class="btn btn-outline" onclick="showProductDetail(${product.id})">Details</button>
                    <button class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
        </div>
    `).join('');
}

// ===== FILTER PRODUCTS =====
function filterProducts(category) {
    currentFilter = category;
    
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    loadProducts();
    AOS.refresh();
}

// ===== SHOW PRODUCT DETAIL =====
function showProductDetail(id) {
    const product = products.find(p => p.id === id);
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = `
        <div class="product-detail">
            <img src="${product.image}" alt="${product.name}">
            <div class="detail-info">
                <h2>${product.name}</h2>
                <div style="display: flex; align-items: center; gap: 1rem; margin: 1rem 0;">
                    <p class="price">Rp ${product.price.toLocaleString('id-ID')}</p>
                    ${product.originalPrice ? `
                        <span style="text-decoration: line-through; color: var(--text-secondary); font-size: 1.25rem;">
                            Rp ${product.originalPrice.toLocaleString('id-ID')}
                        </span>
                    ` : ''}
                </div>
                <p class="description">${product.description}</p>
                <div style="display: flex; gap: 1rem;">
                    <button class="btn btn-primary" onclick="addToCart(${product.id}); closeProductModal();">
                        Add to Cart
                    </button>
                    <button class="btn btn-outline" onclick="closeProductModal()">
                        Close
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('productModal').style.display = 'flex';
}

function closeProductModal() {
    document.getElementById('productModal').style.display = 'none';
}

// ===== CART FUNCTIONS =====
function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({...product, quantity: 1});
    }
    
    updateCartCount();
    showToast(`${product.name} added to cart!`);
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountEl = document.getElementById('cart-count');
    if (cartCountEl) {
        cartCountEl.textContent = count;
    }
}

function showCart() {
    if (cart.length === 0) {
        showCustomModal('Empty Cart', 'Your shopping cart is empty. Start shopping now!', 'info');
        return;
    }
    
    const itemsHtml = cart.map(item => `
        <div class="checkout-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="item-info">
                <h4>${item.name}</h4>
                <p>Rp ${item.price.toLocaleString('id-ID')} x ${item.quantity}</p>
            </div>
            <button class="btn-remove" onclick="removeFromCart(${item.id})">Remove</button>
        </div>
    `).join('');
    
    document.getElementById('checkoutItems').innerHTML = itemsHtml;
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal + 20000;
    
    document.getElementById('subtotal').textContent = `Rp ${subtotal.toLocaleString('id-ID')}`;
    document.getElementById('total').textContent = `Rp ${total.toLocaleString('id-ID')}`;
    
    document.getElementById('checkoutModal').style.display = 'flex';
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartCount();
    
    if (cart.length === 0) {
        closeCheckout();
        showToast('Cart is now empty');
    } else {
        showCart();
        showToast('Item removed from cart');
    }
}

function closeCheckout() {
    document.getElementById('checkoutModal').style.display = 'none';
}

function processOrder(e) {
    e.preventDefault();
    showCustomModal('Order Successful!', 'Thank you for your purchase. We will process your order shortly.', 'success');
    cart = [];
    updateCartCount();
    closeCheckout();
    e.target.reset();
}

// ===== CONTACT FORM =====
function handleContactSubmit(e) {
    e.preventDefault();
    showCustomModal('Message Sent!', 'Thank you for contacting us. We will get back to you soon.', 'success');
    e.target.reset();
}

// ===== MODAL CLOSE ON OUTSIDE CLICK =====
window.onclick = function(event) {
    const productModal = document.getElementById('productModal');
    const checkoutModal = document.getElementById('checkoutModal');
    const customModal = document.getElementById('customModal');
    
    if (event.target === productModal) {
        closeProductModal();
    }
    if (event.target === checkoutModal) {
        closeCheckout();
    }
    if (event.target === customModal) {
        closeCustomModal();
    }
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== NAVBAR SCROLL EFFECT =====
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.padding = '1rem 0';
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.padding = '1.5rem 0';
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});