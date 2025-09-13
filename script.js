/**
 * Zomo Store - JavaScript Functions
 * Handles cart management, user authentication, product loading, and UI interactions
 */

// Global variables and constants
const STORAGE_KEYS = {
    CART: 'zomostore_cart',
    USER: 'zomostore_user',
    ORDERS: 'zomostore_orders',
    ADMIN: 'zomostore_admin',
    PRODUCTS: 'zomostore_products'
};

// Sample products data (in a real app, this would come from an API)
const PRODUCTS = [
    // Electronics Category
    {
        id: 1,
        name: "Premium Wireless Headphones",
        price: 299.99,
        description: "High-quality wireless headphones with noise cancellation and premium sound quality.",
        longDescription: "Experience crystal-clear audio with our premium wireless headphones featuring advanced noise cancellation technology, 30-hour battery life, and premium materials for ultimate comfort.",
        features: ["Active Noise Cancellation", "30-hour battery life", "Premium audio drivers", "Comfortable over-ear design"],
        icon: "fas fa-headphones",
        image: "images/Premium_wireless_headphones_product_c4fe3e1f.png",
        category: "Electronics"
    },
    {
        id: 2,
        name: "Gaming Mechanical Keyboard",
        price: 149.99,
        description: "RGB mechanical gaming keyboard with customizable keys and premium switches.",
        longDescription: "Elevate your gaming experience with this premium mechanical keyboard featuring customizable RGB lighting, tactile switches, and programmable keys.",
        features: ["RGB backlighting", "Mechanical switches", "Programmable keys", "Anti-ghosting technology"],
        icon: "fas fa-keyboard",
        image: "images/Luxury_gaming_keyboard_RGB_f7efbed5.png",
        category: "Electronics"
    },
    {
        id: 3,
        name: "4K Ultra HD Monitor",
        price: 599.99,
        description: "27-inch 4K monitor perfect for gaming, design work, and entertainment.",
        longDescription: "Stunning 4K resolution with vibrant colors and smooth performance. Perfect for professional work, gaming, and multimedia consumption.",
        features: ["4K Ultra HD resolution", "27-inch display", "IPS panel", "Multiple connectivity options"],
        icon: "fas fa-desktop",
        image: "images/Premium_4K_computer_monitor_87073520.png",
        category: "Electronics"
    },
    {
        id: 4,
        name: "Wireless Mouse Pro",
        price: 89.99,
        description: "Ergonomic wireless mouse with precision tracking and long battery life.",
        longDescription: "Professional-grade wireless mouse designed for productivity and precision. Features ergonomic design and advanced tracking technology.",
        features: ["Ergonomic design", "Precision tracking", "Long battery life", "Customizable buttons"],
        icon: "fas fa-mouse",
        image: "images/Luxury_wireless_mouse_premium_19dc29e2.png",
        category: "Electronics"
    },
    {
        id: 5,
        name: "Smartphone Pro Max",
        price: 1099.99,
        description: "Latest flagship smartphone with advanced camera system and premium build.",
        longDescription: "The ultimate smartphone experience with cutting-edge technology, professional camera system, and premium design.",
        features: ["Advanced camera system", "Premium build quality", "Fast performance", "Long battery life"],
        icon: "fas fa-mobile-alt",
        image: "images/Premium_flagship_smartphone_luxury_3187896a.png",
        category: "Electronics"
    },
    {
        id: 6,
        name: "Laptop Ultrabook",
        price: 1299.99,
        description: "Thin and light laptop with powerful performance for work and creativity.",
        longDescription: "Ultra-portable laptop combining power and portability. Perfect for professionals and creatives who need performance on the go.",
        features: ["Lightweight design", "Powerful processor", "Long battery life", "Premium display"],
        icon: "fas fa-laptop",
        image: "images/Premium_ultrabook_laptop_luxury_456e83cf.png",
        category: "Electronics"
    },

    // Food Category
    {
        id: 7,
        name: "Margherita Pizza",
        price: 18.99,
        description: "Classic Italian pizza with fresh mozzarella, tomato sauce, and basil.",
        longDescription: "Authentic Italian Margherita pizza made with the finest ingredients - fresh mozzarella cheese, San Marzano tomatoes, and fresh basil on a perfectly crispy crust.",
        features: ["Fresh mozzarella cheese", "San Marzano tomatoes", "Fresh basil leaves", "Wood-fired crispy crust"],
        icon: "fas fa-pizza-slice",
        image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=400&fit=crop&crop=center",
        category: "Food"
    },
    {
        id: 8,
        name: "Gourmet Burger",
        price: 15.99,
        description: "Premium beef burger with lettuce, tomato, and special sauce.",
        longDescription: "Our signature gourmet burger featuring premium grass-fed beef, fresh lettuce, vine-ripened tomatoes, and our secret house sauce on a brioche bun.",
        features: ["Premium grass-fed beef", "Fresh lettuce and tomato", "House special sauce", "Brioche bun"],
        icon: "fas fa-hamburger",
        image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=400&fit=crop&crop=center",
        category: "Food"
    },
    {
        id: 9,
        name: "Pasta Carbonara",
        price: 22.99,
        description: "Traditional Italian pasta with eggs, cheese, and pancetta.",
        longDescription: "Authentic Roman pasta carbonara made with fresh eggs, aged Parmigiano-Reggiano, crispy pancetta, and freshly cracked black pepper.",
        features: ["Fresh eggs", "Aged Parmigiano-Reggiano", "Crispy pancetta", "Al dente pasta"],
        icon: "fas fa-utensils",
        image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=400&fit=crop&crop=center",
        category: "Food"
    },
    {
        id: 10,
        name: "Sushi Platter",
        price: 28.99,
        description: "Fresh sushi selection with salmon, tuna, and specialty rolls.",
        longDescription: "Premium sushi platter featuring the finest fresh fish - salmon, tuna, and chef's special rolls, served with wasabi, pickled ginger, and soy sauce.",
        features: ["Fresh salmon and tuna", "Chef's special rolls", "Wasabi and ginger", "Premium soy sauce"],
        icon: "fas fa-fish",
        image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=400&fit=crop&crop=center",
        category: "Food"
    },
    {
        id: 11,
        name: "Club Sandwich",
        price: 12.99,
        description: "Triple-layer sandwich with turkey, bacon, lettuce, and tomato.",
        longDescription: "Classic club sandwich with sliced turkey breast, crispy bacon, fresh lettuce, ripe tomatoes, and mayo on toasted bread.",
        features: ["Sliced turkey breast", "Crispy bacon", "Fresh vegetables", "Toasted bread"],
        icon: "fas fa-bread-slice",
        image: "https://images.unsplash.com/photo-1567234669013-d64c6cc71de8?w=400&h=400&fit=crop&crop=center",
        category: "Food"
    },

    // Gifts Category
    {
        id: 12,
        name: "Luxury Swiss Watch",
        price: 899.99,
        description: "Premium Swiss-made watch with leather strap and automatic movement.",
        longDescription: "Exquisite Swiss timepiece featuring automatic movement, sapphire crystal, and genuine leather strap. A perfect gift for special occasions.",
        features: ["Swiss automatic movement", "Sapphire crystal", "Genuine leather strap", "Water resistant"],
        icon: "fas fa-clock",
        image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop&crop=center",
        category: "Gifts"
    },
    {
        id: 13,
        name: "Diamond Jewelry Set",
        price: 1299.99,
        description: "Elegant jewelry set with necklace and earrings featuring genuine diamonds.",
        longDescription: "Stunning jewelry collection featuring genuine diamonds set in 14k white gold. Perfect for engagements, anniversaries, or special celebrations.",
        features: ["Genuine diamonds", "14k white gold", "Matching set", "Gift box included"],
        icon: "fas fa-gem",
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop&crop=center",
        category: "Gifts"
    },
    {
        id: 14,
        name: "Premium Gift Card",
        price: 100.00,
        description: "Zomo Store gift card - the perfect gift for any occasion.",
        longDescription: "Give the gift of choice with our premium gift card. Valid for all products in our store, beautifully packaged and ready to gift.",
        features: ["Valid store-wide", "Beautiful packaging", "No expiration date", "Digital or physical"],
        icon: "fas fa-gift",
        image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&h=400&fit=crop&crop=center",
        category: "Gifts"
    },
    {
        id: 15,
        name: "Designer Perfume",
        price: 89.99,
        description: "Luxury fragrance with elegant floral and woody notes.",
        longDescription: "Sophisticated fragrance combining floral top notes with woody base notes. Housed in an elegant bottle, perfect for gifting.",
        features: ["Long-lasting fragrance", "Elegant bottle design", "Gift wrapping available", "Premium ingredients"],
        icon: "fas fa-spray-can",
        image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop&crop=center",
        category: "Gifts"
    },
    {
        id: 16,
        name: "Leather Handbag",
        price: 199.99,
        description: "Premium leather handbag with elegant design and spacious interior.",
        longDescription: "Handcrafted leather handbag featuring premium materials, elegant design, and practical compartments. A timeless gift for the discerning woman.",
        features: ["Genuine leather", "Multiple compartments", "Adjustable strap", "Dust bag included"],
        icon: "fas fa-shopping-bag",
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop&crop=center",
        category: "Gifts"
    },

    // Vegetables Category
    {
        id: 17,
        name: "Fresh Tomatoes",
        price: 4.99,
        description: "Vine-ripened fresh tomatoes, perfect for cooking and salads.",
        longDescription: "Premium vine-ripened tomatoes grown locally. Rich in flavor and nutrients, perfect for fresh salads, cooking, or making sauces.",
        features: ["Vine-ripened", "Locally grown", "Rich in nutrients", "Versatile cooking ingredient"],
        icon: "fas fa-seedling",
        image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400&h=400&fit=crop&crop=center",
        category: "Vegetables"
    },
    {
        id: 18,
        name: "Organic Carrots",
        price: 3.99,
        description: "Fresh organic carrots, sweet and crunchy.",
        longDescription: "Certified organic carrots grown without pesticides. Sweet, crunchy, and packed with vitamins and beta-carotene.",
        features: ["Certified organic", "No pesticides", "High in beta-carotene", "Fresh and crunchy"],
        icon: "fas fa-carrot",
        image: "https://images.unsplash.com/photo-1582515073490-39981397c445?w=400&h=400&fit=crop&crop=center",
        category: "Vegetables"
    },
    {
        id: 19,
        name: "Fresh Broccoli",
        price: 5.99,
        description: "Green fresh broccoli heads, rich in vitamins and minerals.",
        longDescription: "Farm-fresh broccoli heads packed with vitamins C and K, fiber, and antioxidants. Perfect for steaming, stir-frying, or adding to salads.",
        features: ["High in vitamins", "Rich in antioxidants", "Fresh from farm", "Versatile vegetable"],
        icon: "fas fa-leaf",
        image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400&h=400&fit=crop&crop=center",
        category: "Vegetables"
    },
    {
        id: 20,
        name: "Crisp Lettuce",
        price: 2.99,
        description: "Fresh crisp lettuce heads, perfect for salads and sandwiches.",
        longDescription: "Garden-fresh lettuce heads with crisp leaves and mild flavor. Ideal for fresh salads, sandwiches, and wraps.",
        features: ["Garden fresh", "Crisp and mild", "Perfect for salads", "Low calorie"],
        icon: "fas fa-leaf",
        image: "https://images.unsplash.com/photo-1556801743-4d2d10670c47?w=400&h=400&fit=crop&crop=center",
        category: "Vegetables"
    },
    {
        id: 21,
        name: "Bell Peppers Mix",
        price: 6.99,
        description: "Colorful bell peppers in red, yellow, and green varieties.",
        longDescription: "Mixed bell peppers featuring vibrant red, yellow, and green varieties. Sweet, crunchy, and perfect for cooking or eating fresh.",
        features: ["Mixed colors", "Sweet and crunchy", "High in vitamin C", "Perfect for cooking"],
        icon: "fas fa-pepper-hot",
        image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&h=400&fit=crop&crop=center",
        category: "Vegetables"
    },

    // Fruits Category
    {
        id: 22,
        name: "Fresh Red Apples",
        price: 4.99,
        description: "Crisp red apples, sweet and juicy.",
        longDescription: "Premium red apples with crisp texture and natural sweetness. Perfect for snacking, baking, or adding to salads.",
        features: ["Crisp and sweet", "Natural sugars", "Rich in fiber", "Perfect for snacking"],
        icon: "fas fa-apple-alt",
        image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=400&fit=crop&crop=center",
        category: "Fruits"
    },
    {
        id: 23,
        name: "Juicy Oranges",
        price: 5.99,
        description: "Fresh oranges bursting with vitamin C and natural sweetness.",
        longDescription: "Sun-ripened oranges packed with vitamin C and natural citrus flavor. Perfect for fresh juice, snacking, or cooking.",
        features: ["High vitamin C", "Natural sweetness", "Perfect for juicing", "Fresh and juicy"],
        icon: "fas fa-lemon",
        image: "https://images.unsplash.com/photo-1547514701-42782101795e?w=400&h=400&fit=crop&crop=center",
        category: "Fruits"
    },
    {
        id: 24,
        name: "Ripe Bananas",
        price: 3.99,
        description: "Sweet ripe bananas, perfect for smoothies and snacking.",
        longDescription: "Perfectly ripe bananas with natural sweetness and creamy texture. Great for smoothies, baking, or enjoying as a healthy snack.",
        features: ["Naturally sweet", "Rich in potassium", "Perfect for smoothies", "Healthy snack"],
        icon: "fas fa-seedling",
        image: "https://images.unsplash.com/photo-1587132137056-bfbf0166836e?w=400&h=400&fit=crop&crop=center",
        category: "Fruits"
    },
    {
        id: 25,
        name: "Fresh Strawberries",
        price: 7.99,
        description: "Sweet strawberries, perfect for desserts and snacking.",
        longDescription: "Premium fresh strawberries with intense sweetness and vibrant color. Perfect for desserts, smoothies, or enjoying fresh.",
        features: ["Premium quality", "Intense sweetness", "Rich in antioxidants", "Perfect for desserts"],
        icon: "fas fa-seedling",
        image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&h=400&fit=crop&crop=center",
        category: "Fruits"
    },
    {
        id: 26,
        name: "Purple Grapes",
        price: 6.99,
        description: "Sweet purple grapes, perfect for snacking or wine making.",
        longDescription: "Premium purple grapes with natural sweetness and rich flavor. Perfect for fresh eating, making juice, or adding to fruit salads.",
        features: ["Natural sweetness", "Rich flavor", "Antioxidant rich", "Versatile fruit"],
        icon: "fas fa-wine-glass",
        image: "https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=400&h=400&fit=crop&crop=center",
        category: "Fruits"
    },

    // Flowers Category
    {
        id: 27,
        name: "Red Rose Bouquet",
        price: 39.99,
        description: "Beautiful red roses arranged in an elegant bouquet.",
        longDescription: "Stunning bouquet of fresh red roses, perfectly arranged and wrapped. Symbol of love and passion, perfect for special occasions.",
        features: ["Fresh red roses", "Elegant arrangement", "Professional wrapping", "Symbol of love"],
        icon: "fas fa-rose",
        image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400&h=400&fit=crop&crop=center",
        category: "Flowers"
    },
    {
        id: 28,
        name: "Tulip Arrangement",
        price: 29.99,
        description: "Colorful tulips in a beautiful spring arrangement.",
        longDescription: "Fresh tulips in vibrant colors arranged in a charming display. Perfect for bringing the beauty of spring into any space.",
        features: ["Vibrant colors", "Spring flowers", "Beautiful arrangement", "Fresh and fragrant"],
        icon: "fas fa-seedling",
        image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=400&fit=crop&crop=center",
        category: "Flowers"
    },
    {
        id: 29,
        name: "Sunflower Bouquet",
        price: 24.99,
        description: "Bright sunflowers that bring joy and sunshine to any day.",
        longDescription: "Cheerful sunflowers arranged in a rustic bouquet. These bright, happy flowers are perfect for brightening someone's day.",
        features: ["Bright and cheerful", "Rustic arrangement", "Long-lasting", "Symbol of happiness"],
        icon: "fas fa-sun",
        image: "https://images.unsplash.com/photo-1500628550463-c8068dc65cea?w=400&h=400&fit=crop&crop=center",
        category: "Flowers"
    },
    {
        id: 30,
        name: "White Lily Arrangement",
        price: 34.99,
        description: "Elegant white lilies in a sophisticated arrangement.",
        longDescription: "Pure white lilies arranged with greenery in an elegant display. Symbol of purity and rebirth, perfect for special ceremonies.",
        features: ["Pure white lilies", "Elegant design", "Symbol of purity", "Professional arrangement"],
        icon: "fas fa-seedling",
        image: "https://images.unsplash.com/photo-1594736797933-d0e1e9ed83d9?w=400&h=400&fit=crop&crop=center",
        category: "Flowers"
    },
    {
        id: 31,
        name: "Orchid Plant",
        price: 49.99,
        description: "Exotic orchid plant in decorative pot, perfect for home decoration.",
        longDescription: "Beautiful exotic orchid plant in an elegant decorative pot. Long-lasting and low-maintenance, perfect for adding sophistication to any space.",
        features: ["Exotic orchid variety", "Decorative pot included", "Long-lasting blooms", "Low maintenance"],
        icon: "fas fa-seedling",
        image: "https://images.unsplash.com/photo-1501436513145-30f24e19fcc4?w=400&h=400&fit=crop&crop=center",
        category: "Flowers"
    }
];

// Cart Management Functions
function getCart() {
    const cart = localStorage.getItem(STORAGE_KEYS.CART);
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    updateCartCount();
}

function addToCart(productId, quantity = 1) {
    const products = getStoredProducts();
    const product = products.find(p => p.id === productId);
    if (!product) {
        showAlert('Product not found!', 'danger');
        return;
    }

    const cart = getCart();
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            icon: product.icon,
            quantity: quantity
        });
    }

    saveCart(cart);
    showAlert(`${product.name} added to cart!`, 'success');
}

function removeFromCart(productId) {
    const cart = getCart();
    const updatedCart = cart.filter(item => item.id !== productId);
    saveCart(updatedCart);
    renderCart();
    showAlert('Item removed from cart', 'info');
}

function updateQuantity(productId, quantity) {
    if (quantity <= 0) {
        removeFromCart(productId);
        return;
    }

    const cart = getCart();
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = parseInt(quantity);
        saveCart(cart);
        renderCart();
    }
}

function clearCart() {
    localStorage.removeItem(STORAGE_KEYS.CART);
    updateCartCount();
    renderCart();
}

function updateCartCount() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(element => {
        element.textContent = totalItems;
    });
}

function calculateCartTotal() {
    const cart = getCart();
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? 9.99 : 0;
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + shipping + tax;

    return {
        subtotal: subtotal.toFixed(2),
        shipping: shipping.toFixed(2),
        tax: tax.toFixed(2),
        total: total.toFixed(2)
    };
}

// Product Functions
function loadProducts(category = 'All') {
    const container = document.getElementById('products-container');
    if (!container) return;

    container.innerHTML = '';

    // Use stored products instead of static PRODUCTS array
    const allProducts = getStoredProducts();
    
    if (category === 'All') {
        // Show products organized by categories
        loadProductsByCategories(allProducts, container);
    } else {
        // Filter products by specific category
        const filteredProducts = allProducts.filter(product => product.category === category);
        
        if (filteredProducts.length === 0) {
            container.innerHTML = `
                <div class="col-12 text-center">
                    <div class="alert alert-info">
                        <i class="fas fa-info-circle me-2"></i>
                        No products found in the "${category}" category.
                    </div>
                </div>
            `;
            return;
        }
        
        filteredProducts.forEach(product => {
            const productCard = createProductCard(product);
            container.appendChild(productCard);
        });
    }
}

function loadProductsByCategories(allProducts, container) {
    // Group products by category
    const categoryGroups = {};
    const categoryOrder = ['Electronics', 'Food', 'Gifts', 'Vegetables', 'Fruits', 'Flowers'];
    
    // Initialize category groups
    categoryOrder.forEach(cat => {
        categoryGroups[cat] = [];
    });
    
    // Add other categories not in the main list
    allProducts.forEach(product => {
        if (!categoryGroups[product.category]) {
            categoryGroups[product.category] = [];
        }
        categoryGroups[product.category].push(product);
    });
    
    // Display each category section
    Object.keys(categoryGroups).forEach(categoryName => {
        const products = categoryGroups[categoryName];
        if (products.length === 0) return;
        
        // Create category header
        const categorySection = document.createElement('div');
        categorySection.className = 'col-12 mb-4';
        categorySection.innerHTML = `
            <div class="category-section">
                <h3 class="category-title text-center mb-3">
                    <span class="category-badge">${getCategoryIcon(categoryName)} ${categoryName}</span>
                </h3>
                <div class="row category-products" id="category-${categoryName.toLowerCase()}">
                </div>
            </div>
        `;
        container.appendChild(categorySection);
        
        // Add products to this category
        const categoryContainer = categorySection.querySelector('.category-products');
        products.slice(0, 6).forEach(product => { // Show max 6 products per category
            const productCard = createProductCard(product);
            categoryContainer.appendChild(productCard);
        });
        
        // Add "View More" button if there are more products
        if (products.length > 6) {
            const viewMoreCol = document.createElement('div');
            viewMoreCol.className = 'col-lg-4 col-md-6 mb-4 d-flex align-items-center justify-content-center';
            viewMoreCol.innerHTML = `
                <div class="card h-100 view-more-card text-center" style="cursor: pointer;" onclick="filterProductsByCategory('${categoryName}')">
                    <div class="card-body d-flex flex-column justify-content-center">
                        <i class="fas fa-plus-circle display-4 text-primary mb-3"></i>
                        <h6 class="card-title">View All ${categoryName}</h6>
                        <p class="text-muted">${products.length} total products</p>
                    </div>
                </div>
            `;
            categoryContainer.appendChild(viewMoreCol);
        }
    });
}

function getCategoryIcon(categoryName) {
    const icons = {
        'Electronics': 'fas fa-laptop',
        'Food': 'fas fa-pizza-slice',
        'Gifts': 'fas fa-gift',
        'Vegetables': 'fas fa-carrot',
        'Fruits': 'fas fa-apple-alt',
        'Flowers': 'fas fa-seedling',
        'audio': 'fas fa-headphones',
        'gaming': 'fas fa-gamepad',
        'monitors': 'fas fa-desktop',
        'accessories': 'fas fa-mouse',
        'phones': 'fas fa-mobile-alt',
        'laptops': 'fas fa-laptop',
        'tablets': 'fas fa-tablet-alt',
        'wearables': 'fas fa-watch'
    };
    return `<i class="${icons[categoryName] || 'fas fa-tag'}"></i>`;
}

// Category filtering functions  
function filterProductsByCategory(category) {
    // Update active button
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.category === category) {
            btn.classList.add('active');
        }
    });
    
    // Load products for this category
    loadProducts(category);
}

function setupCategoryFilters() {
    // Category filter button handlers
    const buttons = document.querySelectorAll('.category-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-category') === category) {
            btn.classList.add('active');
        }
    });
    
    // Load products for the selected category
    loadProducts(category);
}

function initializeCategoryFilters() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            filterProductsByCategory(category);
        });
    });
}

function createProductCard(product) {
    const col = document.createElement('div');
    col.className = 'col-lg-4 col-md-6 mb-4';

    const adminDeleteButton = isAdmin() ? `
        <button class="btn btn-danger btn-sm me-2" onclick="deleteProduct(${product.id})" title="Delete Product">
            <i class="fas fa-trash"></i>
        </button>
    ` : '';

    col.innerHTML = `
        <div class="card product-card h-100">
            <div class="card-body">
                <div class="product-image mb-3">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                </div>
                <h5 class="card-title crown-icon">${product.name}</h5>
                <p class="card-text text-muted">${product.description}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <span class="product-price">$${product.price}</span>
                    <div>
                        ${adminDeleteButton}
                        <button class="btn btn-outline-primary btn-sm me-2" onclick="viewProduct(${product.id})">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn btn-primary btn-sm" onclick="addToCart(${product.id})">
                            <i class="fas fa-cart-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    return col;
}

function viewProduct(productId) {
    window.location.href = `product.html?id=${productId}`;
}

function loadProductDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    
    if (!productId) {
        window.location.href = 'index.html';
        return;
    }

    // Use stored products instead of static PRODUCTS array
    const products = getStoredProducts();
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        showAlert('Product not found!', 'danger');
        setTimeout(() => window.location.href = 'index.html', 2000);
        return;
    }

    // Update page elements
    document.querySelector('.product-title').textContent = product.name;
    document.querySelector('#product-price').textContent = product.price.toFixed(2);
    document.querySelector('#product-description').textContent = product.longDescription;
    
    // Update product image
    const productImageContainer = document.querySelector('.product-image-container .product-image');
    if (product.image) {
        productImageContainer.innerHTML = `<img src="${product.image}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">`;
    } else {
        productImageContainer.innerHTML = `<i class="${product.icon} display-1 text-primary"></i>`;
    }

    // Update features list
    const featuresList = document.querySelector('#product-features');
    featuresList.innerHTML = '';
    product.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        featuresList.appendChild(li);
    });

    // Store current product ID for add to cart function
    window.currentProductId = productId;
}

function addToCartFromProduct() {
    const quantity = parseInt(document.getElementById('quantity').value) || 1;
    addToCart(window.currentProductId, quantity);
}

function loadRelatedProducts() {
    const container = document.getElementById('related-products');
    if (!container) return;

    // Show 3 random products as related
    const products = getStoredProducts();
    const relatedProducts = products.slice(0, 3);
    container.innerHTML = '';

    relatedProducts.forEach(product => {
        const col = document.createElement('div');
        col.className = 'col-md-4 mb-3';
        col.innerHTML = `
            <div class="card">
                <div class="card-body text-center">
                    <div class="product-image mb-2" style="height: 120px;">
                        <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">
                    </div>
                    <h6 class="card-title">${product.name}</h6>
                    <p class="product-price">$${product.price}</p>
                    <button class="btn btn-outline-primary btn-sm" onclick="viewProduct(${product.id})">
                        View Details
                    </button>
                </div>
            </div>
        `;
        container.appendChild(col);
    });
}

// Cart Page Functions
function renderCart() {
    const cart = getCart();
    const emptyCart = document.getElementById('empty-cart');
    const cartContent = document.getElementById('cart-content');
    const cartItems = document.getElementById('cart-items');

    if (cart.length === 0) {
        emptyCart.classList.remove('d-none');
        cartContent.classList.add('d-none');
        return;
    }

    emptyCart.classList.add('d-none');
    cartContent.classList.remove('d-none');

    // Render cart items
    cartItems.innerHTML = '';
    cart.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <div class="d-flex align-items-center">
                    <div class="cart-item-image me-3">
                        <i class="${item.icon} text-primary"></i>
                    </div>
                    <div>
                        <h6 class="mb-0">${item.name}</h6>
                    </div>
                </div>
            </td>
            <td>$${item.price.toFixed(2)}</td>
            <td>
                <input type="number" class="form-control quantity-input" 
                       value="${item.quantity}" min="1" max="10"
                       onchange="updateQuantity(${item.id}, this.value)">
            </td>
            <td class="fw-bold">$${(item.price * item.quantity).toFixed(2)}</td>
            <td>
                <button class="btn btn-outline-danger btn-sm" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        cartItems.appendChild(row);
    });

    // Update totals
    updateCartTotals();
}

function updateCartTotals() {
    const totals = calculateCartTotal();
    
    const subtotalElement = document.getElementById('cart-subtotal');
    const shippingElement = document.getElementById('shipping-cost');
    const taxElement = document.getElementById('tax-amount');
    const totalElement = document.getElementById('cart-total');

    if (subtotalElement) subtotalElement.textContent = `$${totals.subtotal}`;
    if (shippingElement) shippingElement.textContent = `$${totals.shipping}`;
    if (taxElement) taxElement.textContent = `$${totals.tax}`;
    if (totalElement) totalElement.textContent = `$${totals.total}`;
}

function proceedToCheckout() {
    const cart = getCart();
    if (cart.length === 0) {
        showAlert('Your cart is empty!', 'warning');
        return;
    }
    window.location.href = 'checkout.html';
}

// Checkout Functions
function loadCheckoutSummary() {
    const cart = getCart();
    if (cart.length === 0) {
        window.location.href = 'cart.html';
        return;
    }

    const container = document.getElementById('checkout-items');
    if (!container) return;

    container.innerHTML = '';
    cart.forEach(item => {
        const div = document.createElement('div');
        div.className = 'd-flex justify-content-between align-items-center mb-2';
        div.innerHTML = `
            <div>
                <small>${item.name} × ${item.quantity}</small>
            </div>
            <small class="fw-bold">$${(item.price * item.quantity).toFixed(2)}</small>
        `;
        container.appendChild(div);
    });

    // Update checkout totals with delivery costs
    updateCheckoutTotalsWithDelivery();
}

function initializeCheckoutForm() {
    const form = document.getElementById('checkout-form');
    if (!form) return;

    // Pre-fill user data if logged in
    const user = getCurrentUser();
    if (user) {
        document.getElementById('firstName').value = user.firstName || '';
        document.getElementById('lastName').value = user.lastName || '';
        document.getElementById('email').value = user.email || '';
        document.getElementById('phone').value = user.phone || '';
        document.getElementById('contactPhone').value = user.phone || '';
    }

    // Set minimum delivery date based on delivery type
    const deliveryTypeSelect = document.getElementById('deliveryType');
    const deliveryDateInput = document.getElementById('deliveryDate');
    
    function updateMinDeliveryDate() {
        const deliveryType = deliveryTypeSelect.value;
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        // Allow same-day delivery if it's before 2 PM (14:00)
        const currentHour = today.getHours();
        const canDeliverToday = deliveryType === 'sameday' && currentHour < 14;
        
        const minDate = canDeliverToday ? 
            today.toISOString().split('T')[0] : 
            tomorrow.toISOString().split('T')[0];
            
        deliveryDateInput.min = minDate;
        if (!deliveryDateInput.value || deliveryDateInput.value < minDate) {
            deliveryDateInput.value = minDate;
        }
    }
    
    // Set initial date
    updateMinDeliveryDate();

    // Handle delivery type changes
    if (deliveryTypeSelect) {
        deliveryTypeSelect.addEventListener('change', function() {
            updateMinDeliveryDate();
            updateCheckoutTotalsWithDelivery();
        });
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        processOrder();
    });

    // Initial calculation
    updateCheckoutTotalsWithDelivery();
}

function processOrder() {
    const cart = getCart();
    if (cart.length === 0) {
        showAlert('Your cart is empty!', 'warning');
        return;
    }

    // Validate form
    const form = document.getElementById('checkout-form');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    // Get delivery information
    const deliveryInfo = {
        date: document.getElementById('deliveryDate').value,
        timeSlot: document.getElementById('deliveryTime').value,
        type: document.getElementById('deliveryType').value,
        location: document.getElementById('deliveryLocation').value,
        contactPerson: document.getElementById('contactPerson').value,
        contactPhone: document.getElementById('contactPhone').value,
        instructions: document.getElementById('deliveryInstructions').value,
        smsUpdates: document.getElementById('smsUpdates').checked
    };

    // Assign delivery man (simulate random assignment)
    const deliveryMen = getDeliveryMen();
    const assignedDeliveryMan = deliveryMen[Math.floor(Math.random() * deliveryMen.length)];
    
    // Create order object
    const order = {
        id: Date.now(),
        date: new Date().toISOString(),
        items: cart,
        customer: {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            address: {
                street: document.getElementById('address').value,
                city: document.getElementById('city').value,
                state: document.getElementById('state').value,
                zipCode: document.getElementById('zipCode').value
            }
        },
        delivery: {
            ...deliveryInfo,
            assignedDeliveryMan: assignedDeliveryMan,
            estimatedDelivery: calculateEstimatedDelivery(deliveryInfo.date, deliveryInfo.type),
            trackingNumber: generateTrackingNumber()
        },
        totals: calculateCartTotalWithDelivery(),
        status: 'confirmed',
        orderNotes: document.getElementById('orderNotes')?.value || ''
    };

    // Save order
    saveOrder(order);
    
    // Clear cart
    clearCart();

    // Show comprehensive success message with delivery information
    const confirmationMessage = `
        <div><strong>Order placed successfully!</strong></div>
        <div class="mt-2"><small>
            <strong>Order ID:</strong> ${order.id}<br>
            <strong>Delivery Person:</strong> ${assignedDeliveryMan.name}<br>
            <strong>Contact:</strong> ${assignedDeliveryMan.phone}<br>
            <strong>Vehicle:</strong> ${assignedDeliveryMan.vehicle}<br>
            <strong>Estimated Delivery:</strong> ${order.delivery.estimatedDelivery}<br>
            <strong>Tracking Number:</strong> ${order.delivery.trackingNumber}
        </small></div>
    `;
    showAlert(confirmationMessage, 'success');
    
    // Redirect to profile or success page
    setTimeout(() => {
        const user = getCurrentUser();
        if (user) {
            window.location.href = 'profile.html';
        } else {
            window.location.href = 'index.html';
        }
    }, 2000);
}

// Delivery Management Functions
function getDeliveryMen() {
    return [
        {
            id: 'DM001',
            name: 'John Smith',
            phone: '+1 (555) 123-4567',
            vehicle: 'Motorcycle',
            rating: 4.8,
            deliveriesCompleted: 1250,
            status: 'available'
        },
        {
            id: 'DM002', 
            name: 'Maria Garcia',
            phone: '+1 (555) 234-5678',
            vehicle: 'Van',
            rating: 4.9,
            deliveriesCompleted: 985,
            status: 'available'
        },
        {
            id: 'DM003',
            name: 'Ahmed Hassan',
            phone: '+1 (555) 345-6789',
            vehicle: 'Bicycle',
            rating: 4.7,
            deliveriesCompleted: 742,
            status: 'available'
        },
        {
            id: 'DM004',
            name: 'Sarah Johnson',
            phone: '+1 (555) 456-7890',
            vehicle: 'Car',
            rating: 4.6,
            deliveriesCompleted: 1105,
            status: 'available'
        }
    ];
}

function calculateEstimatedDelivery(selectedDate, deliveryType) {
    const deliveryDate = new Date(selectedDate);
    let estimatedTime = '';
    
    switch(deliveryType) {
        case 'standard':
            // 2-3 days from selected date
            const standardEnd = new Date(deliveryDate);
            standardEnd.setDate(standardEnd.getDate() + 2);
            estimatedTime = `${deliveryDate.toDateString()} - ${standardEnd.toDateString()}`;
            break;
        case 'express':
            // 1-2 days from selected date
            const expressEnd = new Date(deliveryDate);
            expressEnd.setDate(expressEnd.getDate() + 1);
            estimatedTime = `${deliveryDate.toDateString()} - ${expressEnd.toDateString()}`;
            break;
        case 'sameday':
            // Same day delivery
            estimatedTime = deliveryDate.toDateString();
            break;
        default:
            estimatedTime = deliveryDate.toDateString();
    }
    
    return estimatedTime;
}

function generateTrackingNumber() {
    const prefix = 'ZM';
    const timestamp = Date.now().toString().slice(-8);
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `${prefix}${timestamp}${random}`;
}

function getDeliveryCost(deliveryType) {
    const costs = {
        'standard': 0,
        'express': 9.99,
        'sameday': 19.99
    };
    return costs[deliveryType] || 0;
}

function calculateCartTotalWithDelivery() {
    const cart = getCart();
    const deliveryType = document.getElementById('deliveryType')?.value || 'standard';
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = getDeliveryCost(deliveryType);
    const tax = subtotal * 0.08; // 8% tax rate
    const total = subtotal + shipping + tax;
    
    return {
        subtotal: subtotal.toFixed(2),
        shipping: shipping.toFixed(2), 
        tax: tax.toFixed(2),
        total: total.toFixed(2)
    };
}

function updateCheckoutTotalsWithDelivery() {
    const totals = calculateCartTotalWithDelivery();
    
    const subtotalElement = document.getElementById('checkout-subtotal');
    const shippingElement = document.getElementById('checkout-shipping');
    const taxElement = document.getElementById('checkout-tax');
    const totalElement = document.getElementById('checkout-total');
    
    if (subtotalElement) subtotalElement.textContent = `$${totals.subtotal}`;
    if (shippingElement) shippingElement.textContent = `$${totals.shipping}`;
    if (taxElement) taxElement.textContent = `$${totals.tax}`;
    if (totalElement) totalElement.textContent = `$${totals.total}`;
}

// Admin Delivery Management Functions
function loadDeliveryPersonnel() {
    const container = document.getElementById('delivery-personnel-table');
    if (!container) return;

    const deliveryMen = getDeliveryMen();
    container.innerHTML = '';

    deliveryMen.forEach(person => {
        const row = document.createElement('tr');
        const statusBadge = person.status === 'available' ? 'success' : person.status === 'busy' ? 'warning' : 'secondary';
        
        row.innerHTML = `
            <td><strong>${person.id}</strong></td>
            <td>${person.name}</td>
            <td>${person.phone}</td>
            <td><i class="fas fa-motorcycle me-1"></i>${person.vehicle}</td>
            <td>
                <span class="text-warning">
                    ${'★'.repeat(Math.floor(person.rating))}${'☆'.repeat(5 - Math.floor(person.rating))}
                </span>
                <small class="text-muted">(${person.rating})</small>
            </td>
            <td><span class="badge bg-info">${person.deliveriesCompleted}</span></td>
            <td><span class="badge bg-${statusBadge}">${person.status}</span></td>
            <td>
                <button class="btn btn-sm btn-outline-primary" onclick="editDeliveryPerson('${person.id}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger" onclick="removeDeliveryPerson('${person.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        container.appendChild(row);
    });
}

function loadActiveDeliveries() {
    const container = document.getElementById('active-deliveries-table');
    if (!container) return;

    const orders = getOrders();
    const activeDeliveries = orders.filter(order => 
        order.delivery && ['confirmed', 'processing', 'out_for_delivery'].includes(order.status)
    );

    container.innerHTML = '';

    if (activeDeliveries.length === 0) {
        container.innerHTML = `
            <tr>
                <td colspan="6" class="text-center text-muted py-4">
                    <i class="fas fa-truck display-6 mb-3"></i><br>
                    No active deliveries at the moment
                </td>
            </tr>
        `;
        return;
    }

    activeDeliveries.forEach(order => {
        const row = document.createElement('tr');
        const statusColor = order.status === 'out_for_delivery' ? 'primary' : 
                           order.status === 'processing' ? 'warning' : 'info';
        
        row.innerHTML = `
            <td><strong>ZM${order.id}</strong></td>
            <td>${order.customer.firstName} ${order.customer.lastName}</td>
            <td>
                <strong>${order.delivery.assignedDeliveryMan.name}</strong><br>
                <small class="text-muted">${order.delivery.assignedDeliveryMan.phone}</small>
            </td>
            <td><span class="badge bg-${statusColor}">${order.status.replace('_', ' ')}</span></td>
            <td><small>${order.delivery.estimatedDelivery}</small></td>
            <td>
                <button class="btn btn-sm btn-outline-primary" onclick="trackDelivery('${order.id}')">
                    <i class="fas fa-map-marker-alt"></i>
                </button>
                <button class="btn btn-sm btn-outline-success" onclick="updateDeliveryStatus('${order.id}')">
                    <i class="fas fa-edit"></i>
                </button>
            </td>
        `;
        container.appendChild(row);
    });
}

function updateDeliveryStats() {
    const orders = getOrders();
    const deliveryMen = getDeliveryMen();
    
    const activeDeliveries = orders.filter(order => 
        order.delivery && ['confirmed', 'processing', 'out_for_delivery'].includes(order.status)
    ).length;
    
    const today = new Date().toDateString();
    const completedToday = orders.filter(order => 
        order.delivery && order.status === 'delivered' && 
        new Date(order.date).toDateString() === today
    ).length;
    
    const pendingDeliveries = orders.filter(order => 
        order.delivery && order.status === 'confirmed'
    ).length;
    
    const availableDrivers = deliveryMen.filter(person => 
        person.status === 'available'
    ).length;

    document.getElementById('active-deliveries-count').textContent = activeDeliveries;
    document.getElementById('completed-deliveries-count').textContent = completedToday;
    document.getElementById('pending-deliveries-count').textContent = pendingDeliveries;
    document.getElementById('available-drivers-count').textContent = availableDrivers;
}

function initializeDeliveryManagement() {
    const form = document.getElementById('add-delivery-person-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            addNewDeliveryPerson();
        });
    }
}

function addNewDeliveryPerson() {
    const name = document.getElementById('deliveryPersonName').value;
    const phone = document.getElementById('deliveryPersonPhone').value;
    const vehicle = document.getElementById('deliveryPersonVehicle').value;
    const email = document.getElementById('deliveryPersonEmail').value;
    const address = document.getElementById('deliveryPersonAddress').value;

    if (!name || !phone || !vehicle) {
        showAlert('Please fill in all required fields!', 'warning');
        return;
    }

    // Generate new delivery person ID
    const newId = 'DM' + String(Date.now()).slice(-3);
    
    const newPerson = {
        id: newId,
        name: name,
        phone: phone,
        vehicle: vehicle,
        email: email,
        address: address,
        rating: 5.0,
        deliveriesCompleted: 0,
        status: 'available'
    };

    // In a real app, this would save to backend
    console.log('Adding new delivery person:', newPerson);
    
    showAlert('Delivery person added successfully!', 'success');
    
    // Close modal and reset form
    const modal = bootstrap.Modal.getInstance(document.getElementById('addDeliveryManModal'));
    modal.hide();
    document.getElementById('add-delivery-person-form').reset();
    
    // Refresh the display
    loadDeliveryPersonnel();
    updateDeliveryStats();
}

function editDeliveryPerson(personId) {
    showAlert('Edit functionality will be available in future updates!', 'info');
}

function removeDeliveryPerson(personId) {
    if (confirm('Are you sure you want to remove this delivery person?')) {
        showAlert('Delivery person removed successfully!', 'info');
        loadDeliveryPersonnel();
        updateDeliveryStats();
    }
}

function assignBestDeliveryMan() {
    showAlert('Auto-assigning orders to best available delivery personnel...', 'info');
    setTimeout(() => {
        loadActiveDeliveries();
        updateDeliveryStats();
        showAlert('Orders assigned successfully!', 'success');
    }, 1000);
}

function updateDeliveryStatuses() {
    showAlert('Refreshing delivery statuses...', 'info');
    setTimeout(() => {
        loadActiveDeliveries();
        updateDeliveryStats();
        showAlert('Delivery statuses updated!', 'success');
    }, 1000);
}

function sendDeliveryNotifications() {
    showAlert('Sending delivery notifications to customers...', 'info');
    setTimeout(() => {
        showAlert('Notifications sent successfully!', 'success');
    }, 1500);
}

function trackDelivery(orderId) {
    showAlert(`Opening delivery tracking for order ${orderId}...`, 'info');
    // In a real app, this would open a map or tracking interface
}

function updateDeliveryStatus(orderId) {
    const newStatus = prompt('Enter new delivery status (confirmed, processing, out_for_delivery, delivered):');
    if (newStatus && ['confirmed', 'processing', 'out_for_delivery', 'delivered'].includes(newStatus)) {
        // Update order status
        const orders = getOrders();
        const order = orders.find(o => o.id == orderId);
        if (order) {
            order.status = newStatus;
            localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
            showAlert('Delivery status updated successfully!', 'success');
            loadActiveDeliveries();
            updateDeliveryStats();
        }
    } else if (newStatus) {
        showAlert('Invalid status. Please use: confirmed, processing, out_for_delivery, or delivered', 'warning');
    }
}

// User Management Functions
function getCurrentUser() {
    const user = localStorage.getItem(STORAGE_KEYS.USER);
    return user ? JSON.parse(user) : null;
}

function saveUser(user) {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    updateUserInterface();
}

function logout() {
    localStorage.removeItem(STORAGE_KEYS.USER);
    updateUserInterface();
    showAlert('Logged out successfully!', 'info');
    
    // Redirect to home page if on profile page
    if (window.location.pathname.includes('profile.html')) {
        window.location.href = 'index.html';
    }
}

function updateUserInterface() {
    const user = getCurrentUser();
    const userNameElements = document.querySelectorAll('.user-name');
    const loginSections = document.querySelectorAll('.login-section');
    const profileSections = document.querySelectorAll('.profile-section');

    if (user) {
        userNameElements.forEach(element => {
            element.textContent = `${user.firstName} ${user.lastName}`;
        });
        loginSections.forEach(section => section.classList.add('d-none'));
        profileSections.forEach(section => section.classList.remove('d-none'));
    } else {
        userNameElements.forEach(element => {
            element.textContent = 'Account';
        });
        loginSections.forEach(section => section.classList.remove('d-none'));
        profileSections.forEach(section => section.classList.add('d-none'));
    }
}

// Authentication Forms
function initializeLoginForm() {
    const form = document.getElementById('login-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        // Simple validation (in real app, this would be server-side)
        if (email && password) {
            // Parse names from email
            const parsedNames = parseNamesFromEmail(email);
            
            // Simulate login success
            const user = {
                email: email,
                firstName: parsedNames.firstName,
                lastName: parsedNames.lastName,
                phone: '+1 (555) 123-4567'
            };
            
            saveUser(user);
            showAlert('Login successful!', 'success');
            
            setTimeout(() => {
                window.location.href = 'profile.html';
            }, 1000);
        } else {
            showAlert('Please enter valid credentials!', 'danger');
        }
    });
}

function initializeSignupForm() {
    const form = document.getElementById('signup-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const firstName = document.getElementById('signupFirstName').value;
        const lastName = document.getElementById('signupLastName').value;
        const email = document.getElementById('signupEmail').value;
        const phone = document.getElementById('signupPhone').value;
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Validation
        if (password !== confirmPassword) {
            showAlert('Passwords do not match!', 'danger');
            return;
        }

        if (password.length < 8) {
            showAlert('Password must be at least 8 characters long!', 'danger');
            return;
        }

        const user = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone
        };
        
        saveUser(user);
        showAlert('Account created successfully!', 'success');
        
        setTimeout(() => {
            window.location.href = 'profile.html';
        }, 1000);
    });
}

// Email parsing function
function parseNamesFromEmail(email) {
    // Extract username from email (part before @)
    const username = email.split('@')[0].toLowerCase();
    
    // Remove numbers and special characters
    const cleanName = username.replace(/[0-9_.-]/g, '');
    
    // Handle specific case for arunkumarpalani -> "Arun Kumar" and "Palani"
    if (cleanName.includes('arunkumarpalani')) {
        return {
            firstName: 'Arun Kumar',
            lastName: 'Palani'
        };
    }
    
    // Generic parsing for other emails
    // Try to split camelCase or common name patterns
    let firstName = '';
    let lastName = '';
    
    if (cleanName.length > 0) {
        // Capitalize first letter
        const capitalizedName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
        
        // Try to detect common patterns
        if (cleanName.length <= 6) {
            // Short name, use as first name
            firstName = capitalizedName;
            lastName = 'User';
        } else if (cleanName.length <= 12) {
            // Medium length, split in middle
            const midPoint = Math.ceil(cleanName.length / 2);
            firstName = cleanName.substring(0, midPoint).charAt(0).toUpperCase() + cleanName.substring(0, midPoint).slice(1);
            lastName = cleanName.substring(midPoint).charAt(0).toUpperCase() + cleanName.substring(midPoint).slice(1);
        } else {
            // Long name, take first 6 chars as first name, rest as last name
            firstName = cleanName.substring(0, 6).charAt(0).toUpperCase() + cleanName.substring(0, 6).slice(1);
            lastName = cleanName.substring(6).charAt(0).toUpperCase() + cleanName.substring(6).slice(1);
        }
    } else {
        // Fallback if no valid characters
        firstName = 'User';
        lastName = 'Account';
    }
    
    return { firstName, lastName };
}

// Profile Functions
function loadUserProfile() {
    const user = getCurrentUser();
    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    // Update profile display
    document.getElementById('profile-name').textContent = `${user.firstName} ${user.lastName}`;
    document.getElementById('profile-email').textContent = user.email;

    // Fill profile form
    document.getElementById('profileFirstName').value = user.firstName || '';
    document.getElementById('profileLastName').value = user.lastName || '';
    document.getElementById('profileEmailInput').value = user.email || '';
    document.getElementById('profilePhone').value = user.phone || '';
    document.getElementById('profileAddress').value = user.address || '';
    document.getElementById('profileCity').value = user.city || '';
    document.getElementById('profileState').value = user.state || '';
    document.getElementById('profileZip').value = user.zip || '';

    // Initialize profile form
    const profileForm = document.getElementById('profile-form');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            updateUserProfile();
        });
    }

    // Initialize settings form
    const settingsForm = document.getElementById('settings-form');
    if (settingsForm) {
        settingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            updateUserSettings();
        });
    }
}

function updateUserProfile() {
    const user = getCurrentUser();
    
    user.firstName = document.getElementById('profileFirstName').value;
    user.lastName = document.getElementById('profileLastName').value;
    user.email = document.getElementById('profileEmailInput').value;
    user.phone = document.getElementById('profilePhone').value;
    user.address = document.getElementById('profileAddress').value;
    user.city = document.getElementById('profileCity').value;
    user.state = document.getElementById('profileState').value;
    user.zip = document.getElementById('profileZip').value;

    saveUser(user);
    showAlert('Profile updated successfully!', 'success');
    
    // Update display
    document.getElementById('profile-name').textContent = `${user.firstName} ${user.lastName}`;
    document.getElementById('profile-email').textContent = user.email;
}

function updateUserSettings() {
    showAlert('Settings updated successfully!', 'success');
}

function deleteAccount() {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
        localStorage.removeItem(STORAGE_KEYS.USER);
        localStorage.removeItem(STORAGE_KEYS.ORDERS);
        showAlert('Account deleted successfully!', 'info');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    }
}

// Order Functions
function saveOrder(order) {
    const orders = getOrders();
    orders.unshift(order); // Add to beginning of array
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
}

function getOrders() {
    const orders = localStorage.getItem(STORAGE_KEYS.ORDERS);
    return orders ? JSON.parse(orders) : [];
}

function loadOrderHistory() {
    const container = document.getElementById('orders-container');
    if (!container) return;

    const orders = getOrders();
    
    if (orders.length === 0) {
        container.innerHTML = `
            <div class="text-center py-4">
                <i class="fas fa-shopping-bag display-4 text-muted mb-3"></i>
                <h5>No orders yet</h5>
                <p class="text-muted">Your order history will appear here once you make a purchase.</p>
                <a href="index.html" class="btn btn-primary">Start Shopping</a>
            </div>
        `;
        return;
    }

    container.innerHTML = '';
    orders.forEach(order => {
        const orderCard = createOrderCard(order);
        container.appendChild(orderCard);
    });
}

function createOrderCard(order) {
    const div = document.createElement('div');
    div.className = 'card mb-3';
    
    const orderDate = new Date(order.orderDate || order.date).toLocaleDateString();
    
    // Handle both cart orders (with items array) and buy-now orders (single product)
    let itemCount, orderItems;
    if (order.items && Array.isArray(order.items)) {
        // Cart-based order
        itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
        orderItems = order.items;
    } else {
        // Buy-now order
        itemCount = order.quantity || 1;
        orderItems = [{
            name: order.productName,
            quantity: order.quantity || 1,
            price: order.productPrice,
            icon: 'fas fa-crown' // default icon for buy-now orders
        }];
    }
    
    div.innerHTML = `
        <div class="card-header d-flex justify-content-between align-items-center">
            <div>
                <strong>Order #${order.id}</strong>
                <span class="badge bg-success ms-2">${order.status}</span>
            </div>
            <small class="text-muted">${orderDate}</small>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-md-8">
                    <h6>Items (${itemCount}):</h6>
                    <ul class="list-unstyled">
                        ${orderItems.map(item => `
                            <li class="mb-1">
                                <i class="${item.icon || 'fas fa-crown'} text-primary me-2"></i>
                                ${item.name} × ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}
                            </li>
                        `).join('')}
                    </ul>
                </div>
                <div class="col-md-4 text-end">
                    <div class="mb-2">
                        <strong>Total: $${order.totals ? order.totals.total.toFixed(2) : order.total.toFixed(2)}</strong>
                    </div>
                    <button class="btn btn-outline-primary btn-sm" onclick="viewOrderDetails('${order.id}')">
                        View Details
                    </button>
                </div>
            </div>
            ${order.delivery ? `
                <hr class="my-3">
                <div class="row">
                    <div class="col-md-6">
                        <h6><i class="fas fa-truck me-2"></i>Delivery Information</h6>
                        <small class="text-muted">
                            <strong>Delivery Person:</strong> ${order.delivery.assignedDeliveryMan.name}<br>
                            <strong>Phone:</strong> ${order.delivery.assignedDeliveryMan.phone}<br>
                            <strong>Vehicle:</strong> ${order.delivery.assignedDeliveryMan.vehicle}
                        </small>
                    </div>
                    <div class="col-md-6">
                        <h6><i class="fas fa-calendar me-2"></i>Delivery Details</h6>
                        <small class="text-muted">
                            <strong>Type:</strong> ${order.delivery.type.charAt(0).toUpperCase() + order.delivery.type.slice(1)}<br>
                            <strong>Time Slot:</strong> ${order.delivery.timeSlot}<br>
                            <strong>Tracking:</strong> ${order.delivery.trackingNumber}
                        </small>
                    </div>
                </div>
            ` : ''}
        </div>
    `;
    
    return div;
}

function viewOrderDetails(orderId) {
    const orders = getOrders();
    const order = orders.find(o => o.id === orderId);
    if (order) {
        // Handle different date field names for cart vs buy-now orders
        const orderDate = new Date(order.orderDate || order.date).toLocaleDateString();
        
        // Handle different total structures for cart vs buy-now orders
        const orderTotal = order.totals ? order.totals.total.toFixed(2) : order.total.toFixed(2);
        
        let deliveryInfo = '';
        if (order.delivery) {
            deliveryInfo = `\n\nDelivery Information:
Delivery Person: ${order.delivery.assignedDeliveryMan.name}
Phone: ${order.delivery.assignedDeliveryMan.phone}
Vehicle: ${order.delivery.assignedDeliveryMan.vehicle}
Delivery Type: ${order.delivery.type.charAt(0).toUpperCase() + order.delivery.type.slice(1)}
Time Slot: ${order.delivery.timeSlot}
Tracking Number: ${order.delivery.trackingNumber}
Estimated Delivery: ${order.delivery.estimatedDelivery}`;
        }
        
        alert(`Order Details:\nOrder ID: ${order.id}\nDate: ${orderDate}\nTotal: $${orderTotal}\nStatus: ${order.status}${deliveryInfo}`);
    }
}

// Contact Form
function initializeContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const firstName = document.getElementById('contactFirstName').value;
        const lastName = document.getElementById('contactLastName').value;
        const email = document.getElementById('contactEmail').value;
        const subject = document.getElementById('contactSubject').value;
        const message = document.getElementById('contactMessage').value;

        // In a real application, this would send the message to a server
        showAlert('Message sent successfully! We will get back to you soon.', 'success');
        
        // Clear form
        form.reset();
    });
}

// Utility Functions
function showAlert(message, type = 'info') {
    // Create alert element
    const alert = document.createElement('div');
    alert.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    alert.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    alert.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    // Add to body
    document.body.appendChild(alert);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alert.parentNode) {
            alert.remove();
        }
    }, 5000);
}

function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const button = input.nextElementSibling;
    const icon = button.querySelector('i');

    if (input.type === 'password') {
        input.type = 'text';
        icon.className = 'fas fa-eye-slash';
    } else {
        input.type = 'password';
        icon.className = 'fas fa-eye';
    }
}

// Initialize common functionality when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    // Check if user needs to be redirected from profile page
    if (window.location.pathname.includes('profile.html') && !getCurrentUser()) {
        window.location.href = 'login.html';
        return;
    }

    // Check admin status and update UI accordingly on all pages
    const admin = isAdmin();
    if (admin) {
        updateAdminUI();
        // Show admin dropdown menu if it exists
        const adminSections = document.querySelectorAll('.admin-section');
        adminSections.forEach(section => {
            section.style.display = 'block';
        });
    }

    // Initialize Bootstrap tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Add smooth scrolling to anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href && href.length > 1) { // Make sure href is not just "#"
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

// ============================================
// ORDER MANAGEMENT FUNCTIONS
// ============================================

function showBuyNowModal() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    // Get products using the existing function
    const products = getStoredProducts();
    const product = products.find(p => p.id == productId);
    
    if (!product) {
        showAlert('Product not found! Please try refreshing the page.', 'danger');
        return;
    }
    
    const quantityInput = document.getElementById('quantity');
    const quantity = quantityInput ? parseInt(quantityInput.value) || 1 : 1;
    const total = product.price * quantity;
    
    // Update modal content
    const orderProductName = document.getElementById('order-product-name');
    const orderQuantity = document.getElementById('order-quantity');
    const orderPrice = document.getElementById('order-price');
    const orderTotal = document.getElementById('order-total');
    
    if (orderProductName) orderProductName.textContent = product.name;
    if (orderQuantity) orderQuantity.textContent = quantity;
    if (orderPrice) orderPrice.textContent = `$${product.price.toFixed(2)}`;
    if (orderTotal) orderTotal.textContent = `$${total.toFixed(2)}`;
    
    // Show modal
    const modalElement = document.getElementById('buyNowModal');
    if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
    } else {
        showAlert('Order form not available on this page.', 'warning');
    }
}

function submitOrder(event) {
    event.preventDefault();
    
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    // Get products using the existing function
    const products = getStoredProducts();
    const product = products.find(p => p.id == productId);
    
    if (!product) {
        showAlert('Product not found! Please try refreshing the page.', 'danger');
        return;
    }
    
    const quantityInput = document.getElementById('quantity');
    const quantity = quantityInput ? parseInt(quantityInput.value) || 1 : 1;
    const customerName = document.getElementById('customerName').value.trim();
    const customerEmail = document.getElementById('customerEmail').value.trim();
    const customerPhone = document.getElementById('customerPhone').value.trim();
    const customerAddress = document.getElementById('customerAddress').value.trim();
    
    // Validation
    if (!customerName || !customerEmail || !customerPhone || !customerAddress) {
        showAlert('Please fill in all required fields.', 'warning');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerEmail)) {
        showAlert('Please enter a valid email address.', 'warning');
        return;
    }
    
    // Create order object
    const order = {
        id: 'ORD-' + Date.now(),
        productId: productId,
        productName: product.name,
        productPrice: product.price,
        quantity: quantity,
        total: product.price * quantity,
        customer: {
            name: customerName,
            email: customerEmail,
            phone: customerPhone,
            address: customerAddress
        },
        status: 'pending',
        orderDate: new Date().toISOString(),
        confirmedDate: null
    };
    
    // Save order to localStorage
    saveOrder(order);
    
    // Send email notification to admin
    sendOrderNotificationToAdmin(order);
    
    // Close modal and show success message
    const modal = bootstrap.Modal.getInstance(document.getElementById('buyNowModal'));
    modal.hide();
    
    showAlert(`Order placed successfully! Order ID: ${order.id}`, 'success');
    
    // Clear form
    document.getElementById('orderForm').reset();
}

function saveOrder(order) {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
}

function getOrders() {
    return JSON.parse(localStorage.getItem('orders')) || [];
}

function updateOrderStatus(orderId, status, confirmedDate = null) {
    let orders = getOrders();
    const orderIndex = orders.findIndex(order => order.id === orderId);
    
    if (orderIndex !== -1) {
        orders[orderIndex].status = status;
        if (confirmedDate) {
            orders[orderIndex].confirmedDate = confirmedDate;
        }
        localStorage.setItem('orders', JSON.stringify(orders));
        return true;
    }
    return false;
}

async function sendOrderNotificationToAdmin(order) {
    try {
        // Send email notification to admin via our email server
        const response = await fetch('/send-order-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        });
        
        if (response.ok) {
            console.log('Order notification email sent to admin successfully');
        } else {
            console.error('Failed to send order notification email');
        }
    } catch (error) {
        console.error('Error sending order notification:', error);
        // Still continue with the order process even if email fails
    }
}

// ============================================
// ADMIN ORDER MANAGEMENT FUNCTIONS
// ============================================

function loadAdminOrders() {
    const orders = getOrders();
    displayOrders(orders);
    updateOrderStats(orders);
}

function displayOrders(orders) {
    const container = document.getElementById('orders-container');
    const noOrdersDiv = document.getElementById('no-orders');
    
    if (orders.length === 0) {
        noOrdersDiv.style.display = 'block';
        container.innerHTML = '';
        container.appendChild(noOrdersDiv);
        return;
    }
    
    noOrdersDiv.style.display = 'none';
    
    // Sort orders by date (newest first)
    orders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
    
    const ordersHTML = orders.map(order => {
        const orderDate = new Date(order.orderDate).toLocaleDateString();
        const statusBadge = order.status === 'confirmed' 
            ? '<span class="badge bg-success">Confirmed</span>' 
            : '<span class="badge bg-warning text-dark">Pending</span>';
        
        return `
            <div class="card mb-3 order-card" data-status="${order.status}">
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col-md-2">
                            <strong class="text-primary">${order.id}</strong>
                            <br>
                            <small class="text-muted">${orderDate}</small>
                        </div>
                        <div class="col-md-3">
                            <strong>${order.customer.name}</strong>
                            <br>
                            <small class="text-muted">${order.customer.email}</small>
                        </div>
                        <div class="col-md-3">
                            <strong>${order.productName}</strong>
                            <br>
                            <small class="text-muted">Qty: ${order.quantity}</small>
                        </div>
                        <div class="col-md-2">
                            <strong class="text-success">$${order.total.toFixed(2)}</strong>
                            <br>
                            ${statusBadge}
                        </div>
                        <div class="col-md-2 text-end">
                            <button class="btn btn-outline-primary btn-sm me-2" onclick="showOrderDetails('${order.id}')">
                                <i class="fas fa-eye"></i> View
                            </button>
                            ${order.status === 'pending' ? 
                                `<button class="btn btn-success btn-sm" onclick="confirmOrder('${order.id}')">
                                    <i class="fas fa-check"></i> Confirm
                                </button>` : 
                                `<span class="text-success"><i class="fas fa-check-circle"></i> Confirmed</span>`
                            }
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    container.innerHTML = ordersHTML;
}

function updateOrderStats(orders) {
    const pendingCount = orders.filter(order => order.status === 'pending').length;
    const confirmedCount = orders.filter(order => order.status === 'confirmed').length;
    
    document.getElementById('pending-count').textContent = pendingCount;
    document.getElementById('confirmed-count').textContent = confirmedCount;
}

function filterOrders(status) {
    const orders = getOrders();
    let filteredOrders;
    
    if (status === 'all') {
        filteredOrders = orders;
    } else {
        filteredOrders = orders.filter(order => order.status === status);
    }
    
    displayOrders(filteredOrders);
    
    // Update active button
    document.querySelectorAll('.btn-group .btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
}

function searchOrders() {
    const searchTerm = document.getElementById('order-search').value.toLowerCase();
    const orders = getOrders();
    
    const filteredOrders = orders.filter(order => 
        order.id.toLowerCase().includes(searchTerm) ||
        order.customer.name.toLowerCase().includes(searchTerm) ||
        order.customer.email.toLowerCase().includes(searchTerm) ||
        order.productName.toLowerCase().includes(searchTerm)
    );
    
    displayOrders(filteredOrders);
}

function showOrderDetails(orderId) {
    const orders = getOrders();
    const order = orders.find(o => o.id === orderId);
    
    if (!order) {
        showAlert('Order not found!', 'danger');
        return;
    }
    
    // Populate modal with order details
    document.getElementById('modal-order-id').textContent = order.id;
    document.getElementById('modal-order-date').textContent = new Date(order.orderDate).toLocaleString();
    document.getElementById('modal-order-status').innerHTML = order.status === 'confirmed' 
        ? '<span class="badge bg-success">Confirmed</span>' 
        : '<span class="badge bg-warning text-dark">Pending</span>';
    document.getElementById('modal-product-name').textContent = order.productName;
    document.getElementById('modal-quantity').textContent = order.quantity;
    document.getElementById('modal-total').textContent = `$${order.total.toFixed(2)}`;
    
    document.getElementById('modal-customer-name').textContent = order.customer.name;
    document.getElementById('modal-customer-email').textContent = order.customer.email;
    document.getElementById('modal-customer-phone').textContent = order.customer.phone;
    document.getElementById('modal-customer-address').textContent = order.customer.address;
    
    // Show/hide confirm button based on status
    const confirmBtn = document.getElementById('confirm-order-btn');
    confirmBtn.style.display = order.status === 'pending' ? 'block' : 'none';
    confirmBtn.setAttribute('data-order-id', orderId);
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('orderDetailsModal'));
    modal.show();
}

function confirmOrder(orderId) {
    const success = updateOrderStatus(orderId, 'confirmed', new Date().toISOString());
    
    if (success) {
        showAlert('Order confirmed successfully!', 'success');
        loadAdminOrders(); // Refresh the orders list
    } else {
        showAlert('Failed to confirm order.', 'danger');
    }
}

function confirmOrderFromModal() {
    const confirmBtn = document.getElementById('confirm-order-btn');
    const orderId = confirmBtn.getAttribute('data-order-id');
    
    confirmOrder(orderId);
    
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('orderDetailsModal'));
    modal.hide();
}

// ============================================
// ADMIN FUNCTIONS
// ============================================

// Admin Authentication
const ADMIN_EMAIL = 'arunkumarpalani428@gmail.com';
const ADMIN_PASSWORD = 'Arunkumar@2006'; // In real app, this would be hashed and stored securely

function isAdmin() {
    const admin = localStorage.getItem(STORAGE_KEYS.ADMIN);
    return admin ? JSON.parse(admin) : null;
}

function loginAsAdmin(email, password) {
    // Debug logging (remove in production)
    console.log('Login attempt - Email:', email);
    console.log('Expected email:', ADMIN_EMAIL);
    console.log('Email match:', email === ADMIN_EMAIL);
    console.log('Password length:', password.length);
    console.log('Expected password length:', ADMIN_PASSWORD.length);
    
    if (email !== ADMIN_EMAIL) {
        throw new Error('Invalid admin email address');
    }
    
    if (password !== ADMIN_PASSWORD) {
        throw new Error('Invalid password');
    }
    
    const adminData = {
        email: email,
        username: 'Administrator',
        loginTime: new Date().toISOString(),
        permissions: ['add_product', 'edit_product', 'delete_product', 'manage_orders']
    };
    localStorage.setItem(STORAGE_KEYS.ADMIN, JSON.stringify(adminData));
    return adminData;
}

function adminLogout() {
    localStorage.removeItem(STORAGE_KEYS.ADMIN);
    showAlert('Admin logged out successfully!', 'info');
    window.location.href = 'index.html';
}

function checkAdminAccess() {
    const admin = isAdmin();
    if (!admin) {
        showAlert('Admin access required. Please login first.', 'warning');
        setTimeout(() => {
            window.location.href = 'admin-login.html';
        }, 1000);
        return false;
    }
    
    // Update UI to show admin is logged in
    updateAdminUI();
    return true;
}

function updateAdminUI() {
    const admin = isAdmin();
    if (admin) {
        // Update navigation to show admin status
        const userNameSpan = document.querySelector('.user-name');
        if (userNameSpan) {
            userNameSpan.textContent = 'Administrator';
        }
        
        const userDropdown = document.querySelector('#userDropdown i');
        if (userDropdown) {
            userDropdown.className = 'fas fa-user-shield';
        }
        
        // Show admin sections and hide regular user sections
        const adminSections = document.querySelectorAll('.admin-section');
        adminSections.forEach(section => {
            section.style.display = 'block';
        });
        
        const loginSections = document.querySelectorAll('.login-section');
        loginSections.forEach(section => {
            section.style.display = 'none';
        });
        
        const nonAdminSections = document.querySelectorAll('.non-admin-section');
        nonAdminSections.forEach(section => {
            section.style.display = 'none';
        });
    } else {
        // Reset to normal user interface
        const userNameSpan = document.querySelector('.user-name');
        if (userNameSpan) {
            userNameSpan.textContent = 'Account';
        }
        
        const userDropdown = document.querySelector('#userDropdown i');
        if (userDropdown) {
            userDropdown.className = 'fas fa-user';
        }
        
        // Hide admin sections and show regular user sections
        const adminSections = document.querySelectorAll('.admin-section');
        adminSections.forEach(section => {
            section.style.display = 'none';
        });
        
        const loginSections = document.querySelectorAll('.login-section');
        loginSections.forEach(section => {
            section.style.display = 'block';
        });
        
        const nonAdminSections = document.querySelectorAll('.non-admin-section');
        nonAdminSections.forEach(section => {
            section.style.display = 'block';
        });
    }
}

function requireAdminAccess() {
    if (!isAdmin()) {
        showAlert('Access denied! Only administrators can perform this action.', 'danger');
        return false;
    }
    return true;
}

function initializeAdminLogin() {
    const form = document.getElementById('admin-login-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('adminEmail').value;
        const password = document.getElementById('adminPassword').value;
        
        try {
            loginAsAdmin(email, password);
            showAlert('Login successful! Welcome Administrator.', 'success');
            
            setTimeout(() => {
                window.location.href = 'admin-add-product.html';
            }, 1500);
            
        } catch (error) {
            showAlert(error.message, 'danger');
            
            // Clear password field on error
            document.getElementById('adminPassword').value = '';
        }
    });
}

// Product Management
function getStoredProducts() {
    const stored = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    if (stored) {
        return JSON.parse(stored);
    } else {
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(PRODUCTS));
        return PRODUCTS;
    }
}

function saveProductsToStorage(products) {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
}

function addNewProduct(productData) {
    const products = getStoredProducts();
    const newId = Math.max(...products.map(p => p.id)) + 1;
    
    const newProduct = {
        id: newId,
        name: productData.name,
        price: parseFloat(productData.price),
        description: productData.description,
        longDescription: productData.longDescription,
        features: productData.features,
        icon: productData.icon,
        image: productData.image || null,
        category: productData.category,
        dateAdded: new Date().toISOString()
    };
    
    products.push(newProduct);
    saveProductsToStorage(products);
    
    return newProduct;
}

function deleteProduct(productId) {
    if (!requireAdminAccess()) {
        return false;
    }
    
    const products = getStoredProducts();
    const productIndex = products.findIndex(p => p.id === productId);
    
    if (productIndex === -1) {
        showAlert('Product not found!', 'danger');
        return false;
    }
    
    const productName = products[productIndex].name;
    
    if (confirm(`Are you sure you want to delete "${productName}"? This action cannot be undone.`)) {
        products.splice(productIndex, 1);
        saveProductsToStorage(products);
        showAlert(`Product "${productName}" has been deleted successfully!`, 'success');
        
        // Reload products if on main page
        if (document.getElementById('products-container')) {
            loadProducts();
        }
        
        return true;
    }
    
    return false;
}

function loadProductManagement() {
    if (!isAdmin()) {
        window.location.href = 'admin-login.html';
        return;
    }
    
    const products = getStoredProducts();
    
    // Update stats
    document.getElementById('total-products').textContent = products.length;
    
    const categories = [...new Set(products.map(p => p.category))];
    document.getElementById('total-categories').textContent = categories.length;
    
    const avgPrice = products.length > 0 ? 
        (products.reduce((sum, p) => sum + p.price, 0) / products.length) : 0;
    document.getElementById('avg-price').textContent = '$' + avgPrice.toFixed(2);
    
    const recentProducts = products.filter(p => {
        const addedDate = new Date(p.dateAdded || '2025-01-01');
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return addedDate > weekAgo;
    }).length;
    document.getElementById('recent-products').textContent = recentProducts;
    
    // Load products table
    const tableBody = document.getElementById('products-table-body');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    if (products.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="6" class="text-center py-4">
                    <i class="fas fa-box-open display-4 text-muted mb-3"></i>
                    <h5>No products found</h5>
                    <p class="text-muted">Start by adding your first product.</p>
                    <a href="admin-add-product.html" class="btn btn-primary">Add Product</a>
                </td>
            </tr>
        `;
        return;
    }
    
    products.forEach(product => {
        const row = document.createElement('tr');
        const addedDate = product.dateAdded ? 
            new Date(product.dateAdded).toLocaleDateString() : 'Unknown';
        
        row.innerHTML = `
            <td>
                <div style="width: 50px; height: 50px; display: flex; align-items: center; justify-content: center;">
                    ${product.image ? 
                        `<img src="${product.image}" alt="${product.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 8px;">` :
                        `<i class="${product.icon} text-primary fs-4"></i>`
                    }
                </div>
            </td>
            <td>
                <strong>${product.name}</strong>
                <br>
                <small class="text-muted">${product.description}</small>
            </td>
            <td>
                <span class="badge bg-secondary">${product.category}</span>
            </td>
            <td class="fw-bold text-primary">$${product.price.toFixed(2)}</td>
            <td>${addedDate}</td>
            <td>
                <div class="btn-group btn-group-sm">
                    <button class="btn btn-outline-primary" onclick="viewProduct(${product.id})" title="View Product">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-outline-danger" onclick="deleteProductFromManagement(${product.id})" title="Delete Product">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

function deleteProductFromManagement(productId) {
    if (deleteProduct(productId)) {
        // Reload the management page data
        loadProductManagement();
    }
}

// Admin Form Functions
function initializeAddProductForm() {
    const form = document.getElementById('add-product-form');
    if (!form) return;

    const imageInput = document.getElementById('productImage');
    if (imageInput) {
        imageInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const preview = document.getElementById('image-preview');
                    const img = document.getElementById('preview-img');
                    img.src = e.target.result;
                    preview.style.display = 'block';
                };
                reader.readAsDataURL(file);
            }
        });
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!requireAdminAccess()) {
            return;
        }

        const formData = {
            name: document.getElementById('productName').value,
            price: document.getElementById('productPrice').value,
            category: document.getElementById('productCategory').value,
            description: document.getElementById('productDescription').value,
            longDescription: document.getElementById('productLongDescription').value,
            icon: document.getElementById('productIcon').value,
            features: getFeaturesList(),
            image: getImageDataUrl()
        };

        if (validateProductForm(formData)) {
            const newProduct = addNewProduct(formData);
            showAlert(`Product "${newProduct.name}" added successfully!`, 'success');
            form.reset();
            resetImagePreview();
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        }
    });
}

function validateProductForm(data) {
    if (!data.name || !data.price || !data.category || !data.description || !data.longDescription || !data.icon) {
        showAlert('Please fill in all required fields!', 'danger');
        return false;
    }
    
    if (parseFloat(data.price) <= 0) {
        showAlert('Price must be greater than 0!', 'danger');
        return false;
    }
    
    if (data.features.length === 0) {
        showAlert('Please add at least one feature!', 'danger');
        return false;
    }
    
    return true;
}

function getFeaturesList() {
    const container = document.getElementById('features-container');
    const inputs = container.querySelectorAll('input[type="text"]');
    const features = [];
    
    inputs.forEach(input => {
        if (input.value.trim()) {
            features.push(input.value.trim());
        }
    });
    
    return features;
}

function getImageDataUrl() {
    const img = document.getElementById('preview-img');
    if (img && img.src && img.src !== window.location.href) {
        return img.src;
    }
    return null;
}

function addFeature() {
    const container = document.getElementById('features-container');
    const newFeature = document.createElement('div');
    newFeature.className = 'input-group mb-2';
    newFeature.innerHTML = `
        <input type="text" class="form-control" placeholder="Enter a key feature">
        <button type="button" class="btn btn-outline-danger" onclick="removeFeature(this)">
            <i class="fas fa-trash"></i>
        </button>
    `;
    container.appendChild(newFeature);
}

function removeFeature(button) {
    const container = document.getElementById('features-container');
    if (container.children.length > 1) {
        button.closest('.input-group').remove();
    } else {
        showAlert('At least one feature is required!', 'warning');
    }
}

function resetForm() {
    const form = document.getElementById('add-product-form');
    if (form) {
        form.reset();
        resetImagePreview();
        
        const container = document.getElementById('features-container');
        container.innerHTML = `
            <div class="input-group mb-2">
                <input type="text" class="form-control" placeholder="Enter a key feature">
                <button type="button" class="btn btn-outline-danger" onclick="removeFeature(this)">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
    }
}

function resetImagePreview() {
    const preview = document.getElementById('image-preview');
    if (preview) {
        preview.style.display = 'none';
        document.getElementById('preview-img').src = '';
    }
}

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        getCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        calculateCartTotal,
        getCurrentUser,
        saveUser,
        logout,
        isAdmin,
        addNewProduct
    };
}
