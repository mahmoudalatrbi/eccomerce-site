// src/i18n.js (النسخة الكاملة)
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      "My Online Store": "My Online Store",
      "Home": "Home",
      "Products": "Products",
      "Cart": "Cart",
      "Login": "Login",
      "Sign Up": "Sign Up",
      "Profile": "Profile",
      "My Orders": "My Orders",
      "Logout": "Logout",

      // Common
      "Search for products...": "Search for products...",
      "English": "English",
      "العربية": "العربية",
      "Loading...": "Loading...",
      "Add to Cart": "Add to Cart",
      "View Details": "View Details",
      "Stock": "Stock",
      "products": "products",
      "Default": "Default",

      // Home
      "Welcome to Our Store": "Welcome to Our Store",
      "Discover the best products at amazing prices": "Discover the best products at amazing prices",
      "Shop Now": "Shop Now",
      "Shop by Category": "Shop by Category",
      "Featured Products": "Featured Products",

      // Products
      "All Products": "All Products",
      "All Categories": "All Categories",
      "Categories": "Categories",
      "Price Range": "Price Range",
      "Search": "Search",
      "Sort by": "Sort by",
      "Name (A-Z)": "Name (A-Z)",
      "Price (Low to High)": "Price (Low to High)",
      "Price (High to Low)": "Price (High to Low)",
      "Newest": "Newest",
      "Clear Filters": "Clear Filters",
      "Search results for": "Search results for",
      "No products found": "No products found",

      // Product Details
      "No image available": "No image available",
      "reviews": "reviews",
      "Description": "Description",
      "No description available for this product.": "No description available for this product.",
      "In Stock": "In Stock",
      "Out of Stock": "Out of Stock",
      "Quantity": "Quantity",
      "Adding...": "Adding...",
      "Currently Unavailable": "Currently Unavailable",
      "Add to Wishlist": "Add to Wishlist",
      "Back to Products": "Back to Products",
      "Product Information": "Product Information",
      "Free shipping on orders over $100": "Free shipping on orders over $100",
      "30-day return policy": "30-day return policy",
      "One year warranty": "One year warranty",
      "24/7 customer support": "24/7 customer support",

      // Cart
      "Continue Shopping": "Continue Shopping",
      "Shopping Cart": "Shopping Cart",
      "Selected Items": "Selected Items",
      "per unit": "per unit",
      "Total": "Total",
      "Remove from cart": "Remove from cart",
      "Are you sure you want to remove this product?": "Are you sure you want to remove this product?",
      "Order Summary": "Order Summary",
      "Subtotal": "Subtotal",
      "Shipping": "Shipping",
      "Tax": "Tax",
      "Free": "Free",
      "Proceed to Checkout": "Proceed to Checkout",
      "Add More": "Add More",
      "Fast Shipping": "Fast Shipping",
      "Secure Payment": "Secure Payment",
      "Free Returns": "Free Returns",
      "Shopping Cart is Empty": "Shopping Cart is Empty",
      "There are no products in your shopping cart": "There are no products in your shopping cart",
      "Start Shopping Now": "Start Shopping Now",
      "Back to Home": "Back to Home",
      // Toast Messages
      "Product added to cart successfully!": "Product added to cart successfully!",
      "Failed to add product to cart": "Failed to add product to cart",
      // Footer
      "Your first destination for online shopping with the best prices and highest quality": "Your first destination for online shopping with the best prices and highest quality",
      "Quick Links": "Quick Links",
      "About Us": "About Us",
      "Contact Us": "Contact Us",
      "All rights reserved": "All rights reserved",

    }
  },
  ar: {
    translation: {
      // Navigation
      "My Online Store": "متجري الإلكتروني",
      "Home": "الرئيسية",
      "Products": "المنتجات",
      "Cart": "السلة",
      "Login": "تسجيل الدخول",
      "Sign Up": "إنشاء حساب",
      "Profile": "الملف الشخصي",
      "My Orders": "طلباتي",
      "Logout": "تسجيل الخروج",

      // Common
      "Search for products...": "ابحث عن المنتجات...",
      "English": "English",
      "العربية": "العربية",
      "Loading...": "جاري التحميل...",
      "Add to Cart": "أضف للسلة",
      "View Details": "عرض التفاصيل",
      "Stock": "المخزون",
      "products": "منتج",
      "Default": "افتراضي",

      // Home
      "Welcome to Our Store": "مرحباً بك في متجرنا",
      "Discover the best products at amazing prices": "اكتشف أفضل المنتجات بأسعار رائعة",
      "Shop Now": "تسوق الآن",
      "Shop by Category": "تسوق حسب الفئة",
      "Featured Products": "المنتجات المميزة",

      // Products
      "All Products": "جميع المنتجات",
      "All Categories": "جميع الفئات",
      "Categories": "الفئات",
      "Price Range": "نطاق السعر",
      "Search": "البحث",
      "Sort by": "ترتيب حسب",
      "Name (A-Z)": "الاسم (أ-ي)",
      "Price (Low to High)": "السعر (الأقل أولاً)",
      "Price (High to Low)": "السعر (الأعلى أولاً)",
      "Newest": "الأحدث",
      "Clear Filters": "مسح الفلاتر",
      "Search results for": "نتائج البحث عن",
      "No products found": "لم يتم العثور على منتجات",

      // Product Details
      "No image available": "لا توجد صورة متاحة",
      "reviews": "تقييم",
      "Description": "الوصف",
      "No description available for this product.": "لا يوجد وصف متاح لهذا المنتج.",
      "In Stock": "متوفر",
      "Out of Stock": "نفدت الكمية",
      "Quantity": "الكمية",
      "Adding...": "جاري الإضافة...",
      "Currently Unavailable": "غير متوفر حالياً",
      "Add to Wishlist": "إضافة للمفضلة",
      "Back to Products": "العودة للمنتجات",
      "Product Information": "معلومات المنتج",
      "Free shipping on orders over $100": "شحن مجاني للطلبات أكثر من $100",
      "30-day return policy": "إمكانية الإرجاع خلال 30 يوم",
      "One year warranty": "ضمان لمدة سنة واحدة",
      "24/7 customer support": "دعم فني متاح 24/7",

      // Cart
      "Continue Shopping": "متابعة التسوق",
      "Shopping Cart": "سلة التسوق",
      "Selected Items": "العناصر المختارة",
      "per unit": "للوحدة",
      "Total": "الإجمالي",
      "Remove from cart": "حذف من السلة",
      "Are you sure you want to remove this product?": "هل أنت متأكد من حذف هذا المنتج؟",
      "Order Summary": "ملخص الطلب",
      "Subtotal": "المجموع الفرعي",
      "Shipping": "الشحن",
      "Tax": "الضريبة",
      "Free": "مجاني",
      "Proceed to Checkout": "متابعة للشراء",
      "Add More": "إضافة المزيد",
      "Fast Shipping": "شحن سريع",
      "Secure Payment": "دفع آمن",
      "Free Returns": "إرجاع مجاني",
      "Shopping Cart is Empty": "سلة التسوق فارغة",
      "There are no products in your shopping cart": "لا توجد منتجات في سلة التسوق الخاصة بك",
      "Start Shopping Now": "ابدأ التسوق الآن",
      "Back to Home": "العودة للرئيسية",

      // Toast Messages
      "Product added to cart successfully!": "تم إضافة المنتج للسلة بنجاح!",
      "Failed to add product to cart": "فشل في إضافة المنتج للسلة",

      // Footer
      "Your first destination for online shopping with the best prices and highest quality": "وجهتك الأولى للتسوق الإلكتروني بأفضل الأسعار وأعلى جودة",
      "Quick Links": "روابط سريعة",
      "About Us": "من نحن",
      "Contact Us": "اتصل بنا",
      "All rights reserved": "جميع الحقوق محفوظة",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

// حفظ اللغة في localStorage عند التغيير
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('language', lng);
  document.dir = lng === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = lng;
});

export default i18n;