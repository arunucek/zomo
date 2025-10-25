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
    PRODUCTS: 'zomostore_products',
    SELLER: 'zomostore_seller',
    PENDING_PRODUCTS: 'zomostore_pending_products',
    BOOKINGS: 'zomostore_bookings',
    DELIVERY_MEN: 'zomostore_delivery_men',
    DELIVERY_USER: 'zomostore_delivery_user',
    CHAT_USER_NAME: 'zomostore_chat_user_name',
    COMPANY_CONNECTIONS: 'zomostore_company_connections'
};

// Storage key for international purchases
const INTL_STORAGE_KEY = 'zomostore_international_purchases';

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
    },

    // Dresses Category
    {
        id: 32,
        name: "Elegant Saree",
        price: 1999.00,
        description: "Traditional silk saree with rich border and blouse piece.",
        longDescription: "Handwoven silk saree with intricate zari work and matching blouse piece. Perfect for festive occasions and weddings.",
        features: ["Pure silk blend", "Zari border", "Blouse piece included", "Dry clean only"],
        icon: "fas fa-tshirt",
        image: "https://images.unsplash.com/photo-1610030469983-98ecca63c879?w=400&h=400&fit=crop&crop=center",
        category: "Dresses"
    },
    {
        id: 33,
        name: "Men's Kurta Set",
        price: 1499.00,
        description: "Cotton kurta with churidar, comfortable and stylish.",
        longDescription: "Breathable cotton kurta paired with matching churidar. Ideal for celebrations and casual ethnic wear.",
        features: ["100% cotton", "Comfort fit", "Includes churidar", "Machine wash gentle"],
        icon: "fas fa-tshirt",
        image: "https://images.unsplash.com/photo-1593032457861-952d3e39fb8d?w=400&h=400&fit=crop&crop=center",
        category: "Dresses"
    },

    // Meats Category
    {
        id: 34,
        name: "Chicken Breast (1 kg)",
        price: 299.00,
        description: "Fresh, skinless chicken breast fillets.",
        longDescription: "Tender, skinless chicken breast ideal for grilling, frying, and curries. Cleaned and hygienically packed.",
        features: ["High protein", "Fresh daily", "Hygienic pack", "Boneless"],
        icon: "fas fa-drumstick-bite",
        image: "https://images.unsplash.com/photo-1604908554025-7a31a2a97f47?w=400&h=400&fit=crop&crop=center",
        category: "Meats"
    },
    {
        id: 35,
        name: "Mutton (1 kg)",
        price: 799.00,
        description: "Fresh goat meat, cut and cleaned.",
        longDescription: "Premium quality mutton pieces perfect for biryani and curries. Hand-cut, cleaned, and packed fresh.",
        features: ["Premium cuts", "Fresh daily", "Rich flavor", "Cleaned"],
        icon: "fas fa-drumstick-bite",
        image: "https://images.unsplash.com/photo-1604908553719-5a2b0e8e2e7d?w=400&h=400&fit=crop&crop=center",
        category: "Meats"
    },

    // Snacks Category
    {
        id: 36,
        name: "Masala Chips",
        price: 49.00,
        description: "Crispy potato chips with tangy masala.",
        longDescription: "Crisp and tasty potato chips sprinkled with a zingy masala mix. Perfect tea-time snack.",
        features: ["Crispy", "Tangy masala", "Tea-time snack", "Sealed pack"],
        icon: "fas fa-cookie-bite",
        image: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=400&h=400&fit=crop&crop=center",
        category: "Snacks"
    },
    {
        id: 37,
        name: "Mixture (500 g)",
        price: 129.00,
        description: "South Indian spicy mixture snack.",
        longDescription: "Traditional South Indian mixture with boondi, sev, peanuts, and curry leaves. Crunchy and flavorful.",
        features: ["Crunchy", "Spicy", "Fresh pack", "Authentic taste"],
        icon: "fas fa-cookie-bite",
        image: "https://images.unsplash.com/photo-1604908176997-9070e322a378?w=400&h=400&fit=crop&crop=center",
        category: "Snacks"
    },

    // Rices Category
    {
        id: 38,
        name: "Basmati Rice (5 kg)",
        price: 699.00,
        description: "Long-grain aged basmati rice.",
        longDescription: "Premium aged basmati rice with long grains and rich aroma. Ideal for biryani and pulao.",
        features: ["Aged basmati", "Long grain", "Aromatic", "Non-sticky"],
        icon: "fas fa-utensils",
        image: "https://images.unsplash.com/photo-1604908813280-08d3d3a3f94e?w=400&h=400&fit=crop&crop=center",
        category: "Rices"
    },
    {
        id: 39,
        name: "Sona Masoori Rice (10 kg)",
        price: 899.00,
        description: "Light and aromatic Sona Masoori rice.",
        longDescription: "Popular medium-grain rice variety with light texture and aroma. Great for daily meals.",
        features: ["Medium grain", "Aromatic", "Fluffy", "Daily use"],
        icon: "fas fa-utensils",
        image: "https://images.unsplash.com/photo-1615485737651-6a8f6fb8d7f4?w=400&h=400&fit=crop&crop=center",
        category: "Rices"
    },

    // Books Category
    {
        id: 40,
        name: "The Alchemist",
        price: 299.00,
        description: "Bestselling novel by Paulo Coelho.",
        longDescription: "An inspiring tale about following your dreams and listening to your heart by Paulo Coelho.",
        features: ["Fiction", "Bestseller", "Inspiring", "Paperback"],
        icon: "fas fa-book",
        image: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400&h=400&fit=crop&crop=center",
        category: "Books"
    },
    {
        id: 41,
        name: "Clean Code",
        price: 799.00,
        description: "A Handbook of Agile Software Craftsmanship.",
        longDescription: "Classic book by Robert C. Martin on writing clean, maintainable code with practical examples.",
        features: ["Programming", "Best practices", "Agile", "Paperback"],
        icon: "fas fa-book",
        image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=400&fit=crop&crop=center",
        category: "Books"
    }

    ,
    // Creams Category
    {
        id: 42,
        name: "Moisturizing Face Cream",
        price: 349.00,
        description: "Hydrating daily moisturizer for soft, glowing skin.",
        longDescription: "Dermatologist-tested moisturizer with hyaluronic acid and vitamin E to keep your skin hydrated all day.",
        features: ["Hyaluronic acid", "Vitamin E", "All skin types", "Paraben-free"],
        icon: "fas fa-spa",
        image: "https://images.unsplash.com/photo-1585238342028-4bbc3e3a0a44?w=400&h=400&fit=crop&crop=center",
        category: "Creams"
    },
    {
        id: 43,
        name: "Sunscreen SPF 50+",
        price: 399.00,
        description: "Broad-spectrum UV protection, lightweight and non-greasy.",
        longDescription: "Water-resistant sunscreen with SPF 50+ offering UVA/UVB protection while keeping skin breathable.",
        features: ["SPF 50+", "Water-resistant", "Non-greasy", "Dermatologist tested"],
        icon: "fas fa-sun",
        image: "https://images.unsplash.com/photo-1612815154858-60aa4b5a1e7f?w=400&h=400&fit=crop&crop=center",
        category: "Creams"
    }

    ,
    // Home Appliances Category
    {
        id: 44,
        name: "Air Fryer 4L",
        price: 5499.00,
        description: "Healthy frying with little to no oil.",
        longDescription: "Compact 4-liter air fryer with digital controls and multiple presets for quick, healthy cooking.",
        features: ["4L capacity", "Digital controls", "Non-stick basket", "Auto shutoff"],
        icon: "fas fa-blender",
        image: "https://images.unsplash.com/photo-1628191010212-7f6f9cecf5c1?w=400&h=400&fit=crop&crop=center",
        category: "Home Appliances"
    },
    {
        id: 45,
        name: "Vacuum Cleaner",
        price: 3999.00,
        description: "Powerful suction for deep cleaning home surfaces.",
        longDescription: "Bagless vacuum cleaner with HEPA filter and multi-surface brush for carpets and hard floors.",
        features: ["HEPA filter", "Bagless", "Multi-surface brush", "Lightweight"],
        icon: "fas fa-blender",
        image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=400&fit=crop&crop=center",
        category: "Home Appliances"
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
    // Check if user is logged in
    if (!isUserLoggedIn()) {
        showLoginRequiredAlert('You need to login to add items to cart');
        return;
    }

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
    const categoryOrder = ['Electronics', 'Food', 'Gifts', 'Vegetables', 'Fruits', 'Flowers', 'Dresses', 'Meats', 'Snacks', 'Rices', 'Creams', 'Home Appliances', 'Books'];
    
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
        'Dresses': 'fas fa-tshirt',
        'Meats': 'fas fa-drumstick-bite',
        'Snacks': 'fas fa-cookie-bite',
        'Rices': 'fas fa-utensils',
        'Creams': 'fas fa-spa',
        'Home Appliances': 'fas fa-blender',
        'Books': 'fas fa-book',
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

    if (subtotalElement) subtotalElement.textContent = `${totals.subtotal}`;
    if (shippingElement) shippingElement.textContent = `${totals.shipping}`;
    if (taxElement) taxElement.textContent = `${totals.tax}`;
    if (totalElement) totalElement.textContent = `${totals.total}`;
}

function proceedToCheckout() {
    // Check if user is logged in
    if (!isUserLoggedIn()) {
        showLoginRequiredAlert('You need to login to proceed with checkout');
        return;
    }
    
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
function getDefaultDeliveryMen() {
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

function getVehicleIcon(vehicleType) {
    const vehicleIcons = {
        'Motorcycle': 'fas fa-motorcycle',
        'Car': 'fas fa-car',
        'Van': 'fas fa-truck',
        'Bicycle': 'fas fa-bicycle',
        'Scooter': 'fas fa-motorcycle',
        'Truck': 'fas fa-truck',
        'Bus': 'fas fa-bus'
    };
    return vehicleIcons[vehicleType] || 'fas fa-truck';
}

function getDeliveryMen() {
    const stored = localStorage.getItem(STORAGE_KEYS.DELIVERY_MEN);
    if (stored) {
        try { return JSON.parse(stored); } catch { /* fallthrough */ }
    }
    const defaults = getDefaultDeliveryMen();
    localStorage.setItem(STORAGE_KEYS.DELIVERY_MEN, JSON.stringify(defaults));
    return defaults;
}

// ============================================
// DELIVERY USER AUTH (Login for delivery boy)
// ============================================
function getCurrentDeliveryUser() {
    const u = localStorage.getItem(STORAGE_KEYS.DELIVERY_USER);
    return u ? JSON.parse(u) : null;
}

function loginAsDelivery(email) {
    const trimmed = (email || '').trim().toLowerCase();
    if (!trimmed) throw new Error('Please enter delivery email');
    const list = getDeliveryMen();
    const match = list.find(p => (p.email || '').toLowerCase() === trimmed);
    if (!match) throw new Error('Email not found. Ask admin to add your email.');
    const deliveryUser = { id: match.id, name: match.name, email: trimmed, loginTime: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEYS.DELIVERY_USER, JSON.stringify(deliveryUser));
    return deliveryUser;
}

function deliveryLogout() {
    localStorage.removeItem(STORAGE_KEYS.DELIVERY_USER);
}

function requireDeliveryUser() {
    const u = getCurrentDeliveryUser();
    if (!u) {
        showAlert('Delivery login required', 'warning');
        setTimeout(() => { window.location.href = 'delivery-login.html'; }, 600);
        return false;
    }
    return true;
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
    
    if (subtotalElement) subtotalElement.textContent = `${totals.subtotal}`;
    if (shippingElement) shippingElement.textContent = `${totals.shipping}`;
    if (taxElement) taxElement.textContent = `${totals.tax}`;
    if (totalElement) totalElement.textContent = `${totals.total}`;
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
        
        const vehicleIcon = getVehicleIcon(person.vehicle);
        
        row.innerHTML = `
            <td><strong>${person.id}</strong></td>
            <td>${person.name}</td>
            <td>${person.phone}</td>
            <td><i class="${vehicleIcon} me-1"></i>${person.vehicle}</td>
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
    
    const editForm = document.getElementById('edit-delivery-person-form');
    if (editForm) {
        editForm.addEventListener('submit', function(e) {
            e.preventDefault();
            updateDeliveryPerson();
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

    // Persist to localStorage
    const deliveryMen = getDeliveryMen();
    deliveryMen.push(newPerson);
    localStorage.setItem(STORAGE_KEYS.DELIVERY_MEN, JSON.stringify(deliveryMen));
    
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
    const deliveryMen = getDeliveryMen();
    const person = deliveryMen.find(p => p.id === personId);
    
    if (!person) {
        showAlert('Delivery person not found!', 'danger');
        return;
    }
    
    // Populate edit form
    document.getElementById('editPersonId').value = person.id;
    document.getElementById('editPersonName').value = person.name;
    document.getElementById('editPersonPhone').value = person.phone;
    document.getElementById('editPersonVehicle').value = person.vehicle;
    document.getElementById('editPersonEmail').value = person.email || '';
    document.getElementById('editPersonAddress').value = person.address || '';
    document.getElementById('editPersonStatus').value = person.status;
    
    // Show edit modal
    const modal = new bootstrap.Modal(document.getElementById('editDeliveryManModal'));
    modal.show();
}

function updateDeliveryPerson() {
    const personId = document.getElementById('editPersonId').value;
    const name = document.getElementById('editPersonName').value;
    const phone = document.getElementById('editPersonPhone').value;
    const vehicle = document.getElementById('editPersonVehicle').value;
    const email = document.getElementById('editPersonEmail').value;
    const address = document.getElementById('editPersonAddress').value;
    const status = document.getElementById('editPersonStatus').value;

    if (!name || !phone || !vehicle || !status) {
        showAlert('Please fill in all required fields!', 'warning');
        return;
    }

    const deliveryMen = getDeliveryMen();
    const personIndex = deliveryMen.findIndex(p => p.id === personId);
    
    if (personIndex === -1) {
        showAlert('Delivery person not found!', 'danger');
        return;
    }

    // Update person data
    deliveryMen[personIndex] = {
        ...deliveryMen[personIndex],
        name: name,
        phone: phone,
        vehicle: vehicle,
        email: email,
        address: address,
        status: status
    };

    // Save to localStorage
    localStorage.setItem(STORAGE_KEYS.DELIVERY_MEN, JSON.stringify(deliveryMen));
    
    showAlert('Delivery person updated successfully!', 'success');
    
    // Close modal and reset form
    const modal = bootstrap.Modal.getInstance(document.getElementById('editDeliveryManModal'));
    modal.hide();
    document.getElementById('edit-delivery-person-form').reset();
    
    // Refresh the display
    loadDeliveryPersonnel();
    updateDeliveryStats();
}

function removeDeliveryPerson(personId) {
    if (confirm('Are you sure you want to remove this delivery person?')) {
        const deliveryMen = getDeliveryMen().filter(p => p.id !== personId);
        localStorage.setItem(STORAGE_KEYS.DELIVERY_MEN, JSON.stringify(deliveryMen));
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

function markOrderDelivered(orderId) {
    const orders = getOrders();
    const idx = orders.findIndex(o => o.id === orderId);
    if (idx === -1) { showAlert('Order not found', 'danger'); return; }
    orders[idx].status = 'delivered';
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    // Fire storage event for other tabs (admin page) to refresh
    try { localStorage.setItem('orders_last_update', Date.now().toString()); } catch {}
    showAlert('Order marked as delivered', 'success');
    if (window.location.pathname.includes('delivery-home.html')) {
        setTimeout(() => location.reload(), 400);
    }
}

// Delivery app helpers
function openDeliveryDetails(orderId) {
    const order = getOrders().find(o => o.id === orderId);
    if (!order) return;
    const addr = order.customer?.address || '';
    document.getElementById('dmod-order') && (document.getElementById('dmod-order').textContent = order.id);
    document.getElementById('dmod-name') && (document.getElementById('dmod-name').textContent = (order.customer?.firstName || '') + ' ' + (order.customer?.lastName || ''));
    document.getElementById('dmod-email') && (document.getElementById('dmod-email').textContent = order.customer?.email || '');
    document.getElementById('dmod-phone') && (document.getElementById('dmod-phone').textContent = order.customer?.phone || '');
    document.getElementById('dmod-address') && (document.getElementById('dmod-address').textContent = addr);
    const mapUrl = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(addr);
    const link = document.getElementById('dmod-map'); if (link) link.href = mapUrl;
    // Ensure Directions link always works (destination only by default)
    const dir = document.getElementById('dmod-directions');
    if (dir) dir.href = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(addr)}&travelmode=driving`;
    // Try to get current position for directions
    const currEl = document.getElementById('dmod-currentloc');
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(pos){
            const lat = pos.coords.latitude.toFixed(5);
            const lng = pos.coords.longitude.toFixed(5);
            if (currEl) currEl.textContent = `${lat}, ${lng}`;
            const dir2 = document.getElementById('dmod-directions');
            if (dir2) dir2.href = `https://www.google.com/maps/dir/?api=1&origin=${lat},${lng}&destination=${encodeURIComponent(addr)}&travelmode=driving`;
        }, function(){
            if (currEl) currEl.textContent = 'Permission denied';
            // keep destination-only link already set
        });
    }
    const modalEl = document.getElementById('deliveryDetailsModal');
    if (modalEl && window.bootstrap) new bootstrap.Modal(modalEl).show();
}

function startDelivery(orderId) {
    const orders = getOrders();
    const idx = orders.findIndex(o => o.id === orderId);
    if (idx === -1) return;
    orders[idx].status = 'out_for_delivery';
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    // Optimistically update the row UI immediately
    const row = document.querySelector(`[data-order-id="${orderId}"]`);
    const actionsCell = row ? row.querySelector('.actions-cell') : null;
    if (row) {
        const statusBadge = row.querySelector('td:nth-child(3) .badge');
        if (statusBadge) statusBadge.className = 'badge bg-primary', statusBadge.textContent = 'out for delivery';
        if (actionsCell) {
            actionsCell.innerHTML = `<button class="btn btn-sm btn-outline-success me-2" onclick="completeDeliveryPrompt('${orderId}')"><i class=\"fas fa-check\"></i> Complete</button>
                       <button class="btn btn-sm btn-outline-secondary" onclick="openDeliveryDetails('${orderId}')"><i class=\"fas fa-map\"></i> Details</button>`;
        }
    }
    showAlert('Delivery accepted. Opening details…', 'success');
    openDeliveryDetails(orderId);
}

function rejectAssignedDelivery(orderId) {
    const reason = prompt('Reason for rejection (optional):');
    const orders = getOrders();
    const idx = orders.findIndex(o => o.id === orderId);
    if (idx === -1) return;
    // Auto-assign next available driver
    const currentId = orders[idx].delivery?.assignedDeliveryMan?.id;
    const men = getDeliveryMen();
    const currentIndex = men.findIndex(m => m.id === currentId);
    let next = null;
    if (men.length > 0) {
        const start = currentIndex >= 0 ? (currentIndex + 1) % men.length : 0;
        for (let i = 0; i < men.length; i++) {
            const candidate = men[(start + i) % men.length];
            if (candidate && candidate.id !== currentId) { next = candidate; break; }
        }
    }
    if (next) {
        orders[idx].delivery = orders[idx].delivery || {};
        orders[idx].delivery.assignedDeliveryMan = { id: next.id, name: next.name, phone: next.phone };
        orders[idx].status = 'processing';
        localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
        // notify new driver
        notifyDeliveryAssignment(next.id, orders[idx].id);
        showAlert(`Assignment rejected. Reassigned to ${next.name}.`, 'info');
    } else {
        orders[idx].status = 'confirmed';
        if (orders[idx].delivery) delete orders[idx].delivery.assignedDeliveryMan;
        localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
        showAlert('Assignment rejected. Waiting for admin to reassign.', 'info');
    }
    if (window.location.pathname.includes('delivery-home.html')) setTimeout(() => location.reload(), 300);
}

function completeDeliveryPrompt(orderId) {
    const email = prompt('Enter customer email to confirm delivery:');
    const order = getOrders().find(o => o.id === orderId);
    if (!order) { showAlert('Order not found', 'danger'); return; }
    const expected = (order.customer?.email || '').trim().toLowerCase();
    if ((email || '').trim().toLowerCase() !== expected) {
        showAlert('Email does not match. Delivery cannot be completed.', 'danger');
        return;
    }
    markOrderDelivered(orderId);
}

// User Management Functions
function getCurrentUser() {
    const user = localStorage.getItem(STORAGE_KEYS.USER);
    return user ? JSON.parse(user) : null;
}

function isUserLoggedIn() {
    const user = getCurrentUser();
    const isLoggedIn = user !== null && user.email && (user.name || (user.firstName && user.lastName));
    
    // Debug logging (remove in production)
    console.log('isUserLoggedIn check:', {
        user: user,
        hasEmail: user ? !!user.email : false,
        hasName: user ? !!user.name : false,
        hasFirstName: user ? !!user.firstName : false,
        hasLastName: user ? !!user.lastName : false,
        isLoggedIn: isLoggedIn
    });
    
    return isLoggedIn;
}

function showLoginRequiredAlert(message) {
    // Create a custom alert with login options
    const alertHtml = `
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <div class="d-flex align-items-center">
                <i class="fas fa-exclamation-triangle me-3 fa-2x"></i>
                <div class="flex-grow-1">
                    <h5 class="alert-heading mb-2">Login Required</h5>
                    <p class="mb-3">${message}</p>
                    <div class="d-flex gap-2">
                        <a href="login.html" class="btn btn-primary btn-sm">
                            <i class="fas fa-sign-in-alt me-1"></i>Login
                        </a>
                        <a href="signup.html" class="btn btn-outline-primary btn-sm">
                            <i class="fas fa-user-plus me-1"></i>Sign Up
                        </a>
                        <button type="button" class="btn btn-outline-secondary btn-sm" data-bs-dismiss="alert">
                            <i class="fas fa-times me-1"></i>Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remove any existing login alerts
    const existingAlert = document.querySelector('.alert-warning');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    // Add the alert to the page
    const container = document.querySelector('.container') || document.querySelector('main') || document.body;
    container.insertAdjacentHTML('afterbegin', alertHtml);
    
    // Auto-remove after 10 seconds
    setTimeout(() => {
        const alert = document.querySelector('.alert-warning');
        if (alert) {
            alert.remove();
        }
    }, 10000);
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

// ============================================
// BOOKINGS (Theatre, Events, Transport)
// ============================================

function getBookings() {
    const data = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
    return data ? JSON.parse(data) : [];
}

function saveBookings(bookings) {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
}

function createBooking(type, payload) {
    const id = 'BK-' + Date.now();
    const bookings = getBookings();
    const record = {
        id,
        type, // theatre | event | car | bus | train | flight
        data: payload,
        createdAt: new Date().toISOString(),
        status: 'confirmed'
    };
    bookings.unshift(record);
    saveBookings(bookings);
    try { generateAndDownloadTicket(record); } catch (e) { console.warn('Ticket generation failed', e); }
    return record;
}

// Simple calculators/examples
function calculateTransportFare(distanceKm, baseFare, perKm) {
    const km = parseFloat(distanceKm) || 0;
    return (baseFare + km * perKm).toFixed(2);
}

// Ticket generation (simple HTML file download)
function generateAndDownloadTicket(booking) {
    const created = new Date(booking.createdAt).toLocaleString();
    const pnr = booking.id.replace('BK-', 'ZM');
    const titleMap = {
        theatre: 'Theatre Ticket',
        event: 'Event Ticket',
        car: 'Car Booking',
        bus: 'Bus Ticket',
        train: 'Train Ticket',
        flight: 'Flight Ticket'
    };
    const iconMap = { theatre: '🎭', event: '🎫', car: '🚗', bus: '🚌', train: '🚆', flight: '✈️' };
    const title = titleMap[booking.type] || 'Ticket';

    function row(label, value) {
        return `<tr>
            <td style="padding:10px 12px;border:1px solid #e5e7eb;background:#fafafa;width:38%;"><strong>${label}</strong></td>
            <td style="padding:10px 12px;border:1px solid #e5e7eb;">${value ?? '-'}</td>
        </tr>`;
    }

    const d = booking.data || {};
    let details = '';
    if (booking.type === 'theatre') {
        details += row('Show', d.show);
        details += row('Date', d.date);
        details += row('Seats', d.seats);
        details += row('Venue', d.city || '—');
    } else if (booking.type === 'event') {
        details += row('Event', d.event);
        details += row('Date', d.date);
        details += row('Tickets', d.tickets);
        details += row('City', d.city || '—');
    } else if (['car','bus','train','flight'].includes(booking.type)) {
        details += row('From', d.from);
        details += row('To', d.to);
        if (d.date) details += row('Date', d.date);
        if (d.distanceKm) details += row('Distance', `${d.distanceKm} km`);
        if (d.estimatedFare) details += row('Estimated Fare', `₹${parseFloat(d.estimatedFare).toFixed(2)}`);
    } else {
        details = Object.entries(d).map(([k,v]) => row(k, v)).join('');
    }

    const html = `<!DOCTYPE html>
    <html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title} - ${booking.id}</title>
    <style>
      body{font-family:Arial,Helvetica,sans-serif;color:#1f2937;background:#f8fafc}
      .ticket{max-width:760px;margin:28px auto;background:#fff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden}
      .header{display:flex;justify-content:space-between;align-items:center;padding:18px 22px;background:linear-gradient(135deg,#6B46C1,#1E3A8A);color:#fff}
      .brand{font-weight:800;letter-spacing:.3px}
      .brand span{color:#FCD34D}
      .body{padding:22px}
      .meta{display:flex;gap:18px;flex-wrap:wrap;margin-bottom:14px}
      .chip{background:#f1f5f9;border:1px solid #e2e8f0;border-radius:999px;padding:6px 12px;font-size:12px;color:#334155}
      .table{border-collapse:collapse;width:100%}
      .footer{padding:12px 22px;font-size:12px;color:#64748b;background:#fafafa;border-top:1px dashed #e2e8f0;display:flex;justify-content:space-between;align-items:center}
      .barcode{height:36px;background:repeating-linear-gradient(90deg,#111 0,#111 2px,#fff 2px,#fff 4px);width:180px;border:1px solid #e5e7eb}
    </style>
    </head>
    <body>
      <div class="ticket">
        <div class="header">
          <div class="brand">${iconMap[booking.type] || '🎟️'} Zomo <span>Store</span></div>
          <div style="text-align:right">
            <div style="font-size:12px;opacity:.9">PNR</div>
            <div style="font-size:16px;font-weight:700">${pnr}</div>
          </div>
        </div>
        <div class="body">
          <div class="meta">
            <div class="chip">${title}</div>
            <div class="chip">Booking ID: ${booking.id}</div>
            <div class="chip">Issued: ${created}</div>
            <div class="chip">Status: Confirmed</div>
          </div>
          <table class="table">${details}</table>
        </div>
        <div class="footer">
          <div>Carry a valid ID during travel/entry. Subject to provider terms.</div>
          <div class="barcode" aria-label="barcode"></div>
        </div>
      </div>
    </body></html>`;
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${booking.id}.html`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
        URL.revokeObjectURL(url);
        a.remove();
    }, 1000);
}

// Catalog data for listings
const BOOKING_CATALOG = {
    theatre: [
        { id: 'TH-001', title: 'The Royal Drama', city: 'Chennai' },
        { id: 'TH-002', title: 'Space Odyssey 2049', city: 'Bengaluru' },
        { id: 'TH-003', title: 'Comedy Night Live', city: 'Hyderabad' },
        { id: 'TH-004', title: 'Historical Epic', city: 'Coimbatore' },
        { id: 'TH-005', title: 'Mystery at Midnight', city: 'Madurai' },
        { id: 'TH-006', title: 'Romance Reimagined', city: 'Pondicherry' },
        { id: 'TH-007', title: 'Sci‑Fi Returns', city: 'Delhi' },
        { id: 'TH-008', title: 'Laugh Riot', city: 'Kanchipuram' },
        { id: 'TH-009', title: 'Festival Special', city: 'Tiruvannamalai' },
        { id: 'TH-010', title: 'Action Reloaded', city: 'Trichy' }
    ],
    events: [
        { id: 'EV-101', title: 'Arijit Live Concert', city: 'Mumbai', date: '2025-11-20' },
        { id: 'EV-102', title: 'Tech Conference X', city: 'Delhi', date: '2025-12-05' },
        { id: 'EV-103', title: 'Food Fest', city: 'Chennai', date: '2025-12-15' },
        { id: 'EV-104', title: 'Startup Summit', city: 'Bengaluru', date: '2025-12-10' },
        { id: 'EV-105', title: 'Classical Music Night', city: 'Madurai', date: '2025-12-18' },
        { id: 'EV-106', title: 'Marathon', city: 'Coimbatore', date: '2026-01-12' },
        { id: 'EV-107', title: 'Beach Festival', city: 'Pondicherry', date: '2026-01-20' },
        { id: 'EV-108', title: 'Temple Car Fest', city: 'Tiruvannamalai', date: '2026-02-05' }
    ],
    routes: [
        // Car sample routes
        { id: 'RT-C-01', mode: 'car', from: 'Chennai', to: 'Mahabalipuram', km: 58 },
        { id: 'RT-C-02', mode: 'car', from: 'Tiruvannamalai', to: 'Kanchipuram', km: 115 },
        { id: 'RT-C-03', mode: 'car', from: 'Tiruvannamalai', to: 'Vellore', km: 82 },
        { id: 'RT-C-04', mode: 'car', from: 'Kanchipuram', to: 'Chennai', km: 72 },

        // Bus sample routes
        { id: 'RT-B-01', mode: 'bus', from: 'Chennai', to: 'Bengaluru', km: 345 },
        { id: 'RT-B-02', mode: 'bus', from: 'Tiruvannamalai', to: 'Kanchipuram', km: 115 },
        { id: 'RT-B-03', mode: 'bus', from: 'Tiruvannamalai', to: 'Chennai', km: 195 },
        { id: 'RT-B-04', mode: 'bus', from: 'Madurai', to: 'Trichy', km: 135 },
        { id: 'RT-B-05', mode: 'bus', from: 'Coimbatore', to: 'Ooty', km: 86 },

        // Train sample routes
        { id: 'RT-T-01', mode: 'train', from: 'Chennai', to: 'Coimbatore', km: 495 },
        { id: 'RT-T-02', mode: 'train', from: 'Chennai', to: 'Madurai', km: 560 },
        { id: 'RT-T-03', mode: 'train', from: 'Chennai', to: 'Tirupati', km: 140 },
        { id: 'RT-T-04', mode: 'train', from: 'Kanchipuram', to: 'Tiruvannamalai', km: 115 },
        { id: 'RT-T-05', mode: 'train', from: 'Trichy', to: 'Madurai', km: 135 },

        // Flight sample routes
        { id: 'RT-F-01', mode: 'flight', from: 'Chennai', to: 'Delhi', km: 1750 },
        { id: 'RT-F-02', mode: 'flight', from: 'Chennai', to: 'Mumbai', km: 1330 },
        { id: 'RT-F-03', mode: 'flight', from: 'Bengaluru', to: 'Hyderabad', km: 500 },
        { id: 'RT-F-04', mode: 'flight', from: 'Coimbatore', to: 'Chennai', km: 420 }
    ]
};

function searchCatalog(list, query) {
    const q = (query || '').toLowerCase();
    if (!q) return list;
    return list.filter(item => Object.values(item).some(v => String(v).toLowerCase().includes(q)));
}

function normalizeCityName(name) {
    if (!name) return '';
    const n = String(name).toLowerCase().trim();
    const alias = {
        'kachipuram': 'kanchipuram',
        'kancheepuram': 'kanchipuram',
        'thiruvannamalai': 'tiruvannamalai',
        'tiruvanamalai': 'tiruvannamalai',
        'vellore': 'vellore',
        'mahabalipuram': 'mahabalipuram',
        'madurai': 'madurai',
        'coimbatore': 'coimbatore',
        'trichy': 'trichy',
        'pondicherry': 'pondicherry',
        'bengaluru': 'bengaluru',
        'hyderabad': 'hyderabad',
        'mumbai': 'mumbai',
        'delhi': 'delhi',
        'kolkata': 'kolkata',
        'jaipur': 'jaipur',
        'ahmedabad': 'ahmedabad',
        'pune': 'pune',
        'surat': 'surat',
        'visakhapatnam': 'visakhapatnam',
        'lucknow': 'lucknow',
        'patna': 'patna',
        'chandigarh': 'chandigarh'
    };
    return alias[n] || n;
}

function filterRoutes(mode, from, to) {
    const f = normalizeCityName(from);
    const t = normalizeCityName(to);
    const matches = BOOKING_CATALOG.routes.filter(r =>
        (!mode || r.mode === mode) &&
        (!from || r.from.toLowerCase().includes(f)) &&
        (!to || r.to.toLowerCase().includes(t))
    );
    // If user provided an exact from/to and we have coordinates, synthesize a custom route
    if (matches.length === 0 && f && t) {
        const km = estimateDistanceBetweenCitiesKm(f, t);
        if (km > 0) {
            matches.push({ id: 'RT-CUSTOM', mode, from: capitalize(from), to: capitalize(to), km: Math.round(km) });
        }
    }
    return matches;
}

// ==============================
// City coordinates and distance
// ==============================
const CITY_COORDS = {
    'chennai': [13.0827, 80.2707],
    'kanchipuram': [12.8342, 79.7036],
    'tiruvannamalai': [12.2253, 79.0747],
    'vellore': [12.9165, 79.1325],
    'mahabalipuram': [12.6269, 80.1921],
    'madurai': [9.9252, 78.1198],
    'coimbatore': [11.0168, 76.9558],
    'trichy': [10.7905, 78.7047],
    'pondicherry': [11.9416, 79.8083],
    'bengaluru': [12.9716, 77.5946],
    'hyderabad': [17.3850, 78.4867],
    'mumbai': [19.0760, 72.8777],
    'delhi': [28.6139, 77.2090],
    'kolkata': [22.5726, 88.3639],
    'jaipur': [26.9124, 75.7873],
    'ahmedabad': [23.0225, 72.5714],
    'pune': [18.5204, 73.8567],
    'surat': [21.1702, 72.8311],
    'visakhapatnam': [17.6868, 83.2185],
    'lucknow': [26.8467, 80.9462],
    'patna': [25.5941, 85.1376],
    'chandigarh': [30.7333, 76.7794]
};

function toRad(value) { return (value * Math.PI) / 180; }

function haversineKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

function estimateDistanceBetweenCitiesKm(fromName, toName) {
    const a = CITY_COORDS[fromName];
    const b = CITY_COORDS[toName];
    if (!a || !b) return 0;
    return haversineKm(a[0], a[1], b[0], b[1]);
}

function capitalize(s) { try { return s.charAt(0).toUpperCase() + s.slice(1); } catch { return s; } }

function getOrders() {
    const current = localStorage.getItem(STORAGE_KEYS.ORDERS);
    if (current) {
        try { return JSON.parse(current); } catch { /* ignore */ }
    }
    // Fallback: migrate legacy key 'orders' -> STORAGE_KEYS.ORDERS
    const legacy = localStorage.getItem('orders');
    if (legacy) {
        localStorage.setItem(STORAGE_KEYS.ORDERS, legacy);
        localStorage.removeItem('orders');
        try { return JSON.parse(legacy); } catch { return []; }
    }
    return [];
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
    
    // status badge mapping
    const statusToBadge = (s) => {
        switch (s) {
            case 'pending': return '<span class="badge bg-warning text-dark">Pending</span>';
            case 'confirmed': return '<span class="badge bg-success">Confirmed</span>';
            case 'processing': return '<span class="badge bg-info text-dark">Processing</span>';
            case 'out_for_delivery': return '<span class="badge bg-primary">Out for delivery</span>';
            case 'delivered': return '<span class="badge bg-success">Delivered</span>';
            default: return `<span class=\"badge bg-secondary\">${s}</span>`;
        }
    };

    div.innerHTML = `
        <div class="card-header d-flex justify-content-between align-items-center">
            <div>
                <strong>Order #${order.id}</strong>
                <span class="ms-2">${statusToBadge(order.status)}</span>
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
                    <div class="btn-group">
                        <button class="btn btn-outline-primary btn-sm" onclick="viewOrderDetails('${order.id}')">Details</button>
                        ${order.delivery ? `<button class=\"btn btn-outline-success btn-sm\" onclick=\"trackOrderOnMap('${order.id}')\"><i class=\"fas fa-location-arrow\"></i> Track</button>` : ''}
                    </div>
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

function trackOrderOnMap(orderId) {
    const orders = getOrders();
    const order = orders.find(o => o.id === orderId);
    if (!order || !order.customer || !order.customer.address) { showAlert('No address available for this order', 'warning'); return; }
    const addr = order.customer.address;
    let url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(addr)}&travelmode=driving`;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(pos){
            const lat = pos.coords.latitude;
            const lng = pos.coords.longitude;
            window.open(`https://www.google.com/maps/dir/?api=1&origin=${lat},${lng}&destination=${encodeURIComponent(addr)}&travelmode=driving`, '_blank');
        }, function(){ window.open(url, '_blank'); });
    } else {
        window.open(url, '_blank');
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

// ============================================
// SIMPLE QA ENGINE FOR CHATBOT
// ============================================
function zomoAssistantAnswer(question) {
    const q = (question || '').toLowerCase();

    // Name memory helpers
    const getChatUserName = () => (localStorage.getItem(STORAGE_KEYS.CHAT_USER_NAME) || '').trim();
    const setChatUserName = (name) => localStorage.setItem(STORAGE_KEYS.CHAT_USER_NAME, name.trim());
    const clearChatUserName = () => localStorage.removeItem(STORAGE_KEYS.CHAT_USER_NAME);

    // Detect and store name: "my name is ..." / "i am ..." / "call me ..."
    const nameMatch = q.match(/\b(my name is|i am|i'm|call me)\s+([a-zA-Z][a-zA-Z\s]{1,40})$/);
    if (nameMatch) {
        const rawName = nameMatch[2].trim().replace(/\s+/g, ' ');
        const name = rawName.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
        setChatUserName(name);
        return `Nice to meet you, ${name}! I'll remember your name for future conversations.`;
    }

    // Ask for name
    if (q.includes('what is my name') || q.includes('do you know my name')) {
        const saved = getChatUserName();
        return saved ? `Your name is ${saved}.` : 'I don’t know your name yet. You can tell me by saying "My name is <Your Name>".';
    }

    // Forget name
    if (q.includes('forget my name') || q.includes('clear my name') || q.includes('don\'t remember my name')) {
        clearChatUserName();
        return 'Okay, I have cleared your saved name. You can tell me again anytime: "My name is ..."';
    }

    // Enhanced Greetings / small talk
    if (/^(hi|hello|hey|namaste|hola|good morning|good afternoon|good evening)[!.\s]*$/i.test(q)) {
        const timeOfDay = new Date().getHours();
        const greeting = timeOfDay < 12 ? 'Good morning' : timeOfDay < 18 ? 'Good afternoon' : 'Good evening';
        const savedName = getChatUserName();
        const nameLine = savedName ? ` ${savedName},` : '';
        return `${greeting}${nameLine} I'm your Zomo Store assistant. I can help you with:\n\n🛍️ **Shopping**: Find products, check prices, add to cart\n📦 **Orders**: Track orders, delivery status, order history\n🎫 **Tickets**: Book theatre, events, transport (flights, trains, buses)\n🚚 **Delivery**: Delivery options, tracking, delivery personnel\n👨‍💼 **Admin**: Product management, order processing\n🏪 **Seller**: Submit products for approval\n\nWhat would you like help with?`;
    }

    if (q.includes('help') || q.includes('what can you do') || q.includes('capabilities')) {
        return `I'm your comprehensive Zomo Store assistant! Here's what I can help with:\n\n**🛍️ SHOPPING & PRODUCTS**\n• Find products by name or category\n• Check prices and availability\n• Product recommendations\n• Category browsing\n\n**📦 ORDERS & DELIVERY**\n• Order status tracking\n• Delivery options (standard/express/sameday)\n• Delivery personnel information\n• Order history\n\n**🎫 TICKETS & BOOKINGS**\n• Theatre and event bookings\n• Transport routes (flights, trains, buses, cars)\n• Route search and pricing\n• Booking confirmations\n\n**👨‍💼 ADMIN FUNCTIONS**\n• Order management\n• Product catalog management\n• Delivery personnel management\n• Seller product verification\n\n**🏪 SELLER SERVICES**\n• Product submission process\n• Approval status\n• Seller account management\n\nTry asking: "Show me electronics under $200" or "Find flights from Mumbai to Delhi"`;
    }

    // Enhanced Product Search
    if (q.includes('product') || q.includes('price') || q.includes('buy') || q.includes('shop')) {
        const products = getStoredProducts();
        
        // Price range queries
        const priceMatch = q.match(/(under|below|less than|maximum|max)\s*\$?(\d+)/);
        if (priceMatch) {
            const maxPrice = parseFloat(priceMatch[2]);
            const filteredProducts = products.filter(p => p.price <= maxPrice);
            if (filteredProducts.length > 0) {
                const top = filteredProducts.slice(0, 5).map(p => `• ${p.name} - ${p.price.toFixed(2)}`).join('\n');
                return `Products under $${maxPrice}:\n${top}\n\nBrowse all products in the Shop section!`;
            }
        }
        
        // Category-specific queries
        const categories = ['electronics', 'food', 'gifts', 'vegetables', 'fruits', 'flowers', 'dresses', 'meats', 'rices', 'snacks', 'creams', 'home appliances', 'books'];
        const matchedCategory = categories.find(cat => q.includes(cat));
        if (matchedCategory) {
            const categoryProducts = products.filter(p => p.category.toLowerCase() === matchedCategory);
            if (categoryProducts.length > 0) {
                const top = categoryProducts.slice(0, 5).map(p => `• ${p.name} - ${p.price.toFixed(2)}`).join('\n');
                return `${matchedCategory.charAt(0).toUpperCase() + matchedCategory.slice(1)} products:\n${top}\n\nUse the category filter in Shop to see all ${matchedCategory} items!`;
            }
        }
        
        // General product info
        const top = products.slice(0, 8).map(p => `• ${p.name} - ${p.price.toFixed(2)}`).join('\n');
        return `🛍️ **Zomo Store Products**\n\nPopular items:\n${top}\n\n**Categories available:** Electronics, Food, Gifts, Vegetables, Fruits, Flowers, Dresses, Meats, Rices, Snacks, Creams, Home Appliances, Books\n\nVisit the Shop to browse all products and use category filters!`;
    }

    // Enhanced Cart / Checkout
    if (q.includes('cart') || q.includes('checkout') || q.includes('payment') || q.includes('buy now')) {
        const cart = getCart();
        if (cart.length > 0) {
            const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const cartItems = cart.map(item => `• ${item.name} × ${item.quantity} - ${(item.price * item.quantity).toFixed(2)}`).join('\n');
            return `🛒 **Your Cart** (${cart.length} items)\n\n${cartItems}\n\n**Subtotal:** ${cartTotal.toFixed(2)}\n\n**Next Steps:**\n1. Go to Cart page to review items\n2. Proceed to Checkout\n3. Choose delivery type (Standard/Express/Same Day)\n4. Complete payment\n\nReady to checkout?`;
        }
        return `🛒 **Shopping Cart**\n\nYour cart is currently empty. Here's how to shop:\n\n1. **Browse Products**: Visit the Shop page\n2. **Add to Cart**: Click the cart icon on any product\n3. **Review Cart**: Check your items and quantities\n4. **Checkout**: Choose delivery options and complete payment\n\nStart shopping now!`;
    }

    // Enhanced Orders / Admin
    if (q.includes('admin') && (q.includes('order') || q.includes('login') || q.includes('manage'))) {
        return `👨‍💼 **Admin Panel Access**\n\n**Login:** Use Admin Login with credentials\n\n**Admin Functions:**\n• **View Orders**: Review and confirm customer orders\n• **Manage Products**: Add, edit, or delete products\n• **Delivery Management**: Track deliveries and manage personnel\n• **Verify Products**: Approve seller submissions\n• **Add Product**: Directly add new products to catalog\n\n**Admin Credentials:**\nEmail: arunkumarpalani428@gmail.com\nPassword: Arunkumar@2006\n\nAccess the admin panel to manage your store operations!`;
    }

    if (q.includes('seller') || q.includes('submit product') || q.includes('vendor')) {
        return `🏪 **Seller Services**\n\n**How to Submit Products:**\n1. **Login**: Use Seller Login (any email + shop name)\n2. **Add Product**: Fill out product details\n3. **Submit**: Product goes to admin for approval\n4. **Approval**: Admin reviews in Verify Products section\n5. **Live**: Approved products appear in Shop\n\n**Seller Benefits:**\n• Easy product submission\n• Admin review process\n• Product goes live after approval\n• Track submission status\n\nStart selling with Zomo Store today!`;
    }

    // Enhanced Tickets
    if (q.includes('ticket') || q.includes('theatre') || q.includes('event') || q.includes('book')) {
        return `🎫 **Tickets & Bookings**\n\n**Available Services:**\n\n🎭 **Theatre & Events**\n• Movie tickets\n• Concert bookings\n• Conference tickets\n• Event reservations\n\n🚌 **Transportation**\n• **Flights**: Domestic and international routes\n• **Trains**: Railway bookings\n• **Buses**: Intercity bus routes\n• **Cars**: Car rental and taxi services\n\n**How to Book:**\n1. Go to Tickets page\n2. Select category (Theatre/Events/Car/Bus/Train/Flight)\n3. Search for shows or routes\n4. Fill booking details\n5. Confirm and download ticket\n\n**Route Search Example:** "Find flights from Mumbai to Delhi"`;
    }

    // Enhanced Delivery
    if (q.includes('delivery') || q.includes('shipping') || q.includes('track')) {
        return `🚚 **Delivery Services**\n\n**Delivery Types:**\n• **Standard**: 3-5 business days\n• **Express**: 1-2 business days\n• **Same Day**: Delivery within same day (if ordered before 2 PM)\n\n**Delivery Process:**\n1. **Checkout**: Choose delivery type and date\n2. **Assignment**: System assigns best available driver\n3. **Tracking**: Get tracking number and driver details\n4. **Updates**: SMS notifications (if opted)\n5. **Delivery**: Driver contacts you on delivery day\n\n**Driver Information:**\n• Name and contact number\n• Vehicle type (Car/Van/Motorcycle/Bicycle)\n• Estimated delivery time\n• Real-time tracking\n\n**Delivery Management:**\nAdmins can view and manage all deliveries in the Delivery Management section.`;
    }

    // Enhanced Orders lookup
    if (q.includes('my orders') || q.includes('order history') || q.includes('show orders') || q.includes('track order')) {
        const orders = getOrders();
        if (orders.length === 0) return `📦 **Order History**\n\nYou have no orders yet.\n\n**To place an order:**\n1. Browse products in Shop\n2. Add items to cart\n3. Proceed to checkout\n4. Complete delivery details\n5. Confirm order\n\nStart shopping to see your orders here!`;
        
        const recentOrders = orders.slice(0, 5).map(o => {
            const orderDate = new Date(o.orderDate || o.date).toLocaleDateString();
            const status = o.status || 'confirmed';
            const total = o.totals ? o.totals.total : o.total;
            const deliveryInfo = o.delivery ? `\n   Driver: ${o.delivery.assignedDeliveryMan.name} (${o.delivery.assignedDeliveryMan.phone})` : '';
            return `📦 **Order #${o.id}**\n   Date: ${orderDate}\n   Status: ${status}\n   Total: $${total.toFixed(2)}${deliveryInfo}`;
        }).join('\n\n');
        
        return `📦 **Your Recent Orders**\n\n${recentOrders}\n\n**Total Orders:** ${orders.length}\n\nNeed help with a specific order? Ask me about order details!`;
    }

    // Enhanced Booking search
    const fromMatch = q.match(/from\s+([a-z\s]+)\s+to\s+([a-z\s]+)/);
    if ((q.includes('find') || q.includes('route') || q.includes('flight') || q.includes('bus') || q.includes('train') || q.includes('car')) && fromMatch) {
        const from = fromMatch[1].trim();
        const to = fromMatch[2].trim();
        const mode = q.includes('flight') ? 'flight' : q.includes('train') ? 'train' : q.includes('bus') ? 'bus' : q.includes('car') ? 'car' : null;
        const results = filterRoutes(mode, from, to);
        if (results.length === 0) return `🔍 **Route Search Results**\n\nNo routes found for ${from} → ${to}\n\n**Suggestions:**\n• Try different city names\n• Check spelling\n• Use major city names\n• Open Tickets page and click "Find Routes"\n\n**Available routes:** Mumbai-Delhi, Chennai-Bangalore, Delhi-Kolkata, etc.`;
        
        const top = results.slice(0, 5).map(r => `✈️ **${r.mode.toUpperCase()}**: ${r.from} → ${r.to}\n   Distance: ${r.km} km\n   Estimated Time: ${Math.ceil(r.km / (r.mode === 'flight' ? 800 : r.mode === 'train' ? 60 : r.mode === 'bus' ? 50 : 40))} hours`).join('\n\n');
        return `🔍 **Route Search Results**\n\n${top}\n\n**Next Steps:**\n1. Go to Tickets page\n2. Select ${mode || 'transport'} category\n3. Click "Find Routes"\n4. Book your preferred option\n\nReady to book?`;
    }

    // Product-specific search
    const products = getStoredProducts();
    const found = products.find(p => q.includes(p.name.toLowerCase()) || q.includes(p.category.toLowerCase()));
    if (found) {
        return `🛍️ **${found.name}**\n\n**Price:** $${found.price.toFixed(2)}\n**Category:** ${found.category}\n**Description:** ${found.description}\n\n**Features:**\n${found.features ? found.features.map(f => `• ${f}`).join('\n') : 'No specific features listed'}\n\n**Add to Cart:** Visit the Shop page to purchase this item!`;
    }

    // Fallback with suggestions
    return `🤔 **I'm not sure about that specific question.**\n\n**I can help with:**\n• Product search and prices\n• Order tracking and history\n• Delivery information\n• Ticket bookings (theatre, transport)\n• Admin functions\n• Seller services\n\n**Try asking:**\n• "Show me electronics under $100"\n• "Find flights from Mumbai to Delhi"\n• "Track my orders"\n• "How to become a seller?"\n\nWhat would you like to know?`;
}

// ============================================
// INTERNATIONAL PROCUREMENT (ADMIN ONLY)
// ============================================
function getInternationalPurchases() {
    try {
        const raw = localStorage.getItem(INTL_STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch (e) {
        return [];
    }
}

function saveInternationalPurchases(items) {
    localStorage.setItem(INTL_STORAGE_KEY, JSON.stringify(items));
}

function addInternationalPurchase(data) {
    const items = getInternationalPurchases();
    const nextId = items.length ? Math.max(...items.map(i => parseInt(i.id.replace('IP-', '') || 0))) + 1 : 1;
    const item = {
        id: `IP-${nextId}`,
        createdAt: new Date().toISOString(),
        status: 'pending', // pending -> verified -> added
        company: data.company,
        country: data.country,
        productName: data.productName,
        category: data.category,
        price: parseFloat(data.price),
        currency: data.currency || 'USD',
        rateToUSD: data.rateToUSD || 1,
        qty: parseInt(data.qty || 1),
        shipping: parseFloat(data.shipping || 0),
        dutyPct: parseFloat(data.dutyPct || 0),
        otherFees: parseFloat(data.otherFees || 0),
        paymentStatus: data.paymentStatus || 'unpaid',
        expectedDate: data.expectedDate || '',
        description: data.description || '',
        icon: data.icon || 'fas fa-globe',
        image: data.image || '',
        refId: data.refId || ''
    };
    items.unshift(item);
    saveInternationalPurchases(items);
    return item;
}

function verifyInternationalPurchase(id) {
    const items = getInternationalPurchases();
    const idx = items.findIndex(i => i.id === id);
    if (idx === -1) return false;
    items[idx].status = 'verified';
    items[idx].verifiedAt = new Date().toISOString();
    saveInternationalPurchases(items);
    return true;
}

function addVerifiedInternationalToCatalog(id) {
    const items = getInternationalPurchases();
    const target = items.find(i => i.id === id);
    if (!target || target.status !== 'verified') return false;

    const products = getStoredProducts();
    const nextProductId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
    const newProduct = {
        id: nextProductId,
        name: target.productName,
        price: target.price,
        description: target.description || `Imported from ${target.company}, ${target.country}`,
        longDescription: target.description || `Imported from ${target.company} (${target.country}). Verified by admin via international procurement.`,
        features: [
            `Imported from ${target.country}`,
            `Supplier: ${target.company}`,
            'Verified by Zomo admin'
        ],
        icon: target.icon || 'fas fa-globe',
        image: target.image || 'images/default_product.png',
        category: target.category
    };

    // Save to products store
    products.unshift(newProduct);
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));

    // Mark as added
    const idx = items.findIndex(i => i.id === id);
    items[idx].status = 'added';
    items[idx].addedAt = new Date().toISOString();
    items[idx].addedProductId = newProduct.id;
    saveInternationalPurchases(items);
    return newProduct;
}

function removeInternationalPurchase(id) {
    const items = getInternationalPurchases().filter(i => i.id !== id);
    saveInternationalPurchases(items);
}

function exportInternationalPurchases() {
    const items = getInternationalPurchases();
    const blob = new Blob([JSON.stringify(items, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'international_purchases.json';
    a.click();
    URL.revokeObjectURL(url);
}

function renderInternationalPurchases() {
    const tbody = document.getElementById('intl-purchases-table');
    if (!tbody) return;
    const items = getInternationalPurchases();
    tbody.innerHTML = '';
    items.forEach(item => {
        const tr = document.createElement('tr');
        const badge = item.status === 'pending' ? 'secondary' : item.status === 'verified' ? 'warning' : 'success';
        const base = (item.price * (item.qty || 1));
        const duty = base * ((item.dutyPct || 0) / 100);
        const total = base + duty + (item.shipping || 0) + (item.otherFees || 0);
        tr.innerHTML = `
            <td><strong>${item.id}</strong></td>
            <td>
                <div class="d-flex align-items-center">
                    <i class="${item.icon} text-primary me-2"></i>
                    <div>
                        <div>${item.productName}</div>
                        <small class="text-muted">${item.category}</small>
                    </div>
                </div>
            </td>
            <td>${item.company}</td>
            <td>${item.country}</td>
            <td>${item.qty || 1}</td>
            <td>$${total.toFixed(2)}</td>
            <td><span class="badge bg-${badge}">${item.status}</span></td>
            <td class="text-end">
                ${item.status === 'pending' ? `<button class="btn btn-sm btn-outline-warning me-2" onclick="verifyInternational('${item.id}')"><i class=\"fas fa-check-double\"></i> Verify</button>` : ''}
                ${item.status === 'verified' ? `<button class="btn btn-sm btn-outline-success me-2" onclick="addInternationalToCatalog('${item.id}')"><i class=\"fas fa-cart-plus\"></i> Add to Catalog</button>` : ''}
                <button class="btn btn-sm btn-outline-danger" onclick="removeInternational('${item.id}')"><i class="fas fa-trash"></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    // Render companies summary
    const companiesTbody = document.getElementById('intl-companies-table');
    if (companiesTbody) {
        companiesTbody.innerHTML = '';
        const byCompany = {};
        items.forEach(item => {
            const key = `${item.company}|||${item.country}`;
            if (!byCompany[key]) {
                byCompany[key] = { company: item.company, country: item.country, total: 0, verified: 0, added: 0 };
            }
            byCompany[key].total += 1;
            if (item.status === 'verified') byCompany[key].verified += 1;
            if (item.status === 'added') byCompany[key].added += 1;
        });
        Object.values(byCompany).forEach(info => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${info.company}</td>
                <td>${info.country}</td>
                <td><span class="badge bg-secondary">${info.total}</span></td>
                <td><span class="badge bg-warning text-dark">${info.verified}</span></td>
                <td><span class="badge bg-success">${info.added}</span></td>
                <td class="text-end">
                    <button class="btn btn-sm btn-outline-primary" onclick="viewCompanyProducts('${info.company.replace(/'/g, "&#39;")}', '${info.country.replace(/'/g, "&#39;")}')"><i class="fas fa-eye"></i> View</button>
                </td>
            `;
            companiesTbody.appendChild(tr);
        });
    }
}

function initializeInternationalProcurement() {
    const form = document.getElementById('intl-purchase-form');
    if (!form) return;
    // Grab inputs for calculations and previews
    const currencySelect = document.getElementById('intlCurrency');
    const rateInput = document.getElementById('intlRate');
    const priceInput = document.getElementById('intlPrice');
    const qtyInput = document.getElementById('intlQty');
    const shipInput = document.getElementById('intlShipping');
    const dutyInput = document.getElementById('intlDutyPct');
    const otherInput = document.getElementById('intlOtherFees');
    const categorySelect = document.getElementById('intlCategory');
    const iconInput = document.getElementById('intlIcon');
    const iconPreview = document.getElementById('intlIconPreview');
    const imageInput = document.getElementById('intlImage');
    const imagePreview = document.getElementById('intlImagePreview');
    const imageFileInput = document.getElementById('intlImageFile');

    function getRate(cur) {
        const rates = { USD: 1, EUR: 1.08, INR: 0.012, JPY: 0.0067, GBP: 1.27 };
        return rates[cur] || 1;
    }

    function recalcLanded() {
        if (!priceInput || !qtyInput || !shipInput || !dutyInput || !otherInput) return;
        const qty = parseInt(qtyInput.value || 1);
        const price = parseFloat(priceInput.value || 0);
        const ship = parseFloat(shipInput.value || 0);
        const dutyPct = parseFloat(dutyInput.value || 0);
        const other = parseFloat(otherInput.value || 0);
        const base = price * qty;
        const duty = base * (dutyPct / 100);
        const total = base + duty + ship + other;
        const baseEl = document.getElementById('intlBaseCost');
        const dutyEl = document.getElementById('intlDutyAmt');
        const shipEl = document.getElementById('intlShippingAmt');
        const otherEl = document.getElementById('intlOtherAmt');
        const totalEl = document.getElementById('intlTotalLanded');
        const unitEl = document.getElementById('intlUnitLanded');
        if (baseEl) baseEl.textContent = `${base.toFixed(2)}`;
        if (dutyEl) dutyEl.textContent = `${duty.toFixed(2)}`;
        if (shipEl) shipEl.textContent = `${ship.toFixed(2)}`;
        if (otherEl) otherEl.textContent = `${other.toFixed(2)}`;
        if (totalEl) totalEl.textContent = `${total.toFixed(2)}`;
        if (unitEl) unitEl.textContent = `${(qty > 0 ? total/qty : 0).toFixed(2)}`;
    }

    if (currencySelect && rateInput) {
        currencySelect.addEventListener('change', function() {
            rateInput.value = getRate(currencySelect.value);
            recalcLanded();
        });
        rateInput.value = getRate(currencySelect.value);
    }
    [priceInput, qtyInput, shipInput, dutyInput, otherInput].forEach(el => el && el.addEventListener('input', recalcLanded));
    recalcLanded();

    function suggestIconForCategory(cat) {
        const map = {
            'Electronics': 'fas fa-bolt',
            'Food': 'fas fa-utensils',
            'Gifts': 'fas fa-gift',
            'Vegetables': 'fas fa-seedling',
            'Fruits': 'fas fa-apple-whole',
            'Flowers': 'fas fa-spa',
            'Dresses': 'fas fa-tshirt',
            'Meats': 'fas fa-drumstick-bite',
            'Rices': 'fas fa-bowl-rice',
            'Snacks': 'fas fa-cookie-bite',
            'Creams': 'fas fa-pump-medical',
            'Home Appliances': 'fas fa-blender',
            'Books': 'fas fa-book'
        };
        return map[cat] || 'fas fa-globe';
    }
    function updateIconPreview() {
        if (!iconPreview) return;
        const val = (iconInput && iconInput.value || '').trim();
        const useClass = val || suggestIconForCategory(categorySelect ? categorySelect.value : '');
        iconPreview.className = useClass + ' text-primary';
    }
    if (categorySelect) categorySelect.addEventListener('change', updateIconPreview);
    if (iconInput) iconInput.addEventListener('input', updateIconPreview);
    updateIconPreview();

    function updateImagePreview() {
        if (!imagePreview) return;
        const url = (imageInput && imageInput.value || '').trim();
        if (url) {
            imagePreview.src = url;
            imagePreview.style.display = 'block';
        } else {
            imagePreview.removeAttribute('src');
            imagePreview.style.display = 'none';
        }
    }
    if (imageInput) imageInput.addEventListener('input', updateImagePreview);
    updateImagePreview();

    // Handle local image file upload (encode to base64 and preview)
    if (imageFileInput) {
        imageFileInput.addEventListener('change', function() {
            const file = imageFileInput.files && imageFileInput.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = function(e) {
                const dataUrl = e.target.result;
                if (imageInput) imageInput.value = dataUrl; // keep a single source of truth
                updateImagePreview();
            };
            reader.readAsDataURL(file);
        });
    }
    const duplicateBtn = document.getElementById('intlDuplicateLastBtn');
    if (duplicateBtn) {
        duplicateBtn.addEventListener('click', function() {
            const items = getInternationalPurchases();
            if (!items.length) { showAlert('No previous purchase found to duplicate.', 'info'); return; }
            const last = items[0];
            const map = {
                intlCompany: last.company,
                intlCountry: last.country,
                intlProductName: last.productName,
                intlCategory: last.category,
                intlPrice: last.price,
                intlIcon: last.icon || '',
                intlImage: last.image || '',
                intlRefId: last.refId || ''
            };
            Object.keys(map).forEach(id => { const el = document.getElementById(id); if (el) el.value = map[id]; });
            if (document.getElementById('intlImage')) document.getElementById('intlImage').dispatchEvent(new Event('input'));
            if (document.getElementById('intlCategory')) document.getElementById('intlCategory').dispatchEvent(new Event('change'));
            showAlert('Form prefilled from the most recent purchase.', 'success');
        });
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const company = document.getElementById('intlCompany').value.trim();
        const country = document.getElementById('intlCountry').value.trim();
        const productName = document.getElementById('intlProductName').value.trim();
        const category = document.getElementById('intlCategory').value.trim();
        const price = parseFloat(document.getElementById('intlPrice').value);
        const currency = (document.getElementById('intlCurrency') || {}).value;
        const rateToUSD = parseFloat((document.getElementById('intlRate') || { value: 1 }).value || 1);
        const qty = parseInt((document.getElementById('intlQty') || { value: 1 }).value || 1);
        const shipping = parseFloat((document.getElementById('intlShipping') || { value: 0 }).value || 0);
        const dutyPct = parseFloat((document.getElementById('intlDutyPct') || { value: 0 }).value || 0);
        const otherFees = parseFloat((document.getElementById('intlOtherFees') || { value: 0 }).value || 0);
        const paymentStatus = (document.getElementById('intlPaymentStatus') || {}).value || 'unpaid';
        const expectedDate = (document.getElementById('intlExpectedDate') || {}).value || '';
        const description = document.getElementById('intlDescription').value.trim();
        const icon = document.getElementById('intlIcon').value.trim();
        const image = document.getElementById('intlImage').value.trim();
        const refId = document.getElementById('intlRefId').value.trim();

        if (!company || !country || !productName || !category || !price || !qty) {
            showAlert('Please fill in all required fields.', 'warning');
            return;
        }

        const added = addInternationalPurchase({ company, country, productName, category, price, currency, rateToUSD, qty, shipping, dutyPct, otherFees, paymentStatus, expectedDate, description, icon, image, refId });
        const autoAdd = (document.getElementById('intlAutoAdd') || {}).checked;
        if (autoAdd && added && added.id) {
            verifyInternationalPurchase(added.id);
            const product = addVerifiedInternationalToCatalog(added.id);
            if (product) {
                showAlert(`Saved, verified, and added to catalog: ${product.name}`, 'success');
            } else {
                showAlert('Saved and verified. Failed to add to catalog.', 'warning');
            }
        } else {
            showAlert('International purchase added. Awaiting verification.', 'success');
        }
        form.reset();
        recalcLanded();
        updateIconPreview();
        updateImagePreview();
        renderInternationalPurchases();
    });

    // Expose action handlers
    window.verifyInternational = function(id) {
        if (verifyInternationalPurchase(id)) {
            showAlert('Purchase verified. You can now add it to the catalog.', 'success');
            renderInternationalPurchases();
        }
    };

    window.addInternationalToCatalog = function(id) {
        const product = addVerifiedInternationalToCatalog(id);
        if (product) {
            showAlert(`Added to catalog: ${product.name}`, 'success');
            renderInternationalPurchases();
        } else {
            showAlert('Please verify the purchase before adding to catalog.', 'warning');
        }
    };

    window.removeInternational = function(id) {
        if (confirm('Remove this international purchase?')) {
            removeInternationalPurchase(id);
            renderInternationalPurchases();
        }
    };

    // View company products
    window.viewCompanyProducts = function(company, country) {
        const items = getInternationalPurchases().filter(i => i.company === company && i.country === country);
        const tbody = document.getElementById('company-products-table');
        if (tbody) {
            tbody.innerHTML = '';
            items.forEach(item => {
                const tr = document.createElement('tr');
                const badge = item.status === 'pending' ? 'secondary' : item.status === 'verified' ? 'warning' : 'success';
                tr.innerHTML = `
                    <td><strong>${item.id}</strong></td>
                    <td>
                        <div class="d-flex align-items-center">
                            <i class="${item.icon} text-primary me-2"></i>
                            <div>${item.productName}</div>
                        </div>
                    </td>
                    <td>${item.category}</td>
                    <td><span class="badge bg-${badge}">${item.status}</span></td>
                    <td class="text-end">
                        ${item.status === 'pending' ? `<button class="btn btn-sm btn-outline-warning me-2" onclick="verifyInternational('${item.id}')"><i class=\"fas fa-check-double\"></i></button>` : ''}
                        ${item.status === 'verified' ? `<button class="btn btn-sm btn-outline-success" onclick="addInternationalToCatalog('${item.id}')"><i class=\"fas fa-cart-plus\"></i></button>` : ''}
                    </td>
                `;
                tbody.appendChild(tr);
            });
        }
        const modalEl = document.getElementById('companyProductsModal');
        if (modalEl) new bootstrap.Modal(modalEl).show();
    };

    renderInternationalPurchases();

    // Initialize Supplier Catalog UI
    initializeSupplierCatalog();

    // Render companies with local images
    renderCompanyListWithLocalImages();
}

// ===== Supplier Catalog (static sample data + localStorage) =====
const SUPPLIER_STORAGE_KEY = 'zomostore_suppliers';
function getDefaultSuppliers() {
    return [
        {
            name: 'TechCorp Global',
            country: 'USA',
            status: 'disconnected',
            products: [
                { name: 'iPhone 15 Pro Max', category: 'Electronics', price: 1199.99, image: 'images/products/iphone15.jpg', icon: 'fas fa-mobile-alt' },
                { name: 'MacBook Pro M3', category: 'Electronics', price: 1999.99, image: 'images/products/macbook.jpg', icon: 'fas fa-laptop' },
                { name: 'AirPods Pro 2', category: 'Electronics', price: 249.99, image: 'images/products/airpods.jpg', icon: 'fas fa-headphones' },
                { name: 'Apple Watch Series 9', category: 'Electronics', price: 399.99, image: 'images/products/applewatch.jpg', icon: 'fas fa-clock' },
                { name: 'iPad Pro 12.9"', category: 'Electronics', price: 1099.99, image: 'images/products/ipad.jpg', icon: 'fas fa-tablet-alt' },
                { name: 'Magic Keyboard', category: 'Electronics', price: 99.99, image: 'images/products/keyboard.jpg', icon: 'fas fa-keyboard' },
                { name: 'Magic Mouse', category: 'Electronics', price: 79.99, image: 'images/products/mouse.jpg', icon: 'fas fa-mouse' },
                { name: 'Studio Display', category: 'Electronics', price: 1599.99, image: 'images/products/display.jpg', icon: 'fas fa-tv' },
                { name: 'HomePod Mini', category: 'Electronics', price: 99.99, image: 'images/products/homepod.jpg', icon: 'fas fa-volume-up' },
                { name: 'Apple TV 4K', category: 'Electronics', price: 179.99, image: 'images/products/appletv.jpg', icon: 'fas fa-tv' },
                { name: 'Lightning Cable', category: 'Electronics', price: 19.99, image: 'images/products/cable.jpg', icon: 'fas fa-plug' },
                { name: 'MagSafe Charger', category: 'Electronics', price: 39.99, image: 'images/products/magsafe.jpg', icon: 'fas fa-battery-full' },
                { name: 'AirTag 4-Pack', category: 'Electronics', price: 99.99, image: 'images/products/airtag.jpg', icon: 'fas fa-tag' },
                { name: 'Apple Pencil 2', category: 'Electronics', price: 129.99, image: 'images/products/pencil.jpg', icon: 'fas fa-pen' },
                { name: 'Magic Trackpad', category: 'Electronics', price: 149.99, image: 'images/products/trackpad.jpg', icon: 'fas fa-hand-paper' },
                { name: 'Pro Stand', category: 'Electronics', price: 999.99, image: 'images/products/stand.jpg', icon: 'fas fa-desktop' },
                { name: 'VESA Mount Adapter', category: 'Electronics', price: 199.99, image: 'images/products/vesa.jpg', icon: 'fas fa-tools' },
                { name: 'Nano-Texture Glass', category: 'Electronics', price: 100.00, image: 'images/products/glass.jpg', icon: 'fas fa-shield-alt' },
                { name: 'Thunderbolt 4 Cable', category: 'Electronics', price: 159.99, image: 'images/products/thunderbolt.jpg', icon: 'fas fa-bolt' },
                { name: 'USB-C to Lightning', category: 'Electronics', price: 19.99, image: 'images/products/usbc.jpg', icon: 'fas fa-usb' },
                { name: 'Lightning to 3.5mm', category: 'Electronics', price: 9.99, image: 'images/products/audio.jpg', icon: 'fas fa-headphones' },
                { name: 'USB-C to USB Adapter', category: 'Electronics', price: 19.99, image: 'images/products/adapter.jpg', icon: 'fas fa-exchange-alt' }
            ]
        },
        {
            name: 'Samsung Electronics',
            country: 'South Korea',
            status: 'disconnected',
            products: [
                { name: 'Galaxy S24 Ultra', category: 'Electronics', price: 1299.99, image: 'images/products/galaxy24.jpg', icon: 'fas fa-mobile-alt' },
                { name: 'Galaxy Z Fold 5', category: 'Electronics', price: 1799.99, image: 'images/products/fold5.jpg', icon: 'fas fa-mobile-alt' },
                { name: 'Galaxy Watch 6', category: 'Electronics', price: 299.99, image: 'images/products/galaxywatch.jpg', icon: 'fas fa-clock' },
                { name: 'Galaxy Buds 2 Pro', category: 'Electronics', price: 229.99, image: 'images/products/galaxybuds.jpg', icon: 'fas fa-headphones' },
                { name: 'Galaxy Tab S9', category: 'Electronics', price: 799.99, image: 'images/products/galaxytab.jpg', icon: 'fas fa-tablet-alt' },
                { name: 'Samsung QLED TV 65"', category: 'Electronics', price: 1299.99, image: 'images/products/qledtv.jpg', icon: 'fas fa-tv' },
                { name: 'Samsung Refrigerator', category: 'Home Appliances', price: 1899.99, image: 'images/products/fridge.jpg', icon: 'fas fa-snowflake' },
                { name: 'Samsung Washer', category: 'Home Appliances', price: 899.99, image: 'images/products/washer.jpg', icon: 'fas fa-tshirt' },
                { name: 'Samsung Dryer', category: 'Home Appliances', price: 799.99, image: 'images/products/dryer.jpg', icon: 'fas fa-wind' },
                { name: 'Samsung Microwave', category: 'Home Appliances', price: 299.99, image: 'images/products/microwave.jpg', icon: 'fas fa-microphone' },
                { name: 'Samsung Air Purifier', category: 'Home Appliances', price: 399.99, image: 'images/products/airpurifier.jpg', icon: 'fas fa-wind' },
                { name: 'Samsung Vacuum', category: 'Home Appliances', price: 599.99, image: 'images/products/vacuum.jpg', icon: 'fas fa-broom' },
                { name: 'Samsung Monitor 27"', category: 'Electronics', price: 299.99, image: 'images/products/monitor.jpg', icon: 'fas fa-desktop' },
                { name: 'Samsung SSD 1TB', category: 'Electronics', price: 149.99, image: 'images/products/ssd.jpg', icon: 'fas fa-hdd' },
                { name: 'Samsung Memory Card', category: 'Electronics', price: 29.99, image: 'images/products/memory.jpg', icon: 'fas fa-sd-card' },
                { name: 'Samsung Charger', category: 'Electronics', price: 39.99, image: 'images/products/samsungcharger.jpg', icon: 'fas fa-plug' },
                { name: 'Samsung Case', category: 'Electronics', price: 19.99, image: 'images/products/samsungcase.jpg', icon: 'fas fa-shield-alt' },
                { name: 'Samsung Screen Protector', category: 'Electronics', price: 9.99, image: 'images/products/screenprotector.jpg', icon: 'fas fa-shield-alt' },
                { name: 'Samsung Wireless Charger', category: 'Electronics', price: 49.99, image: 'images/products/wirelesscharger.jpg', icon: 'fas fa-battery-full' },
                { name: 'Samsung Car Mount', category: 'Electronics', price: 29.99, image: 'images/products/carmount.jpg', icon: 'fas fa-car' },
                { name: 'Samsung Power Bank', category: 'Electronics', price: 39.99, image: 'images/products/powerbank.jpg', icon: 'fas fa-battery-half' },
                { name: 'Samsung Cable', category: 'Electronics', price: 19.99, image: 'images/products/samsungcable.jpg', icon: 'fas fa-plug' }
            ]
        },
        {
            name: 'Sony Corporation',
            country: 'Japan',
            status: 'disconnected',
            products: [
                { name: 'PlayStation 5', category: 'Electronics', price: 499.99, image: 'images/products/ps5.jpg', icon: 'fas fa-gamepad' },
                { name: 'Sony WH-1000XM5', category: 'Electronics', price: 399.99, image: 'images/products/sonyheadphones.jpg', icon: 'fas fa-headphones' },
                { name: 'Sony A7R V Camera', category: 'Electronics', price: 3899.99, image: 'images/products/sonycamera.jpg', icon: 'fas fa-camera' },
                { name: 'Sony Bravia OLED TV', category: 'Electronics', price: 1999.99, image: 'images/products/sonytv.jpg', icon: 'fas fa-tv' },
                { name: 'Sony WF-1000XM4', category: 'Electronics', price: 279.99, image: 'images/products/sonyearbuds.jpg', icon: 'fas fa-headphones' },
                { name: 'Sony WH-1000XM4', category: 'Electronics', price: 349.99, image: 'images/products/sonyheadphones2.jpg', icon: 'fas fa-headphones' },
                { name: 'Sony PlayStation VR2', category: 'Electronics', price: 549.99, image: 'images/products/psvr2.jpg', icon: 'fas fa-vr-cardboard' },
                { name: 'Sony DualSense Controller', category: 'Electronics', price: 69.99, image: 'images/products/dualsense.jpg', icon: 'fas fa-gamepad' },
                { name: 'Sony Soundbar', category: 'Electronics', price: 299.99, image: 'images/products/soundbar.jpg', icon: 'fas fa-volume-up' },
                { name: 'Sony Blu-ray Player', category: 'Electronics', price: 199.99, image: 'images/products/bluray.jpg', icon: 'fas fa-compact-disc' },
                { name: 'Sony Walkman', category: 'Electronics', price: 249.99, image: 'images/products/walkman.jpg', icon: 'fas fa-music' },
                { name: 'Sony Lens 24-70mm', category: 'Electronics', price: 2199.99, image: 'images/products/sonylens.jpg', icon: 'fas fa-camera' },
                { name: 'Sony Memory Card', category: 'Electronics', price: 79.99, image: 'images/products/sonymemory.jpg', icon: 'fas fa-sd-card' },
                { name: 'Sony Tripod', category: 'Electronics', price: 149.99, image: 'images/products/tripod.jpg', icon: 'fas fa-camera' },
                { name: 'Sony Camera Bag', category: 'Electronics', price: 89.99, image: 'images/products/camerabag.jpg', icon: 'fas fa-briefcase' },
                { name: 'Sony Battery Pack', category: 'Electronics', price: 79.99, image: 'images/products/sonybattery.jpg', icon: 'fas fa-battery-full' },
                { name: 'Sony Charger', category: 'Electronics', price: 49.99, image: 'images/products/sonycharger.jpg', icon: 'fas fa-plug' },
                { name: 'Sony Cable', category: 'Electronics', price: 19.99, image: 'images/products/sonycable.jpg', icon: 'fas fa-plug' },
                { name: 'Sony Case', category: 'Electronics', price: 29.99, image: 'images/products/sonycase.jpg', icon: 'fas fa-shield-alt' },
                { name: 'Sony Screen Protector', category: 'Electronics', price: 12.99, image: 'images/products/sonyscreen.jpg', icon: 'fas fa-shield-alt' },
                { name: 'Sony Mount', category: 'Electronics', price: 39.99, image: 'images/products/sonymount.jpg', icon: 'fas fa-tools' },
                { name: 'Sony Filter', category: 'Electronics', price: 59.99, image: 'images/products/sonyfilter.jpg', icon: 'fas fa-camera' }
            ]
        },
        {
            name: 'BMW Group',
            country: 'Germany',
            status: 'disconnected',
            products: [
                { name: 'BMW iX Electric SUV', category: 'Electronics', price: 83900.00, image: 'images/products/bmwix.jpg', icon: 'fas fa-car' },
                { name: 'BMW 3 Series', category: 'Electronics', price: 42950.00, image: 'images/products/bmw3series.jpg', icon: 'fas fa-car' },
                { name: 'BMW X5 SUV', category: 'Electronics', price: 60800.00, image: 'images/products/bmwx5.jpg', icon: 'fas fa-car' },
                { name: 'BMW M3 Sedan', category: 'Electronics', price: 72900.00, image: 'images/products/bmwm3.jpg', icon: 'fas fa-car' },
                { name: 'BMW Z4 Roadster', category: 'Electronics', price: 49900.00, image: 'images/products/bmwz4.jpg', icon: 'fas fa-car' },
                { name: 'BMW 7 Series', category: 'Electronics', price: 86900.00, image: 'images/products/bmw7series.jpg', icon: 'fas fa-car' },
                { name: 'BMW X3 SUV', category: 'Electronics', price: 43900.00, image: 'images/products/bmwx3.jpg', icon: 'fas fa-car' },
                { name: 'BMW 5 Series', category: 'Electronics', price: 54900.00, image: 'images/products/bmw5series.jpg', icon: 'fas fa-car' },
                { name: 'BMW i4 Electric', category: 'Electronics', price: 55400.00, image: 'images/products/bmwi4.jpg', icon: 'fas fa-car' },
                { name: 'BMW X7 SUV', category: 'Electronics', price: 74900.00, image: 'images/products/bmwx7.jpg', icon: 'fas fa-car' },
                { name: 'BMW 2 Series', category: 'Electronics', price: 35900.00, image: 'images/products/bmw2series.jpg', icon: 'fas fa-car' },
                { name: 'BMW 4 Series', category: 'Electronics', price: 45900.00, image: 'images/products/bmw4series.jpg', icon: 'fas fa-car' },
                { name: 'BMW 8 Series', category: 'Electronics', price: 84900.00, image: 'images/products/bmw8series.jpg', icon: 'fas fa-car' },
                { name: 'BMW X1 SUV', category: 'Electronics', price: 35900.00, image: 'images/products/bmwx1.jpg', icon: 'fas fa-car' },
                { name: 'BMW i3 Electric', category: 'Electronics', price: 44450.00, image: 'images/products/bmwi3.jpg', icon: 'fas fa-car' },
                { name: 'BMW Motorcycle R1250GS', category: 'Electronics', price: 17995.00, image: 'images/products/bmwmotorcycle.jpg', icon: 'fas fa-motorcycle' },
                { name: 'BMW Car Cover', category: 'Electronics', price: 199.99, image: 'images/products/bmwcover.jpg', icon: 'fas fa-shield-alt' },
                { name: 'BMW Floor Mats', category: 'Electronics', price: 149.99, image: 'images/products/bmwfloormats.jpg', icon: 'fas fa-square' },
                { name: 'BMW Key Chain', category: 'Electronics', price: 29.99, image: 'images/products/bmwkeychain.jpg', icon: 'fas fa-key' },
                { name: 'BMW License Plate Frame', category: 'Electronics', price: 39.99, image: 'images/products/bmwplate.jpg', icon: 'fas fa-id-card' },
                { name: 'BMW Air Freshener', category: 'Electronics', price: 9.99, image: 'images/products/bmwairfreshener.jpg', icon: 'fas fa-wind' },
                { name: 'BMW Steering Wheel Cover', category: 'Electronics', price: 49.99, image: 'images/products/bmwsteering.jpg', icon: 'fas fa-circle' }
            ]
        },
        {
            name: 'Nestlé Global',
            country: 'Switzerland',
            status: 'disconnected',
            products: [
                { name: 'Nescafé Classic Coffee', category: 'Food', price: 12.99, image: 'images/products/nescafe.jpg', icon: 'fas fa-coffee' },
                { name: 'KitKat Chocolate Bar', category: 'Snacks', price: 2.99, image: 'images/products/kitkat.jpg', icon: 'fas fa-cookie-bite' },
                { name: 'Nesquik Chocolate Powder', category: 'Food', price: 8.99, image: 'images/products/nesquik.jpg', icon: 'fas fa-glass-whiskey' },
                { name: 'Maggi Noodles', category: 'Food', price: 1.99, image: 'images/products/maggi.jpg', icon: 'fas fa-utensils' },
                { name: 'Gerber Baby Food', category: 'Food', price: 1.49, image: 'images/products/gerber.jpg', icon: 'fas fa-baby' },
                { name: 'Purina Pet Food', category: 'Food', price: 24.99, image: 'images/products/purina.jpg', icon: 'fas fa-paw' },
                { name: 'Nestlé Water Bottle', category: 'Food', price: 1.29, image: 'images/products/nestlewater.jpg', icon: 'fas fa-tint' },
                { name: 'Smarties Candy', category: 'Snacks', price: 3.99, image: 'images/products/smarties.jpg', icon: 'fas fa-candy-cane' },
                { name: 'Aero Chocolate Bar', category: 'Snacks', price: 2.49, image: 'images/products/aero.jpg', icon: 'fas fa-cookie-bite' },
                { name: 'Coffee-Mate Creamer', category: 'Food', price: 4.99, image: 'images/products/coffeemate.jpg', icon: 'fas fa-coffee' },
                { name: 'Häagen-Dazs Ice Cream', category: 'Food', price: 5.99, image: 'images/products/haagendazs.jpg', icon: 'fas fa-ice-cream' },
                { name: 'Drumstick Ice Cream', category: 'Food', price: 4.99, image: 'images/products/drumstick.jpg', icon: 'fas fa-ice-cream' },
                { name: 'Nestlé Crunch Bar', category: 'Snacks', price: 1.99, image: 'images/products/crunch.jpg', icon: 'fas fa-cookie-bite' },
                { name: 'Butterfinger Bar', category: 'Snacks', price: 1.99, image: 'images/products/butterfinger.jpg', icon: 'fas fa-cookie-bite' },
                { name: 'Nestlé Toll House Cookies', category: 'Snacks', price: 3.99, image: 'images/products/tollhouse.jpg', icon: 'fas fa-cookie-bite' },
                { name: 'Nestlé Hot Cocoa', category: 'Food', price: 6.99, image: 'images/products/hotcocoa.jpg', icon: 'fas fa-mug-hot' },
                { name: 'Nestlé Breakfast Cereal', category: 'Food', price: 4.99, image: 'images/products/cereal.jpg', icon: 'fas fa-bowl-rice' },
                { name: 'Nestlé Yogurt', category: 'Food', price: 1.29, image: 'images/products/yogurt.jpg', icon: 'fas fa-ice-cream' },
                { name: 'Nestlé Milk Powder', category: 'Food', price: 9.99, image: 'images/products/milkpowder.jpg', icon: 'fas fa-glass-whiskey' },
                { name: 'Nestlé Condensed Milk', category: 'Food', price: 2.99, image: 'images/products/condensedmilk.jpg', icon: 'fas fa-glass-whiskey' },
                { name: 'Nestlé Evaporated Milk', category: 'Food', price: 2.49, image: 'images/products/evaporatedmilk.jpg', icon: 'fas fa-glass-whiskey' },
                { name: 'Nestlé Cream', category: 'Food', price: 3.99, image: 'images/products/nestlecream.jpg', icon: 'fas fa-glass-whiskey' }
            ]
        },
        {
            name: 'Unilever Global',
            country: 'Netherlands',
            status: 'disconnected',
            products: [
                { name: 'Dove Soap Bar', category: 'Creams', price: 2.99, image: 'images/products/dovesoap.jpg', icon: 'fas fa-soap' },
                { name: 'Axe Body Spray', category: 'Creams', price: 4.99, image: 'images/products/axe.jpg', icon: 'fas fa-spray-can' },
                { name: 'Lux Shower Gel', category: 'Creams', price: 3.99, image: 'images/products/lux.jpg', icon: 'fas fa-shower' },
                { name: 'Rexona Deodorant', category: 'Creams', price: 3.49, image: 'images/products/rexona.jpg', icon: 'fas fa-spray-can' },
                { name: 'Pond\'s Face Cream', category: 'Creams', price: 8.99, image: 'images/products/ponds.jpg', icon: 'fas fa-hand-holding-heart' },
                { name: 'Vaseline Petroleum Jelly', category: 'Creams', price: 4.99, image: 'images/products/vaseline.jpg', icon: 'fas fa-hand-holding-heart' },
                { name: 'TRESemmé Shampoo', category: 'Creams', price: 6.99, image: 'images/products/tresemme.jpg', icon: 'fas fa-shower' },
                { name: 'Clear Shampoo', category: 'Creams', price: 5.99, image: 'images/products/clear.jpg', icon: 'fas fa-shower' },
                { name: 'Sunlight Dish Soap', category: 'Creams', price: 2.49, image: 'images/products/sunlight.jpg', icon: 'fas fa-soap' },
                { name: 'Cif Cleaning Spray', category: 'Creams', price: 3.99, image: 'images/products/cif.jpg', icon: 'fas fa-spray-can' },
                { name: 'Comfort Fabric Softener', category: 'Creams', price: 4.99, image: 'images/products/comfort.jpg', icon: 'fas fa-tshirt' },
                { name: 'Persil Laundry Detergent', category: 'Creams', price: 7.99, image: 'images/products/persil.jpg', icon: 'fas fa-tshirt' },
                { name: 'Omo Laundry Powder', category: 'Creams', price: 6.99, image: 'images/products/omo.jpg', icon: 'fas fa-tshirt' },
                { name: 'Surf Laundry Liquid', category: 'Creams', price: 5.99, image: 'images/products/surf.jpg', icon: 'fas fa-tshirt' },
                { name: 'Dove Shampoo', category: 'Creams', price: 7.99, image: 'images/products/doveshampoo.jpg', icon: 'fas fa-shower' },
                { name: 'Dove Conditioner', category: 'Creams', price: 7.99, image: 'images/products/doveconditioner.jpg', icon: 'fas fa-shower' },
                { name: 'Axe Shampoo', category: 'Creams', price: 5.99, image: 'images/products/axeshampoo.jpg', icon: 'fas fa-shower' },
                { name: 'Axe Body Wash', category: 'Creams', price: 4.99, image: 'images/products/axebodywash.jpg', icon: 'fas fa-shower' },
                { name: 'Dove Body Wash', category: 'Creams', price: 5.99, image: 'images/products/dovebodywash.jpg', icon: 'fas fa-shower' },
                { name: 'Lux Body Lotion', category: 'Creams', price: 6.99, image: 'images/products/luxlotion.jpg', icon: 'fas fa-hand-holding-heart' },
                { name: 'Pond\'s Face Wash', category: 'Creams', price: 7.99, image: 'images/products/pondsfacewash.jpg', icon: 'fas fa-hand-holding-heart' },
                { name: 'Vaseline Lip Balm', category: 'Creams', price: 2.99, image: 'images/products/vaselinelip.jpg', icon: 'fas fa-hand-holding-heart' }
            ]
        },
        {
            name: 'Toyota Motor Corporation',
            country: 'Japan',
            status: 'disconnected',
            products: [
                { name: 'Toyota Camry Hybrid', category: 'Electronics', price: 28400.00, image: 'images/products/camry.jpg', icon: 'fas fa-car' },
                { name: 'Toyota Prius', category: 'Electronics', price: 24525.00, image: 'images/products/prius.jpg', icon: 'fas fa-car' },
                { name: 'Toyota RAV4', category: 'Electronics', price: 26825.00, image: 'images/products/rav4.jpg', icon: 'fas fa-car' },
                { name: 'Toyota Highlander', category: 'Electronics', price: 35650.00, image: 'images/products/highlander.jpg', icon: 'fas fa-car' },
                { name: 'Toyota Corolla', category: 'Electronics', price: 20125.00, image: 'images/products/corolla.jpg', icon: 'fas fa-car' },
                { name: 'Toyota Tacoma', category: 'Electronics', price: 26800.00, image: 'images/products/tacoma.jpg', icon: 'fas fa-truck' },
                { name: 'Toyota Tundra', category: 'Electronics', price: 35965.00, image: 'images/products/tundra.jpg', icon: 'fas fa-truck' },
                { name: 'Toyota 4Runner', category: 'Electronics', price: 37710.00, image: 'images/products/4runner.jpg', icon: 'fas fa-car' },
                { name: 'Toyota Avalon', category: 'Electronics', price: 36825.00, image: 'images/products/avalon.jpg', icon: 'fas fa-car' },
                { name: 'Toyota Sienna', category: 'Electronics', price: 34460.00, image: 'images/products/sienna.jpg', icon: 'fas fa-car' },
                { name: 'Toyota C-HR', category: 'Electronics', price: 22150.00, image: 'images/products/chr.jpg', icon: 'fas fa-car' },
                { name: 'Toyota Venza', category: 'Electronics', price: 33425.00, image: 'images/products/venza.jpg', icon: 'fas fa-car' },
                { name: 'Toyota GR Supra', category: 'Electronics', price: 43715.00, image: 'images/products/supra.jpg', icon: 'fas fa-car' },
                { name: 'Toyota Mirai Hydrogen', category: 'Electronics', price: 49500.00, image: 'images/products/mirai.jpg', icon: 'fas fa-car' },
                { name: 'Toyota bZ4X Electric', category: 'Electronics', price: 42000.00, image: 'images/products/bz4x.jpg', icon: 'fas fa-car' },
                { name: 'Toyota Car Cover', category: 'Electronics', price: 149.99, image: 'images/products/toyotacover.jpg', icon: 'fas fa-shield-alt' },
                { name: 'Toyota Floor Mats', category: 'Electronics', price: 99.99, image: 'images/products/toyotamats.jpg', icon: 'fas fa-square' },
                { name: 'Toyota Key Fob', category: 'Electronics', price: 199.99, image: 'images/products/toyotakey.jpg', icon: 'fas fa-key' },
                { name: 'Toyota License Plate', category: 'Electronics', price: 29.99, image: 'images/products/toyotaplate.jpg', icon: 'fas fa-id-card' },
                { name: 'Toyota Air Freshener', category: 'Electronics', price: 7.99, image: 'images/products/toyotaair.jpg', icon: 'fas fa-wind' },
                { name: 'Toyota Steering Wheel', category: 'Electronics', price: 39.99, image: 'images/products/toyotasteering.jpg', icon: 'fas fa-circle' },
                { name: 'Toyota Seat Covers', category: 'Electronics', price: 79.99, image: 'images/products/toyotaseats.jpg', icon: 'fas fa-chair' }
            ]
        },
        {
            name: 'L\'Oréal Paris',
            country: 'France',
            status: 'disconnected',
            products: [
                { name: 'L\'Oréal Revitalift Cream', category: 'Creams', price: 24.99, image: 'images/products/revitalift.jpg', icon: 'fas fa-hand-holding-heart' },
                { name: 'L\'Oréal True Match Foundation', category: 'Creams', price: 12.99, image: 'images/products/truematch.jpg', icon: 'fas fa-hand-holding-heart' },
                { name: 'L\'Oréal Elvive Shampoo', category: 'Creams', price: 8.99, image: 'images/products/elvive.jpg', icon: 'fas fa-shower' },
                { name: 'L\'Oréal Colorista Hair Dye', category: 'Creams', price: 14.99, image: 'images/products/colorista.jpg', icon: 'fas fa-palette' },
                { name: 'L\'Oréal Infallible Lipstick', category: 'Creams', price: 9.99, image: 'images/products/infallible.jpg', icon: 'fas fa-hand-holding-heart' },
                { name: 'L\'Oréal Voluminous Mascara', category: 'Creams', price: 8.99, image: 'images/products/voluminous.jpg', icon: 'fas fa-eye' },
                { name: 'L\'Oréal Age Perfect Serum', category: 'Creams', price: 19.99, image: 'images/products/ageperfect.jpg', icon: 'fas fa-hand-holding-heart' },
                { name: 'L\'Oréal Pure Clay Mask', category: 'Creams', price: 11.99, image: 'images/products/pureclay.jpg', icon: 'fas fa-hand-holding-heart' },
                { name: 'L\'Oréal Sublime Bronze', category: 'Creams', price: 9.99, image: 'images/products/sublime.jpg', icon: 'fas fa-hand-holding-heart' },
                { name: 'L\'Oréal EverPure Shampoo', category: 'Creams', price: 7.99, image: 'images/products/everpure.jpg', icon: 'fas fa-shower' },
                { name: 'L\'Oréal EverSleek Conditioner', category: 'Creams', price: 7.99, image: 'images/products/eversleek.jpg', icon: 'fas fa-shower' },
                { name: 'L\'Oréal EverCurl Shampoo', category: 'Creams', price: 7.99, image: 'images/products/evercurl.jpg', icon: 'fas fa-shower' },
                { name: 'L\'Oréal EverStrong Shampoo', category: 'Creams', price: 7.99, image: 'images/products/everstrong.jpg', icon: 'fas fa-shower' },
                { name: 'L\'Oréal EverCreme Conditioner', category: 'Creams', price: 7.99, image: 'images/products/evercreme.jpg', icon: 'fas fa-shower' },
                { name: 'L\'Oréal EverSmooth Shampoo', category: 'Creams', price: 7.99, image: 'images/products/eversmooth.jpg', icon: 'fas fa-shower' },
                { name: 'L\'Oréal Revitalift Night Cream', category: 'Creams', price: 22.99, image: 'images/products/revitaliftnight.jpg', icon: 'fas fa-hand-holding-heart' },
                { name: 'L\'Oréal Revitalift Day Cream', category: 'Creams', price: 22.99, image: 'images/products/revitaliftday.jpg', icon: 'fas fa-hand-holding-heart' },
                { name: 'L\'Oréal Revitalift Eye Cream', category: 'Creams', price: 19.99, image: 'images/products/revitalifteye.jpg', icon: 'fas fa-hand-holding-heart' },
                { name: 'L\'Oréal Revitalift Serum', category: 'Creams', price: 24.99, image: 'images/products/revitaliftserum.jpg', icon: 'fas fa-hand-holding-heart' },
                { name: 'L\'Oréal True Match Powder', category: 'Creams', price: 10.99, image: 'images/products/truematchpowder.jpg', icon: 'fas fa-hand-holding-heart' },
                { name: 'L\'Oréal True Match Concealer', category: 'Creams', price: 8.99, image: 'images/products/truematchconcealer.jpg', icon: 'fas fa-hand-holding-heart' },
                { name: 'L\'Oréal True Match Blush', category: 'Creams', price: 9.99, image: 'images/products/truematchblush.jpg', icon: 'fas fa-hand-holding-heart' }
            ]
        },
        {
            name: 'Adidas AG',
            country: 'Germany',
            status: 'disconnected',
            products: [
                { name: 'Adidas Ultraboost 22', category: 'Dresses', price: 180.00, image: 'images/products/ultraboost.jpg', icon: 'fas fa-running' },
                { name: 'Adidas Stan Smith', category: 'Dresses', price: 80.00, image: 'images/products/stansmith.jpg', icon: 'fas fa-running' },
                { name: 'Adidas NMD R1', category: 'Dresses', price: 130.00, image: 'images/products/nmdr1.jpg', icon: 'fas fa-running' },
                { name: 'Adidas Gazelle', category: 'Dresses', price: 90.00, image: 'images/products/gazelle.jpg', icon: 'fas fa-running' },
                { name: 'Adidas Superstar', category: 'Dresses', price: 85.00, image: 'images/products/superstar.jpg', icon: 'fas fa-running' },
                { name: 'Adidas Yeezy Boost 350', category: 'Dresses', price: 220.00, image: 'images/products/yeezy350.jpg', icon: 'fas fa-running' },
                { name: 'Adidas Originals T-Shirt', category: 'Dresses', price: 25.00, image: 'images/products/adidastshirt.jpg', icon: 'fas fa-tshirt' },
                { name: 'Adidas Track Jacket', category: 'Dresses', price: 60.00, image: 'images/products/trackjacket.jpg', icon: 'fas fa-tshirt' },
                { name: 'Adidas Hoodie', category: 'Dresses', price: 70.00, image: 'images/products/adidashoodie.jpg', icon: 'fas fa-tshirt' },
                { name: 'Adidas Shorts', category: 'Dresses', price: 35.00, image: 'images/products/adidasshorts.jpg', icon: 'fas fa-tshirt' },
                { name: 'Adidas Joggers', category: 'Dresses', price: 55.00, image: 'images/products/adidasjoggers.jpg', icon: 'fas fa-tshirt' },
                { name: 'Adidas Leggings', category: 'Dresses', price: 45.00, image: 'images/products/adidasleggings.jpg', icon: 'fas fa-tshirt' },
                { name: 'Adidas Soccer Jersey', category: 'Dresses', price: 80.00, image: 'images/products/soccerjersey.jpg', icon: 'fas fa-tshirt' },
                { name: 'Adidas Basketball Jersey', category: 'Dresses', price: 75.00, image: 'images/products/basketballjersey.jpg', icon: 'fas fa-tshirt' },
                { name: 'Adidas Running Shorts', category: 'Dresses', price: 30.00, image: 'images/products/runningshorts.jpg', icon: 'fas fa-tshirt' },
                { name: 'Adidas Backpack', category: 'Dresses', price: 65.00, image: 'images/products/adidasbackpack.jpg', icon: 'fas fa-backpack' },
                { name: 'Adidas Cap', category: 'Dresses', price: 25.00, image: 'images/products/adidascap.jpg', icon: 'fas fa-hat-cowboy' },
                { name: 'Adidas Socks Pack', category: 'Dresses', price: 15.00, image: 'images/products/adidassocks.jpg', icon: 'fas fa-socks' },
                { name: 'Adidas Soccer Ball', category: 'Dresses', price: 40.00, image: 'images/products/soccerball.jpg', icon: 'fas fa-futbol' },
                { name: 'Adidas Basketball', category: 'Dresses', price: 35.00, image: 'images/products/basketball.jpg', icon: 'fas fa-basketball-ball' },
                { name: 'Adidas Water Bottle', category: 'Dresses', price: 20.00, image: 'images/products/adidasbottle.jpg', icon: 'fas fa-tint' },
                { name: 'Adidas Gym Bag', category: 'Dresses', price: 45.00, image: 'images/products/gymbag.jpg', icon: 'fas fa-dumbbell' }
            ]
        },
        {
            name: 'Nike Inc.',
            country: 'USA',
            status: 'disconnected',
            products: [
                { name: 'Nike Air Max 270', category: 'Dresses', price: 150.00, image: 'images/products/airmax270.jpg', icon: 'fas fa-running' },
                { name: 'Nike Air Force 1', category: 'Dresses', price: 90.00, image: 'images/products/airforce1.jpg', icon: 'fas fa-running' },
                { name: 'Nike React Element 55', category: 'Dresses', price: 130.00, image: 'images/products/reactelement.jpg', icon: 'fas fa-running' },
                { name: 'Nike Dunk Low', category: 'Dresses', price: 100.00, image: 'images/products/dunklow.jpg', icon: 'fas fa-running' },
                { name: 'Nike Blazer Mid', category: 'Dresses', price: 85.00, image: 'images/products/blazermid.jpg', icon: 'fas fa-running' },
                { name: 'Nike Jordan 1', category: 'Dresses', price: 170.00, image: 'images/products/jordan1.jpg', icon: 'fas fa-running' },
                { name: 'Nike Dri-FIT T-Shirt', category: 'Dresses', price: 30.00, image: 'images/products/niketshirt.jpg', icon: 'fas fa-tshirt' },
                { name: 'Nike Tech Fleece Hoodie', category: 'Dresses', price: 80.00, image: 'images/products/techfleece.jpg', icon: 'fas fa-tshirt' },
                { name: 'Nike Sportswear Jacket', category: 'Dresses', price: 100.00, image: 'images/products/sportswearjacket.jpg', icon: 'fas fa-tshirt' },
                { name: 'Nike Pro Shorts', category: 'Dresses', price: 35.00, image: 'images/products/proshorts.jpg', icon: 'fas fa-tshirt' },
                { name: 'Nike Yoga Pants', category: 'Dresses', price: 60.00, image: 'images/products/yogapants.jpg', icon: 'fas fa-tshirt' },
                { name: 'Nike Leggings', category: 'Dresses', price: 50.00, image: 'images/products/nikeleggings.jpg', icon: 'fas fa-tshirt' },
                { name: 'Nike Basketball Jersey', category: 'Dresses', price: 90.00, image: 'images/products/nikejersey.jpg', icon: 'fas fa-tshirt' },
                { name: 'Nike Football Jersey', category: 'Dresses', price: 85.00, image: 'images/products/footballjersey.jpg', icon: 'fas fa-tshirt' },
                { name: 'Nike Running Shorts', category: 'Dresses', price: 40.00, image: 'images/products/nikerunningshorts.jpg', icon: 'fas fa-tshirt' },
                { name: 'Nike Backpack', category: 'Dresses', price: 70.00, image: 'images/products/nikebackpack.jpg', icon: 'fas fa-backpack' },
                { name: 'Nike Cap', category: 'Dresses', price: 30.00, image: 'images/products/nikecap.jpg', icon: 'fas fa-hat-cowboy' },
                { name: 'Nike Socks 6-Pack', category: 'Dresses', price: 20.00, image: 'images/products/nikesocks.jpg', icon: 'fas fa-socks' },
                { name: 'Nike Basketball', category: 'Dresses', price: 45.00, image: 'images/products/nikebasketball.jpg', icon: 'fas fa-basketball-ball' },
                { name: 'Nike Soccer Ball', category: 'Dresses', price: 50.00, image: 'images/products/nikesoccer.jpg', icon: 'fas fa-futbol' },
                { name: 'Nike Water Bottle', category: 'Dresses', price: 25.00, image: 'images/products/nikebottle.jpg', icon: 'fas fa-tint' },
                { name: 'Nike Gym Bag', category: 'Dresses', price: 55.00, image: 'images/products/nikegymbag.jpg', icon: 'fas fa-dumbbell' }
            ]
        }
    ];
}
function getSuppliers() {
    try {
        const raw = localStorage.getItem(SUPPLIER_STORAGE_KEY);
        let list = raw ? JSON.parse(raw) : null;

        // If no data or legacy data (less than 10 companies), seed with the new default dataset
        if (!Array.isArray(list) || list.length < 10) {
            list = getDefaultSuppliers();
            localStorage.setItem(SUPPLIER_STORAGE_KEY, JSON.stringify(list));
        }
        return list;
    } catch {
        const fallback = getDefaultSuppliers();
        localStorage.setItem(SUPPLIER_STORAGE_KEY, JSON.stringify(fallback));
        return fallback;
    }
}
function saveSuppliers(list) { localStorage.setItem(SUPPLIER_STORAGE_KEY, JSON.stringify(list)); }

// Function to reset suppliers to default (useful for testing)
function resetSuppliersToDefault() {
    localStorage.removeItem(SUPPLIER_STORAGE_KEY);
    return getDefaultSuppliers();
}

function initializeSupplierCatalog() {
    const companiesEl = document.getElementById('supplier-companies');
    const productsEl = document.getElementById('supplier-products');
    const searchEl = document.getElementById('supplier-search');
    if (!companiesEl || !productsEl) return;

    let suppliers = getSuppliers();
    function renderCompanies(activeIndex = 0) {
        companiesEl.innerHTML = '';
        suppliers.forEach((s, idx) => {
            const badge = s.status === 'connected' ? '<span class="badge bg-success ms-2">Connected</span>' : '<span class="badge bg-secondary ms-2">Disconnected</span>';
            const item = document.createElement('a');
            item.href = '#';
            item.className = `list-group-item list-group-item-action d-flex justify-content-between align-items-center ${idx===activeIndex? 'active':''}`;
            item.innerHTML = `<span><i class="fas fa-building me-2"></i>${s.name}${badge}<div class="small text-muted">${s.country}</div></span><span class="badge bg-primary rounded-pill">${s.products.length}</span>`;
            item.addEventListener('click', (e) => { e.preventDefault(); renderProducts(idx); setActive(idx); });
            companiesEl.appendChild(item);
        });
        setActive(activeIndex);
    }
    function setActive(idx) {
        [...companiesEl.children].forEach((el, i) => { if (i===idx) el.classList.add('active'); else el.classList.remove('active'); });
        renderProducts(idx);
    }
    function renderProducts(idx) {
        productsEl.innerHTML = '';
        const s = suppliers[idx];
        if (!s) return;
        const q = (searchEl && searchEl.value || '').toLowerCase();
        s.products.filter(p => !q || p.name.toLowerCase().includes(q) || s.name.toLowerCase().includes(q)).forEach(p => {
            const col = document.createElement('div');
            col.className = 'col-md-6';
            col.innerHTML = `
                <div class="card h-100 shadow-sm">
                    <div class="ratio ratio-16x9 bg-light d-flex align-items-center justify-content-center">
                        ${p.image ? `<img src="${p.image}" class="img-fluid" alt="">` : `<i class="${p.icon || 'fas fa-box'} text-muted" style="font-size:2rem;"></i>`}
                    </div>
                    <div class="card-body">
                        <h6 class="card-title mb-1">${p.name}</h6>
                        <div class="text-muted small mb-2">${s.name} • ${s.country}</div>
                        <div class="fw-bold mb-2">$${p.price.toFixed(2)}</div>
                        <div class="d-flex gap-2">
                            <button class="btn btn-sm btn-outline-primary" title="Prefill" data-action="prefill"><i class="fas fa-magic me-1"></i>Prefill</button>
                            <button class="btn btn-sm btn-outline-secondary" title="Use Image" data-action="image"><i class="fas fa-image me-1"></i>Image</button>
                        </div>
                    </div>
                </div>`;
            // attach handlers
            setTimeout(() => {
                const prefillBtn = col.querySelector('[data-action="prefill"]');
                const imageBtn = col.querySelector('[data-action="image"]');
                if (prefillBtn) prefillBtn.addEventListener('click', () => prefillInternationalForm(s, p));
                if (imageBtn) imageBtn.addEventListener('click', () => useInternationalImage(p));
            }, 0);
            productsEl.appendChild(col);
        });
    }
    if (searchEl) searchEl.addEventListener('input', () => { renderCompanies([...companiesEl.children].findIndex(el => el.classList.contains('active')) || 0); });
    renderCompanies(0);
}

// ===== Company list + modal with local images (no direct URLs) =====
const COMPANY_LOCAL_IMAGES = {
    'TechCorp Global': 'images/suppliers/techcorp.png',
    'Samsung Electronics': 'images/suppliers/samsung.png',
    'Sony Corporation': 'images/suppliers/sony.png',
    'BMW Group': 'images/suppliers/bmw.png',
    'Nestlé Global': 'images/suppliers/nestle.png',
    'Unilever Global': 'images/suppliers/unilever.png',
    'Toyota Motor Corporation': 'images/suppliers/toyota.png',
    'L\'Oréal Paris': 'images/suppliers/loreal.png',
    'Adidas AG': 'images/suppliers/adidas.png',
    'Nike Inc.': 'images/suppliers/nike.png',
    'Globex Electronics': 'images/suppliers/globex.png',
    'Nippon Foods': 'images/suppliers/nippon.png',
    'Euro Home': 'images/suppliers/eurohome.png',
    'Pacific Botanics': 'images/suppliers/pacific.png',
    'Casa Moda': 'images/suppliers/casamoda.png',
    'Orchard Fresh': 'images/suppliers/orchard.png',
    'Alpine Books': 'images/suppliers/alpine.png',
    'Savory Bites Co.': 'images/suppliers/savory.png'
};

function getProductLocalImage(product) {
    // Use the product's image property if it exists, otherwise generate placeholder
    if (product.image && product.image.trim() !== '') {
        return product.image;
    }
    
    // Legacy mapping for old products
    const map = {
        '4K Action Camera': 'images/catalog/4k_action_camera.png',
        'Bluetooth Speaker Pro': 'images/catalog/bluetooth_speaker_pro.png',
        'Premium Sushi Rice (5kg)': 'images/catalog/premium_sushi_rice.png',
        'Matcha Snack Pack': 'images/catalog/matcha_snack_pack.png',
        'Eco Kettle': 'images/catalog/eco_kettle.png',

        // Curated product images (non-random, public product shots)
        // Samsung Electronics
        'Galaxy S24 Ultra': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Samsung_Galaxy_S24_Ultra.png/640px-Samsung_Galaxy_S24_Ultra.png',
        'Galaxy Z Fold 5': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Samsung_Galaxy_Z_Fold5.png/640px-Samsung_Galaxy_Z_Fold5.png',
        'Galaxy Watch 6': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Samsung_Galaxy_Watch6.png/640px-Samsung_Galaxy_Watch6.png',
        'Galaxy Buds 2 Pro': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Samsung_Galaxy_Buds2_Pro.png/640px-Samsung_Galaxy_Buds2_Pro.png',
        'Galaxy Tab S9': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Samsung_Galaxy_Tab_S9.png/640px-Samsung_Galaxy_Tab_S9.png',
        'Samsung QLED TV 65"': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Samsung_QLED_TV.png/640px-Samsung_QLED_TV.png'
    };
    
    // If we have a legacy mapping, use it, otherwise generate placeholder
    if (map[product.name]) {
        return map[product.name];
    }
    
    // Generate a placeholder image for new products
    return generatePlaceholderImage(product.name, product.category);
}

// Function to handle image loading errors and provide fallback
function handleImageError(img) {
    // Create a placeholder image with product icon
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 140;
    const ctx = canvas.getContext('2d');
    
    // Background color based on category
    const categoryColors = {
        'Electronics': '#e3f2fd',
        'Food': '#f3e5f5',
        'Snacks': '#fff3e0',
        'Creams': '#fce4ec',
        'Dresses': '#e8f5e8',
        'Home Appliances': '#f1f8e9'
    };
    
    const bgColor = categoryColors[img.dataset.category] || '#f5f5f5';
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, 200, 140);
    
    // Add gradient overlay
    const gradient = ctx.createLinearGradient(0, 0, 0, 140);
    gradient.addColorStop(0, 'rgba(255,255,255,0.3)');
    gradient.addColorStop(1, 'rgba(0,0,0,0.1)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 200, 140);
    
    // Add icon based on category
    const iconMap = {
        'Electronics': '📱',
        'Food': '🍎',
        'Snacks': '🍪',
        'Creams': '🧴',
        'Dresses': '👕',
        'Home Appliances': '🏠'
    };
    
    const icon = iconMap[img.dataset.category] || '📦';
    ctx.font = '48px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#999';
    ctx.fillText(icon, 100, 70);
    
    // Add product name
    ctx.font = 'bold 12px Arial';
    ctx.fillStyle = '#666';
    ctx.fillText(img.dataset.productName || 'Product', 100, 100);
    
    // Add "No Image" text
    ctx.font = '10px Arial';
    ctx.fillStyle = '#999';
    ctx.fillText('No Image Available', 100, 115);
    
    // Convert to data URL
    img.src = canvas.toDataURL();
}

// Function to generate a placeholder image URL for products
function generatePlaceholderImage(productName, category, width = 200, height = 140) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    
    // Background color based on category
    const categoryColors = {
        'Electronics': '#e3f2fd',
        'Food': '#f3e5f5',
        'Snacks': '#fff3e0',
        'Creams': '#fce4ec',
        'Dresses': '#e8f5e8',
        'Home Appliances': '#f1f8e9'
    };
    
    const bgColor = categoryColors[category] || '#f5f5f5';
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);
    
    // Add gradient overlay
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, 'rgba(255,255,255,0.3)');
    gradient.addColorStop(1, 'rgba(0,0,0,0.1)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Add icon based on category
    const iconMap = {
        'Electronics': '📱',
        'Food': '🍎',
        'Snacks': '🍪',
        'Creams': '🧴',
        'Dresses': '👕',
        'Home Appliances': '🏠'
    };
    
    const icon = iconMap[category] || '📦';
    ctx.font = `${Math.min(width, height) * 0.3}px Arial`;
    ctx.textAlign = 'center';
    ctx.fillStyle = '#999';
    ctx.fillText(icon, width/2, height/2 - 10);
    
    // Add product name (truncated if too long)
    const displayName = productName.length > 20 ? productName.substring(0, 17) + '...' : productName;
    ctx.font = `bold ${Math.min(width, height) * 0.06}px Arial`;
    ctx.fillStyle = '#666';
    ctx.fillText(displayName, width/2, height/2 + 20);
    
    // Add "No Image" text
    ctx.font = `${Math.min(width, height) * 0.05}px Arial`;
    ctx.fillStyle = '#999';
    ctx.fillText('No Image Available', width/2, height/2 + 35);
    
    return canvas.toDataURL();
}

function renderCompanyListWithLocalImages() {
    const table = document.getElementById('company-list-table');
    if (!table) return;
    const suppliers = getSuppliers();
    table.innerHTML = '';
    suppliers.forEach(s => {
        const tr = document.createElement('tr');
        const logo = COMPANY_LOCAL_IMAGES[s.name] || 'images/suppliers/default.png';
        const isConnected = isConnectedToCompany(s.name, s.country);
        
        // Create connection status badge
        const connectionStatus = isConnected ? 
            '<span class="badge bg-success">Connected</span>' : 
            '<span class="badge bg-secondary">Not Connected</span>';
        
        // Create connect/disconnect button
        const connectionButton = isConnected ? 
            `<button class="btn btn-sm btn-danger me-2" onclick="disconnectFromCompany('${s.name.replace(/'/g, "&#39;")}', '${s.country.replace(/'/g, "&#39;")}')" title="Disconnect from ${s.name}">
                <i class="fas fa-unlink"></i> Disconnect
            </button>` :
            `<button class="btn btn-sm btn-success me-2" onclick="connectToCompany('${s.name.replace(/'/g, "&#39;")}', '${s.country.replace(/'/g, "&#39;")}')" title="Connect to ${s.name}">
                <i class="fas fa-plug"></i> Connect
            </button>`;
        
        // Create view button (only visible when connected)
        const viewButton = isConnected ? 
            `<button class="btn btn-sm btn-outline-primary" onclick="openCompanyProductsModal('${s.name.replace(/'/g, "&#39;")}')" title="View ${s.name} products">
                <i class="fas fa-eye"></i> View
            </button>` : '';
        
        tr.innerHTML = `
            <td>
                <div class="d-flex align-items-center">
                    <img src="${logo}" alt="${s.name}" class="me-2" style="width:32px; height:32px; object-fit:cover; border-radius:4px;">
                    <div>
                        <div>${s.name}</div>
                        ${connectionStatus}
                    </div>
                </div>
            </td>
            <td>${s.country}</td>
            <td><span class="badge bg-primary">${s.products.length}</span></td>
            <td class="text-end">
                ${connectionButton}
                ${viewButton}
            </td>
        `;
        table.appendChild(tr);
    });
}

window.openCompanyProductsModal = function(companyName) {
    const suppliers = getSuppliers();
    const supplier = suppliers.find(s => s.name === companyName);
    const grid = document.getElementById('company-products-grid');
    const title = document.getElementById('companyProductsTitle');
    if (!supplier || !grid) return;
    if (title) title.textContent = `${supplier.name} Products`;
    grid.innerHTML = '';
    supplier.products.forEach(p => {
        const col = document.createElement('div');
        col.className = 'col-md-4';
        const localImg = getProductLocalImage(p);
        col.innerHTML = `
            <div class="card h-100">
                <img src="${localImg}" class="card-img-top" alt="${p.name}" style="height: 140px; object-fit: cover;" 
                     loading="lazy" decoding="async" width="100%" height="140"
                     data-category="${p.category}" data-product-name="${p.name}" 
                     onerror="handleImageError(this)">
                <div class="card-body">
                    <h6 class="card-title mb-1">${p.name}</h6>
                    <div class="text-muted small mb-2">${supplier.name} • ${supplier.country}</div>
                    <div class="fw-bold mb-2">$${p.price.toFixed(2)}</div>
                    <div class="d-flex gap-2">
                        <button class="btn btn-sm btn-outline-primary" onclick='prefillInternationalForm(${JSON.stringify({name: supplier.name, country: supplier.country}).replace(/"/g, "&quot;")}, ${JSON.stringify({name: p.name, category: p.category, price: p.price, icon: p.icon, image: localImg}).replace(/"/g, "&quot;")})'><i class="fas fa-magic me-1"></i>Prefill</button>
                        <button class="btn btn-sm btn-outline-secondary" onclick='useLocalProductImage("${localImg}")'><i class="fas fa-image me-1"></i>Image</button>
                    </div>
                </div>
            </div>`;
        grid.appendChild(col);
    });
    const modalEl = document.getElementById('companyProductsModal');
    if (modalEl) new bootstrap.Modal(modalEl).show();
}

window.useLocalProductImage = function(localPath) {
    const imgEl = document.getElementById('intlImage');
    if (imgEl) {
        imgEl.value = localPath;
        imgEl.dispatchEvent(new Event('input'));
    }
}
function prefillInternationalForm(supplier, product) {
    const map = {
        intlCompany: supplier.name,
        intlCountry: supplier.country,
        intlProductName: product.name,
        intlCategory: product.category,
        intlPrice: product.price
    };
    Object.keys(map).forEach(id => { const el = document.getElementById(id); if (el) el.value = map[id]; });
    const iconEl = document.getElementById('intlIcon'); if (iconEl) iconEl.value = product.icon || '';
    const imgEl = document.getElementById('intlImage'); if (imgEl && product.image) imgEl.value = product.image;
    const evt = new Event('input');
    if (imgEl) imgEl.dispatchEvent(evt);
    const catEl = document.getElementById('intlCategory'); if (catEl) catEl.dispatchEvent(new Event('change'));
}
function useInternationalImage(product) {
    const imgEl = document.getElementById('intlImage');
    if (imgEl && product.image) {
        imgEl.value = product.image;
        imgEl.dispatchEvent(new Event('input'));
    }
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

    // Initialize procurement page if present
    if (document.getElementById('intl-purchase-form')) {
        initializeInternationalProcurement();
    }
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
    // Check if user is logged in
    if (!isUserLoggedIn()) {
        showLoginRequiredAlert('You need to login to purchase products');
        return;
    }
    
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
    
    // Check if user is logged in
    if (!isUserLoggedIn()) {
        showLoginRequiredAlert('You need to login to purchase products');
        return;
    }
    
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
    const paymentMethod = (document.querySelector('input[name="paymentMethod"]:checked') || { value: 'cod' }).value;
    const card = {
        number: (document.getElementById('payCardNumber') || {}).value || '',
        expiry: (document.getElementById('payCardExpiry') || {}).value || '',
        cvv: (document.getElementById('payCardCvv') || {}).value || ''
    };
    const upiId = (document.getElementById('payUpiId') || {}).value || '';
    
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
    
    // Basic payment validation (demo only)
    if (paymentMethod === 'card') {
        if (!card.number || !card.expiry || !card.cvv) {
            showAlert('Please enter complete card details.', 'warning');
            return;
        }
    }
    if (paymentMethod === 'upi') {
        if (!upiId || !upiId.includes('@')) {
            showAlert('Please enter a valid UPI ID (e.g., name@bank).', 'warning');
            return;
        }
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
        confirmedDate: null,
        payment: { method: paymentMethod, status: paymentMethod === 'cod' ? 'pending' : 'paid' }
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
    // Prefer unified storage key; migrate legacy if present
    let orders = [];
    const unified = localStorage.getItem(STORAGE_KEYS.ORDERS);
    if (unified) {
        try { orders = JSON.parse(unified) || []; } catch { orders = []; }
    } else {
        const legacy = localStorage.getItem('orders');
        if (legacy) {
            try { orders = JSON.parse(legacy) || []; } catch { orders = []; }
        }
    }
    orders.push(order);
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    try { localStorage.setItem('orders_last_update', Date.now().toString()); } catch {}
}

function getOrders() {
    // Try unified key first
    const unified = localStorage.getItem(STORAGE_KEYS.ORDERS);
    if (unified) {
        try { return JSON.parse(unified) || []; } catch { /* fallthrough */ }
    }
    // Migrate from any legacy keys
    const legacyA = localStorage.getItem('unicart_orders');
    const legacyB = localStorage.getItem('orders');
    const legacy = legacyA || legacyB;
    if (legacy) {
        localStorage.setItem(STORAGE_KEYS.ORDERS, legacy);
        if (legacyA) localStorage.removeItem('unicart_orders');
        if (legacyB) localStorage.removeItem('orders');
        try { return JSON.parse(legacy) || []; } catch { return []; }
    }
    return [];
}

function updateOrderStatus(orderId, status, confirmedDate = null) {
    let orders = getOrders();
    const orderIndex = orders.findIndex(order => order.id === orderId);
    
    if (orderIndex !== -1) {
        orders[orderIndex].status = status;
        if (confirmedDate) {
            orders[orderIndex].confirmedDate = confirmedDate;
        }
        localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
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
        let statusBadge = '<span class="badge bg-secondary">Unknown</span>';
        switch (order.status) {
            case 'pending':
                statusBadge = '<span class="badge bg-warning text-dark">Pending</span>';
                break;
            case 'confirmed':
                statusBadge = '<span class="badge bg-success">Confirmed</span>';
                break;
            case 'processing':
                statusBadge = '<span class="badge bg-info text-dark">Processing</span>';
                break;
            case 'out_for_delivery':
                statusBadge = '<span class="badge bg-primary">Out for delivery</span>';
                break;
            case 'delivered':
                statusBadge = '<span class="badge bg-success">Delivered</span>';
                break;
        }
        
        const assigned = order.delivery && order.delivery.assignedDeliveryMan ? `${order.delivery.assignedDeliveryMan.name}` : '—';
        const assignBtn = order.status === 'confirmed' && !(order.delivery && order.delivery.assignedDeliveryMan)
            ? `<button class="btn btn-outline-secondary btn-sm" onclick="promptAssignOrder('${order.id}')">
                   <i class=\"fas fa-truck\"></i> Assign
               </button>`
            : (order.delivery && order.delivery.assignedDeliveryMan ? `<span class="text-muted"><i class=\"fas fa-truck\"></i> ${assigned}</span>` : '');
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
                            ${assignBtn}
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
        // Immediately prompt admin to assign a delivery person
        setTimeout(() => { promptAssignOrder(orderId); }, 300);
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

// ===== Assignment helpers =====
function promptAssignOrder(orderId) {
    const men = getDeliveryMen();
    if (!men || men.length === 0) { showAlert('No delivery personnel available. Add in Delivery page.', 'warning'); return; }
    const options = men.map(m => `${m.id} - ${m.name}${m.email ? ' <'+m.email+'>' : ''}`).join('\n');
    const input = prompt(`Assign order ${orderId} to (enter ID or email):\n\n${options}`);
    if (!input) return;
    const trimmed = input.trim().toLowerCase();
    const selected = men.find(m => m.id.toLowerCase() === trimmed || (m.email||'').toLowerCase() === trimmed);
    if (!selected) { showAlert('No matching delivery person found', 'danger'); return; }
    assignOrderToDelivery(orderId, selected.id);
}

function assignOrderToDelivery(orderId, deliveryId) {
    const men = getDeliveryMen();
    const person = men.find(m => m.id === deliveryId);
    if (!person) { showAlert('Delivery person not found', 'danger'); return; }
    let orders = getOrders();
    const idx = orders.findIndex(o => o.id === orderId);
    if (idx === -1) { showAlert('Order not found', 'danger'); return; }
    const assignedAt = new Date().toISOString();
    orders[idx].delivery = orders[idx].delivery || {};
    orders[idx].delivery.assignedDeliveryMan = { id: person.id, name: person.name, phone: person.phone };
    orders[idx].delivery.assignedAt = assignedAt;
    if (orders[idx].status === 'confirmed') orders[idx].status = 'processing';
    localStorage.setItem('orders', JSON.stringify(orders));
    // Notify the driver
    notifyDeliveryAssignment(person.id, orders[idx].id);
    showAlert(`Assigned order ${orderId} to ${person.name}`, 'success');
    loadAdminOrders();
}

function notifyDeliveryAssignment(deliveryId, orderId) {
    const key = `delivery_notify_${deliveryId}`;
    const list = JSON.parse(localStorage.getItem(key) || '[]');
    list.push({ orderId, at: new Date().toISOString() });
    localStorage.setItem(key, JSON.stringify(list));
}

// Auto-assign the first unassigned confirmed order to the currently logged-in delivery user
function autoAssignForCurrentDeliveryUser() {
    const user = getCurrentDeliveryUser();
    if (!user) return false;
    const orders = getOrders();
    const targetIdx = orders.findIndex(o => o.status === 'confirmed' && (!o.delivery || !o.delivery.assignedDeliveryMan));
    if (targetIdx === -1) return false;
    orders[targetIdx].delivery = orders[targetIdx].delivery || {};
    orders[targetIdx].delivery.assignedDeliveryMan = { id: user.id, name: user.name };
    orders[targetIdx].status = 'processing';
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    notifyDeliveryAssignment(user.id, orders[targetIdx].id);
    return true;
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

// ============================================
// COMPANY CONNECTION MANAGEMENT
// ============================================

function getCompanyConnections() {
    const connections = localStorage.getItem(STORAGE_KEYS.COMPANY_CONNECTIONS);
    return connections ? JSON.parse(connections) : {};
}

function saveCompanyConnections(connections) {
    localStorage.setItem(STORAGE_KEYS.COMPANY_CONNECTIONS, JSON.stringify(connections));
}

function connectToCompany(companyName, country) {
    const connections = getCompanyConnections();
    const key = `${companyName}-${country}`;
    
    connections[key] = {
        company: companyName,
        country: country,
        connectedAt: new Date().toISOString(),
        connectedBy: 'admin'
    };
    
    saveCompanyConnections(connections);
    showAlert(`Connected to ${companyName} (${country}) successfully!`, 'success');
    
    // Refresh the company list to update UI
    renderCompanyListWithLocalImages();
}

function disconnectFromCompany(companyName, country) {
    const connections = getCompanyConnections();
    const key = `${companyName}-${country}`;
    
    if (connections[key]) {
        delete connections[key];
        saveCompanyConnections(connections);
        showAlert(`Disconnected from ${companyName} (${country}) successfully!`, 'info');
        
        // Refresh the company list to update UI
        renderCompanyListWithLocalImages();
    }
}

function isConnectedToCompany(companyName, country) {
    const connections = getCompanyConnections();
    const key = `${companyName}-${country}`;
    return !!connections[key];
}

// ============================================
// SELLER AUTHENTICATION
// ============================================

function getCurrentSeller() {
    const seller = localStorage.getItem(STORAGE_KEYS.SELLER);
    return seller ? JSON.parse(seller) : null;
}

function loginAsSeller(email, sellerName) {
    if (!email || !sellerName) {
        throw new Error('Please enter email and shop name');
    }
    const sellerData = {
        email: email,
        sellerName: sellerName,
        loginTime: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEYS.SELLER, JSON.stringify(sellerData));
    return sellerData;
}

function sellerLogout() {
    localStorage.removeItem(STORAGE_KEYS.SELLER);
    showAlert('Seller logged out successfully!', 'info');
    window.location.href = 'index.html';
}

function updateSellerUI() {
    const seller = getCurrentSeller();
    const sellerSections = document.querySelectorAll('.seller-section');
    sellerSections.forEach(section => {
        section.style.display = seller ? 'block' : 'none';
    });
}

function checkSellerAccess() {
    const seller = getCurrentSeller();
    if (!seller) {
        showAlert('Seller access required. Please login first.', 'warning');
        setTimeout(() => {
            window.location.href = 'seller-login.html';
        }, 800);
        return false;
    }
    return true;
}

// ============================================
// PENDING PRODUCTS (Seller submissions -> Admin approval)
// ============================================

function getPendingProducts() {
    const pending = localStorage.getItem(STORAGE_KEYS.PENDING_PRODUCTS);
    return pending ? JSON.parse(pending) : [];
}

function savePendingProducts(pending) {
    localStorage.setItem(STORAGE_KEYS.PENDING_PRODUCTS, JSON.stringify(pending));
}

function submitProductForApproval(data) {
    const seller = getCurrentSeller();
    if (!seller) {
        throw new Error('Seller not logged in');
    }
    const pending = getPendingProducts();
    const newPending = {
        id: 'P' + Date.now(),
        submittedAt: new Date().toISOString(),
        status: 'pending',
        seller: { email: seller.email, sellerName: seller.sellerName },
        product: {
            name: data.name,
            price: parseFloat(data.price),
            category: data.category,
            description: data.description,
            longDescription: data.longDescription,
            features: data.features || [],
            icon: data.icon,
            image: data.image || null
        }
    };
    pending.unshift(newPending);
    savePendingProducts(pending);
    return newPending;
}

function approvePendingProduct(pendingId) {
    const pending = getPendingProducts();
    const idx = pending.findIndex(p => p.id === pendingId);
    if (idx === -1) return false;
    const pendingItem = pending[idx];
    pendingItem.status = 'approved';
    pendingItem.approvedAt = new Date().toISOString();

    // Add to store products
    const products = getStoredProducts();
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    const toAdd = {
        id: newId,
        ...pendingItem.product,
        dateAdded: new Date().toISOString()
    };
    products.push(toAdd);
    saveProductsToStorage(products);

    // Remove from pending list
    pending.splice(idx, 1);
    savePendingProducts(pending);
    return toAdd;
}

function rejectPendingProduct(pendingId, reason = '') {
    const pending = getPendingProducts();
    const idx = pending.findIndex(p => p.id === pendingId);
    if (idx === -1) return false;
    pending[idx].status = 'rejected';
    pending[idx].rejectedAt = new Date().toISOString();
    pending[idx].reason = reason;
    // keep for audit but move to end
    const [item] = pending.splice(idx, 1);
    pending.push(item);
    savePendingProducts(pending);
    return true;
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
